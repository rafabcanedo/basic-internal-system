export enum ContactCategory {
  FAMILY = "Family",
  FRIEND = "Friend",
  WORK = "Work",
}

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: ContactCategory;
}