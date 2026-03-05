export interface TableRow {
  id: number
  country: string
  city: string
  revenue: number
}

export const dummyTableData: TableRow[] = [
  {
    id: 1,
    country: "USA",
    city: "New York",
    revenue: 120000
  },
  {
    id: 2,
    country: "USA",
    city: "Los Angeles",
    revenue: 95000
  },
  {
    id: 3,
    country: "India",
    city: "Chennai",
    revenue: 72000
  },
  {
    id: 4,
    country: "India",
    city: "Bangalore",
    revenue: 88000
  },
  {
    id: 5,
    country: "UK",
    city: "London",
    revenue: 101000
  }
]