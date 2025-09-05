import Footer from '@/app/shared/ui/Footer'
import Header from '@/app/shared/ui/Header'

export default function ShopPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex flex-col min-h-lvh'>{children}</main>
      <Footer />
    </div>
  )
}
