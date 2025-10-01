import { transportsTable } from "@/drizzle/schemas/transports";
import { shipmentsTable } from "@/drizzle/schemas/shipments";
import db from "@/services/neon/db";
import { NextResponse } from "next/server";

export async function getShipmentsData() {
  const allShipments = await db.select().from(shipmentsTable);
  
  const total = allShipments.length;
  const pending = allShipments.filter(s => s.status === "pending").length;
  const in_transit = allShipments.filter(s => s.status === "in_transit").length;
  const delivered = allShipments.filter(s => s.status === "delivered").length;
  const delayed = allShipments.filter(s => s.status === "delayed").length;
  const totalIncome = allShipments.reduce((acc, shipment) => acc + (Number(shipment.price) || 0), 0);

  return NextResponse.json({ total, in_transit, delivered, delayed, pending, totalIncome }, { status: 200 });
};

export async function getTransportsData() {
  const allTransports = await db.select().from(transportsTable);

  const total = allTransports.length;
  const in_transit = allTransports.filter(t => t.status === "in_transit").length;
  const delivered = allTransports.filter(t => t.status === "delivered").length;
  const delayed = allTransports.filter(t => t.status === "delayed").length;
  const totalSpent = allTransports.reduce((acc, transport) => acc + (Number(transport.price) || 0), 0);

  return NextResponse.json({ total, in_transit, delivered, delayed, totalSpent }, { status: 200 });
}