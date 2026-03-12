import { executeQuery } from "../executor/queryExecutor";

export async function getDistinctValues(
  table: string,
  column: string,
): Promise<string[]> {

  const q = (name: string) => `"${name.replace(/"/g, '""')}"`;

  const query = `
    SELECT DISTINCT ${q(column)}
    FROM ${q(table)}
    ORDER BY ${q(column)}
  `;

  const result = await executeQuery(query);

  return result.map((row: Record<string, unknown>) => String(row[column]));
}
