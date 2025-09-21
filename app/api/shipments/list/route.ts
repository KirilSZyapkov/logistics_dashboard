"use server";
import db from "@/services/neon/db";
import { eq } from "drizzle-orm";
import { shipmentsTable } from "@/drizzle/schemas/shipments";
import { NextResponse } from "next/server";


export async function GET() {
   const notPlannedShipments = await db.select({ id: shipmentsTable.id })
      .from(shipmentsTable)
      .where(eq(shipmentsTable.tourNumber, "N/A"));
  
    if (notPlannedShipments.length === 0) {
      return NextResponse.json({ message: "No not planned shipments found" }, { status: 404 });
    };
    return NextResponse.json(notPlannedShipments, { status: 200 });
 }