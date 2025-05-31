import { Hono } from "hono";
import { db } from "@/lib/db";
import { detailTransaction } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { detailTransactionSchema } from "@/lib/validators/schema";
import z from "zod";

const DetailTransactionsRoute = new Hono()

//  === Get ===
DetailTransactionsRoute.get('/', async (c) => {
    try{
    const result = await db.select().from(detailTransaction)
    return c.json(result)
    }catch(e){
        console.error(e)
        return c.json({error : 'Failed to fetch data'}, 500)
    }
} )

// === Add ===
DetailTransactionsRoute.post('/', async (c) => {
    try{
        const data = await c.req.json()
        const parsedData = detailTransactionSchema.parse(data)
        const inserted = await db.insert(detailTransaction).values(parsedData)
        return c.json({message: 'Detail transaction has succesfully added'})
    }
    catch(e){
        if (e instanceof z.ZodError) {
            return c.json({ error: e.errors }, 400)
            }
        console.error(e)
        return c.json({ error: 'Failed to add detail transaction' }, 500)
    }
})

// === Update ===
DetailTransactionsRoute.put('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400)
    const data = await c.req.json()
    const parsedData = detailTransactionSchema.parse(data)
    const updated = await db.update(detailTransaction)
      .set(parsedData)
      .where(eq(detailTransaction.id, id))
      .returning()

    if (updated.length === 0) return c.json({ error: 'Detail transaction not found' }, 404)

    return c.json({message: 'Detail transaction has succesfully updated'})
  } catch (e) {
        if (e instanceof z.ZodError) {
            return c.json({ error: e.errors }, 400)
            }
        console.error(e)
        return c.json({ error: 'Failed to update detail transaction' }, 500)
  }
})

// === Delete ===
DetailTransactionsRoute.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400)

    const deleted = await db.delete(detailTransaction).where(eq(detailTransaction.id, id)).returning()
    if (deleted.length === 0) return c.json({ error: 'Detail transaction not found' }, 404)

    return c.json({ message: 'Detail transaction deleted'})
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to delete detail transaction' }, 500)
  }
})

export default DetailTransactionsRoute