import { Button } from "@/components/ui/button";
import { CostsTable } from "./components/costs-table";
import Link from "next/link";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { CostService } from "@/services";

export default async function Costs() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["costs"],
    queryFn: () => CostService.getAll(),
  });

  return (
    <div className="flex flex-col px-8 w-full">
      <header className="flex flex-row items-center justify-between h-12 mt-4">
        <h1 className="font-montserrat text-xl text-zinc-600">Your costs</h1>
        <Link href="/costs/create-cost">
          <Button variant="outline">Add Cost</Button>
        </Link>
      </header>

<div className="mt-12">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CostsTable />
        </HydrationBoundary>
      </div>
    </div>
  );
}
