import { NextResponse } from "next/server";
import { StudentsEnrollment, FacultyCourses, Courses, Faculty } from "../../models/__associations";
import { Sequelize } from "sequelize";

export async function GET(req) {
    try {
        const enrollments = await StudentsEnrollment.findAll({
            attributes: [
                [Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%Y-%m"), "month"],
                [Sequelize.fn("COUNT", Sequelize.col("id_students_enrollment")), "enrollment_count"],
            ],
            include: [
                {
                    model: FacultyCourses,
                    attributes: ["id_faculty_courses"],
                    include: [
                        {
                            model: Courses,
                            as: "Course",
                            attributes: ["name"],
                        },
                        {
                            model: Faculty,
                            attributes: ["name"],
                        },
                    ],
                },
            ],
            group: [Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%Y-%m")],
            order: [[Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%Y-%m"), "ASC"]],
        });

        return NextResponse.json(enrollments);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
