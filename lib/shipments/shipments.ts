"use server";

import { shipmentsTable } from "@/drizzle/schema";
import { Shipment } from "../validation";

type ShipmentResponse = typeof shipmentsTable.$inferInsert;

export async function getAllShipments(){
  const response = await fetch ('/api/shipments', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if(!response.ok){
    return response;
  }
  const data: ShipmentResponse[] = await response.json();
  return data;
}

export async function getShipmentById(id: string) {}

export async function createShipment(data: Shipment) {
  const response = await fetch("/api/shipments", {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if(!response.ok){
    return response;
  }
  const shipments = await response.json();
  return shipments;
  
}
export async function updateShipment(id: string, data: Partial<typeof shipmentsTable.$inferInsert>) {}

export async function deleteShipment(id: string) {}

export async function getShipmentsByUserId(userId: string) {}
