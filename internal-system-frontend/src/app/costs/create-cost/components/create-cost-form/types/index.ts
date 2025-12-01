import { CostCategory } from "@/mocks/types";

export interface ICreateCostForm {
    contact: string;
    category: CostCategory;
    value: string;
    percent: string;
}