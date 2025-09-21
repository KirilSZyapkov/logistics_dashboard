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
}
export async function POST(req: NextRequest){}
export async function PUT(req: NextRequest) {}
export async function DELETE(req: NextRequest) {}