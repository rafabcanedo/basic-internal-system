import { Cost, CostCategory } from "@/types"

const costsMock: Cost[] = [
  {
    id: "1",
    userId: "user1",
    contactId: "1",
    category: CostCategory.FOOD,
    value: "20",
    userName: "John Doe",
    contactName: "Alice Smith",
    percent: 50
  },
  {
    id: "2",
    userId: "user1",
    contactId: "1",
    category: CostCategory.ENTERTAINMENT,
    value: "150",
    userName: "John Doe",
    contactName: "Alice Smith",
    percent: 15
  },
  {
    id: "3",
    userId: "user1",
    contactId: "2",
    category: CostCategory.PAYMENT,
    value: "800",
    userName: "John Doe",
    contactName: "Bob Johnson",
    percent: 40
  },
  {
    id: "4",
    userId: "user1",
    contactId: "2",
    category: CostCategory.FOOD,
    value: "120",
    userName: "John Doe",
    contactName: "Bob Johnson",
    percent: 6
  },
  {
    id: "5",
    userId: "user1",
    contactId: "3",
    category: CostCategory.FOOD,
    value: "80",
    userName: "John Doe",
    contactName: "Charlie Brown",
    percent: 20
  },
  {
    id: "6",
    userId: "user1",
    contactId: "3",
    category: CostCategory.ENTERTAINMENT,
    value: "200",
    userName: "John Doe",
    contactName: "Charlie Brown",
    percent: 10
  },
  {
    id: "7",
    userId: "user1",
    contactId: "1",
    category: CostCategory.TRAVEL,
    value: "250",
    userName: "John Doe",
    contactName: "Alice Smith",
    percent: 10
  },
  {
    id: "8",
    userId: "user1",
    contactId: "2",
    category: CostCategory.FOOD,
    value: "50",
    userName: "John Doe",
    contactName: "Bob Johnson",
    percent: 50
  }
]

export { costsMock }