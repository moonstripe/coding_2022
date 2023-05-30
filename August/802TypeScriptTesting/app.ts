import {
  FilesystemInterface,
  realFileSystemModule,
} from "./filesystemInterface.ts";

// Pure Function, doesn't touch filesystem/async/etc.

export function numRepeatedWords(inputData: string): number {
  const lines: string[] = inputData.split("\n");
  const words: string[] = lines.flatMap((l) =>
    l.split(" ").filter((w) => w.length > 0)
  );

  const seenWords: Set<string> = new Set();
  const repeatedWords: Set<string> = new Set();

  words.forEach((w) => {
    if (seenWords.has(w)) {
      repeatedWords.add(w);
    }

    seenWords.add(w);
  });

  return repeatedWords.size;
}

export async function run(
  filesystem: FilesystemInterface,
  inputFilename: string,
  outputFilename: string,
) {
  const inputData: string = await filesystem.readFile(inputFilename);

  await filesystem.writeFile(
    outputFilename,
    numRepeatedWords(inputData).toString(),
  );
}
// Touches filesystem/async/etc.

if (import.meta.main) {
  if (Deno.args.length != 2) {
    console.error("Wrong number of arguments.");
    Deno.exit(1);
  }

  const inputFilename: string = Deno.args[0];
  const outputFilename: string = Deno.args[1];

  run(realFileSystemModule, inputFilename, outputFilename);
}
