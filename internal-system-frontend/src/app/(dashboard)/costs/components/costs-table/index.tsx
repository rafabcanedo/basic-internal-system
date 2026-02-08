"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCostsQuery } from "@/hooks/queries/use-costs-query";
import { BadgeType } from "@/utils/badge-types";

export const CostsTable = ({}) => {
  const { data } = useCostsQuery();

  const costs = data?.costs ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="w-full flex justify-center mt-6 mb-6">
      <div className="w-full max-w-7xl rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <h2 className="text-lg">Costs</h2>
          <span className="text-xs">{total} costs</span>
        </div>

        <div className="px-2 pb-2">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Percent</TableHead>
                <TableHead className="text-right">Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costs.length > 0 ? (
                costs.map((cost) => (
                  <TableRow key={cost.id}>
                    <TableCell className="font-medium text-zinc-800">
                      {cost.contactName}
                    </TableCell>
                    <TableCell>{cost.userName}</TableCell>
                    <TableCell>
                      {Number(cost.value).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                    <TableCell>{cost.percent ?? "10%"}</TableCell>
                    <TableCell className="text-right">
                      <BadgeType type={cost.category} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-gray-500 py-10"
                  >
                    No costs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
