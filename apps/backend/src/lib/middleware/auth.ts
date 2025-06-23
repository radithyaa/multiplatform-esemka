import { MiddlewareHandler } from "hono"
import { verifyAccessToken } from "../utils/jwt"

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized: No token' }, 401)
  }

  const token = authHeader.split(' ')[1]

  try {
    const user = await verifyAccessToken(token)
    if(!user){
      throw Error
    }
    c.set("user", user)
    await next()
  } catch (err) {
    return c.json({ error: 'Invalid or Expired Token' }, 401)
  }
}

export default authMiddleware