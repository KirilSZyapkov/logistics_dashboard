import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { shipmentsTable, shipmentStatus } from "@/drizzle/schemas/shipments";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function TablaData({ shipment }: { shipment: typeof shipmentsTable.$inferSelect }) {

  const statusList = shipmentStatus.enumValues;


  function btClick(arg: string) {
    alert(arg);
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
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">Status</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><button onClick={() => btClick(statusList[0])}>{statusList[0]}</button></DropdownMenuItem>
            <DropdownMenuItem>{statusList[1]}</DropdownMenuItem>
            <DropdownMenuItem>{statusList[2]}</DropdownMenuItem>
            <DropdownMenuItem>{statusList[3]}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu></TableCell>
    </TableRow>
  )
}