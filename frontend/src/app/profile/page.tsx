'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { getAccessToken } from '@/lib/tokens'
import { api } from '@/lib/api'
import { toast } from 'sonner'
import { useAuth } from '@/lib/auth'
import { User } from '@/types'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function ProfilePage() {
    const { user, setUser } = useAuth()

    const [name, setName] = useState(user?.name || '')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [saving, setSaving] = useState(false)
    const [changingPassword, setChangingPassword] = useState(false)

    const token = getAccessToken() ?? ''

    const handleNameUpdate = async () => {
        try {
            setSaving(true)
            const updatedUser = await api.patch<User>(`/users/${user?.id}`, { name }, token)
            setUser(updatedUser)
            toast.success('Nome atualizado com sucesso!')
        } catch {
            toast.error('Erro ao atualizar nome.')
        } finally {
            setSaving(false)
        }
    }

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword) {
            toast.error('Preencha todos os campos de senha.')
            return
        }

        try {
            setChangingPassword(true)
            await api.post('/auth/change-password', {
                currentPassword,
                newPassword,
            }, token)
            toast.success('Senha atualizada com sucesso!')
            setCurrentPassword('')
            setNewPassword('')
        } catch (err: any) {
            toast.error(err.message || 'Erro ao trocar senha.')
        } finally {
            setChangingPassword(false)
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const freshUser = await api.get<User>('/auth/me', token)
                setUser(freshUser)
                setName(freshUser.name)
            } catch {
                toast.error('Erro ao carregar perfil.')
            }
        }

        if (!user) {
            fetchUser()
        } else {
            setName(user.name)
        }
    }, [user])

    return (
        <ProtectedRoute>
            <div className="flex items-center justify-center h-[calc(100vh-64px)] px-4">
                <div className="w-full max-w-md space-y-8">
                    <h1 className="text-2xl font-bold text-center">Meu Perfil</h1>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleNameUpdate} disabled={saving} className="w-full">
                            {saving ? 'Salvando...' : 'Salvar nome'}
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="currentPassword">Senha Atual</Label>
                            <Input
                                id="currentPassword"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="newPassword">Nova Senha</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <Button onClick={handleChangePassword} disabled={changingPassword} className="w-full">
                            {changingPassword ? 'Atualizando...' : 'Trocar Senha'}
                        </Button>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}