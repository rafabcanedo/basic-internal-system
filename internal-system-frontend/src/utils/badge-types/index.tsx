import { ContactCategory, CostCategory, TransactionCategory } from "@/types";

interface ITypeBadge {
  type: ContactCategory | TransactionCategory | CostCategory;
}

const categoryStyles: Record<string, string> = {
  Food: "bg-blue-500/60 text-blue-800",
  Payment: "bg-green-500/60 text-green-800",
  Transfer: "bg-purple-500/60 text-purple-800",
  Entertainment: "bg-emerald-500/60 text-emerald-800",
  Family: "bg-blue-500/60 text-blue-800",
  Friend: "bg-yellow-300/60 text-yellow-800",
  Work: "bg-green-500/60 text-green-800",
  Travel: "bg-orange-500/60 text-orange-800",
};

export function BadgeType({ type }: ITypeBadge) {
  const style = categoryStyles[type] ?? "bg-blue-100 text-blue-800";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}
    >
      {type}
    </span>
  );
}