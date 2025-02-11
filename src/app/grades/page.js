"use client";
import { useState, useEffect } from "react";
import {
	Container,
	TextField,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Pagination,
	Button,
} from "@mui/material";
import Swal from "sweetalert2";

export default function EnrollmentList() {
	const [enrollments, setEnrollments] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [gpaValues, setGpaValues] = useState({});
	const [filters, setFilters] = useState({
		student: "",
		email: "",
		course: "",
		faculty: "",
	});

	useEffect(() => {
		fetchEnrollments();
	}, [page, filters]);

	const fetchEnrollments = async () => {
		try {
			const query = new URLSearchParams({
				page,
				limit: 10,
				student: filters.student,
				email: filters.email,
				course: filters.course,
				faculty: filters.faculty,
			}).toString();

			const res = await fetch(`/api/grades?${query}`);
			const data = await res.json();
			setEnrollments(data.enrollments);
			setTotalPages(data.totalPages);

			// Initialize GPA values
			const initialGpaValues = {};
			data.enrollments.forEach((enrollment) => {
				initialGpaValues[enrollment.id_students_enrollment] = enrollment.gpa || "";
			});
			setGpaValues(initialGpaValues);
		} catch (error) {
			console.error("Error fetching enrollments:", error);
		}
	};

	const handleFilterChange = (e) => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
		setPage(1); // Reset to first page when filtering
	};

	const handleGPAChange = (id, value) => {
		setGpaValues({ ...gpaValues, [id]: value });
	};

	const handleUpdateGPA = async (id) => {
		const gpa = parseFloat(gpaValues[id]);
		if (isNaN(gpa) || gpa < 0 || gpa > 4.0) {
			Swal.fire({ icon: "error", title: "Invalid GPA", text: "Enter a value between 0.0 and 4.0." });
			return;
		}

		const res = await fetch(`/api/grades?id=${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ gpa }),
		});

		if (!res.ok) {
			Swal.fire({ icon: "error", title: "Failed to update GPA" });
			return;
		}

		Swal.fire({ icon: "success", title: "GPA updated" });
		fetchEnrollments();
	};

	return (
		<Container>
			<h2>Grade List</h2>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								Student Name
								<TextField
									name="student"
									variant="outlined"
									size="small"
									fullWidth
									value={filters.student}
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
								Course
								<TextField
									name="course"
									variant="outlined"
									size="small"
									fullWidth
									value={filters.course}
									onChange={handleFilterChange}
								/>
							</TableCell>
							<TableCell>
								Faculty
								<TextField
									name="faculty"
									variant="outlined"
									size="small"
									fullWidth
									value={filters.faculty}
									onChange={handleFilterChange}
								/>
							</TableCell>
							<TableCell>GPA</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{enrollments.map((enrollment) => (
							<TableRow key={enrollment.id_students_enrollment}>
								<TableCell>{enrollment.Student?.name}</TableCell>
								<TableCell>{enrollment.Student?.email}</TableCell>
								<TableCell>{enrollment.FacultyCourse?.Course?.name}</TableCell>
								<TableCell>{enrollment.FacultyCourse?.Faculty?.name}</TableCell>
								<TableCell>
									<TextField
										type="number"
										value={gpaValues[enrollment.id_students_enrollment]}
										onChange={(e) =>
											handleGPAChange(enrollment.id_students_enrollment, e.target.value)
										}
										size="small"
									/>
								</TableCell>
								<TableCell>
									<Button
										variant="contained"
										color="primary"
										onClick={() => handleUpdateGPA(enrollment.id_students_enrollment)}
									>
										Update GPA
									</Button>
								</TableCell>
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
