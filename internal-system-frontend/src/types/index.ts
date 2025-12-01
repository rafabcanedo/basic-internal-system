export enum ContactCategory {
  FAMILY = "Family",
  FRIEND = "Friend",
  WORK = "Work",
}

export enum TransactionCategory {
 FOOD = "Food",
 PAYMENT = "Payment",
 TRANSFER = "Transfer",
 ENTERTAINMENT = "Entertainment",
}

export enum CostCategory {
 FOOD = "Food",
 PAYMENT = "Payment",
 ENTERTAINMENT = "Entertainment",
 TRAVEL = "Travel",
}

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: ContactCategory;
}

export type Transaction = {
  id: number;
  contactId: number;
  value: number;
  category: TransactionCategory;
}

export type Cost = {
 id: number;
 contactId: number;
 category: CostCategory;
 value: number;
 percent: number;
}