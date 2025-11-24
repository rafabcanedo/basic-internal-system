import { SideBar } from "@/components/side-bar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function CreateCost() {
    return (
        <SidebarProvider className="px-8">
            <SideBar />
            <div>
                <h1>Create Cost</h1>
            </div>
        </SidebarProvider>
    )
}