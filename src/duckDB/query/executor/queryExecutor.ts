import { initDuckDB } from "@/duckDB/core/duckdb"

export async function executeQuery(query: string) {

  const { connection } = await initDuckDB()

  const result = await connection.query(query)

  return result.toArray()
}