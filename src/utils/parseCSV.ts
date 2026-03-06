import Papa from 'papaparse'

export interface ParsedCSV {
  rows: Record<string, unknown>[]
  columns: string[]
}

export function parseCSV(file: File): Promise<ParsedCSV> {
  return new Promise((resolve, reject) => {

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      worker: true,
      complete: (results) => {

        const rows = results.data as Record<string, unknown>[]

        if (rows.length === 0) {
          resolve({ rows: [], columns: [] })
          return
        }

        const columns = Object.keys(rows[0])

        resolve({
          rows,
          columns
        })
      },
      error: reject
    })

  })
}