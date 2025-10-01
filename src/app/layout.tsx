import { QueryProvider } from '@/lib/QueryProvider'
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry'

import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <StyledComponentsRegistry>
          <QueryProvider>{children}</QueryProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
