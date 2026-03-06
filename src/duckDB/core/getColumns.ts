import { initDuckDB } from "./duckdb";



export async function getTableColumns(tableName: string) {
  const { connection } = await initDuckDB();

  const result = await connection.query(`DESCRIBE ${tableName}`);

  const rows = result.toArray().map((r: any) => ({
    name: r.column_name,
    type: r.column_type,
  }));

  return rows;
}
