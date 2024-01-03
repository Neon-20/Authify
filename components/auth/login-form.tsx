"use client";
import { CardWrapper } from "./card-wrapper";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import  {LoginSchema}  from "@/schema";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Login } from "@/actions/login";
import { useState, useTransition } from "react";

export const LoginForm = () => {
    const[error,setError] = useState<string | undefined>("");
    const[success,setSuccess] = useState<string | undefined>("");
    const[isPending,startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })

    const onSubmit = (values:z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(()=>{
        Login(values).
        then((data) => {
        setError(data.error);
        setSuccess(data.success)
        })
    })
    }

    return ( 
        <CardWrapper
        headerLabel = "Welcome to Auth for Devs"
        backButtonlabel = "Don't have an account?"
        backButtonHref = "/auth/register"
        showSocial
        >
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        >
            
            <FormField  
            control={form.control}
            name="email"
            render={({field})=>(
                <FormItem>  
                    <FormLabel>
                        Email
                    </FormLabel>
                    <FormControl>
                        <Input
                        className="cursor-pointer backdrop-blur-sm
                        focus-visible:ring-1
                        focus-visible:ring-offset-0"
                        {...field}
                        type="email"
                        placeholder="john@gmail.com"
                        disabled = {isPending}
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
            <FormField  
            control={form.control}
            name="password"
            render={({field})=>(
                <FormItem>
                    <FormLabel>
                        Password
                    </FormLabel>
                    <FormControl>
                        <Input
                        className="cursor-pointer backdrop-blur-sm
                        focus-visible:ring-1
                        focus-visible:ring-offset-0"
                        {...field}
                        type="password"
                        placeholder="*******"
                        disabled = {isPending}
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
            {/* </div> */}
            <FormError message = {error}/>
            <FormSuccess message = {success}/>
            <Button
            size="lg"
            className="w-full hover:bg-slate-900 backdrop-blur-sm cursor-pointer"
            variant="outline" 
            type="submit"  
            disabled = {isPending}
            >
            Login
            </Button>
        </form>
        </Form>
        </CardWrapper>
    );
}



