import * as z from "zod"

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;


export const LoginSchema = z.object({
        email:z.string().email({
        message:"Email is required"
    }),
    password:z.string().min(1,{
        message:"Password is required"
    }) 
})

export const RegisterSchema = z.object({
    email:z.string().email({
    message:"Email is required"
}),

password:z.string().min(6,{
    message:"Minimum characters should be 6"
}),

name:z.string().min(1,{
    message:"Name is required"
})
})


