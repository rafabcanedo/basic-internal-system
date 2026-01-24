import { SideBar } from "@/components/side-bar"
import { SidebarProvider } from "@/components/ui/sidebar"
import CreateCostForm from "./components/create-cost-form"
import { GetContactsResponse } from "@/types"
import { apiCall } from "@/lib/api-client"

export default async function CreateCost() {

    const data = await apiCall<GetContactsResponse>('/contacts')

    const contactOptions = data.contacts.map(contact => ({
        label: contact.name,
        value: contact.id,
    }))

    return (
        <SidebarProvider className="px-8">
            <SideBar />
            <div className="flex-1 flex items-center justify-center min-h-screen">
                <CreateCostForm contacts={contactOptions} />
            </div>
        </SidebarProvider>
    )
}