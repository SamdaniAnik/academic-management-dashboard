import { NextResponse } from "next/server";
import { Faculty, FacultyCourse, Course } from "../../models/__associations";
import { Op } from "sequelize";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const id_faculty = searchParams.get("id_faculty") || "";
        const name = searchParams.get("name") || "";
        const email = searchParams.get("email") || "";
        const course_name = searchParams.get("course_name") || "";

        const offset = (page - 1) * limit;

        const whereCondition = {
            ...(id_faculty && { id_faculty: { [Op.eq]: id_faculty } }),
            ...(name && { name: { [Op.like]: `%${name}%` } }),
            ...(email && { email: { [Op.like]: `%${email}%` } }),
        };

        const { rows: faculty, count } = await Faculty.findAndCountAll({
            where: whereCondition,
            include: [
                {
                    model: FacultyCourse,
                    attributes: ["id_faculty_courses", "total_enrollment"],
                    required: course_name ? true : false,
                    include: [{
                        model: Course,
                        as: "Course",
                        attributes: ["name", "id_courses"],
                        where: name ? { name: { [Op.like]: `%${course_name}%` } } : undefined,
                        required: course_name ? true : false,
                    }],
                },
            ],
            limit,
            offset,
            distinct: true,
            order: [["created_at", "DESC"]],
        });

        return NextResponse.json({
            faculty,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
