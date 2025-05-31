import { MiddlewareHandler } from "hono"
import { verify } from "../utils/jwt"
import {
  getCookie
} from 'hono/cookie'

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const token = getCookie(c,'auth_token')
  if (!token) {
    return c.redirect("http://localhost:1240/employees/sign-in")
  }

  try {
    const user = await verify(token)
    c.set("user", user) // bisa digunakan di route
    await next()
  } catch (err) {
    return 
  }
}
