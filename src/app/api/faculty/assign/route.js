import { Faculty } from "../../../models/__associations";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch faculties with only required fields (id & name)
        const faculties = await Faculty.findAll({
            attributes: ["id_faculty", "name"], // Fetch only necessary fields
        });

        return NextResponse.json({ success: true, faculties });
    } catch (error) {
        console.error("Error fetching faculty for assignment:", error);
        return NextResponse.json(
            { success: false, message: "Error fetching faculty" },
            { status: 500 }
        );
    }
}
