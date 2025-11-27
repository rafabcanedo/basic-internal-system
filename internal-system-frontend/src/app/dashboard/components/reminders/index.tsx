import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function Reminders() {
    return (
        <div className="mt-6 mb-6">
            <div className="w-full max-w-5xl rounded-xl border border-zinc-200 bg-white shadow-sm">
                <header className="flex flex-row items-center justify-between px-6 pt-4 pb-2">
                    <h2 className="font-mono text-lg font-semibold text-zinc-600">
                        Reminders
                    </h2>
                    <Button variant="outline">
                        Create Reminder
                    </Button>
                </header>

                <div className="px-2 pb-2">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[140px]">Reminders Name</TableHead>
                                <TableHead className="text-right">Value</TableHead>
                                <TableHead className="text-right">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}