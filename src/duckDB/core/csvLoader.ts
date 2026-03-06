import { initDuckDB } from "./duckdb";
import * as duckdb from "@duckdb/duckdb-wasm";

export async function csvLoader(file: File): Promise<string> {
  const { connection, db } = await initDuckDB();

  const tableName = file.name
    .replace(".csv", "")
    .replace(/[^a-zA-Z0-9_]/g, "_");

  const buffer = await file.arrayBuffer();
  const decoder = new TextDecoder("windows-1252");
  const text = decoder.decode(buffer);

  const utf8File = new File([text], file.name, { type: "text/csv" });

  await db.registerFileHandle(
    utf8File.name,
    utf8File,
    duckdb.DuckDBDataProtocol.BROWSER_FILEREADER,
    false
  );

  await connection.query(`
    CREATE TABLE ${tableName} AS
    SELECT *
    FROM read_csv_auto('${utf8File.name}', IGNORE_ERRORS=true)
  `);

  return tableName;
}
