import { sign, verify } from "hono/jwt"

const secret = process.env.JWT_SECRET as string

export function createJWT(payload: Record<string, unknown>) {
  return sign(payload, secret)
}

export async function verifyJWT(token: string) {
  try {
    return await verify(token, secret)
  } catch (err) {
    return null
  }
}
