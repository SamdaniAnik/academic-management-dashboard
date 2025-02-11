import { FacultyCourse, Course } from '../../../models/__associations'; // Assuming you have Faculty model set up
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const facultyId = searchParams.get('facultyId');
        const facultyCourses = await FacultyCourse.findAll({
            where: { id_faculty: facultyId },
            include: [
                { model: Course, as: "Course", attributes: ["name"], required: false },
            ],
        });

        return NextResponse.json({ success: true, facultyCourses });
    } catch (error) {
        console.error("Error fetching faculty courses for course assign ", error);
        return NextResponse.json(
            { success: false, message: "Error fetching faculty courses" },
            { status: 500 }
        );
    }
}