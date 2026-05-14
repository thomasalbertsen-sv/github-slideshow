export interface ChartDataset {
    title: string;
    categories: string[];
    series: { name: string; values: number[] }[];
}

export interface DataSource {
    fetchLine(metric: string): Promise<ChartDataset>;
    fetchBar(metric: string): Promise<ChartDataset>;
    fetchPie(metric: string): Promise<ChartDataset>;
}
