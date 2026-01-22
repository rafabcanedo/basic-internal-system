import { CostCategory } from "@/types";

export interface ICreateCostForm {
    contactId: string;
    category: CostCategory;
    value: string;
    percent: string;
}