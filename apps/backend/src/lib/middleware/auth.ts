import { MiddlewareHandler } from "hono"
import { verifyJWT } from "../utils/jwt"
import { getCookie } from 'hono/cookie'

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const token = getCookie(c,'auth_token')
  if (!token) {
    console.error(token)
    return c.json({ error: 'Unauthorized: You must Login' }, 401)
  }

  try {
    const user = await verifyJWT(token)
    c.set("user", user)
    await next()
  } catch (err) {
    return c.json({ error: 'Unauthorized: Please Login Again' }, 401)
  }
}
