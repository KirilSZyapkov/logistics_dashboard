import { TableCell, TableRow } from "@/components/ui/table";
import { transportsTable, transportStatus } from "@/drizzle/schemas/transports";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";


export default function TablaData({ transport, updateTransportStatus }: { transport: typeof transportsTable.$inferSelect, updateTransportStatus:(id:string, status: string) => void }) {

  const statusList = transportStatus.enumValues;

  return (
    <TableRow>
      <TableCell>{transport.id}</TableCell>
      <TableCell>{transport.shipmentId}</TableCell>
      <TableCell>{transport.transportCompanyName}</TableCell>
      <TableCell>{transport.truckNumber}</TableCell>
      <TableCell>{transport.loadingDay}</TableCell>
      <TableCell>{transport.deliveryDay}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-lg">{transport.status}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup onValueChange={(value) => updateTransportStatus(transport.id, value) }>
              {statusList.map(status => (<DropdownMenuRadioItem key={status} value={status}>{status}</DropdownMenuRadioItem>))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}