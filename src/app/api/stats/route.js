import { Student, Course, Faculty } from "../../models/__associations";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const studentsCount = await Student.count();
        const coursesCount = await Course.count();
        const facultyCount = await Faculty.count();

        return NextResponse.json({ studentsCount, coursesCount, facultyCount });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
