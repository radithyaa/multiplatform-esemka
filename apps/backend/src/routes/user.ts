import { db } from "@/lib/db"
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "@/lib/utils/jwt"
import bcrypt from "bcryptjs"
import { employee } from "@/lib/db/schema"
import { deleteCookie, getCookie, setCookie } from "hono/cookie"
import { eq } from "drizzle-orm"
import { Hono } from "hono"
import { loginSchema } from '../../../shared/types'

const userRoute = new Hono()

//  === Post Login Route ===
userRoute.post('/login', async (c) => {
    try{
        const parsed = loginSchema.safeParse( await c.req.json())
        if (!parsed.success) {
        const fieldError = parsed.error.errors[0]
        return c.json({ message: fieldError.message, field: fieldError.path[0] }, 400)
        }

        const { name, password } = parsed.data
        const user = await db.select().from(employee).where(eq(employee.name, name.trim())).then(res => res[0])
        if (!user) return c.json({ message: "User or Password don't match", field: "root" }, 401)

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return c.json({ message: "User or Password don't match", field : 'root' }, 401)

        const accessToken = await createAccessToken({ id: user.id, username: user.name, job: user.job})
        const refreshToken = await createRefreshToken({ id: user.id, username: user.name, job: user.job})

        setCookie(c, "refresh_token", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
            secure: true,
            sameSite: "none",
        })
        return c.json({accessToken})
    }
    catch(e){
        console.error(e)
        return c.json({error: 'Failed to login'}, 500)
    }
})

//  === Post Logout Route ===
userRoute.post('/logout', async (c) => {
    try{
        deleteCookie(c, "refresh_token")
        return c.json({ message: "Logout successful"})
    }
    catch(e){
        console.error(e)
        return c.json({error: 'Failed to logout'}, 500)
    }
})

// /Me Endpoint
userRoute.get('/me', (c) => {
      const user: 
        {
            id: number,
            username: string,
            job: string,
            exp?: string
        }
         = c.get('user' as any) // Ambil dari context
      return c.json({ id: user.id, username: user.username, job: user.job })
    })

export default userRoute

userRoute.post('/refresh', async (c) => {
  const refresh = getCookie(c, 'refresh_token')
  if (!refresh) return c.json({ error: 'No refresh token' }, 401)

  const payload = await verifyRefreshToken(refresh)
  if (!payload) return c.json({ error: 'Invalid refresh token' }, 401)

  const accessToken = await createAccessToken(payload)
  return c.json({ accessToken })
})