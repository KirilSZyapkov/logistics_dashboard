CREATE TABLE "transports" (
	"id" varchar PRIMARY KEY NOT NULL,
	"created_by" varchar NOT NULL,
	"transport_company_name" text NOT NULL,
	"shipment_id" varchar NOT NULL,
	"truck_number" text NOT NULL,
	"loading_day" text NOT NULL,
	"delivery_day" text NOT NULL,
	"status" text DEFAULT 'in_transit',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "offers" CASCADE;