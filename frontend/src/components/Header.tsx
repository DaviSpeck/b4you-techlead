import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogoutButton } from './LogoutButton'

export function Header() {
    return (
        <header className="w-full h-16 px-6 flex items-center justify-between bg-card border-b">
            <Link href="/dashboard" className="text-lg font-bold">Painel de Campanhas</Link>
            <div className="flex items-center gap-4">
                <Link href="/dashboard">
                    <Button variant="ghost" className="cursor-pointer">Dashboard</Button>
                </Link>
                <Link href="/profile">
                    <Button variant="ghost" className="cursor-pointer">Perfil</Button>
                </Link>
                <LogoutButton />
            </div>
        </header>
    )
}
