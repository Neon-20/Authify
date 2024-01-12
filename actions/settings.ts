"use server";

import { getUserById } from "@/data/user";
import { CurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schema";
import { error } from "console";
import * as z from "zod";

export const settings = async(values:z.infer<typeof SettingsSchema>) =>{
    console.log("This takes the click")
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