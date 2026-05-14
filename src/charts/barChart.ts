import * as echarts from "echarts";
import type { ChartDataset } from "../data/types.js";

export function renderBarChart(container: HTMLElement, data: ChartDataset): echarts.ECharts {
    const chart = echarts.init(container);
    chart.setOption({
        title: { text: data.title, left: "center", textStyle: { fontSize: 14 } },
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        legend: { bottom: 0, data: data.series.map((s) => s.name) },
        grid: { left: 50, right: 20, top: 50, bottom: 40 },
        xAxis: { type: "category", data: data.categories },
        yAxis: { type: "value" },
        series: data.series.map((s) => ({ name: s.name, type: "bar", data: s.values })),
    });
    return chart;
}
