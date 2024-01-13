// import { auth, signOut } from "@/auth";
"use client"
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import {motion} from "framer-motion";
import{
Card,
CardContent,
CardDescription,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import { settings } from "@/actions/settings";
import { useTransition,useState } from "react";
import { useSession } from "next-auth/react";
import * as z from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
Form,
FormControl,
FormDescription,
FormField,
FormLabel,
FormItem,
FormMessage,
} from "@/components/ui/form"
import { SettingsSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { admin } from '../../../actions/admin';
import {Switch} from "@/components/ui/switch"

import {
Select,
SelectContent,
SelectGroup,
SelectItem,
SelectLabel,
SelectScrollDownButton,
SelectScrollUpButton,
SelectTrigger,
SelectValue
} from "@/components/ui/select"
import { UserRole } from "@prisma/client";
import {IoSettingsOutline} from "react-icons/io5";

const SettingsPage = () =>{
    const user = useCurrentUser();
    const{update} = useSession();
    const [isPending,startTransition] = useTransition();
    const[error,setError] = useState<string|undefined>();
    const[success,setSuccess] = useState<string|undefined>();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver:zodResolver(SettingsSchema),
        defaultValues:{
            name:user?.name || undefined,
            email:user?.email || undefined,
            password:undefined,
            newPassword:undefined,
            role:user?.role || undefined,
            isTwoFactorEnabled:user?.isTwoFactorEnabled|| undefined
        }
    })


    const onSubmit = (values:z.infer<typeof SettingsSchema>) =>{
        startTransition(()=>{
        settings(values)
        .then((data)=>{
            if(data.error){
                setError(data.error)
                toast.error("Something went wrong while updating!")
            }
            if(data.success){
                update()
                setSuccess(data.success)
                toast.success("Details got updated!")
            }
        })
        .catch(()=>{
            setError("Something went wrong")
        })
    })
    }
    
    return(
        <motion.div 
        initial={{ opacity: 0.5, scale: 0.75 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 0.5}}
        className="backdrop-blur-sm rounded-xl mt-4">
        <Card className="w-[600px] bg-black">
            <CardHeader>
            <p className="text-2xl items-center justify-center inline-flex font-semibold text-center">Settings 
            <IoSettingsOutline className ="ml-2"/>
            </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form 
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                    >
                    <div className="space-y-3">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input 
                                className="cursor-pointer backdrop-blur-sm
                                focus-visible:ring-1
                                focus-visible:ring-offset-0"
                                {...field}
                                placeholder="Pranav Rajveer"
                                required
                                type="text"
                                disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />  
                    {user?.isOAuth === false && (
                        <>
                    <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input 
                                className="cursor-pointer backdrop-blur-sm
                                focus-visible:ring-1
                                focus-visible:ring-offset-0"
                                {...field}
                                placeholder="pranav@engineer.com"
                                type="email"
                                disabled={isPending}
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input 
                                className="cursor-pointer backdrop-blur-sm
                                focus-visible:ring-1
                                focus-visible:ring-offset-0"
                                {...field}
                                placeholder="******"
                                type="password"
                                disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="newPassword"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input 
                                className="cursor-pointer backdrop-blur-sm
                                focus-visible:ring-1
                                focus-visible:ring-offset-0"
                                {...field}
                                placeholder="******"
                                type="password"
                                disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    </>
                    )}
                    <FormField
                    control={form.control}
                    name="role"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue
                                    className="cursor-pointer backdrop-blur-sm
                                    focus-visible:ring-1
                                    focus-visible:ring-offset-0"
                                    placeholder="Select a Role"/>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value={UserRole.ADMIN}>
                                    Admin
                                </SelectItem>
                                <SelectItem value={UserRole.USER}>
                                    User
                                </SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    {user?.isOAuth === false && (
                        <>
                    <FormField
                    control={form.control}
                    name="isTwoFactorEnabled"
                    render={({field})=>(
                        <FormItem className="flex flex-row
                        items-center justify-between rounded-lg shadow-sm
                        p-3 border backdrop-blur-sm">
                            <div className="space-y-1">
                            <FormLabel>Two Factor Authentication</FormLabel>
                            <FormDescription>
                                Enable Two Factor Authentication for your account.
                            </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                disabled={isPending}
                                checked = {field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    </>
                    )}
                    </div>
                    <div className="text-center items-center justify-center">
                    <Button
                    variant={"outline"} size="lg" type="submit">
                        Save
                    </Button> 
                    </div>                 
                    </form>
                </Form>
            </CardContent>
        </Card>
        </motion.div>
    ) 
}

export default SettingsPage