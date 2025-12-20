import { SideBar } from "@/components/side-bar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ProfileForm } from "./components/profile-form"

export default function Profile() {
 return (
  <SidebarProvider className="px-8">
   <SideBar />
   <div className="flex mt-8">
    <ProfileForm />
   </div>
  </SidebarProvider>
 )
}