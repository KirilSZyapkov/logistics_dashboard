"use server";

import { NextRequest, NextResponse } from "next/server";
import db from "@/services/neon/db";
import { transportsTable } from "@/drizzle/schema";

export async function GET() {
  const getAllTransports = await db.select().from(transportsTable);
  if (getAllTransports.length === 0) {
    return NextResponse.json({ message: "No shipments found" }, { status: 404 });
  }
  return NextResponse.json(getAllTransports, { status: 200 });
};

export async function POST(req: NextRequest){
  const body = await req.json();
  if (!body.transportCompanyName || !body.truckNumber || !body.loadingDay || !body.deliveryDay || !body.shipmentId || !body.createdBy) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  };
  const [newCreatedTransport] = await db.insert(transportsTable)
  .values(body)
  .returning();

  if(!newCreatedTransport){
    return NextResponse.json({ message: "Failed to create transport" }, { status: 500 });
  };
  return NextResponse.json(newCreatedTransport, { status: 201 });

};

export async function PUT(req: NextRequest) {}
export async function DELETE(req: NextRequest) {}