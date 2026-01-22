import { TableContact } from "./components/table-contacts"
import { AddContact } from "./components/add-contacts"
import { GetContactsResponse } from "@/lib/types/contacts"
import { apiCall } from "@/lib/api-client"

export default async function MyContacts() {

    const data = await apiCall<GetContactsResponse>('/contacts')

    return (
        <div className="px-8 w-full">
            <header className="flex flex-row items-center justify-between h-12 mt-4">
                <h1 className="font-montserrat text-xl text-zinc-600">Your contact list</h1>
                <AddContact />
            </header>

            <div className="mt-12">
                <TableContact
                    contacts={data.contacts}
                    total={data.total}
                />
            </div>
        </div>
    )
}