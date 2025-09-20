import { TableCell, TableRow } from "@/components/ui/table";
import { shipmentsTable, shipmentStatus } from "@/drizzle/schemas/shipments";

export default function TablaData({ shipment }: { shipment: typeof shipmentsTable.$inferSelect }) {

  const statusList = shipmentStatus.enumValues;

  return (
    <TableRow>
      <TableCell>{shipment.id}</TableCell>
      <TableCell>{shipment.clientName}</TableCell>
      <TableCell>{shipment.loadingDate}</TableCell>
      <TableCell>{shipment.deliveryDate}</TableCell>
      <TableCell>{shipment.loadingFrom}</TableCell>
      <TableCell>{shipment.deliveryTo}</TableCell>
      <TableCell>{shipment.price}</TableCell>
      <TableCell>{shipment.tourNumber}</TableCell>
      <TableCell>{shipment.status}</TableCell>
    </TableRow>
  )
}