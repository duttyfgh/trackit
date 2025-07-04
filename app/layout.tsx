import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { auth } from "@/auth"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}