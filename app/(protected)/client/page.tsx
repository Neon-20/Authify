"use client"

import UserInfo from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
    //fetch current user
    const user = useCurrentUser()
    console.log(user)
    return ( 
        <div className="mt-4 items-center text-center justify-center">
        <UserInfo 
        label="Client Component 👨🏻‍💻"
        user = {user}
        />
        </div>
    );
}

export default ClientPage;