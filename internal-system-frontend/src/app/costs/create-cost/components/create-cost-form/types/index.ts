import { CostCategory } from "@/types";

export interface ICreateCostForm {
    contact: string;
    category: CostCategory;
    value: string;
    percent: string;
}