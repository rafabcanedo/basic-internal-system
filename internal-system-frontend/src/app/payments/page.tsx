import { SideBar } from "@/components/side-bar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Payments() {
 return (
  <SidebarProvider className="px-8">
   <SideBar />
   <div>
    <h1>Payments</h1>
   </div>
  </SidebarProvider>
 )
}