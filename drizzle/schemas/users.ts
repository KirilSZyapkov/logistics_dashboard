import { pgTable,timestamp, varchar, pgEnum, uuid } from "drizzle-orm/pg-core";

export const userRoles = pgEnum("user_roles", [
  "staff",
  "team_leader",
  "cio",
]);

export const userTables = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkId: varchar("clerk_id").notNull().unique(),
  name: varchar("name", {length: 120}).default("User"),
  email: varchar("email", {length: 120}).notNull().unique(),
  role: userRoles("role").default("staff").notNull(),
  organization: varchar("organization", {length: 120}).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});