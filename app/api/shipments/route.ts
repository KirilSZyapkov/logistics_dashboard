"use server";

import { NextRequest, NextResponse } from "next/server";
import db from "@/services/neon/db";
import { shipmentsTable } from "@/drizzle/schema";
import { getAuth } from "@clerk/nextjs/server";


export async function GET() {
  const allShipments = await db.select().from(shipmentsTable);
  if (allShipments.length === 0) {
    return NextResponse.json({ message: "No shipments found" }, { status: 404 });
  }
  return NextResponse.json(allShipments, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { userId, sessionClaims } = getAuth(req);

  console.log(sessionClaims);
  

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

export async function PUT(req: NextRequest) { }

export async function DELETE(req: NextRequest) { }