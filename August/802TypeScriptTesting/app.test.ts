import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.150.0/testing/asserts.ts";
import { numRepeatedWords, run } from "./app.ts";
import { FilesystemInterface } from "./filesystemInterface.ts";

Deno.test("fn: numRepeatedWords: returning the correct result", () => {
  assertEquals(numRepeatedWords(""), 0);
  assertEquals(numRepeatedWords("a a"), 1);
  assertEquals(numRepeatedWords("a b"), 0);
  assertEquals(numRepeatedWords("hello bye hello bye"), 2);
  assertEquals(numRepeatedWords("hello bye hello bye test"), 2);
});

Deno.test("fn: FilesystemInterface: making proper reads and writes", async () => {
  let readFileCallCount = 0;
  let writeFileCallCount = 0;

  const fakeFilesystemModule: FilesystemInterface = {
    async readFile(filename) {
      return await new Promise<string>((resolve, reject) => {
        readFileCallCount++;
        assertEquals(filename, "myinputfilename");
        resolve("contents here here");
      });
    },

    async writeFile(filename, contents) {
      return await new Promise<void>((resolve, reject) => {
        writeFileCallCount++;
        assertEquals(filename, "myoutputfilename");
        assertEquals(contents, "1");
        resolve();
      });
    },
  };

  await run(
    fakeFilesystemModule,
    "myinputfilename",
    "myoutputfilename",
  );

  console.log(readFileCallCount, writeFileCallCount);

  assertEquals(readFileCallCount, writeFileCallCount);
  assertEquals(readFileCallCount, 1);
  assertEquals(writeFileCallCount, 1);
});
