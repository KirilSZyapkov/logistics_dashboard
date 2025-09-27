"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { transportsTable } from "@/drizzle/schemas/transports";
import { getAllTransports, updateTransport } from "@/lib/transports/transports";
import { useEffect, useState } from "react";
import TableData from "./_component/TableData";
import { useUser } from "@clerk/nextjs";
import { updateShipment } from "@/lib/shipments/shipments";

export default function TransportsPage() {
  const { user } = useUser();
  const [transports, setTransports] = useState<typeof transportsTable.$inferSelect[]>();

  useEffect(() => {
    async function fetchTransports() {
      try {
        const response = await getAllTransports();
        if (response.status === 200) {
          const data = await response.json();
          setTransports(data);
        } else {
          console.error("Failed to fetch tranports:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching transports:", error);
      }
    }
    fetchTransports();
  }, []);

  if (!user) return <div className="flex items-center justify-center h-screen w-full">
    <p>Please sign in to view transports.</p>
  </div>;

  async function updateTransportStatus(id: string, status: string) {
    if (!user) return alert("Unauthorized");

    setTransports(curTransport => curTransport?.map(t => t.id === id ? { ...t, status: status } : t));

    const response = await updateTransport(id, status);
    if (!response.ok) {
      alert("Failed to update transport status");
      console.error("Failed to update transport status:", response.statusText);
      return;
    };
    const updatedStatusTransport = await response.json();
    console.log("transports 53", updatedStatusTransport);
    await updateShipment(updatedStatusTransport.shipmentId, updatedStatusTransport, status);
  };



  if (!transports) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p>Loading transports...</p>
      </div>
    );
  }

  if (transports.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p>No Transports found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transport</TableHead>
          <TableHead>Order</TableHead>
          <TableHead>Transport Company</TableHead>
          <TableHead>Truck Number</TableHead>
          <TableHead>Loading day</TableHead>
          <TableHead>Delivery day</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transports.map((transport) => (
          <TableData key={transport.id} transport={transport} updateTransportStatus={updateTransportStatus} />
        ))}
      </TableBody>
    </Table>
  )
}