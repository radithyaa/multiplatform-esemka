import { createContext, useContext, useEffect, useState } from 'react'
import {Login} from '@/lib/types'

type User = {
  id: number
  username: string
  job: string
}

type AuthContextType = {
  user: User | null
  accessToken: string | null
  isAuthReady: boolean
  login: (body: Login) => Promise<{ message: string; field: "password" | "name" | "root" } | void>
  logout: () => void
  refreshToken: () => Promise<string | void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isAuthReady, setIsAuthReady] = useState(false)

  // Simpan token dan fetch user dari /me
  const login = async (body: Login | null) => {
    const res = await fetch (`${ import.meta.env.VITE_BACKEND_URL }/user/login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json", "Authorization": `Bearer `},
        credentials: 'include'
    })
    const data = await res.json()
    if (!res.ok) {
      return {message: data.message, field: data.field || 'root'}
    }
    setAccessToken(data.accessToken)
    await fetchUser(data.accessToken)
  }

  const logout = async () => {
      try{
        setUser(null)
        setAccessToken(null)
        await fetch(`${ import.meta.env.VITE_BACKEND_URL }/user/logout`, {
        method: 'POST',
        credentials: 'include', // Hapus refresh token dari cookie
    })
    }catch (e) {
        return e
    }
 }

  const fetchUser = async (token: string) => {
    try {
      const res = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const user = await res.json()
      setUser(user)
    } catch (e) {
      console.error('Gagal mengambil user, coba refresh token...')
      await refreshToken()
    }
  }

  const refreshToken = async () => {
    try {
      const res = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/user/refresh`, {
        method: 'POST',
        credentials: 'include', // penting agar cookie terkirim
      })
      const data = await res.json()
      if (data.accessToken) {
        setAccessToken(data.accessToken)
        await fetchUser(data.accessToken)
      } else {
        logout()
      }
    } catch (e) {
      logout()
    }
  }

  // Saat pertama kali buka halaman
  useEffect(() => {
    setIsAuthReady(false)
    refreshToken().finally(() => {
      setIsAuthReady(true)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, refreshToken, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth harus dipakai di dalam AuthProvider')
  return context
}
