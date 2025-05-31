import { z } from 'zod'

// === CUSTOMER ===
export const customerSchema = z.object({
  name: z.string().max(50),
  phone: z.string().max(20),
  address: z.string().max(200),
})
export const customerWithIdSchema = customerSchema.extend({
  id: z.number(),
})

// === EMPLOYEE ===
export const employeeSchema = z.object({
  job: z.string().max(50),
  password: z.string().max(100),
  name: z.string().max(50),
  email: z.string().max(50),
  address: z.string().max(200),
  phone: z.string().max(20),
  dob: z.string(),
  salary: z.number().int(),
})
export const employeeWithIdSchema = employeeSchema.extend({
  id: z.number(),
})

// === SERVICE ===
export const serviceSchema = z.object({
  unit: z.string().max(50),
  category: z.string().max(50),
  name: z.string().max(50),
  price: z.number().int(),
  estimation_duration: z.number().int(),
})
export const serviceWithIdSchema = serviceSchema.extend({
  id: z.number(),
})

// === DETAIL TRANSACTION ===
export const detailTransactionSchema = z.object({
    id_employee: z.number().int(),
    id_customer: z.number().int(),
    id_service: z.number().int(),
    price: z.number().int(),
    total_unit: z.number(), // pakai doublePrecision
    transaction_date: z.coerce.date(),
    estimation_complete: z.coerce.date(),
    completed_at: z.coerce.date(),
})
export const detailTransactionWithIdSchema = detailTransactionSchema.extend({
  id: z.number(),
})

export type Customer = z.infer<typeof customerSchema>
export type CustomerWithId = z.infer<typeof customerWithIdSchema>
export type Employee = z.infer<typeof employeeSchema>
export type EmployeeWithId = z.infer<typeof employeeWithIdSchema>
export type Service = z.infer<typeof serviceSchema>
export type ServiceWithId = z.infer<typeof serviceWithIdSchema>
export type DetailTransaction = z.infer<typeof detailTransactionSchema>
export type DetailTransactionWithId = z.infer<typeof detailTransactionWithIdSchema>
export const loginSchema = employeeSchema.pick({ name: true, password: true })
export type Login = z.infer<typeof loginSchema>
