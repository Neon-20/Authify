import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient, UserRole } from "@prisma/client"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserById } from './data/user';
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"

const prisma = new PrismaClient()

export const {
    handlers:{GET,POST},
    auth,
    signIn,
    signOut
} = NextAuth({
pages:{
    signIn:"/auth/login",
    error:"/auth/error"
},
//automatically populate the email-verified fields if we login with Oauth
events:{
    async linkAccount({user}){
        await db.user.update({
            where:{
                id:user.id,
            },
            data:{
                emailVerified: new Date()
            }
        })
    }
},

//match for second checking.

callbacks:{
    //Just trying to block myself from signing in xD if I am not verified
    async signIn({user,account}){
        // console.log({
        //     user,
        //     account
        // })

        //Allow OAuth without email verification
        if(account?.provider!=="credentials") return true;
        
        const existingUser = await getUserById(user.id);

        //prevent signIn without email verification
        if(!existingUser?.emailVerified) return false;

        //do 2FA callback
        if(existingUser.isTwoFactorEnabled && existingUser.email){
            const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id) 
            if(!twoFactorConfirmation){
                return false;
            }
        await db.twoFactorConfirmation.delete({
            where:{
                id:twoFactorConfirmation.id
            }
        })
        }
        
        return true;
    },
    
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