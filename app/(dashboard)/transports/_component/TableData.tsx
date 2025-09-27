import { TableCell, TableRow } from "@/components/ui/table";
import { transportsTable, transportStatus } from "@/drizzle/schemas/transports";


export default function TablaData({ transport }: { transport: typeof transportsTable.$inferSelect }) {

  const statusList = transportStatus.enumValues;

  return (
    <TableRow>
      <TableCell>{transport.id}</TableCell>
      <TableCell>{transport.shipmentId}</TableCell>
      <TableCell>{transport.transportCompanyName}</TableCell>
      <TableCell>{transport.truckNumber}</TableCell>
      <TableCell>{transport.loadingDay}</TableCell>
      <TableCell>{transport.deliveryDay}</TableCell>
      <TableCell>{transport.status}</TableCell>
    </TableRow>
  )
}