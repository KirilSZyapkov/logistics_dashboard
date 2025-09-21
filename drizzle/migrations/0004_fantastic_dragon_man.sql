CREATE TYPE "public"."transport_status" AS ENUM('in_transit', 'delivered', 'delayed');--> statement-breakpoint
ALTER TABLE "offers" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "offers" ALTER COLUMN "status" SET DEFAULT 'in_transit';--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN "transport_company_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN "shipment_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN "truck_number" text NOT NULL;--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN "loading_day" text NOT NULL;--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN "delivery_day" text NOT NULL;--> statement-breakpoint
ALTER TABLE "offers" DROP COLUMN "client_name";--> statement-breakpoint
ALTER TABLE "offers" DROP COLUMN "contact_person";--> statement-breakpoint
ALTER TABLE "offers" DROP COLUMN "phone";--> statement-breakpoint
ALTER TABLE "offers" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "offers" DROP COLUMN "destination";--> statement-breakpoint
ALTER TABLE "offers" DROP COLUMN "cargo_details";--> statement-breakpoint
ALTER TABLE "offers" DROP COLUMN "price_quote";--> statement-breakpoint
ALTER TABLE "offers" DROP COLUMN "refusal_reason";--> statement-breakpoint
DROP TYPE "public"."offer_status";