import NextAuth,{DefaultSession} from "next-auth";


export type ExtendedUser = DefaultSession["user"] & {
    role:UserRole,
    isTwoFactorEnabled:Boolean
}

declare module "next-auth" {
    interface Session{
        user:ExtendedUser
    }
}