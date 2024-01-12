// import { auth, signOut } from "@/auth";
"use client"
import { logout } from "@/actions/logout";
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

const SettingsPage = () =>{
    const{update} = useSession();
    const [isPending,startTransition] = useTransition();
    const[error,setError] = useState<string|undefined>();
    const[success,setSuccess] = useState<string|undefined>();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver:zodResolver(SettingsSchema),
        defaultValues:{
            name:""
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
            <p className="text-2xl font-semibold text-center">Settings 🔨</p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form 
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                    >
                    <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                placeholder="Pranav Rajveer"
                                type="text"
                                disabled={isPending}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                    />  
                    </div>
                    <Button type="submit">
                        Save
                    </Button>                  
                    </form>
                </Form>
            </CardContent>
        </Card>
        </motion.div>
    ) 
}

export default SettingsPage