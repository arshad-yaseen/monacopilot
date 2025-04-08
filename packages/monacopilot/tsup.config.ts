import { type Options, defineConfig } from "tsup";

const COMMON_CONFIG: Options = {
    outDir: "build",
    entry: ["src/index.ts"],
    target: "es2021",
    minify: true,
    clean: true,
    dts: true,
    treeshake: true,
};

export default defineConfig([
    {
        ...COMMON_CONFIG,
        name: "monacopilot",
        platform: "node",
        format: ["esm", "cjs"],
    },
    {
        ...COMMON_CONFIG,
        name: "monacopilot-browser",
        globalName: "monacopilot",
        platform: "browser",
        format: ["iife"],
    },
]);
