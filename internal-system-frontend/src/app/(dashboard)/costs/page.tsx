import { AvatarCosts } from "./components/avatar-costs";
import { Button } from "@/components/ui/button";
import { CostsTable } from "./components/costs-table";
import Link from "next/link";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { CostsService } from "@/services";

export default async function Costs() {
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ["costs"],
    queryFn: () => CostsService.getAll(),
  });

  const uniqueContacts = Array.from(
    new Map(
      data.costs.map((cost) => [
        cost.contactId,
        { id: cost.contactId, name: cost.contactName },
      ]),
    ).values(),
  );

  return (
    <div className="flex flex-col px-8 w-full">
      <header className="flex flex-row items-center justify-between h-12 mt-4">
        <h1 className="font-montserrat text-xl text-zinc-600">Your costs</h1>
        <Link href="/costs/create-cost">
          <Button variant="outline">Add Cost</Button>
        </Link>
      </header>

      {uniqueContacts.length > 0 && (
        <div className="grid grid-cols-6 gap-y-4 mt-8 w-1/2 mx-auto">
          {uniqueContacts.map((contact) => (
            <AvatarCosts key={contact.id} name={contact.name} />
          ))}
        </div>
      )}

      <div className="mt-12">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CostsTable />
        </HydrationBoundary>
      </div>
    </div>
  );
}
