CREATE TABLE "customer" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"address" varchar(200) NOT NULL,
	CONSTRAINT "customer_name_unique" UNIQUE("name"),
	CONSTRAINT "customer_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE "detail_transaction" (
	"id_detail_transaction" serial PRIMARY KEY NOT NULL,
	"id_employee" integer NOT NULL,
	"id_customer" integer NOT NULL,
	"id_service" integer NOT NULL,
	"price" integer NOT NULL,
	"total_unit" double precision NOT NULL,
	"transaction_date" timestamp NOT NULL,
	"estimation_complete" timestamp NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "employee" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"password" varchar(100) NOT NULL,
	"job" varchar(50) NOT NULL,
	"address" varchar(200) NOT NULL,
	"date_of_birth" date NOT NULL,
	"salary" integer NOT NULL,
	CONSTRAINT "employee_name_unique" UNIQUE("name"),
	CONSTRAINT "employee_email_unique" UNIQUE("email"),
	CONSTRAINT "employee_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE "service" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"unit" varchar(50) NOT NULL,
	"category" varchar(50) NOT NULL,
	"price" integer NOT NULL,
	"estimation_duration" integer NOT NULL,
	CONSTRAINT "service_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "detail_transaction" ADD CONSTRAINT "detail_transaction_id_employee_employee_id_fk" FOREIGN KEY ("id_employee") REFERENCES "public"."employee"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "detail_transaction" ADD CONSTRAINT "detail_transaction_id_customer_customer_id_fk" FOREIGN KEY ("id_customer") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "detail_transaction" ADD CONSTRAINT "detail_transaction_id_service_service_id_fk" FOREIGN KEY ("id_service") REFERENCES "public"."service"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "employee_name_idx" ON "employee" USING btree ("name");--> statement-breakpoint
CREATE INDEX "employee_password_idx" ON "employee" USING btree ("password");