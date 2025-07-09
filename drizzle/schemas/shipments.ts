import { integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const shipmentStatus = pgEnum("shipment_status", [
  "pending",
  "in_transit",
  "delivered",
  "delayed",
]);

export const shipmentsTable = pgTable('shipments', {
  id: uuid().primaryKey().defaultRandom(),
  createdBy: varchar("createdBy").notNull().unique(),
  clientName: text("clientName").notNull(),
  orderNumber: text("orderNumber").notNull().unique(),
  tourNumber: text("tourNumber").notNull(),
  transportCompany: text("transportCompany").notNull(),
  truckNumber: text("truckNumber").notNull(),
  price: text("price").notNull(),
  loadingFrom: text("loadingFrom").notNull(),
  deliveryTo: text("deliveryTo").notNull(),
  loadingDate: text("loadingDate"),
  deliveryDate: text("deliveryDate"),
  status: text("status").notNull().default('pending'),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})