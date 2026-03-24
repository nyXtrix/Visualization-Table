import { executeQuery } from "../executor/queryExecutor";

export async function getDistinctCombinations(
  table: string,
  columns: string[],
  joinSQL: string = "",
  limit: number = 200
): Promise<any[]> {
  if (!columns.length) return [];

  const q = (name: string) => `"${name.replace(/"/g, '""')}"`;

  const query = `
    SELECT DISTINCT ${columns.map(c => `CAST(${c} AS VARCHAR) AS "${c.replace(/"/g, '""')}"`).join(", ")}
    FROM ${q(table)}
    ${joinSQL}
    ORDER BY ${columns.map(c => `CAST(${c} AS VARCHAR)`).join(", ")}
    LIMIT ${limit}
  `;

  const result = await executeQuery(query);
  return result;
}
