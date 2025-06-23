// src/routes/users.ts
import { db } from '@/lib/db'
import { employee } from '@/lib/db/schema'
import { employeeSchema } from '@/lib/validators/schema'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import z from 'zod'
import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"

const employeesRoute = new Hono()

//  === Get ===
employeesRoute.get('/', async (c) => {
    try{
        const result = await db.select().from(employee)
        return c.json(result)
    }
    catch(e){
        console.error(e)
        return c.json({error: 'Failed to fetch employees'}, 500)
    }
})

// === Add ===
employeesRoute.post('/', async (c) => {
    try{
        const data = await c.req.json()
        // Validasi zod
        const dataParsed = employeeSchema.parse(data) 
        // Hash the password before inserting
        const hashedPassword = await bcrypt.hash(dataParsed.password, 12)
        const inserted = await db.insert(employee).values({ ...dataParsed, password: hashedPassword })
        return c.json({message: 'Employee has succesfully added'})
    }
    catch(e:any){
        if (e instanceof z.ZodError) {
        return c.json({ error: e.errors }, 400)
        }
        if (e.code === '23505') {
            return c.json({ error: 'Employee with this name, email or phone number already exists' }, 400)
        }
        console.error(e)
        return c.json({ error: 'Failed to add employees' }, 500)
    }
})

// === Update ===
employeesRoute.put('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400)
    const data = await c.req.json()
    // Validasi Zod
    const dataParsed = employeeSchema.parse(data) 
    
    // Hashing bcrypt
    const hashedPassword = await bcrypt.hash(dataParsed.password, 12)
    const updated = await db.update(employee)
      .set({...dataParsed, password: hashedPassword})
      .where(eq(employee.id, id))
      .returning()

    if (updated.length === 0) return c.json({ error: 'Employee not found' }, 404)

    return c.json({message: 'Employee has succesfully updated'})
  } catch (e:any) {
    if (e instanceof z.ZodError) {
        return c.json({ error: e.errors }, 400)
        }
    if (e.code === '23505') {
            return c.json({ error: 'Employee with this name, email or phone number already exists' }, 400)
        }
    console.error(e)
    return c.json({ error: 'Failed to update employee' }, 500)
  }
})

// === Delete ===
employeesRoute.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400)

    const deleted = await db.delete(employee).where(eq(employee.id, id)).returning()
    if (deleted.length === 0) return c.json({ error: 'Employee not found' }, 404)

    return c.json({ message: 'Employee deleted'})
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to delete employee' }, 500)
  }
})


export default employeesRoute
