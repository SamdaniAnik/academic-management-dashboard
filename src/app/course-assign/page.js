"use client";

import { useEffect, useState } from "react";
import {
    Container,
    Typography,
    MenuItem,
    Select,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Autocomplete,
    TextField,
} from "@mui/material";
import Swal from "sweetalert2";

export default function CourseAssign() {
    const [faculties, setFaculties] = useState([]);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");
    const [alreadyEnrolled, setAlreadyEnrolled] = useState([]);

    useEffect(() => {
        fetchfacultyMembers();
        fetchStudents();
        fetchAlreadyEnrolled();
    }, []);

    useEffect(() => {
        if (selectedFaculty)
            fetchCourses(selectedFaculty);
    }, [selectedFaculty]);

    const fetchfacultyMembers = async () => {
        try {
            const res = await fetch("/api/faculty/faculty-members");
            const data = await res.json();
            if (data.success) setFaculties(data.facultyMembers);
        } catch (error) {
            console.error("Error fetching faculty or courses:", error);
        }
    };

    const fetchStudents = async () => {
        try {
            const res = await fetch("/api/students/assign");
            const data = await res.json();
            if (data.success) setStudents(data.students);
        } catch (error) {
            console.error("Error fetching faculty or courses:", error);
        }
    }

    const fetchAlreadyEnrolled = async () => {
        try {
            const res = await fetch("/api/course-assign");
            const data = await res.json();
            if (data.success) setAlreadyEnrolled(data.enrollment);
        } catch (error) {
            console.error("Error fetching assignments:", error);
        }
    };


    const fetchCourses = async (selectedFaculty) => {
        try {
            const res = await fetch("/api/faculty/courses?facultyId=" + selectedFaculty.id_faculty);
            const data = await res.json();
            if (data.success) setCourses(data.facultyCourses);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }

    };


    const handleAssignCourse = async () => {
        if (!selectedFaculty || !selectedCourse || !selectedStudent) return alert("Select both faculty, student and course");

        const res = await fetch("/api/course-assign", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_faculty_courses: selectedCourse.id_faculty_courses, id_students: selectedStudent.id_students }),
        });

        if (res.ok) {
            fetchAlreadyEnrolled();
            setSelectedCourse("");
            setSelectedFaculty("");
            setSelectedStudent("");
            Swal.fire("Success", "Course assigned to student successfully", "success");
        } else {
            const errorData = await res.json();
            Swal.fire("Error", errorData.error, "error");
        }
    };

    const handleRemoveEnrollment = async (id) => {
        const res = await fetch(`/api/course-assign?id=${id}`, { method: "DELETE" });

        if (res.ok) {
            fetchAlreadyEnrolled();
            Swal.fire("Success", "Enrollment removed successfully", "success");
        } else {
            const errorData = await res.json();
            Swal.fire("Error", errorData.error, "error");
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Assign Course to Student</Typography>

            <Autocomplete
                value={selectedFaculty}
                onChange={(_, newValue) => setSelectedFaculty(newValue)}
                options={faculties}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id_faculty === value.id_faculty}
                renderInput={(params) => <TextField {...params} label="Select Faculty" />}
                fullWidth
                disableClearable
                sx={{ marginBottom: 2 }}
            />
            <Autocomplete
                value={selectedStudent}
                onChange={(_, newValue) => setSelectedStudent(newValue)}
                options={students}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id_students === value.id_students}
                renderInput={(params) => <TextField {...params} label="Select Student" />}
                fullWidth
                sx={{ marginBottom: 2 }}
            />

            <Autocomplete value={selectedCourse}
                onChange={(_, newValue) => setSelectedCourse(newValue)}
                options={courses}
                getOptionLabel={(option) => option?.Course?.name || ""}
                isOptionEqualToValue={(option, value) => option.id_faculty_courses === value.id_faculty_courses}
                renderInput={(params) => <TextField {...params} label="Select Course" />}
                fullWidth
                disabled={!selectedFaculty}
                sx={{ marginBottom: 2 }}
            />

            <Button onClick={handleAssignCourse} variant="contained" sx={{ marginLeft: 2 }}>Assign</Button>

            <Typography variant="h5" sx={{ marginTop: 4 }}>Assigned Students</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Student</TableCell>
                        <TableCell>Course</TableCell>
                        <TableCell>Faculty</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {alreadyEnrolled.length > 0 ? alreadyEnrolled.map((assign) => (
                        <TableRow key={assign.id_students_enrollment}>
                            <TableCell>{assign.student_name}</TableCell>
                            <TableCell>{assign.course_name}</TableCell>
                            <TableCell>{assign.faculty_name}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleRemoveEnrollment(assign.id_students_enrollment)} color="error">
                                    Remove
                                </Button>
                            </TableCell>

                        </TableRow>
                    ))
                        :
                        <TableRow>
                            <TableCell colSpan={4}>No students enrolled</TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </Container>
    );
}
