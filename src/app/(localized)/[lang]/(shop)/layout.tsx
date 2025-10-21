import { AuthProvider } from '@/app/bounded-contexts/auth/domain/AuthContext'
import { CartProvider } from '@/app/bounded-contexts/cart/domain/useCart'
import Footer from '@/app/bounded-contexts/shared/ui/Footer'
import Header from '@/app/bounded-contexts/shared/ui/Header'

export default function ShopPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <CartProvider>
        <div className='min-h-screen flex flex-col'>
          <Header />
          <main className='flex flex-col min-h-lvh'>{children}</main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
