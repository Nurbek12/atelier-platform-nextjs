import { JWT } from "next-auth/jwt"
import NextAuth, { DefaultSession, DefaultJWT } from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  } 
}