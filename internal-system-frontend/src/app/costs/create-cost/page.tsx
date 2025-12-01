import { SideBar } from "@/components/side-bar"
import { SidebarProvider } from "@/components/ui/sidebar"
import CreateCostForm from "./components/create-cost-form"

export default function CreateCost() {
    return (
        <SidebarProvider className="px-8">
            <SideBar />
            <div className="flex-1 flex items-center justify-center min-h-screen">
                <CreateCostForm />
            </div>
        </SidebarProvider>
    )
}