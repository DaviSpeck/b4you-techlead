'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { getAccessToken } from '@/lib/tokens'
import { Campaign } from '@/types'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { CampaignCard } from '@/components/CampaignCard'
import { toast } from 'sonner'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function DashboardPage() {
    const router = useRouter()
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [loading, setLoading] = useState(true)

    const fetchCampaigns = async () => {
        try {
            const token = getAccessToken() ?? undefined
            const data = await api.get<Campaign[]>('/campaigns', token)
            setCampaigns(data)
        } catch (err) {
            toast.error('Erro ao carregar campanhas')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCampaigns()
    }, [])

    return (
        <ProtectedRoute>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Minhas Campanhas</h1>
                    <Button onClick={() => router.push('/dashboard/create')} className="cursor-pointer">
                        Nova Campanha
                    </Button>
                </div>

                {loading ? (
                    <p>Carregando...</p>
                ) : campaigns.length === 0 ? (
                    <p>Nenhuma campanha encontrada.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {campaigns.map((campaign) => (
                            <CampaignCard
                                key={campaign.id}
                                campaign={campaign}
                                onDeleted={fetchCampaigns}
                            />
                        ))}
                    </div>
                )}
            </div>
        </ProtectedRoute>
    )
}