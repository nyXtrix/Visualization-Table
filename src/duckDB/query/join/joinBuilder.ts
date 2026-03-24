import type { Relationship } from "../schema/relationshipRegister"

export function buildJoinSQL(joins: Relationship[]) {

  let sql = ""

  const q = (name: string) => `"${name.replace(/"/g, '""')}"`;

  for (const j of joins) {
    sql += `
    JOIN ${q(j.toTable)}
    ON ${q(j.fromTable)}.${q(j.fromColumn)} = ${q(j.toTable)}.${q(j.toColumn)}
    `
  }

  return sql
}