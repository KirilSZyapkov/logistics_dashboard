import { getTransportsData } from "@/lib/kpi_cards/kpiCards";
import { NextResponse } from "next/server";

export async function GET() {
  const transportsData = await getTransportsData();

  if (!transportsData) {
    return NextResponse.json({ message: "Failed to load shipments data" }, { status: 500 });
  };
  return NextResponse.json(transportsData, { status: 200 });
}
