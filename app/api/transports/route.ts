"use server";

import { NextRequest, NextResponse } from "next/server";
import db from "@/services/neon/db";
import { transportsTable } from "@/drizzle/schema";
import { getAuth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function GET() {
  const getAllTransports = await db.select().from(transportsTable);
  console.log("api/transports 9",getAllTransports);
  
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

export async function PUT(req: NextRequest) {
  const {userId} = getAuth(req);

  if(!userId){
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  };

  const body = await req.json();
  const id = body.id;
  const status = body.status;

  const [updatedStatusTransport] = await db
  .update(transportsTable)
  .set({status: status})
  .where(eq(transportsTable.id, id))
  .returning();

  if(!updatedStatusTransport){
    return NextResponse.json({ message: "Failed to update transport" }, { status: 500 });
  };
  return NextResponse.json(updatedStatusTransport, { status: 200 });
};

export async function DELETE(req: NextRequest) {}