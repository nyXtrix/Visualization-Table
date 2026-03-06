import { DUCKDB_BUNDLES } from "@/constant/utils";
import * as duckdb from "@duckdb/duckdb-wasm"



let db: duckdb.AsyncDuckDB | null = null
let connection: duckdb.AsyncDuckDBConnection | null = null

export async function initDuckDB() {
  if (db && connection) {
    return { db, connection }
  }

  const bundle = await duckdb.selectBundle(DUCKDB_BUNDLES);
  const logger = new duckdb.ConsoleLogger();
  const worker = new Worker(bundle.mainWorker!);
  
  db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule, bundle.mainModule);
  connection = await db.connect();

  return { db, connection }
}