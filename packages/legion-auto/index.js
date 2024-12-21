#!/usr/bin/env node

import {execFileSync} from "node:child_process";
import {platform, arch} from "node:process";

const prebuiltPlatform = {
    "win32-x64": "@valkyrie-language/legion-win32-x64",
    "darwin-arm64": "@valkyrie-language/legion-darwin-arm64",
    "darwin-x64": "@valkyrie-language/legion-darwin-x64",
    "linux-arm64": "@valkyrie-language/legion-linux-arm64",
    // "linux-s390x": "@valkyrie-language/legion-linux-s390x",
    "linux-x64": "@valkyrie-language/legion-linux-x64",
};

export function adaptPlatform () {
    let platformKey = `${platform}-${arch}`;
    if (platformKey in prebuiltPlatform) {
        return prebuiltPlatform[platformKey];
    }
    throw new Error("`legion` does not yet support platform " + platformKey);
}

export async function runLegion (args) {
    const pkg = await import(adaptPlatform());
    const cfg = {
        stdio: 'inherit',
        encoding: 'utf-8',
    }
    return execFileSync(pkg.location, args, cfg);
}

