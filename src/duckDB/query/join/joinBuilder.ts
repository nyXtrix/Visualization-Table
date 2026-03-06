import type { Relationship } from "../schema/relationshipRegister"

export function buildJoinSQL(joins: Relationship[]) {

  let sql = ""

  for (const j of joins) {

    sql += `
    JOIN ${j.toTable}
    ON ${j.fromTable}.${j.fromColumn} = ${j.toTable}.${j.toColumn}
    `
  }

  return sql
}