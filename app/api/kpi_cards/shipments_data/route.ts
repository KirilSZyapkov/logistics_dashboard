import { getShipmentsData } from "@/lib/kpi_cards/kpiCards";
import { NextResponse } from "next/server";

export async function GET() {
  const shipmentsData = await getShipmentsData();

  if (!shipmentsData) {
    return NextResponse.json({ message: "Failed to load shipments data" }, { status: 500 });
  };
  return NextResponse.json(shipmentsData, { status: 200 });
}
