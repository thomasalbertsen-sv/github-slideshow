import archiver from "archiver";
import { createWriteStream, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const dist = resolve(root, "dist");
const outFile = resolve(root, "mfilesgraphs.mfappx");

if (!existsSync(dist)) {
    throw new Error("dist/ does not exist - run `npm run build` first");
}

const output = createWriteStream(outFile);
const archive = archiver("zip", { zlib: { level: 9 } });

const done = new Promise((resolveDone, rejectDone) => {
    output.on("close", () => {
        console.log(`Packaged ${archive.pointer()} bytes -> ${outFile}`);
        resolveDone();
    });
    archive.on("warning", (err) => {
        if (err.code === "ENOENT") console.warn(err);
        else rejectDone(err);
    });
    archive.on("error", rejectDone);
});

archive.pipe(output);
archive.directory(dist, false);
await archive.finalize();
await done;
