"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { transportStatus, transportsTable } from "@/drizzle/schemas/transports";
import { getAllTransports } from "@/lib/transports/transports";
import { useEffect, useState } from "react";
import TableData from "./_component/TableData";

export default function TransportsPage() {
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
  },[])

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
          <TableData key={transport.id} transport={transport} />
        ))}
      </TableBody>
    </Table>
  )
}