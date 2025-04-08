'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getAccessToken, removeTokens } from './tokens'
import { useRouter } from 'next/navigation'
import { api } from './api'

type User = {
  id: number
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const logout = () => {
    removeTokens()
    setUser(null)
    router.push('/login')
  }

  useEffect(() => {
    const fetchUser = async () => {
      const token = getAccessToken()
      if (!token) return

      try {
        const data = await api.get<User>('/auth/me', token)
        setUser(data)
      } catch {
        removeTokens()
        setUser(null)
      }
    }

    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}