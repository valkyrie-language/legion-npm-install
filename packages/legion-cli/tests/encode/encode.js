import test from "node:test";
import {encodeCommand} from "../../dist/matchEncode.js";


test("wasm component to wat", async () => {
    await encodeCommand('tests/encode/encode_component.wat', undefined, {
        generateDwarf: false
    })
    return true
});