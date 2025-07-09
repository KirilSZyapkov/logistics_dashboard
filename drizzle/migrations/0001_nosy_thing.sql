ALTER TABLE "shipments" DROP CONSTRAINT "shipments_createdBy_unique";--> statement-breakpoint
ALTER TABLE "offers" DROP CONSTRAINT "offers_created_by_unique";--> statement-breakpoint
ALTER TABLE "shipments" ALTER COLUMN "createdBy" SET DATA TYPE varchar;