import { pgTable,timestamp, serial, varchar, text, pgEnum } from "drizzle-orm/pg-core";

export const offerStatus = pgEnum("offer_status", [
  "pending",   // изпратена към клиент
  "accepted",
  "rejected",
]);

export const offersTable = pgTable("offers", {
  id: serial("id").primaryKey(),
  createdBy: varchar("created_by").notNull().unique(),
  clientName: varchar("client_name", { length: 120 }).notNull(),
  contactPerson: varchar("contact_person", { length: 120 }),
  phone: varchar("phone", { length: 40 }),
  email: varchar("email", { length: 120 }),
  destination: varchar("destination", { length: 120 }).notNull(),
  cargoDetails: varchar("cargo_details", { length: 255 }),
  priceQuote: varchar("price_quote", { length: 40 }),
  status: text("status").default("pending"),
  refusalReason: text("refusal_reason"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});