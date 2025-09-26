import Footer from '@/app/shared/ui/Footer'
import Header from '@/app/shared/ui/Header'
import { AuthProvider } from '@/auth/domain/AuthContext'
import { CartProvider } from '@/cart/domain/useCart'

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
