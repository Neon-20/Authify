"use server";

import {LoginSchema} from "@/schema";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {AuthError} from "next-auth";
import { generateVerificationToken } from "@/lib/token";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const Login = async(values:z.infer<typeof LoginSchema>) =>{
    //validate these fields on server side as well
    // because data can be manipulated from client side as well
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return{
            error:"Invalid Fields"
        }
    }

    //If the details are validated then we have as
    const {email,password} = validatedFields.data
    const existingUser = await getUserByEmail(email);
    if(!existingUser?.email || !existingUser || !existingUser.password){ //
        return {
        error:"Email doesn't exist"
        }
    }

    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);
        
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )
        
        return {    
            success:"Confirmation email sent!"
        }
    }

    try{
    await signIn("credentials",{
        email,
        password,
        redirectTo:DEFAULT_LOGIN_REDIRECT,
    })
    }
    catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {
                        error:"Invalid Credentials"
                    }
                default:
                    return{
                        error:"Something went wrong"
                    }
            }
        }
        throw error;
    }
}
