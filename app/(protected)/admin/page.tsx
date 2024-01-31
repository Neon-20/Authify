"use client"
import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
import {motion} from "framer-motion";

const AdminPage = () => {
    const onApiRouteClick = async() => {
        const response = await fetch("/api/admin")
        if(response.ok){
            toast.success("Allowed API Route!")
        }
        else{
            toast.error("Forbidden API Route!")
        }
    }
    
    const onServerActionClick = () => {
    admin()
    .then((data)=>{
        if(data?.error){
            toast.error("Forbidden Server Action!")
        }
        else{
            toast.success("Allowed Server Action!")
        }
    })
    }

    const role =  useCurrentRole();
    return (

        <motion.div
        initial={{ opacity: 0.5, scale: 0.75 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 0.5 }}
        >
        <Card className="w-[390px] md:w-[600px] mt-4 backdrop-blur-sm bg-black">
        <CardHeader>
            <p className="text-center items-center text-2xl font-semibold">
                Admin 🔑
            </p>
        </CardHeader>
        <CardContent>
        <div className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="You are allowed to see this content"/>
        </RoleGate>
        <div className="flex flex-row items-center justify-between
        p-3 shadow-md rounded-lg border">
            <p className="text-sm font-medium">ADMIN-only API Route</p>
            <Button
            variant="outline"
            onClick={onApiRouteClick}
            >
                Test Here
            </Button>
        </div>
        <div className="flex flex-row items-center justify-between
        p-3 shadow-md rounded-lg border">
            <p className="text-sm font-medium">ADMIN-only Server Action</p>
            <Button
            variant="outline"
            onClick = {onServerActionClick}
            >
                Test Here
            </Button>
        </div>
        </div>
        </CardContent>
        </Card>
        </motion.div>

    );
}

export default AdminPage;