# M-Files Graphs

A client-side M-Files UIX application that renders interactive dashboards with
[Apache ECharts](https://echarts.apache.org/) in the **new M-Files Web** client
(and the M-Files Desktop client). Built with TypeScript, bundled with esbuild,
packaged as a `.mfappx` Vault Application.

## Status

Early scaffold. Charts render demo data from `src/data/demoSource.ts`. The real
data source against the M-Files Web Service REST API is stubbed in
`src/data/mfilesSource.ts` and is the next step.

## Stack

- **TypeScript** (strict) → bundled to a single self-contained `main.js`
- **esbuild** for fast IIFE bundling (no npm runtime in the M-Files client)
- **Apache ECharts** 5.x (MIT, rich chart types)
- **archiver** to zip the build output into a `.mfappx` Vault Application package

## Project layout

```
appdef.xml                M-Files Vault Application manifest
src/
  dashboard/
    index.html            Dashboard HTML loaded by the M-Files shell
    main.ts               Entry point - mounts charts
  charts/                 ECharts wrappers (line, bar, pie)
  data/
    types.ts              ChartDataset + DataSource interface
    demoSource.ts         Hard-coded demo data
    mfilesSource.ts       REST API stub (TODO)
  mfiles/
    shellListener.ts      OnNewShellUI bootstrap
scripts/
  build.mjs               esbuild + copy index.html + appdef.xml → dist/
  package.mjs             Zip dist/ → mfilesgraphs.mfappx
```

## Develop

```bash
npm install
npm run typecheck         # tsc --noEmit
npm run build             # produces dist/
npm run dev               # esbuild watch mode
npm run package           # build + zip to mfilesgraphs.mfappx
```

Open `dist/dashboard/index.html` in a browser to preview the dashboard with
demo data, no M-Files shell required.

## Install in M-Files

1. `npm run package` → produces `mfilesgraphs.mfappx`
2. In **M-Files Admin**, select the vault → **Applications** → **Install**
3. Pick `mfilesgraphs.mfappx`
4. Restart the vault
5. Open the vault in the new M-Files Web client; the dashboard registers via
   `appdef.xml`

## Wire a real data source

Replace `demoSource` with `mfilesSource` in `src/dashboard/main.ts` once the
REST calls are implemented. The new M-Files Web client runs same-origin with
the vault, so `fetch('/REST/objects?...')` reuses the existing session cookie.

## Push to the Mfilesgraps repo

This branch lives on `github-slideshow` because of a tooling scope limit. To
move it to the empty target repo locally:

```bash
git remote set-url origin https://github.com/thomasalbertsen-sv/Mfilesgraps.git
git push -u origin claude/mfiles-graph-client-app-JC1Pm:main
```

## License

MIT - see `LICENSE`.
