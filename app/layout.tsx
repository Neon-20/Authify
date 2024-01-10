import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster, toast } from 'sonner'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Authify',
  description: 'One Source for all authentication requirements',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  return (
    <SessionProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Toaster position='top-center' richColors/>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
      </body>
    </html>
    </SessionProvider>
  )
}
