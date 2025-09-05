/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { authenticateUser } from "@/lib/auth"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const { user, error } = await authenticateUser(
            credentials.email,
            credentials.password
          );

          if (error || !user) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            emailVerified: user.emailVerified,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      // Add user ID and additional info to session
      if (session.user && token) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { firstName: string }).firstName = token.firstName as string;
        (session.user as { lastName: string }).lastName = token.lastName as string;
        (session.user as { emailVerified: boolean }).emailVerified = token.emailVerified as boolean;
      }
      return session
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        (token as { id: string }).id = user.id;
        (token as { firstName: string }).firstName = user.firstName;
        (token as { lastName: string }).lastName = user.lastName;
        (token as { emailVerified: boolean }).emailVerified = user.emailVerified;
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
