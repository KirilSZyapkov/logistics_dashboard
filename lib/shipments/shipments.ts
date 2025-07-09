
import { shipmentsTable } from "@/drizzle/schema";
import { Shipment } from "../validation";
import { NextResponse } from "next/server";

type ShipmentResponse = typeof shipmentsTable.$inferInsert;

export async function getAllShipments(){
  const response = await fetch ('/api/shipments', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  if(!response.ok){
    return NextResponse.json({ message: "Faild to load all shipments" }, { status: 500 });;
  }
  const data: ShipmentResponse[] = await response.json();
  return NextResponse.json(data, { status: 200 });
}

export async function getShipmentById(id: string) {}

export async function createShipment(data: Shipment) {
  console.log("Creating shipment 25:", data);
  
  const response = await fetch("/api/shipments", {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    credentials: "include"  
  });
  if(!response.ok) {
    return NextResponse.json({ message: "Failed to create shipment" }, { status: 500 });
  }
  const shipments = await response.json();
  return NextResponse.json({shipments}, { status: 201 });
  
}
export async function updateShipment(id: string, data: Partial<typeof shipmentsTable.$inferInsert>) {}

export async function deleteShipment(id: string) {}

export async function getShipmentsByUserId(userId: string) {}
