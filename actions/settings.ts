"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { CurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schema";
import { error } from "console";
import * as z from "zod";

export const settings = async(values:z.infer<typeof SettingsSchema>) =>{
    // console.log("This takes the click")
    const user = await CurrentUser();
    if(!user){
        return{
            error:"UnAuthorized"
        }
    }

    //also check whether it exists in db
    const dbUser = await getUserById(user.id);
    if(!dbUser){
        return{
            error:"UnAuthorized"
        }
    }
    
    //if user is OAuth we will show different settings to him
    if(user.isOAuth){
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
    }

    if(values.email && values.email!==user.email){
        const existingUser = await getUserByEmail(values.email);
        if(existingUser && existingUser.id!==user.id){
            return{
                error:"Email Already in use!"
            }
        }
    }

    //finally user does exist
    await db.user.update({
        where:{
            id:dbUser.id
        },
        data:{
            ...values
        }
    })
    return{
        success:"Settings Updated"
    }
}