import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { contactsMock } from "@/mocks/contacts-mock"
import { costsMock } from "@/mocks/costs-mock"
import { BadgeType } from "@/utils/badge-types"

export const CostsTable = () => {
    return (
        <div className="w-full flex justify-center mt-6 mb-6">
            <div className="w-full max-w-7xl rounded-xl border bg-white shadow-sm">
                <div className="flex items-center justify-between px-6 pt-4 pb-2">
                    <h2 className="text-lg">Costs</h2>
                    <span className="text-xs">{costsMock.length} costs</span>
                </div>

                <div className="px-2 pb-2">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Value</TableHead>
                                <TableHead>Percent</TableHead>
                                <TableHead>Category</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {costsMock.map((cost) => {
                                const contact = contactsMock.find(
                                    (c) => c.id === cost.contactId
                                )
                                return (
                                    <TableRow key={cost.id}>
                                        <TableCell className="font-medium text-zinc-800">
                                            {contact ? contact.name : "Unknown"}
                                        </TableCell>
                                        <TableCell>
                                            {cost.value.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            })}
                                        </TableCell>
                                        <TableCell>{cost.percent} %</TableCell>
                                        <TableCell>
                                            <BadgeType type={cost.category} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}