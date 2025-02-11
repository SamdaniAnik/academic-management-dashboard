"use client";
import { useState, useEffect } from "react";
import { Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Button } from "@mui/material";

export default function StudentsPage() {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Individual column search states
    const [filters, setFilters] = useState({
        id_students: "",
        name: "",
        email: "",
        year: "",
        globalSearch: "" // New global search state
    });

    useEffect(() => {
        fetchStudents();
    }, [page, filters]);

    const fetchStudents = async () => {
        try {
            const query = new URLSearchParams({
                page,
                limit: 10,
                id_students: filters.id_students,
                name: filters.name,
                email: filters.email,
                year: filters.year,
                globalSearch: filters.globalSearch, // Include globalSearch in query
            }).toString();

            const res = await fetch(`/api/students?${query}`);
            const data = await res.json();
            setStudents(data.students);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1); // Reset to first page when filtering
    };

    return (
        <Container>
            <h2>Student List</h2>

            {/* Global Search Field */}
            <TextField
                name="globalSearch"
                variant="outlined"
                size="small"
                label="Global Search"
                value={filters.globalSearch}
                onChange={handleFilterChange}
                sx={{ mb: 2 }}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                                <TextField
                                    name="id_students"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={filters.id_students}
                                    onChange={handleFilterChange}
                                />
                            </TableCell>
                            <TableCell>
                                Name
                                <TextField
                                    name="name"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={filters.name}
                                    onChange={handleFilterChange}
                                />
                            </TableCell>
                            <TableCell>
                                Email
                                <TextField
                                    name="email"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={filters.email}
                                    onChange={handleFilterChange}
                                />
                            </TableCell>
                            <TableCell>
                                Year
                                <TextField
                                    name="year"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={filters.year}
                                    onChange={handleFilterChange}
                                />
                            </TableCell>
                            <TableCell>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.length > 0 ? students.map((student) => (
                            <TableRow key={student.id_students}>
                                <TableCell>{student.id_students}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.year}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" href={`/student-profile/${student.id_students}`}>
                                        Profile
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                            : <TableRow>
                                <TableCell colSpan={5} align="center">No students found</TableCell>
                            </TableRow>}
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
