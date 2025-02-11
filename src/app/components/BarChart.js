// app/components/BarChart.js
"use client"; // This is important for client-side components in Next.js

import ApexCharts from "apexcharts";

export default function BarChart({ data, categories }) {
    return (
        <ApexCharts
            type="bar"
            series={[{ name: "Enrollments", data }]}
            options={{ xaxis: { categories } }}
            height={300}
        />
    );
}
