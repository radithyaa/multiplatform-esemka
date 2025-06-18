import { MiddlewareHandler } from "hono"
import { verifyJWT } from "../utils/jwt"
import { getCookie } from 'hono/cookie'

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const token = getCookie(c,'auth_token')
  if (!token) {
    console.error(token)
    return c.json({ error: 'Unauthorized: No token provided' }, 401)
  }

  try {
    const user = await verifyJWT(token)
    // c.set("user", user) // bisa digunakan di route
    return c.json({"user": user})
    await next()
  } catch (err) {
    return c.json({ error: 'Unauthorized: Invalid or expired token' }, 401)
  }
}
