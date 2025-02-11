import { Card, CardContent, Typography, Box } from "@mui/material";
import BarChart from "../app/components/BarChart";


// Fetch API data on the server
async function getStats() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats`, { cache: "no-store" });
	return res.json();
}

async function getTopStudents() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/top-students`, { cache: "no-store" });
	return res.json();
}

async function getPopularCourses() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/popular-courses`, { cache: "no-store" });
	return res.json();
}

export default async function Dashboard() {
	const stats = await getStats();
	const topStudents = await getTopStudents();
	const popularCourses = await getPopularCourses();

	return (
		<Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={3} p={3}>
			{/* Summary Cards */}
			<Card><CardContent><Typography variant="h5">Students: {stats.studentsCount}</Typography></CardContent></Card>
			<Card><CardContent><Typography variant="h5">Courses: {stats.coursesCount}</Typography></CardContent></Card>
			<Card><CardContent><Typography variant="h5">Faculty: {stats.facultyCount}</Typography></CardContent></Card>

			{/* Top Students Table */}
			<Box display="flex" flexDirection="column" gridColumn="span 1">
				<Card>
					<CardContent>
						<Typography variant="h6">Top Students</Typography>
						<ul>
							{topStudents.map((student) => (
								<li key={student.id_students}>{student.name} - CGPA: {student.cgpa}</li>
							))}
						</ul>
					</CardContent>
				</Card>
			</Box>

			{/* Bar Chart: Course Enrollment */}
			{/* <Box display="flex" flexDirection="column" gridColumn="span 1">
				<Card>
					<CardContent>
						<Typography variant="h6">Most Popular Courses</Typography>
						<BarChart
							data={popularCourses.map((c) => c.total_enrollment)}
							categories={popularCourses.map((c) => c.Course.name)}
						/>
					</CardContent>
				</Card>
			</Box> */}
		</Box>
	);
}
