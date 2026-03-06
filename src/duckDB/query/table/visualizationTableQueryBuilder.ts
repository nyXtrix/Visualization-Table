import type { VisualizationTableState, Dataset, AggregationType } from "@/types/visual";
import { AGGREGATION_SQL_MAPPING } from "@/constant/utils";

export function buildTableQuery(
  dataset: Dataset,
  config: VisualizationTableState
) {
  const rows = config.rows.map(r => r.name);
  const columns = config.columns.map(c => c.name);

  const values = config.values.map(v => {
    const agg = v.aggregation || "sum";
    const mapping = AGGREGATION_SQL_MAPPING as Record<AggregationType, string>;
    const sqlFunc = mapping[agg as AggregationType] || "SUM";
    
    if (agg === "count_distinct") {
      return `COUNT(DISTINCT "${v.name}") AS "${v.name}"`;
    }
    return `${sqlFunc}("${v.name}") AS "${v.name}"`;
  });

  const groupFields = [...rows, ...columns];

  const selectFields = [
    ...groupFields,
    ...values
  ];

  let query = `
  SELECT ${selectFields.join(", ")}
  FROM "${dataset.tableName}"
  `;

  if (groupFields.length) {
    query += ` GROUP BY ${groupFields.join(", ")}`;
  }

  return query;
}