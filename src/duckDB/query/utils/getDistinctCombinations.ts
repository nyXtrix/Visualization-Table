import { executeQuery } from "../executor/queryExecutor";

export async function getDistinctCombinations(
  table: string,
  columns: string[],
  joinSQL: string = "",
  limit: number = 200
): Promise<any[]> {
  if (!columns.length) return [];

  const query = `
    SELECT DISTINCT ${columns.map(c => `${c} AS "${c.replace(/"/g, '""')}"`).join(", ")}
    FROM ${table}
    ${joinSQL}
    ORDER BY ${columns.join(", ")}
    LIMIT ${limit}
  `;

  const result = await executeQuery(query);
  return result;
}
