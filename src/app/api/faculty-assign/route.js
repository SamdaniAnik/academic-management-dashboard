import { NextResponse } from "next/server";
import { FacultyCourse, Faculty, Course } from "../../models/__associations";

// ✅ GET: Fetch all assigned faculties with course names
export async function GET() {
    try {
        const assignments = await FacultyCourse.findAll({
            include: [
                { model: Faculty, attributes: ["name"] },
                { model: Course, as: "Course", attributes: ["name"] },
            ],
        });

        const formattedAssignments = assignments.map((item) => ({
            id_faculty_courses: item.id_faculty_courses,
            faculty_name: item.Faculty.name,
            course_name: item.Course.name,
        }));

        return NextResponse.json({ success: true, assignments: formattedAssignments });
    } catch (error) {
        console.error("Error fetching assignments:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { id_faculty, id_courses } = await req.json();

        // Check if assignment already exists
        const existingAssignment = await FacultyCourse.findOne({ where: { id_faculty, id_courses } });

        if (existingAssignment) {
            return NextResponse.json({ error: "Faculty already assigned to this course" }, { status: 400 });
        }

        const newAssignment = await FacultyCourse.create({ id_faculty, id_courses });

        return NextResponse.json(newAssignment, { status: 201 });
    } catch (error) {
        console.error("Error assigning faculty:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ DELETE: Remove a faculty-course assignment
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        await FacultyCourse.destroy({ where: { id_faculty_courses: id } });

        return NextResponse.json({ message: "Assignment removed" });
    } catch (error) {
        console.error("Error deleting assignment:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
