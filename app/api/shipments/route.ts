"use server";

import { NextRequest, NextResponse } from "next/server";
import db from "@/services/neon/db";
import { shipmentsTable } from "@/drizzle/schema";
import { getAuth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";


export async function GET() {
  const allShipments = await db.select().from(shipmentsTable);
  if (allShipments.length === 0) {
    return NextResponse.json({ message: "No shipments found" }, { status: 404 });
  }
  return NextResponse.json(allShipments, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  body.createdBy = userId;
  const createdShipment = await db
    .insert(shipmentsTable)
    .values(body)
    .returning();

  if (!createdShipment) {
    return NextResponse.json({ message: "Failed to create shipment" }, { status: 500 });
  }
  return NextResponse.json(createdShipment, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  };
  const body = await req.json();
  const selectedOrder = body.selectedOrder;
  const data = body.data;
  const status = body.status;
  console.log("api/shipments 48",selectedOrder );
  console.log("api/shipments 49",data );
  
  const [updatedShipment] = await db
  .update(shipmentsTable)
  .set({tourNumber: data.id, status: status})
  .where(eq(shipmentsTable.id, selectedOrder))
  .returning();

  if (!updatedShipment) {
    return NextResponse.json({ message: "Failed to update shipment" }, { status: 500 });
  };
  return NextResponse.json(updatedShipment, { status: 200 });
 }

export async function DELETE(req: NextRequest) { }