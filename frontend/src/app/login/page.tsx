'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { setTokens } from '@/lib/tokens'
import { useAuth } from '@/lib/auth'
import { api } from '@/lib/api'
import { LoginResponse, User } from '@/types'

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)
      const res = await api.post<LoginResponse>('/auth/login', { email, password })
      setTokens(res.accessToken, res.refreshToken)

      const user = await api.get<User>('/auth/me', res.accessToken)
      setUser(user)

      toast.success('Login realizado com sucesso!')
      router.push('/dashboard')
    } catch (err) {
      toast.error('Erro ao realizar login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6 bg-white dark:bg-card rounded-xl p-6 shadow">
        <h2 className="text-2xl font-semibold text-center">Entrar no painel</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <Button onClick={handleLogin} disabled={loading} className="w-full cursor-pointer">
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>

          <p className="text-sm text-center">
            Ainda não tem conta?{' '}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => router.push('/register')}
            >
              Criar conta
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}