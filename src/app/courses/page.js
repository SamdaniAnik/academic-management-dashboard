"use client";
import { useState, useEffect } from "react";
import { Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from "@mui/material";

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        id_courses: "",
        name: "",
    });

    useEffect(() => {
        fetchCourses();
    }, [page, filters]);

    const fetchCourses = async () => {
        try {
            const query = new URLSearchParams({
                page,
                limit: 10,
                id_courses: filters.id_courses,
                name: filters.name,
            }).toString();

            const res = await fetch(`/api/courses?${query}`);
            const data = await res.json();
            setCourses(data.courses);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1); // Reset to first page when filtering
    };

    return (
        <Container>
            <h2>Courses List</h2>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                                <TextField
                                    name="id_courses"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={filters.id_courses}
                                    onChange={handleFilterChange}
                                />
                            </TableCell>
                            <TableCell>
                                Course Name
                                <TextField
                                    name="name"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={filters.name}
                                    onChange={handleFilterChange}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.id_courses}>
                                <TableCell>{course.id_courses}</TableCell>
                                <TableCell>{course.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination
                count={totalPages}
                page={page}
                onChange={(event, value) => setPage(value)}
                sx={{ mt: 2, display: "flex", justifyContent: "center" }}
            />
        </Container>
    );
}
