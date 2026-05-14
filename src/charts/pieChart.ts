import * as echarts from "echarts";
import type { ChartDataset } from "../data/types.js";

export function renderPieChart(container: HTMLElement, data: ChartDataset): echarts.ECharts {
    const chart = echarts.init(container);
    const series = data.series[0];
    const pieData = data.categories.map((cat, i) => ({ name: cat, value: series?.values[i] ?? 0 }));
    chart.setOption({
        title: { text: data.title, left: "center", textStyle: { fontSize: 14 } },
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        legend: { bottom: 0 },
        series: [
            {
                name: series?.name ?? "",
                type: "pie",
                radius: ["35%", "65%"],
                center: ["50%", "50%"],
                data: pieData,
                label: { show: true, formatter: "{b}\n{d}%" },
            },
        ],
    });
    return chart;
}
