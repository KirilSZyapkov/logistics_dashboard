import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { shipmentsTable } from "@/drizzle/schemas/shipments";

export default function TablaData({shipment}: {shipment: typeof shipmentsTable.$inferSelect}) {

  function btClick() {
    alert("Button clicked!");
  }
  return (
    <TableRow>
      <TableCell>{shipment.status}</TableCell>
      <TableCell>{shipment.orderNumber}</TableCell>
      <TableCell>{shipment.tourNumber}</TableCell>
      <TableCell>{shipment.clientName}</TableCell>
      <TableCell>{shipment.transportCompany}</TableCell>
      <TableCell>{shipment.truckNumber}</TableCell>
      <TableCell>{shipment.loadingDate}</TableCell>
      <TableCell>{shipment.deliveryDate}</TableCell>
      <TableCell>{shipment.loadingFrom}</TableCell>
      <TableCell>{shipment.deliveryTo}</TableCell>
      <TableCell>{shipment.price}</TableCell>
      <TableCell><Button onClick={()=>btClick()} className="cursor-pointer">Click</Button></TableCell>
    </TableRow>
  )
}