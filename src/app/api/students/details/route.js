import { NextResponse } from "next/server";
import { Student, StudentEnrollment, FacultyCourse, Faculty, Course } from "../../../models/__associations";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const studentId = searchParams.get('studentId');

        const student = await Student.findOne({
            where: { id_students: studentId },
            include: [
                {
                    model: StudentEnrollment,
                    include: [
                        {
                            model: FacultyCourse,
                            include: [
                                { model: Faculty, attributes: ["name"] },
                                { model: Course, as: "Course", attributes: ["name"] }
                            ]
                        }
                    ]
                }
            ]
        });

        return NextResponse.json({
            success: true,
            student
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
