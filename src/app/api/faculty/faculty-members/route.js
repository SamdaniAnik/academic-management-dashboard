import { Faculty } from '../../../models/__associations'; // Assuming you have Faculty model set up
import { NextResponse } from "next/server";


export async function GET() {
	try {
		const facultyMembers = await Faculty.findAll({
			attributes: ["id_faculty", "name"],
		});

		return NextResponse.json({ success: true, facultyMembers });
	} catch (error) {
		console.error("Error fetching faculty members for course assign ", error);
		return NextResponse.json(
			{ success: false, message: "Error fetching faculty" },
			{ status: 500 }
		);
	}
}