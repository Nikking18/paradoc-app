import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      // Add user ID to session
      if (session.user && token) {
        (session.user as { id: string }).id = token.id as string
      }
      return session
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        (token as { id: string }).id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
