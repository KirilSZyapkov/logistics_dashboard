import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { customAlphabet } from 'nanoid';

export const shipmentStatus = pgEnum("shipment_status", [
  "pending",
  "in_transit",
  "delivered",
  "delayed",
]);

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6);

export const shipmentsTable = pgTable('shipments', {
  id: varchar("id").primaryKey().$defaultFn(() => nanoid()),
  createdBy: varchar("createdBy").notNull(),
  clientName: text("clientName").notNull(),
  tourNumber: text("tourNumber").default("N/A"),
  price: text("price").notNull(),
  loadingFrom: text("loadingFrom").notNull(),
  deliveryTo: text("deliveryTo").notNull(),
  loadingDate: text("loadingDate"),
  deliveryDate: text("deliveryDate"),
  status: text("status").default('pending'),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})
