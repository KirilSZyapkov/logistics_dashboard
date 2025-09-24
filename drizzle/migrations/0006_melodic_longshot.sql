ALTER TABLE "transports" ADD COLUMN "createdBy" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "transports" ADD COLUMN "transportCompanyName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transports" ADD COLUMN "shipmentId" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "transports" ADD COLUMN "trcukNumber" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transports" ADD COLUMN "loadingDay" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transports" ADD COLUMN "deliveryDay" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transports" DROP COLUMN "created_by";--> statement-breakpoint
ALTER TABLE "transports" DROP COLUMN "transport_company_name";--> statement-breakpoint
ALTER TABLE "transports" DROP COLUMN "shipment_id";--> statement-breakpoint
ALTER TABLE "transports" DROP COLUMN "truck_number";--> statement-breakpoint
ALTER TABLE "transports" DROP COLUMN "loading_day";--> statement-breakpoint
ALTER TABLE "transports" DROP COLUMN "delivery_day";