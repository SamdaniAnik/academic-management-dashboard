"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Card, CardContent, Typography, List, ListItem, ListItemText, LinearProgress } from "@mui/material";

const StudentProfile = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!studentId) return;

        const fetchStudentData = async () => {
            try {
                const res = await fetch(`/api/students/details?studentId=${studentId}`);
                const data = await res.json();
                if (data.success) {
                    setStudent(data.student);
                }
            } catch (error) {
                console.error("Failed to fetch student data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [studentId]);

    if (loading) return <Typography>Loading...</Typography>;
    if (!student) return <Typography>No student data found.</Typography>;

    // ✅ Calculate Course Completion Percentage
    const totalCourses = student.StudentEnrollments.length;
    const completedCourses = student.StudentEnrollments.filter(enrollment => enrollment.gpa !== null).length;
    const completionPercentage = totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;

    // ✅ Calculate CGPA (ignoring null GPAs)
    const totalGPA = student.StudentEnrollments.reduce((sum, enrollment) => {
        const gpa = enrollment.gpa !== null ? Number(enrollment.gpa) : 0;
        return sum + gpa;
    }, 0);
    const cgpa = completedCourses > 0 && totalGPA > 0 ? (totalGPA / completedCourses).toFixed(2) : "N/A";

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {student.name}
                    </Typography>
                    <Typography variant="body1">Email: {student.email}</Typography>
                    <Typography variant="body1">Year: {student.year}</Typography>

                    {/* ✅ Dynamic CGPA Calculation */}
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        CGPA: {cgpa}
                    </Typography>

                    {/* ✅ Progress Bar for Course Completion */}
                    <Typography variant="h6" sx={{ mt: 3 }}>
                        Course Completion: {completionPercentage.toFixed(0)}%
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={completionPercentage}
                        sx={{ height: 10, borderRadius: 5, mt: 1 }}
                    />

                    <Typography variant="h5" sx={{ mt: 3 }}>
                        Enrolled Courses
                    </Typography>
                    <List>
                        {student.StudentEnrollments.map((enrollment) => (
                            <ListItem key={enrollment.id_students_enrollment}>
                                <ListItemText
                                    primary={enrollment.FacultyCourse.Course.name}
                                    secondary={`Faculty: ${enrollment.FacultyCourse.Faculty.name} | GPA: ${enrollment.gpa ?? "Pending"}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Container>
    );
};

export default StudentProfile;
