import { TableCell, TableRow } from "@/components/ui/table";
import { shipmentsTable, shipmentStatus } from "@/drizzle/schemas/shipments";

export default function TablaData({ shipment }: { shipment: typeof shipmentsTable.$inferSelect }) {

  return (
    <TableRow className={shipment.status === "pending" ? "bg-purple-50" : shipment.status === "in_transit" ? "bg-yellow-50" : shipment.status === "delivered" ? "bg-green-50" : shipment.status === "delayed" ? "bg-red-50" : ""}>
      <TableCell>{shipment.id}</TableCell>
      <TableCell>{shipment.clientName}</TableCell>
      <TableCell>{shipment.loadingDate}</TableCell>
      <TableCell>{shipment.deliveryDate}</TableCell>
      <TableCell>{shipment.loadingFrom}</TableCell>
      <TableCell>{shipment.deliveryTo}</TableCell>
      <TableCell>{shipment.price} EUR</TableCell>
      <TableCell>{shipment.tourNumber}</TableCell>
      <TableCell>{shipment.status}</TableCell>
    </TableRow>
  )
}