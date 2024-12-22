import test from "node:test";
import {decodeCommand} from "../../dist/matchDecode.js";


test("wat component to wasm", async () => {
    await decodeCommand('tests/decode/decode_component.wasm', undefined, {})
    return true
});

test("wat component to wasm (fold instructions)", async () => {
    await decodeCommand('tests/decode/decode_component.wasm', 'tests/decode/decode_component_fold.wat', {
        foldInstructions: true
    })
    return true
});
test("wat component to wasm (skeleton only)", async () => {
    await decodeCommand('tests/decode/decode_component.wasm', 'tests/decode/decode_component_skeleton.wat', {
        skeletonOnly: true
    })
    return true
});
test("wat component to wasm (name unnamed)", async () => {
    await decodeCommand('tests/decode/decode_component.wasm', 'tests/decode/decode_component_named.wat', {
        nameUnnamed: true
    })
    return true
});
