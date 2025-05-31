import { sign as jwtSign, verify as jwtVerify } from "hono/jwt"

const secret = process.env.JWT_SECRET as string

export function sign(payload: Record<string, unknown>) {
  return jwtSign(payload, secret)
}

export async function verify(token: string) {
  return await jwtVerify(token, secret)
}
