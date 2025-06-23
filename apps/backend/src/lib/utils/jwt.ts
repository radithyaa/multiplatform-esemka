// utils/jwt.ts
import { sign, verify } from 'hono/jwt'

const accessSecret = process.env.JWT_ACCES_SECRET || 'rahasia123'
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'refresh456'

export async function createAccessToken(payload: any) {
  return await sign({ ...payload, exp: Math.floor(Date.now() / 1000) + 60 * 15 /* expires in 15 min */ }, accessSecret)
}

export async function createRefreshToken(payload: Record<string, unknown>) {
  return await sign({ ...payload, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 /* expires in 7 day */ }, refreshSecret, 'HS256')
}

export async function verifyAccessToken(token: string) {
  try {
    return await verify(token, accessSecret)
  } catch (err) {
    return null
  }
}

export async function verifyRefreshToken(token: string) {
  try {
    return await verify(token, refreshSecret)
  } catch (err) {
    return null
  }
}
