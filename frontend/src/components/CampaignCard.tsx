'use client'

import { Campaign } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { getAccessToken } from '@/lib/tokens'

type Props = {
    campaign: Campaign
    onDeleted?: () => void
}

export function CampaignCard({ campaign, onDeleted }: Props) {
    const router = useRouter()

    const handleEdit = () => {
        router.push(`/dashboard/edit/${campaign.id}`)
    }

    const handleDelete = async () => {
        if (!confirm('Tem certeza que deseja excluir esta campanha?')) return

        try {
            const token = getAccessToken()
            await api.delete(`/campaigns/${campaign.id}`, token ?? undefined)
            toast.success('Campanha excluída com sucesso!')
            onDeleted?.()
        } catch (err) {
            toast.error('Erro ao excluir campanha.')
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{campaign.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p>
                    <strong>Orçamento:</strong> R$ {campaign.budget.toFixed(2)}
                </p>
                <p>
                    <strong>Status:</strong> {campaign.status}
                </p>
                <div className="flex gap-2 pt-2">
                    <Button variant="outline" onClick={handleEdit} className="cursor-pointer">
                        Editar
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} className="cursor-pointer">
                        Excluir
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}