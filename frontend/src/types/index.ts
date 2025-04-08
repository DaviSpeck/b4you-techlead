export type LoginResponse = {
    accessToken: string
    refreshToken: string
}

export type User = {
    id: number
    name: string
    email: string
}

export type CampaignStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED'

export type Campaign = {
    id: number
    name: string
    budget: number
    status: CampaignStatus
    createdAt: string
    updatedAt: string
}