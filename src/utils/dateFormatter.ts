export function formatDate(value: null | undefined | string | number | Date): string {
  if (value === null || value === undefined || value === "-") return "-";

  const numVal = Number(value);
  
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  if (!isNaN(numVal) && numVal > 1000000000000) {
    const date = new Date(numVal);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString();
    }
  }

  if (typeof value === 'string' && value.trim() !== "" && isNaN(Number(value))) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString();
    }
  }

  return String(value);
}
