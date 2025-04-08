'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Campaign, CampaignStatus } from '@/types'
import { api } from '@/lib/api'
import { getAccessToken } from '@/lib/tokens'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { maskCurrency } from '@/utils/mask'

export default function EditCampaignPage() {
    const router = useRouter()
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [name, setName] = useState('')
    const [budget, setBudget] = useState('')
    const [status, setStatus] = useState<CampaignStatus>('DRAFT')

    const token = getAccessToken() ?? undefined
    const id = Array.isArray(params.id) ? params.id[0] : params.id

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const data = await api.get<Campaign>(`/campaigns/${id}`, token)
                setName(data.name)
                setBudget(maskCurrency(data.budget.toFixed(2)))
                setStatus(data.status)
            } catch {
                toast.error('Erro ao carregar campanha')
                router.push('/dashboard')
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchCampaign()
    }, [id])

    const handleSave = async () => {
        try {
            setSaving(true)
            await api.patch<Campaign>(`/campaigns/${id}`, {
                name,
                budget: parseFloat(budget.replace(/[^\d,.-]/g, '').replace(',', '.')),
                status,
            }, token)
            toast.success('Campanha atualizada com sucesso!')
            router.push('/dashboard')
        } catch {
            toast.error('Erro ao atualizar campanha.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <p className="p-4">Carregando...</p>

    return (
        <div className="flex items-center justify-center h-[calc(100vh-64px)] px-4">
            <form className="w-full max-w-xl space-y-4">
                <h1 className="text-2xl font-bold text-center">Editar Campanha</h1>

                <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="budget">Orçamento</Label>
                    <Input
                        id="budget"
                        type="text"
                        value={budget}
                        onChange={(e) => setBudget(maskCurrency(e.target.value))}
                    />
                </div>

                <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={(v) => setStatus(v as CampaignStatus)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="DRAFT">Rascunho</SelectItem>
                            <SelectItem value="ACTIVE">Ativa</SelectItem>
                            <SelectItem value="PAUSED">Pausada</SelectItem>
                            <SelectItem value="COMPLETED">Finalizada</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full cursor-pointer"
                >
                    {saving ? 'Salvando...' : 'Salvar alterações'}
                </Button>
            </form>
        </div>
    )

}