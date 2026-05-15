import { initDuckDB } from "@/duckDB/core/duckdb"

export async function executeQuery(query: string) {
  try {
    const { connection } = await initDuckDB();

    const result = await connection.query(query);
    return result.toArray();
  } catch (error) {
    console.error("DuckDB Query Execution failed:", error);
    throw error;
  }
}