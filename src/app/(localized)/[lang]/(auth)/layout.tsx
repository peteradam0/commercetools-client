import { AuthProvider } from '@/auth/domain/AuthContext'

export default function AuthPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
