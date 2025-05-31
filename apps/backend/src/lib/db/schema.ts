import { pgTable, varchar, integer, serial, date,timestamp, doublePrecision, index } from "drizzle-orm/pg-core";

// === CUSTOMER ===
export const customer = pgTable('customer', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  phone: varchar('phone_number', { length: 20 }).notNull().unique(),
  address: varchar('address', { length: 200 }).notNull(),
});

//  === EMPLOYEE ===
export const employee = pgTable('employee', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 50 }).notNull().unique(),
  phone: varchar('phone_number', { length: 20 }).notNull().unique(),
  password: varchar('password', { length: 100 }).notNull(),
  job: varchar('job', { length: 50 }).notNull(),
  address: varchar('address', { length: 200 }).notNull(),
  dob: date('date_of_birth').notNull(),
  salary: integer('salary').notNull(),
}, (table) => ({
  nameIdx: index('employee_name_idx').on(table.name),
  passwordIdx: index('employee_password_idx').on(table.password),
}));

// === SERVICE ===
export const service = pgTable('service', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  unit: varchar('unit', { length: 50 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  price: integer('price').notNull(),
  estimation_duration: integer('estimation_duration').notNull(),
});

// === DETAIL TRANSACTION ===
export const detailTransaction = pgTable('detail_transaction', {
  id: serial('id_detail_transaction').primaryKey(),
  id_employee: integer('id_employee').references(() => employee.id).notNull(),
  id_customer: integer('id_customer').references(() => customer.id).notNull(),
  id_service: integer('id_service').references(() => service.id).notNull(),
  price: integer('price').notNull(),
  total_unit: doublePrecision('total_unit').notNull(),
  transaction_date: timestamp('transaction_date').notNull(),
  estimation_complete: timestamp('estimation_complete').notNull(),
  completed_at: timestamp('completed_at'),
});
