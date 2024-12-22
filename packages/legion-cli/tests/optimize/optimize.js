import test from "node:test";
import {encodeCommand} from "../../dist/matchEncode.js";
import binaryen from "binaryen";
import fs from "node:fs/promises";
import {watEncode} from "@valkyrie-language/legion-wasm32-wasi";

test("wasm component to wat", async () => {
    try {
        let inputText = await fs.readFile('tests/encode/encode_component.wat', {encoding: 'utf8'});
        let bytes = watEncode(inputText, {
            generateDwarf: false
        })
        const module = binaryen.readBinary(bytes)
        binaryen.setOptimizeLevel(4)
        module.optimize()
    } catch (e) {
        console.error(e)
    }
});