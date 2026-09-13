"use client";

import dynamic from "next/dynamic";

// apexcharts reads `window` at module load, so the chart must be excluded
// from server-side rendering. Loading it dynamically with ssr: false keeps
// the dashboard page renderable on the server.
const BarChart = dynamic(() => import("./BarChart"), { ssr: false });

export default function DynamicBarChart(props) {
    return <BarChart {...props} />;
}