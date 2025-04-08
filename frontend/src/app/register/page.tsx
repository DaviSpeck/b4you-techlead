'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { api } from '@/lib/api'

export default function RegisterPage() {
    const router = useRouter()

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await api.post('/users', form)
            toast.success('Conta criada com sucesso!')
            router.push('/login')
        } catch (err: any) {
            toast.error(err.message || 'Erro ao registrar')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-card rounded-xl p-6 shadow space-y-5">
                <h2 className="text-2xl font-semibold text-center">Criar Conta</h2>

                <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="password">Senha</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Criando conta...' : 'Cadastrar'}
                </Button>

                <p className="text-sm text-center">
                    Já tem conta?{' '}
                    <span
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={() => router.push('/login')}
                    >
                        Entrar
                    </span>
                </p>
            </form>
        </div>
    )
}