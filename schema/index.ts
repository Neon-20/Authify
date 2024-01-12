import * as z from "zod"


export const SettingsSchema = z.object({
    name:z.optional(z.string())
})

export const LoginSchema = z.object({
        email:z.string().email({
        message:"Email is required"
    }),
    password:z.string().min(1,{
        message:"Password is required"
    }),
    code:z.optional(z.string())
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

export const ResetSchema = z.object({
    email:z.string().email({
    message:"Email is required"
}),
})

export const NewPasswordSchema = z.object({
    password:z.string().min(1,{
    message:"Password is required"
}),
})






