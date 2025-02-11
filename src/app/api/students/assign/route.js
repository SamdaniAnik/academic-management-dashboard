import { Student } from "../../../models/__associations";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const students = await Student.findAll({
            attributes: ["id_students", "name"], // Fetch only necessary fields
        });

        return NextResponse.json({ success: true, students });
    } catch (error) {
        console.error("Error fetching students for course assignment:", error);
        return NextResponse.json(
            { success: false, message: "Error fetching students" },
            { status: 500 }
        );
    }
}
