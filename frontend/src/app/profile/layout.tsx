import { Header } from '@/components/Header'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
    )
}