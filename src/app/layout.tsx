import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '특별한 시간 — 의견 조사',
  description: 'AI 웨딩 플래닝 서비스 "특별한 시간"에 대한 의견을 들려주세요',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-[#FAFAF8] text-[#1a2332] antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
