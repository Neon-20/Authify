"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps{
    children:React.ReactNode,
    mode?:"modal" | "redirect"
    asChild?:boolean;
}

export const LoginButton = ({
    children,
    mode="redirect",
    asChild
}:LoginButtonProps ) => {
    const router = useRouter();

    const onClick = () =>{
    router.push("/auth/login")
    }
    
    if(mode === "modal"){
        return(
            <p>
                TODO:Modal to be implemented
            </p>
        )
    }

    return ( 
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
}


//Only for checking whether the current user is logged in or not
