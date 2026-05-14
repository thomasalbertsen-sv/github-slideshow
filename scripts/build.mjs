import * as esbuild from "esbuild";
import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const dist = resolve(root, "dist");
const watch = process.argv.includes("--watch");

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, "dashboard"), { recursive: true });

await cp(resolve(root, "src/dashboard/index.html"), resolve(dist, "dashboard/index.html"));
await cp(resolve(root, "appdef.xml"), resolve(dist, "appdef.xml"));

const buildOptions = {
    entryPoints: [resolve(root, "src/dashboard/main.ts")],
    outfile: resolve(dist, "dashboard/main.js"),
    bundle: true,
    minify: !watch,
    sourcemap: watch ? "inline" : false,
    target: ["es2020"],
    format: "iife",
    logLevel: "info",
};

if (watch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log("esbuild: watching for changes...");
} else {
    await esbuild.build(buildOptions);
    if (!existsSync(resolve(dist, "dashboard/main.js"))) {
        throw new Error("Build failed: main.js not produced");
    }
    console.log("Build complete -> dist/");
}
