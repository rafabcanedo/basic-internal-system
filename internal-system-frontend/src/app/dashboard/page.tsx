import { SideBar } from "@/components/side-bar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Dashboard() {
 return (
  <SidebarProvider>
   <SideBar />
   <h1>Dashboard</h1>
  </SidebarProvider>
 )
}