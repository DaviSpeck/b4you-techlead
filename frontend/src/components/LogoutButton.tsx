'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function LogoutButton() {
    const { logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        toast.success('Você saiu da conta.')
        router.push('/login')
    }

    return (
        <Button variant="outline" size="sm" onClick={handleLogout} className="cursor-pointer">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
        </Button>
    )
}