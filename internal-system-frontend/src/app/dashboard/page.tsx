import { AddMoney } from "@/components/add-money";
import { InitialHelper } from "@/components/initial-helper"
import { SideBar } from "@/components/side-bar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { User, WalletMinimal, ScanBarcode } from 'lucide-react';
import { DashboardCards } from "./components/dashboard-cards";
import { LastTransactions } from "./components/last-transactions";
import { RecentContacts } from "./components/recent-contacts";

export default function Dashboard() {
    return (
        <SidebarProvider className="px-8">
            <SideBar />
            <div className="flex flex-col">
                <div className="flex flex-row mt-8 gap-8">
                    <DashboardCards title="Amout" value={3200} />
                    <DashboardCards title="Money box" value={800} />
                </div>
                <div className="flex flex-row items-center justify-between gap-16 h-14 mt-12">
                    <InitialHelper name="My wallet" icon={WalletMinimal} link="/my-wallet" />
                    <AddMoney />
                    <InitialHelper name="Payments" icon={ScanBarcode} link="/payments" />
                    <InitialHelper name="My contacts" icon={User} link="/my-contacts" />
                </div>

                <div className="flex flex-col mt-10">
                    <div>
                        <LastTransactions />
                    </div>

                    <div>
                        <RecentContacts />
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}
