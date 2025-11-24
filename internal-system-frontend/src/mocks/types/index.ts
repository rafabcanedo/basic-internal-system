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