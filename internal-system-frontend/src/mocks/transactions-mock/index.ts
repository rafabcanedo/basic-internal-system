import { Transaction, TransactionCategory } from "../types";

const transactionsMock: Transaction[] = [
  {
    id: 1,
    contactId: 1,
    value: 45.50,
    category: TransactionCategory.FOOD,
  },
  {
    id: 2,
    contactId: 2,
    value: 120.00,
    category: TransactionCategory.ENTERTAINMENT,
  },
  {
    id: 3,
    contactId: 3,
    value: 200.00,
    category: TransactionCategory.PAYMENT,
  },
  {
    id: 4,
    contactId: 4,
    value: 75.30,
    category: TransactionCategory.FOOD,
  },
  {
    id: 5,
    contactId: 5,
    value: 50.00,
    category: TransactionCategory.TRANSFER,
  },
  {
    id: 6,
    contactId: 6,
    value: 300.00,
    category: TransactionCategory.PAYMENT,
  },
  {
    id: 7,
    contactId: 7,
    value: 85.75,
    category: TransactionCategory.ENTERTAINMENT,
  },
  {
    id: 8,
    contactId: 1,
    value: 30.00,
    category: TransactionCategory.FOOD,
  },
  {
    id: 9,
    contactId: 2,
    value: 150.00,
    category: TransactionCategory.TRANSFER,
  },
  {
    id: 10,
    contactId: 8,
    value: 95.20,
    category: TransactionCategory.ENTERTAINMENT,
  },
]

export { transactionsMock }