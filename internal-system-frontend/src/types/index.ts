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
  id: string;
  name: string;
  email: string;
  phone: string;
  category: ContactCategory;
};

export type Transaction = {
  id: string;
  contactId?: number;
  place: string;
  value: string;
  category: TransactionCategory;
};

export type Cost = {
  id: string;
  userId: string;
  contactId: string;
  value: string;
  category: CostCategory;
  userName: string;
  contactName: string;
  percent?: number;
};

export type GetContactsResponse = {
  contacts: Contact[];
  total: number;
};

export type GetCostsResponse = {
  costs: Cost[];
  total: number;
};

export type CreateContactInput = Omit<Contact, "id">;
