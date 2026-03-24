import type { AsyncDuckDBConnection } from "@duckdb/duckdb-wasm";

const DATE_FORMATS = "['%m-%d-%Y', '%d-%m-%Y', '%m/%d/%Y', '%d/%m/%Y', '%Y-%m-%d', '%Y/%m/%d']";
const DATE_REGEXES = [
  /^\d{4}-\d{2}-\d{2}$/,
  /^\d{1,2}-\d{1,2}-\d{4}$/,
  /^\d{1,2}\/\d{1,2}\/\d{4}$/  
];

export async function generateInferredSelectClause(
  connection: AsyncDuckDBConnection,
  fileName: string
): Promise<string> {
  const sampleQuery = await connection.query(`
    SELECT * FROM read_csv_auto('${fileName}', header=true, all_varchar=true, sample_size=1000) LIMIT 1000
  `);
  const samples = sampleQuery.toArray();
  
  if (samples.length === 0) {
    return "*";
  }

  const columns = Object.keys(samples[0]);

  const q = (name: string) => `"${name.replace(/"/g, '""')}"`;

  return columns.map(col => {
    const colSamples = samples.map((s: Record<string, string | number | null>) => String(s[col] ?? "").trim()).filter(Boolean);
    if (colSamples.length === 0) return q(col);

    const dateMatches = colSamples.filter((s: string) => DATE_REGEXES.some(r => r.test(s))).length;
    if (dateMatches / colSamples.length > 0.7) {
      return `COALESCE(
        try_cast(${q(col)} AS DATE), 
        try_strptime(${q(col)}, ${DATE_FORMATS})::DATE
      ) AS ${q(col)}`;
    }

    const numMatches = colSamples.filter((s: string) => {
      const cleaned = s.replace(/[,%]/g, "");
      return !isNaN(Number(cleaned)) && cleaned !== "";
    }).length;

    if (numMatches / colSamples.length > 0.7) {
      return `try_cast(regexp_replace(${q(col)}, '[,%]', '', 'g') AS DOUBLE) AS ${q(col)}`;
    }

    return q(col);
  }).join(',\n      ');
}
