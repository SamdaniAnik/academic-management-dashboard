import { FacultyCourse, Course } from '../../models/__associations';
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const popularCourses = await FacultyCourse.findAll({
            attributes: ["id_courses", "total_enrollment"],
            order: [["total_enrollment", "DESC"]],
            limit: 5,
            include: [{ model: Course, as: 'Course', attributes: ["name"] }],
        });

        return NextResponse.json(popularCourses);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch popular courses" }, { status: 500 });
    }
}
