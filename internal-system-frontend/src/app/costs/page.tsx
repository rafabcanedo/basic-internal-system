"use client"

import { SideBar } from "@/components/side-bar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AvatarCosts } from "./components/avatar-costs"
import { Button } from "@/components/ui/button"
import { CostsTable } from "./components/costs-table"
import Link from "next/link"

export default function Costs() {

    const contacts = [
        { id: 1, name: "Isabella" },
        { id: 2, name: "Rafael" },
        { id: 3, name: "Pedro" },
        { id: 4, name: "Artur" },
        { id: 5, name: "Julia" },
        { id: 6, name: "Joao" },
    ]

    return (
        <SidebarProvider>
            <SideBar />
            <div className="flex flex-col px-8 w-full">
                <header className="flex flex-row items-center justify-between h-12 mt-4">
                    <h1 className="font-montserrat text-xl text-zinc-600">Your costs</h1>
                    <Link href="/costs/create-cost">
                        <Button variant="outline">Add Cost</Button>
                    </Link>
                </header>
                <div className="grid grid-cols-6 mt-8 w-1/2 mx-auto">
                    {contacts.map((contact) => (
                        <AvatarCosts key={contact.id} name={contact.name} />
                    ))}
                </div>

                <div className="mt-12">
                    <CostsTable />
                </div>
            </div>
        </SidebarProvider >
    )
}