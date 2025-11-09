import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vitrine de Sêmen',
  description: 'Aplicação para vitrine de sêmen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
