import { TableContact } from "./components/table-contacts";
import { AddContact } from "./components/add-contacts";
import { apiCall } from "@/lib/api-client";
import { Suspense } from "react";
import { ApiLoading } from "@/components/loading/api-loading";
import { GetContactsResponse } from "@/types";

async function ContactsData() {
  const data = await apiCall<GetContactsResponse>("/contacts");

  return <TableContact contacts={data.contacts} total={data.total} />;
}

export default function MyContacts() {
  return (
    <div className="px-8 w-full">
      <header className="flex flex-row items-center justify-between h-12 mt-4">
        <h1 className="font-montserrat text-xl text-zinc-600">
          Your contact list
        </h1>
        <AddContact />
      </header>

      <div className="mt-12">
        <Suspense fallback={<ApiLoading type="card" rows={5} />}>
          <ContactsData />
        </Suspense>
      </div>
    </div>
  );
}
