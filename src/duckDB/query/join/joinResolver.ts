import { getRelationships } from "../schema/relationshipRegister"

interface Relationship {
  fromTable: string
  fromColumn: string
  toTable: string
  toColumn: string
}

export function resolveJoinPath(
  baseTable: string,
  targetTables: string[]
): Relationship[] {
  const relationships = getRelationships()
  const visited = new Set<string>()
  const queue: { table: string; path: Relationship[] }[] = []

  queue.push({ table: baseTable, path: [] })
  visited.add(baseTable)

  const finalJoins = new Map<string, Relationship>()

  while (queue.length) {
    const { table, path } = queue.shift()!

    if (targetTables.includes(table)) {
      path.forEach(rel => {
        const key = `${rel.fromTable}.${rel.fromColumn}->${rel.toTable}.${rel.toColumn}`
        if (!finalJoins.has(key)) {
          finalJoins.set(key, rel)
        }
      })
    }

    for (const rel of relationships) {
      if (rel.fromTable === table && !visited.has(rel.toTable)) {
        visited.add(rel.toTable)
        queue.push({
          table: rel.toTable,
          path: [...path, rel]
        })
      }

      if (rel.toTable === table && !visited.has(rel.fromTable)) {
        visited.add(rel.fromTable)
        const reversedRel = {
          fromTable: rel.toTable,
          fromColumn: rel.toColumn,
          toTable: rel.fromTable,
          toColumn: rel.fromColumn
        }
        queue.push({
          table: rel.fromTable,
          path: [...path, reversedRel]
        })
      }
    }
  }

  return Array.from(finalJoins.values())
}