export interface Relationship {
  fromTable: string
  fromColumn: string
  toTable: string
  toColumn: string
}

let relationships: Relationship[] = []

export function addRelationship(rel: Relationship) {
  relationships.push(rel)
}

export function getRelationships() {
  return relationships
}