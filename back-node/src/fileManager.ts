import type { BunFile } from "bun";
import { join } from "path";

export type FileData<T> = {
  data: T[];
};

export class FileManager<T = any> {
  private file: BunFile;

  data: T[] = [];
  constructor(_fileName: string) {
    const filePath = join(__dirname, "..", "public", `${_fileName}`);
    this.file = Bun.file(filePath);

    this.file.exists().then((exists) => {
      if (!exists) {
        Bun.write(this.file, JSON.stringify({ data: [] }));
      }
    });
  }

  public async load() {
    const fileData = await this.file.json();
    return fileData as Promise<FileData<T>>;
  }

  public save(data: FileData<T>) {
    Bun.write(this.file, JSON.stringify(data, null, 2));
  }
}
