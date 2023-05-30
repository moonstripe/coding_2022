export interface FilesystemInterface {
    readFile(filename: string): Promise<string>;
    writeFile(filename: string, contents: string): Promise<void>;
}

export const realFileSystemModule: FilesystemInterface = {
    async readFile(filename) {
        return await Deno.readTextFile(filename)
    },
    async writeFile(filename, contents){
        return await Deno.writeTextFile(filename, contents)
    }
}