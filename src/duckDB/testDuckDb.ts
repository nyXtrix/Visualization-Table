import { initDuckDB } from "./core/duckdb"

export async function testDuckDB() {

  const { connection } = await initDuckDB()

  const result = await connection.query(`
    SELECT 1 + 1 as value
  `)

  console.log("DuckDB test result:", result.toArray())
}