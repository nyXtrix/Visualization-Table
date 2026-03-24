import type { VisualizationField, AggregationType } from "@/types/visual";

export const aggregateValues = (values: any[], aggType: AggregationType = "sum") => {
  const validValues = values.filter((v) => v !== null && v !== undefined && String(v).trim() !== "");
  if (validValues.length === 0) return undefined;

  switch (aggType) {
    case "sum":
      return validValues.reduce((acc, val) => acc + (Number(val) || 0), 0);
    case "count":
      return validValues.length;
    case "count_distinct":
      return new Set(validValues.map(v => String(v))).size;
    case "avg":
      const sum = validValues.reduce((acc, val) => acc + (Number(val) || 0), 0);
      return sum / validValues.length;
    case "min":
    case "earliest":
      return validValues.reduce((a, b) => (a < b ? a : b));
    case "max":
    case "latest":
      return validValues.reduce((a, b) => (a > b ? a : b));
    case "first":
      return validValues[0];
    case "last":
      return validValues[validValues.length - 1];
    case "median":
      const sorted = [...validValues].sort((a, b) => Number(a) - Number(b));
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 !== 0 ? sorted[mid] : (Number(sorted[mid - 1]) + Number(sorted[mid])) / 2;
    default:
      return validValues[0];
  }
};

export const getVField = (key: string, vFields: VisualizationField[]) => {
  const parts = key.split("|||");
  const fieldPart = parts[parts.length - 1];
  
  return vFields.find(v => {
    const fullNameDot = `${v.tableName}.${v.name}`;
    const fullNameUnderscore = `${v.tableName}_${v.name}`;
    return fieldPart === fullNameDot || fieldPart === fullNameUnderscore || fieldPart === v.name;
  });
};
