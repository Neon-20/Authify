"use client"

import UserInfo from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import {motion} from "framer-motion";

const ClientPage = () => {
    //fetch current user
    const user = useCurrentUser()
    return ( 
        <motion.div
        initial={{ opacity: 0.5, scale: 0.75 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-4 items-center text-center justify-center">
        <UserInfo   
        label="Client Component 👨🏻‍💻"
        user = {user}
        />
        </motion.div>
    );
}

export default ClientPage;