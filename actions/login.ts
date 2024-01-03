"use server";

import {LoginSchema} from "@/schema";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {AuthError} from "next-auth";

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
