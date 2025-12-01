import { Cost, CostCategory } from "@/types"

const costsMock: Cost[] = [
  {
    id: 1,
    contactId: 1,
    category: CostCategory.FOOD,
    value: 20,
    percent: 10
  },
  {
    id: 2,
    contactId: 1,
    category: CostCategory.ENTERTAINMENT,
    value: 150,
    percent: 15
  },
  {
    id: 3,
    contactId: 2,
    category: CostCategory.PAYMENT,
    value: 800,
    percent: 40
  },
  {
    id: 4,
    contactId: 2,
    category: CostCategory.FOOD,
    value: 120,
    percent: 6
  },
  {
    id: 5,
    contactId: 3,
    category: CostCategory.FOOD,
    value: 80,
    percent: 4
  },
  {
    id: 6,
    contactId: 3,
    category: CostCategory.ENTERTAINMENT,
    value: 200,
    percent: 10
  },
  {
    id: 7,
    contactId: 1,
    category: CostCategory.TRAVEL,
    value: 250,
    percent: 12.5
  },
  {
    id: 8,
    contactId: 2,
    category: CostCategory.FOOD,
    value: 50,
    percent: 2.5
  }
]

export { costsMock }