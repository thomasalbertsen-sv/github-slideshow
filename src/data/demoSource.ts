import type { ChartDataset, DataSource } from "./types.js";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const demoSource: DataSource = {
    async fetchLine(metric: string): Promise<ChartDataset> {
        return {
            title: `Documents created per month (${metric})`,
            categories: months,
            series: [
                { name: "Contracts", values: [12, 18, 25, 31, 22, 28, 35, 41, 38, 45, 52, 48] },
                { name: "Invoices", values: [45, 52, 48, 61, 55, 67, 72, 68, 75, 82, 88, 91] },
            ],
        };
    },

    async fetchBar(metric: string): Promise<ChartDataset> {
        return {
            title: `Objects by class (${metric})`,
            categories: ["Document", "Contract", "Invoice", "Project", "Customer", "Employee"],
            series: [{ name: "Count", values: [1240, 380, 920, 156, 412, 88] }],
        };
    },

    async fetchPie(metric: string): Promise<ChartDataset> {
        return {
            title: `Workflow state distribution (${metric})`,
            categories: ["Draft", "In Review", "Approved", "Rejected", "Archived"],
            series: [{ name: "Documents", values: [124, 67, 312, 28, 489] }],
        };
    },
};
