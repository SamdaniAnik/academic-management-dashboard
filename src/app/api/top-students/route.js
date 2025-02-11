import { Student, StudentEnrollment } from "../../models/__associations";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const students = await Student.findAll({
            attributes: ["id_students", "name"],
            include: [
                {
                    model: StudentEnrollment,
                    attributes: ["gpa"], // Fetch only GPA for each enrollment
                    required: true,
                }
            ]
        });

        // Calculate CGPA for each student
        const topStudents = students.map(student => {
            // Filter out null GPAs and calculate the average
            const gpas = student.StudentEnrollments
                .map(enrollment => parseFloat(enrollment.gpa))
                .filter(gpa => !isNaN(gpa)); // Filter out any null or NaN GPAs

            // Calculate CGPA (average of GPAs)
            const cgpa = gpas.length > 0 ? (gpas.reduce((sum, gpa) => sum + gpa, 0) / gpas.length).toFixed(2) : null;

            return {
                id_students: student.id_students,
                name: student.name,
                cgpa: cgpa,
            };
        });

        // Sort by CGPA descending
        topStudents.sort((a, b) => (b.cgpa || 0) - (a.cgpa || 0));

        // Limit to top 5 students
        return NextResponse.json(topStudents.slice(0, 5));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch top students" }, { status: 500 });
    }
}
