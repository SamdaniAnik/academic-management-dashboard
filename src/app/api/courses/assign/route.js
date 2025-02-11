import { Course } from "../../../models/__associations";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const courses = await Course.findAll({
            attributes: ["id_courses", "name"], // Fetch only id and name
        });

        return NextResponse.json({ success: true, courses });
    } catch (error) {
        console.error("Error fetching courses for assignment:", error);
        return NextResponse.json({ success: false, message: "Error fetching courses" }, { status: 500 });
    }
}
