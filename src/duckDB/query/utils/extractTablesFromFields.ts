export function extractTablesFromFields(fields: string[]) {
  const tables = new Set<string>();

  for (const field of fields) {
    const [table] = field.split(".");
    tables.add(table);
  }

  return Array.from(tables);
}
