'use client'

import { useState } from 'react'
import { Campaign, CampaignStatus } from '@/types'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type Props = {
    initialData?: Partial<Campaign>
    onSubmit: (data: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => void
    loading?: boolean
}

export const CampaignForm = ({ initialData = {}, onSubmit, loading }: Props) => {
    const [name, setName] = useState(initialData.name || '')
    const [budget, setBudget] = useState(initialData.budget?.toString() || '')
    const [status, setStatus] = useState<CampaignStatus>(
        initialData.status ?? 'DRAFT' as CampaignStatus
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({
            name,
            budget: Number(budget),
            status,
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </div>

            <div>
                <Label htmlFor="budget">Orçamento</Label>
                <Input
                    id="budget"
                    type="number"
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    required
                />
            </div>

            <div>
                <Label>Status</Label>
                <Select value={status} onValueChange={val => setStatus(val as CampaignStatus)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="DRAFT">Rascunho</SelectItem>
                        <SelectItem value="ACTIVE">Ativa</SelectItem>
                        <SelectItem value="PAUSED">Pausada</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
            </Button>
        </form>
    )
}