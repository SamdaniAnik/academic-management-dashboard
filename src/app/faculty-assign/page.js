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

export default function FacultyAssign() {
    const [faculties, setFaculties] = useState([]);
    const [courses, setCourses] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");

    useEffect(() => {
        fetchData();
        fetchAssignments();
    }, []);

    const fetchData = async () => {
        try {
            const [facultyRes, courseRes] = await Promise.all([
                fetch("/api/faculty/assign"),
                fetch("/api/courses/assign"),
            ]);

            const facultyData = await facultyRes.json();
            const courseData = await courseRes.json();

            if (facultyData.success) setFaculties(facultyData.faculties);
            if (courseData.success) setCourses(courseData.courses);
        } catch (error) {
            console.error("Error fetching faculty or courses:", error);
        }
    };

    const fetchAssignments = async () => {
        try {
            const res = await fetch("/api/faculty-assign");
            const data = await res.json();
            if (data.success) setAssignments(data.assignments);
        } catch (error) {
            console.error("Error fetching assignments:", error);
        }
    };

    const handleAssignFaculty = async () => {
        if (!selectedFaculty || !selectedCourse) return alert("Select both faculty and course");

        const res = await fetch("/api/faculty-assign", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_faculty: selectedFaculty.id_faculty, id_courses: selectedCourse.id_courses }),
        });

        if (res.ok) {
            fetchAssignments();
            setSelectedCourse("");
            Swal.fire("Success", "Faculty assigned successfully", "success");
        } else {
            const errorData = await res.json();
            Swal.fire("Error", errorData.error, "error");
        }
    };

    const handleRemoveAssignment = async (id) => {
        const res = await fetch(`/api/faculty-assign?id=${id}`, { method: "DELETE" });

        if (res.ok) {
            fetchAssignments();
            Swal.fire("Success", "Assignment removed successfully", "success");
        } else {
            const errorData = await res.json();
            Swal.fire("Error", errorData.error, "error");
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Assign Faculty to Course</Typography>

            <Autocomplete
                value={selectedFaculty}
                onChange={(event, newValue) => setSelectedFaculty(newValue)}
                options={faculties}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id_faculty === value.id_faculty}
                renderInput={(params) => <TextField {...params} label="Select Faculty" />}
                fullWidth
                disableClearable
                sx={{ marginBottom: 2 }}
            />

            <Autocomplete
                value={selectedCourse}
                onChange={(event, newValue) => setSelectedCourse(newValue)}
                options={courses}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id_courses === value.id_courses}
                renderInput={(params) => <TextField {...params} label="Select Course" />}
                fullWidth
                disabled={!selectedFaculty}
                sx={{ marginBottom: 2 }}
            />
            <Button onClick={handleAssignFaculty} variant="contained" sx={{ marginLeft: 2 }}>Assign</Button>

            <Typography variant="h5" sx={{ marginTop: 4 }}>Assigned Faculty</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Faculty</TableCell>
                        <TableCell>Course</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assignments.length > 0 ? assignments.map((assign) => (
                        <TableRow key={assign.id_faculty_courses}>
                            <TableCell>{assign.faculty_name}</TableCell>
                            <TableCell>{assign.course_name}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleRemoveAssignment(assign.id_faculty_courses)} color="error">
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                        : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">No Faculty Assigned</TableCell>
                            </TableRow>
                        )}
                </TableBody>
            </Table>
        </Container>
    );
}
