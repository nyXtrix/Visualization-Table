import { initDuckDB } from "./duckdb";
import * as duckdb from "@duckdb/duckdb-wasm";
import { generateInferredSelectClause } from "../utils/csvInference";

export async function csvLoader(file: File): Promise<string> {
  const { connection, db } = await initDuckDB()

  const tableName = file.name
    .replace(".csv", "")
    .replace(/[^a-zA-Z0-9_]/g, "_")

  const buffer = await file.arrayBuffer()

  const decoder = new TextDecoder("utf-8")
  const text = decoder.decode(buffer)

  const utf8File = new File([text], file.name, { type: "text/csv" })

  await db.registerFileHandle(
    utf8File.name,
    utf8File,
    duckdb.DuckDBDataProtocol.BROWSER_FILEREADER,
    false
  );

  const selectClause = await generateInferredSelectClause(connection, utf8File.name);
  
  if (selectClause === "*") {
    await connection.query(`CREATE TABLE "${tableName}" AS SELECT * FROM read_csv_auto('${utf8File.name}')`);
    return tableName;
  }

  await connection.query(`
    CREATE TABLE "${tableName}" AS
    SELECT 
      ${selectClause}
    FROM read_csv_auto(
      '${utf8File.name}',
      header=true,
      all_varchar=true
    )
  `);

  return tableName
}
