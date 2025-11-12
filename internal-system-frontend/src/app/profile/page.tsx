import { SideBar } from "@/components/side-bar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Profile() {
 return (
  <SidebarProvider className="px-8">
   <SideBar />
   <div>
    <h1>Profile</h1>
   </div>
  </SidebarProvider>
 )
}