import { SideBar } from "@/components/side-bar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function MyWallet() {
 return (
  <SidebarProvider className="px-8">
   <SideBar />
   <div>
    <h1>My Wallet</h1>
   </div>
  </SidebarProvider>
 )
}