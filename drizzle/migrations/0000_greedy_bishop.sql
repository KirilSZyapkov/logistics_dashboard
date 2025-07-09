CREATE TYPE "public"."shipment_status" AS ENUM('pending', 'in_transit', 'delivered', 'delayed');--> statement-breakpoint
CREATE TYPE "public"."offer_status" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TABLE "shipments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdBy" text NOT NULL,
	"clientName" text NOT NULL,
	"orderNumber" text NOT NULL,
	"tourNumber" text NOT NULL,
	"transportCompany" text NOT NULL,
	"truckNumber" text NOT NULL,
	"price" text NOT NULL,
	"loadingFrom" text NOT NULL,
	"deliveryTo" text NOT NULL,
	"loadingDate" text,
	"deliveryDate" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "shipments_createdBy_unique" UNIQUE("createdBy"),
	CONSTRAINT "shipments_orderNumber_unique" UNIQUE("orderNumber")
);
--> statement-breakpoint
CREATE TABLE "offers" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_by" varchar NOT NULL,
	"client_name" varchar(120) NOT NULL,
	"contact_person" varchar(120),
	"phone" varchar(40),
	"email" varchar(120),
	"destination" varchar(120) NOT NULL,
	"cargo_details" varchar(255),
	"price_quote" varchar(40),
	"status" text DEFAULT 'pending',
	"refusal_reason" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "offers_created_by_unique" UNIQUE("created_by")
);
