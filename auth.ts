import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient, UserRole } from "@prisma/client"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserById } from './data/user';

const prisma = new PrismaClient()

export const {
    handlers:{GET,POST},
    auth,
    signIn,
    signOut
} = NextAuth({
callbacks:{
    //Just trying to block myself from signing in xD
    // async signIn({user}){
    //     const existingUser = await getUserById(user.id);
    //     if(!existingUser || !existingUser.emailVerified){
    //         return false
    //     }
    //     return true;
    // }
    
    async session({token,session}){
        if(token.sub && session.user){
            session.user.id = token.sub
        }   
        if(token.role && session.user){
            session.user.role = token.role as UserRole
        }
        return session
    },

    async jwt({token}){
        if(!token.sub){
            return token
        }
        const existingUser = await getUserById(token.sub);
        if(!existingUser){
            return token
        }
        token.role = existingUser.role
        return token
    }

},
adapter: PrismaAdapter(db),
session: { strategy: "jwt" },
...authConfig,
})