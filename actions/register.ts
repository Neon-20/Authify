"use server";

import {RegisterSchema} from "@/schema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const Register = async(values:z.infer<typeof RegisterSchema>) =>{
    
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success){
        return{
            error:"Invalid Fields"
        }
    }
    const {email,name,password} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password,10);
    
    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return{
            error:"Email Already in use"
        }
    }

    await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })

    //TODO: send verification token email
    //We never have to allow someone who hasn't verified their emails


    //If the details are validated then we have as
    return {
        success: "Email sent"
    }
    
}