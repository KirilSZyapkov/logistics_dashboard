import { NextResponse } from "next/server";
import { Transports } from "../validation";

type TransportResponse = Transports[];

export async function getAllTransports(){
  const response = await fetch('/api/transpors', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    if (!response.ok) {
      return NextResponse.json({ message: "Faild to load all shipments" }, { status: 500 });;
    }
    const data: TransportResponse[] = await response.json();
    return NextResponse.json(data, { status: 200 });
}

export async function getTransportById(id: string) {}
export async function createTransport(data: Transports) {}
export async function updateTransport(id: string, data: Transports) {}
export async function deleteTransport(id: string) {}
export async function getAllTransportsByUserId(userId: string) {}