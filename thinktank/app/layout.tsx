import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ThinkTank",
  description: "A platform for knowledge sharing and collaboration",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="container mx-auto px-4 py-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'