import { Hono } from "hono";
import { db } from "@/lib/db";
import { service } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { serviceSchema } from "@/lib/validators/schema";
import z from "zod";

const servicesRoute = new Hono()

//  === Get ===
servicesRoute.get('/', async (c) => {
    try{
    const result = await db.select().from(service)
    return c.json(result)
    }catch(e){
        console.error(e)
        return c.json({error : 'Failed to fetch data'}, 500)
    }
} )

// === Add ===
servicesRoute.post('/', async (c) => {
    try{
        const data = await c.req.json()
        const parsedData = serviceSchema.parse(data)
        const inserted = await db.insert(service).values(parsedData)
        return c.json({message: 'Service has succesfully added'})
    }
    catch(e:any){
        if (e instanceof z.ZodError) {
            return c.json({ error: e.errors }, 400)
            }
        if (e.code === '23505') {
            return c.json({ error: 'Service with this name already exists' }, 400)
        }
        console.error(e)
        return c.json({ error: 'Failed to add service' }, 500)
    }
})

// === Update ===
servicesRoute.put('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400)
    const data = await c.req.json()
    const parsedData = serviceSchema.parse(data)
    const updated = await db.update(service)
      .set(parsedData)
      .where(eq(service.id, id))
      .returning()

    if (updated.length === 0) return c.json({ error: 'Service not found' }, 404)

    return c.json({message: 'Service has succesfully updated'})
  } catch (e:any) {
        if (e instanceof z.ZodError) {
            return c.json({ error: e.errors }, 400)
            }
        if (e.code === '23505') {
            return c.json({ error: 'Service with this name already exists' }, 400)
        }
        console.error(e)
        return c.json({ error: 'Failed to update service' }, 500)
  }
})

// === Delete ===
servicesRoute.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400)

    const deleted = await db.delete(service).where(eq(service.id, id)).returning()
    if (deleted.length === 0) return c.json({ error: 'Service not found' }, 404)

    return c.json({ message: 'Service deleted'})
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to delete customer' }, 500)
  }
})

export default servicesRoute