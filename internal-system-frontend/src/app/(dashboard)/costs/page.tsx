import { AvatarCosts } from "./components/avatar-costs";
import { Button } from "@/components/ui/button";
import { CostsTable } from "./components/costs-table";
import Link from "next/link";
import { GetCostsResponse } from "@/types";
import { apiCall } from "@/lib/api-client";
import { Suspense } from "react";
import { ApiLoading } from "@/components/loading/api-loading";

async function CostsData() {
  const data = await apiCall<GetCostsResponse>("/costs");

  const uniqueContacts = Array.from(
    new Map(
      data.costs.map((cost) => [
        cost.contactId,
        { id: cost.contactId, name: cost.contactName },
      ])
    ).values()
  );

  return (
    <>
      {uniqueContacts.length > 0 && (
        <div className="grid grid-cols-6 gap-y-4 mt-8 w-1/2 mx-auto">
          {uniqueContacts.map((contact) => (
            <AvatarCosts key={contact.id} name={contact.name} />
          ))}
        </div>
      )}

      <div className="mt-12">
        <CostsTable costs={data.costs} total={data.total} />
      </div>
    </>
  );
}

export default function Costs() {
  return (
    <div className="flex flex-col px-8 w-full">
      <header className="flex flex-row items-center justify-between h-12 mt-4">
        <h1 className="font-montserrat text-xl text-zinc-600">Your costs</h1>
        <Link href="/costs/create-cost">
          <Button variant="outline">Add Cost</Button>
        </Link>
      </header>

      <Suspense fallback={<ApiLoading type="table" rows={8} columns={5} />}>
        <CostsData />
      </Suspense>
    </div>
  );
}
