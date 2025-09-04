import Header from '@/app/shared/ui/Header'

export default function ShopPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  )
}
