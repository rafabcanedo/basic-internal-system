import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { contactsMock } from "@/mocks/contacts-mock"

export const TableContact = () => {
 return (
  <div className="w-full flex justify-center">
  <div className="w-full max-w-5xl">
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
      <TableCell className="text-right">{contact.category}</TableCell>
     </TableRow>
    ))}
  </TableBody>
  </Table>
  </div>
  </div>
 )
}