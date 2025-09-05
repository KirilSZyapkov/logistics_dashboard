CREATE TYPE "public"."user_roles" AS ENUM('staff', 'team_leader', 'cio');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" varchar NOT NULL,
	"name" varchar(120) DEFAULT 'User',
	"email" varchar(120) NOT NULL,
	"role" "user_roles" DEFAULT 'staff' NOT NULL,
	"organization" varchar(120) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "shipments" ALTER COLUMN "status" DROP NOT NULL;