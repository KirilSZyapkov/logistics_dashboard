import { NextResponse } from "next/server";
import { Transports } from "../validation";
import { transportsTable } from "@/drizzle/schemas/transports";

type newTransport = Transports & { shipmentId: string, createdBy: string };

export async function getAllTransports() {
  const response = await fetch('/api/transports', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  if (!response.ok) {
    return NextResponse.json({ message: "Faild to load all shipments" }, { status: 500 });;
  }
  const data: typeof transportsTable = await response.json();
  return NextResponse.json(data, { status: 200 });
}

export async function getTransportById(id: string) { }

export async function createTransport(data: newTransport) {
  const response = await fetch("/api/transports", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    credentials: "include"
  });
  if (!response.ok) {
    const errorData = await response.json();
    return NextResponse.json({ message: errorData.message || "Failed to create transport" }, { status: 500 });
  };
  const newCreatedTransport: typeof transportsTable = await response.json();
  return NextResponse.json(newCreatedTransport, { status: 201 });
}
export async function updateTransport(id: string, status: string) {

  const response = await fetch("/api/transports", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
    credentials: "include"
  });

  if (!response.ok) {
    const errorData = await response.json();
    return NextResponse.json({ message: errorData.message || "Failed to update transport" }, { status: 500 });
  };

  const statusUpdatedTransport: typeof transportsTable = await response.json();
  console.log("lib/transports 54",statusUpdatedTransport);
  
  return NextResponse.json(statusUpdatedTransport, { status: 200 });
}
export async function deleteTransport(id: string) { }
export async function getAllTransportsByUserId(userId: string) { }