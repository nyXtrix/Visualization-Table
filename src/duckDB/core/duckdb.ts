import * as duckdb from "@duckdb/duckdb-wasm"
import { DUCKDB_BUNDLES } from "@/constant/utils";
import Toast from "@/components/shared/Toast";

interface DuckDBGlobal {
  _duckdb_db?: duckdb.AsyncDuckDB;
  _duckdb_connection?: duckdb.AsyncDuckDBConnection;
  _duckdb_init_promise?: Promise<{ 
    db: duckdb.AsyncDuckDB; 
    connection: duckdb.AsyncDuckDBConnection 
  }> | null;
}

const _global = globalThis as unknown as DuckDBGlobal;

export async function initDuckDB() {
  if (_global._duckdb_init_promise) {
    return _global._duckdb_init_promise;
  }

  _global._duckdb_init_promise = (async () => {
    try {
      if (_global._duckdb_db && _global._duckdb_connection) {
        return { db: _global._duckdb_db, connection: _global._duckdb_connection };
      }

      const bundle = await duckdb.selectBundle(DUCKDB_BUNDLES);
      const logger = new duckdb.ConsoleLogger();
      const worker = new Worker(bundle.mainWorker!);
      
      const db = new duckdb.AsyncDuckDB(logger, worker);
      await db.instantiate(bundle.mainModule);
      const connection = await db.connect();

      _global._duckdb_db = db;
      _global._duckdb_connection = connection;

      return { db, connection };
    } catch (error) {
      _global._duckdb_init_promise = null;
      console.error("DuckDB initialization failed:", error);
      Toast({ toast: { id: "duckdb-init-failed", message: "DuckDB initialization failed", type: "error" } });
      throw error;
    }
  })();

  return _global._duckdb_init_promise;
}