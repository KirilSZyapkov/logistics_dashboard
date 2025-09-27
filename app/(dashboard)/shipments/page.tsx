"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { shipmentsTable } from "@/drizzle/schema";
import { getAllShipments } from "@/lib/shipments/shipments";
import { useEffect, useState } from "react";
import TableData from "./_component/TableData";

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<typeof shipmentsTable.$inferSelect[]>();
  
  useEffect(() => {
    async function fetchShipments() {
      try {
        const response = await getAllShipments();
        if (response.status === 200) {
          const data = await response.json();
          setShipments(data);
        } else {
          console.error("Failed to fetch shipments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching shipments:", error);
      }
    }
    fetchShipments();
  },[])

  if (!shipments) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p>Loading shipments...</p>
      </div>
    );
  }

  if (shipments.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p>No shipments found.</p>
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Client Name</TableHead>
          <TableHead>Loading day</TableHead>
          <TableHead>Delivery day</TableHead>
          <TableHead>Loading from</TableHead>
          <TableHead>Delivery to</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Tour</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shipments.map((shipment) => (
          <TableData key={shipment.id} shipment={shipment} />
        ))}
      </TableBody>
    </Table>
  )
}