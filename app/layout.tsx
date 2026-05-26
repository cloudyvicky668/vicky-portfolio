import './globals.css'
import type { Metadata } from 'next'
import ViewModeProvider from './ViewModeProvider'
import ClientLayout from './ClientLayout'

export const metadata: Metadata = {
  title: 'Vicky Zhao - Creative Designer',
  description: 'A personal brand website showcasing design portfolio and creative work',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen w-full max-w-full overflow-x-hidden overflow-y-auto bg-[#FAF6EF]" style={{ margin: 0, padding: 0 }}>
        <ClientLayout>
          <ViewModeProvider>
            {children}
          </ViewModeProvider>
        </ClientLayout>
      </body>
    </html>
  )
}
