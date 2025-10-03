import { getTransportsData } from "@/lib/summary/summary";
import { NextResponse } from "next/server";

export async function GET() {
  const transportsData = await getTransportsData();

  if (!transportsData) {
    return NextResponse.json({ message: "Failed to load shipments data" }, { status: 500 });
  };
  const data = await transportsData.json();
  return NextResponse.json(data, { status: 200 });
}
