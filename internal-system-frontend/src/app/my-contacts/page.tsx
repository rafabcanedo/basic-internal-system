import { SideBar } from "@/components/side-bar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TableContact } from "./components/table-contacts"
import { AddContact } from "./components/add-contacts"

export default function MyContacts() {
    return (
        <SidebarProvider>
            <SideBar />
            <div className="px-8">
                <header className="flex flex-row items-center justify-between h-12">
                    <h1 className="font-montserrat text-xl text-zinc-600">Your contact list</h1>
                    <AddContact />
                </header>

                <div className="mt-12">
                    <TableContact />
                </div>
            </div>
        </SidebarProvider>
    )
}