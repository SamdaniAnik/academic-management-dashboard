import { NextResponse } from "next/server";
import { StudentEnrollment, Student, FacultyCourse, Course, Faculty } from "../../models/__associations";
import { Op } from "sequelize";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const student = searchParams.get("student");
        const email = searchParams.get("email");
        const course = searchParams.get("course");
        const faculty = searchParams.get("faculty");

        const offset = (page - 1) * limit;

        // Define search filters
        const whereClause = {};

        if (student) {
            whereClause["$Student.name$"] = { [Op.like]: `%${student}%` };
        }
        if (email) {
            whereClause["$Student.email$"] = { [Op.like]: `%${email}%` };
        }

        const { rows, count } = await StudentEnrollment.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: FacultyCourse,
                    required: course || faculty ? true : false,
                    include: [
                        {
                            model: Course,
                            as: "Course",
                            attributes: ["name"], required: course ? true : false, where: course ? { name: { [Op.like]: `%${course}%` } } : undefined
                        },
                        { model: Faculty, attributes: ["name"], required: faculty ? true : false, where: faculty ? { name: { [Op.like]: `%${faculty}%` } } : undefined },
                    ],
                },
                { model: Student, attributes: ["name", "email"] },
            ],
            offset,
            limit: parseInt(limit),
            distinct: true,
        });

        return NextResponse.json({ total: count, enrollments: rows });
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


// ✅ PATCH: Update student GPA
export async function PATCH(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const { gpa } = await req.json();

        if (!id || gpa === undefined) {
            return NextResponse.json({ error: "ID and GPA are required" }, { status: 400 });
        }

        await StudentEnrollment.update({ gpa }, { where: { id_students_enrollment: id } });

        return NextResponse.json({ success: true, message: "GPA updated" });
    } catch (error) {
        console.error("Error updating GPA:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
