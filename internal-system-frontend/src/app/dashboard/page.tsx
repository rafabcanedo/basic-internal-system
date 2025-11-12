import { AddMoney } from "@/components/add-money";
import { InitialHelper } from "@/components/initial-helper"
import { SideBar } from "@/components/side-bar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { User, WalletMinimal, ScanBarcode } from 'lucide-react';

export default function Dashboard() {
 return (
  <SidebarProvider className="px-8">
   <SideBar />
   <div className="flex flex-row items-center justify-between gap-16 h-14 mt-22">
    <InitialHelper name="My wallet" icon={WalletMinimal} link="/my-wallet" />
    <AddMoney />
    <InitialHelper name="Payments" icon={ScanBarcode} link="/payments" />
    <InitialHelper name="My contacts" icon={User} link="/my-contacts" />
   </div>
  </SidebarProvider>
 )
}