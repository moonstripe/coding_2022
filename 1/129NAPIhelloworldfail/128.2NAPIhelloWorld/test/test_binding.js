const 1282napihelloworld = require("../dist/binding.js");
const assert = require("assert");

assert(1282napihelloworld, "The expected function is undefined");

function testBasic()
{
    const result =  1282napihelloworld("hello");
    assert.strictEqual(result, "world", "Unexpected value returned");
}

assert.doesNotThrow(testBasic, undefined, "testBasic threw an expection");

console.log("Tests passed- everything looks OK!");