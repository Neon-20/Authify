// import { auth, signOut } from "@/auth";
"use client"
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";

const SettingsPage = () =>{
    const session = useCurrentUser();
    const onClick = () =>{
        signOut();
    }
    return(
        <div className="bg-white backdrop-blur-sm rounded-xl">
        <Button
        onClick={onClick}
        type="submit"
        className="items-center flex justify-center 
        px-4 py-2 text-sm font-medium text-white hover:text-black bg-red-600"
        >
        SignOut
        </Button>
        </div>
    ) 
}

export default SettingsPage