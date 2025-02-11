import { NextResponse } from "next/server";
import { FacultyCourse, StudentEnrollment, Faculty, Student, Course } from "../../models/__associations";


export async function POST(req) {
    try {
        const { id_faculty_courses, id_students } = await req.json();

        const existingCourse = await StudentEnrollment.findOne({ where: { id_faculty_courses, id_students } });

        if (existingCourse) {
            return NextResponse.json({ error: "Student already assigned to this course" }, { status: 400 });
        }

        const facultyCourse = await FacultyCourse.findByPk(id_faculty_courses);

        if (!facultyCourse) {
            return NextResponse.json({ error: "Faculty course not found" }, { status: 404 });
        }

        const newEnrollment = await StudentEnrollment.create({ id_faculty_courses, id_students });

        facultyCourse.total_enrollment = facultyCourse.total_enrollment + 1;
        await facultyCourse.save();

        return NextResponse.json(newEnrollment, { status: 201 });
    } catch (error) {
        console.error("Error assign course to student:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const enrollment = await StudentEnrollment.findAll({
            include: [
                { model: FacultyCourse, include: [{ model: Faculty, attributes: ["name"] }, { model: Course, as: "Course", attributes: ["name"] }] },
                { model: Student, attributes: ["name"] },
            ],
        });

        const formattedEnrollment = enrollment.map((item) => ({
            id_students_enrollment: item.id_students_enrollment,
            student_name: item.Student.name,
            course_name: item.FacultyCourse.Course.name,
            faculty_name: item.FacultyCourse.Faculty.name,
        }));

        return NextResponse.json({ success: true, enrollment: formattedEnrollment });
    } catch (error) {
        console.error("Error fetching enrollment:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        const enrollment = await StudentEnrollment.findByPk(id);

        if (!enrollment) {
            return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
        }

        const facultyCourse = await FacultyCourse.findByPk(enrollment.id_faculty_courses);

        if (!facultyCourse) {

            return NextResponse.json({ error: "Faculty course not found" }, { status: 404 });
        }

        facultyCourse.total_enrollment = facultyCourse.total_enrollment - 1;
        await facultyCourse.save();

        await enrollment.destroy();

        return NextResponse.json({ message: "Enrollment removed" });
    } catch (error) {
        console.error("Error deleting enrollment:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
