"use client"; // This is important for client-side components in Next.js

import ReactApexChart from "react-apexcharts"; // Correct import for React wrapper

export default function BarChart({ data, categories }) {
    const options = {
        chart: {
            type: "bar", // Define the chart type here
        },
        xaxis: {
            categories, // Set categories dynamically
        },
    };

    const series = [
        {
            name: "Enrollments",
            data, // Pass the data to the series
        },
    ];

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="bar" // Ensure type is passed correctly as a string
            height={300}
        />
    );
}
