import { Card, CardContent, Typography, Box, Alert } from "@mui/material";
import BarChart from "./components/DynamicBarChart";

export const dynamic = "force-dynamic";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function fetchJson(path) {
    try {
        const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
        if (!res.ok) {
            throw new Error(`${path} responded with status ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`Failed to fetch ${path}:`, error);
        return null;
    }
}

export default async function Dashboard() {
    const [stats, topStudents, popularCourses] = await Promise.all([
        fetchJson("/api/stats"),
        fetchJson("/api/top-students"),
        fetchJson("/api/popular-courses"),
    ]);

    const allFailed = stats === null && topStudents === null && popularCourses === null;

    return (
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={3} p={3}>
            {allFailed && (
                <Box gridColumn="1 / -1">
                    <Alert severity="error">
                        Failed to load dashboard data. Please verify the API is reachable and that{" "}
                        <code>NEXT_PUBLIC_API_URL</code> is configured correctly.
                    </Alert>
                </Box>
            )}

            {/* Summary Cards */}
            <Card>
                <CardContent>
                    <Typography variant="h5">Students: {stats?.studentsCount ?? "-"}</Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant="h5">Courses: {stats?.coursesCount ?? "-"}</Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant="h5">Faculty: {stats?.facultyCount ?? "-"}</Typography>
                </CardContent>
            </Card>

            {/* Top Students Table */}
            {topStudents && topStudents.length > 0 && (
                <Box display="flex" flexDirection="column" gridColumn="span 1">
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Top Students</Typography>
                            <ul>
                                {topStudents.map((student) => (
                                    <li key={student.id_students}>
                                        {student.name} - CGPA: {student.cgpa}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </Box>
            )}

            {/* Bar Chart: Most Popular Courses */}
            {popularCourses && popularCourses.length > 0 && (
                <Box display="flex" flexDirection="column" gridColumn="span 1">
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Most Popular Courses</Typography>
                            <BarChart
                                data={popularCourses.map((c) => c.total_enrollment)}
                                categories={popularCourses.map((c) => c.Course.name)}
                            />
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Box>
    );
}