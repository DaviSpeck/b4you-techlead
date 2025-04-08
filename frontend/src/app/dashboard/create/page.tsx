'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { getAccessToken } from '@/lib/tokens'
import { CampaignStatus } from '@/types'
import { maskCurrency } from '@/utils/mask'

export default function CreateCampaignPage() {
    const router = useRouter()
    const [form, setForm] = useState({
        name: '',
        budget: '',
        status: 'DRAFT' as CampaignStatus,
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        const formattedValue = name === 'budget' ? maskCurrency(value) : value
        setForm(prev => ({ ...prev, [name]: formattedValue }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const token = getAccessToken() ?? ''
            await api.post('/campaigns', {
                name: form.name,
                budget: parseFloat(form.budget.replace(/[^\d,.-]/g, '').replace(',', '.')),
                status: form.status,
            }, token)

            toast.success('Campanha criada com sucesso!')
            router.push('/dashboard')
        } catch (err: any) {
            toast.error(err.message || 'Erro ao criar campanha.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center h-[calc(100vh-64px)] px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                <h1 className="text-2xl font-bold text-center">Nova Campanha</h1>

                <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Campanha A"
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="budget">Orçamento</Label>
                    <Input
                        id="budget"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        placeholder="R$ 10.000,00"
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                        id="status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1 bg-background"
                    >
                        <option value="DRAFT">Rascunho</option>
                        <option value="ACTIVE">Ativa</option>
                        <option value="PAUSED">Pausada</option>
                        <option value="COMPLETED">Finalizada</option>
                    </select>
                </div>

                <Button type="submit" disabled={loading} className="w-full cursor-pointer">
                    {loading ? 'Criando...' : 'Criar Campanha'}
                </Button>
            </form>
        </div>
    )
}