import { Hono } from "hono";
import { db} from "@/lib/db";
import { customer } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { customerSchema } from "@/lib/validators/schema";
import z from "zod";

const customersRoute = new Hono()

//  === Get ===
customersRoute.get('/', async (c) => {
    try{
    const result = await db.select().from(customer)
    return c.json(result)
    }catch(e){
        console.error(e)
        return c.json({error : 'Failed to fetch data'}, 500)
    }
} )

// === Add ===
customersRoute.post('/', async (c) => {
    try{
        const data = await c.req.json()
        const parsedData = customerSchema.parse(data)
        const inserted = await db.insert(customer).values(parsedData)
        return c.json({message: 'Customer has succesfully added'})
    }
    catch(e: any){
        if (e instanceof z.ZodError) {
            return c.json({ error: e.errors }, 400)
            }
        if (e.code === '23505') {
            return c.json({ error: 'Customer with this name or phone already exists' }, 400)
        }
        console.error(e)
        return c.json({ error: 'Failed to add customer' }, 500)
    }
})

// === Update ===
customersRoute.put('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400)
    const data = await c.req.json()
    const parsedData = customerSchema.parse(data)
    const updated = await db.update(customer)
      .set(parsedData)
      .where(eq(customer.id, id))
      .returning()

    if (updated.length === 0) return c.json({ error: 'Customer not found' }, 404)

    return c.json({message: 'Customer has succesfully updated'})
  } catch (e:any) {
        if (e instanceof z.ZodError) {
            return c.json({ error: e.errors }, 400)
            }
        if (e.code === '23505') {
            return c.json({ error: 'Customer with this name or phone already exists' }, 400)
          }
        console.error(e)
        return c.json({ error: 'Failed to update customer' }, 500)
  }
})

// === Delete ===
customersRoute.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400)

    const deleted = await db.delete(customer).where(eq(customer.id, id)).returning()
    if (deleted.length === 0) return c.json({ error: 'customer not found' }, 404)

    return c.json({ message: 'Customer deleted'})
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to delete customer' }, 500)
  }
})

export default customersRoute