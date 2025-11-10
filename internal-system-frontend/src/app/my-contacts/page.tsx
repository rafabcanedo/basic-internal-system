import { SideBar } from "@/components/side-bar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function MyContacts() {
 return (
  <SidebarProvider className="px-8">
   <SideBar />
   <div>
    <h1>My Contacts</h1>
   </div>
  </SidebarProvider>
 )
}