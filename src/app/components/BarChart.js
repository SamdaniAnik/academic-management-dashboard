"use client";

import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

export default function BarChart({ data, categories }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = new ApexCharts(chartRef.current, {
            chart: { type: "bar" },
            xaxis: { categories },
            series: [{ name: "Enrollments", data }],
        });
        chart.render();
        return () => chart.destroy();
    }, [data, categories]);

    return <div ref={chartRef} />;
}