import { renderLineChart } from "../charts/lineChart.js";
import { renderBarChart } from "../charts/barChart.js";
import { renderPieChart } from "../charts/pieChart.js";
import { demoSource } from "../data/demoSource.js";
import type { DataSource } from "../data/types.js";
import { registerShell } from "../mfiles/shellListener.js";

const source: DataSource = demoSource;

async function mount(): Promise<void> {
    const lineEl = document.getElementById("chart-line");
    const barEl = document.getElementById("chart-bar");
    const pieEl = document.getElementById("chart-pie");
    if (!lineEl || !barEl || !pieEl) {
        throw new Error("Dashboard containers missing");
    }

    const [lineData, barData, pieData] = await Promise.all([
        source.fetchLine("documents"),
        source.fetchBar("classes"),
        source.fetchPie("workflow"),
    ]);

    const charts = [
        renderLineChart(lineEl, lineData),
        renderBarChart(barEl, barData),
        renderPieChart(pieEl, pieData),
    ];

    window.addEventListener("resize", () => charts.forEach((c) => c.resize()));
}

registerShell();

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => void mount());
} else {
    void mount();
}
