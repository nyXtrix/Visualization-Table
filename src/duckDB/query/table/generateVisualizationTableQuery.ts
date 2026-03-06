import type { VisualizationField } from "@/types/visual";
import { extractTablesFromFields } from "../utils/extractTablesFromFields";
import { resolveJoinPath } from "../join/joinResolver";
import { buildJoinSQL } from "../join/joinBuilder";
import { getDistinctCombinations } from "../utils/getDistinctCombinations";
import { MAX_VISUALIZATION_COMBINATIONS, AGGREGATION_SQL_MAPPING } from "@/constant/utils";

interface VisualizationTableConfig {
  baseTable?: string;
  rows: VisualizationField[];
  columns: VisualizationField[];
  values: VisualizationField[];
}

export async function generateVisualizationTableQuery({
  baseTable: initialBaseTable,
  rows: rowFields,
  columns: colFields,
  values: valFields,
}: VisualizationTableConfig) {

  const normalize = (f: VisualizationField | string): string => {
    if (typeof f === 'string') return f;
    return f.tableName && f.name ? `${f.tableName}.${f.name}` : f.name || String(f);
  };

  const safeRows = (rowFields || []).map(normalize);
  const safeColumns = (colFields || []).map(normalize);
  const safeValues = (valFields || []).map(normalize);

  const allFields = [...safeRows, ...safeColumns, ...safeValues];
  
  const firstTable = [...(rowFields || []), ...(colFields || []), ...(valFields || [])]
    .find(f => typeof f === 'object' && f?.tableName)?.tableName;

  const baseTable = initialBaseTable || firstTable;

  if (!baseTable) {
    const firstField = allFields[0];
    if (firstField && firstField.includes('.')) {
       const extractedFromField = firstField.split('.')[0];
       if (extractedFromField && extractedFromField !== 'undefined' && extractedFromField !== 'null') {
          return generateVisualizationTableQuery({ baseTable: extractedFromField, rows: rowFields, columns: colFields, values: valFields });
       }
    }
    throw new Error("No base table determined. Please drag a field into the table area after uploading a CSV.");
  }

  const tables = extractTablesFromFields(allFields);
  const joins = resolveJoinPath(baseTable, tables);
  const joinSQL = buildJoinSQL(joins);

  let selectFields: string[] = [];
  let groupFields: string[] = [];

  const getAggSQL = (field: VisualizationField, condition?: string): string => {
    const agg = field.aggregation || "sum";
    const fieldFullName = `${field.tableName}.${field.name}`;
    const sqlFunc = AGGREGATION_SQL_MAPPING[agg as keyof typeof AGGREGATION_SQL_MAPPING] || "SUM";

    let baseExpr = fieldFullName;
    
    if (["sum", "avg", "stddev", "variance", "median"].includes(agg)) {
       baseExpr = `TRY_CAST(${fieldFullName} AS DOUBLE)`;
    }

    if (condition) {
      if (agg === "count_distinct") {
        return `COUNT(DISTINCT CASE WHEN ${condition} THEN ${fieldFullName} END)`;
      }
      if (agg === "count") {
        return `COUNT(CASE WHEN ${condition} THEN 1 END)`;
      }
      const elseValue = agg === "sum" ? "0" : "NULL";
      return `${sqlFunc}(CASE WHEN ${condition} THEN ${baseExpr} ELSE ${elseValue} END)`;
    } else {
      if (agg === "count_distinct") {
        return `COUNT(DISTINCT ${fieldFullName})`;
      }
      if (agg === "count") {
        return `COUNT(*)`;
      }
      return `${sqlFunc}(${baseExpr})`;
    }
  };

  if (safeRows.length && !safeColumns.length && !safeValues.length) {
    selectFields = [...safeRows];
    groupFields = [...safeRows];
  }

  else if (!safeRows.length && !safeColumns.length && valFields.length) {
    selectFields = valFields.map(
      (v) => `${getAggSQL(v)} AS "${v.tableName}_${v.name}"`
    );
  }

  else if (safeRows.length && valFields.length && !safeColumns.length) {
    selectFields = [
      ...safeRows,
      ...valFields.map(
        (v) => `${getAggSQL(v)} AS "${v.tableName}_${v.name}"`
      ),
    ];

    groupFields = [...safeRows];
  }

  else if (safeColumns.length) {
    const combinationResults = await getDistinctCombinations(
      baseTable, 
      safeColumns, 
      joinSQL, 
      MAX_VISUALIZATION_COMBINATIONS
    );

    const cappedCombinations = combinationResults.slice(0, MAX_VISUALIZATION_COMBINATIONS);

    const visualizationColumns = cappedCombinations.flatMap((comb: Record<string, unknown>) => {
      const condition = safeColumns
        .map((col) => {
          const val = comb[col];
          if (val === null) return `${col} IS NULL`;
          const escapedVal = String(val).replace(/'/g, "''");
          return `${col} = '${escapedVal}'`;
        })
        .join(" AND ");

      const valPrefix = safeColumns
        .map((col) => String(comb[col]))
        .join("|||");

      const escapedValPrefix = valPrefix.replace(/"/g, '""');

      if (valFields.length === 0) {
        return `COUNT(CASE WHEN ${condition} THEN 1 END) AS "${escapedValPrefix}"`;
      } else {
        return valFields.map((v) => {
          const alias = `${valPrefix}|||${v.tableName}.${v.name}`.replace(/"/g, '""');
          return `${getAggSQL(v, condition)} AS "${alias}"`;
        });
      }
    });

    selectFields = [...safeRows, ...visualizationColumns];
    groupFields = [...safeRows];
  }

  if (!selectFields.length) {
    throw new Error("No fields selected");
  }

  let query = `
    SELECT ${selectFields.join(", ")}
    FROM ${baseTable}
    ${joinSQL}
  `;

  if (groupFields.length) {
    query += ` GROUP BY ${groupFields.join(", ")}`;
  }

  console.log("QUERY:", query);

  return query;
}