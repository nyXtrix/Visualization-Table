import { initDuckDB } from "./duckdb";
import type { DescribeDuckDBRow } from "@/types/utils";

type ColumnInfo = {
  name: string;
  type: string;
};

export async function getTableColumns(tableName: string):Promise<ColumnInfo[]> {
  const { connection } = await initDuckDB();

  const result = await connection.query(`DESCRIBE ${tableName}`);

  const rows = result.toArray().map((r: DescribeDuckDBRow) => ({
    name: r.column_name,
    type: r.column_type,
  }));

  return rows;
}
