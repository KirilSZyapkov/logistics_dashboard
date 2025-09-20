ALTER TABLE "shipments" DROP CONSTRAINT "shipments_orderNumber_unique";--> statement-breakpoint
ALTER TABLE "shipments" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "shipments" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "shipments" ALTER COLUMN "tourNumber" SET DEFAULT 'N/A';--> statement-breakpoint
ALTER TABLE "shipments" ALTER COLUMN "tourNumber" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "shipments" DROP COLUMN "orderNumber";--> statement-breakpoint
ALTER TABLE "shipments" DROP COLUMN "transportCompany";--> statement-breakpoint
ALTER TABLE "shipments" DROP COLUMN "truckNumber";