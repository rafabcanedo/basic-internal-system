import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { contactsMock } from "@/mocks/contacts-mock"
import { BadgeType } from "@/utils/badge-types"

export const TableContact = () => {
  return (
    <div className="w-full flex justify-center mt-6 mb-6">
      <div className="w-full max-w-5xl rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <h2 className="text-lg">Contacts</h2>
          <span className="text-xs">{contactsMock.length} contacts</span>
        </div>

        <div className="px-2 pb-2">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contactsMock.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell className="text-right">
                    <BadgeType type={contact.category} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}