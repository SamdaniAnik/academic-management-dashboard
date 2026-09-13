import { NextResponse } from "next/server";
import { StudentEnrollment, FacultyCourse, Course, Faculty } from "../../../lib/models/associations";
import { Sequelize } from "sequelize";

export async function GET(req) {
    try {
        const enrollments = await StudentEnrollment.findAll({
            attributes: [
                [Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%Y-%m"), "month"],
                [Sequelize.fn("COUNT", Sequelize.col("id_students_enrollment")), "enrollment_count"],
            ],
            include: [
                {
                    model: FacultyCourse,
                    attributes: ["id_faculty_courses"],
                    include: [
                        {
                            model: Course,
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
