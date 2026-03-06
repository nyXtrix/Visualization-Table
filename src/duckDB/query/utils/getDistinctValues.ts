import { executeQuery } from "../executor/queryExecutor";

export async function getDistinctValues(
  table: string,
  column: string,
): Promise<string[]> {
  const query = `
    SELECT DISTINCT ${column}
    FROM ${table}
    ORDER BY ${column}
  `;

  const result = await executeQuery(query);

  return result.map((r: any) => r[column]);
}
