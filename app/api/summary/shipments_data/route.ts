import { getShipmentsData } from "@/lib/summary/summary";
import { NextResponse } from "next/server";

export async function GET() {
  const shipmentsData = await getShipmentsData();

  if (!shipmentsData) {
    return NextResponse.json({ message: "Failed to load shipments data" }, { status: 500 });
  };
  const data = await shipmentsData.json();
  return NextResponse.json(data, { status: 200 });
}
