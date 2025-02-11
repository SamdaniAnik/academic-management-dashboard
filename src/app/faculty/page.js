"use client";
import { useState, useEffect } from "react";
import { Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from "@mui/material";

export default function FacultyPage() {
    const [faculty, setFaculty] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Filters for searching
    const [filters, setFilters] = useState({
        id_faculty: "",
        name: "",
        email: "",
    });

    useEffect(() => {
        fetchFaculty();
    }, [page, filters]);

    const fetchFaculty = async () => {
        try {
            const query = new URLSearchParams({
                page,
                limit: 10,
                id_faculty: filters.id_faculty,
                name: filters.name,
                email: filters.email,
            }).toString();

            const res = await fetch(`/api/faculty?${query}`);
            const data = await res.json();
            setFaculty(data.faculty);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching faculty:", error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1); // Reset to first page when filtering
    };

    return (
        <Container>
            <h2>Faculty List</h2>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                                <TextField
                                    name="id_faculty"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={filters.id_faculty}
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {faculty.map((member) => (
                            <TableRow key={member.id_faculty}>
                                <TableCell>{member.id_faculty}</TableCell>
                                <TableCell>{member.name}</TableCell>
                                <TableCell>{member.email}</TableCell>
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
