import type { ChartDataset, DataSource } from "./types.js";

// TODO: Implement against the M-Files Web Service REST API.
// Endpoints of interest:
//   GET /REST/objects                         - list objects with filters
//   GET /REST/structure/classes               - object classes
//   GET /REST/structure/workflows             - workflow definitions
//   GET /REST/reports/...                     - reports (if available)
//
// Auth: in the new M-Files Web client the shell provides an authenticated
// vault context. From a UIX dashboard we typically reuse the existing
// session cookie - fetch() against /REST/* on the same origin works.

const notImplemented = (fn: string): never => {
    throw new Error(`mfilesSource.${fn}: not implemented yet - wire to /REST/ endpoints`);
};

export const mfilesSource: DataSource = {
    async fetchLine(_metric: string): Promise<ChartDataset> {
        return notImplemented("fetchLine");
    },
    async fetchBar(_metric: string): Promise<ChartDataset> {
        return notImplemented("fetchBar");
    },
    async fetchPie(_metric: string): Promise<ChartDataset> {
        return notImplemented("fetchPie");
    },
};
