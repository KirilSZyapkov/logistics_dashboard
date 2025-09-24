import { pgTable,timestamp, serial, varchar, text, pgEnum } from "drizzle-orm/pg-core";
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6);

export const transportStatus = pgEnum("transport_status", [
  "in_transit",
  "delivered",
  "delayed",
]);

export const transportsTable = pgTable("transports", {
  id: varchar("id").primaryKey().$defaultFn(() => nanoid()),
  createdBy: varchar("createdBy").notNull(),
  transportCompanyName: text("transportCompanyName").notNull(),
  shipmentId: varchar("shipmentId").notNull(),
  truckNumber: text("truckNumber").notNull(),
  loadingDay: text("loadingDay").notNull(),
  deliveryDay: text("deliveryDay").notNull(),
  status: text("status").default('in_transit'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});