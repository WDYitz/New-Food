import { PrismaAdapter } from '@auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'
import { db } from './prisma'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  adapter: PrismaAdapter(db) as Adapter,
  callbacks: {
    async session({ session, user }) {
      session.user = { ...session.user, id: user.id }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}