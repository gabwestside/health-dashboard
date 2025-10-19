import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Projeto Florescer - Dashboard",
  description: "Acompanhamento - Projeto Florescer",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="pt-BR">
        <head>
        {/* Material Symbols Outlined */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@300..700&display=optional"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
