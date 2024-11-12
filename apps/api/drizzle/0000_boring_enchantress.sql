CREATE TYPE "public"."providers" AS ENUM('email', 'github');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(40) NOT NULL,
	"provider" "providers" NOT NULL,
	"pwd" varchar(60),
	"githubId" varchar(40),
	"pfpUrl" varchar(90),
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
