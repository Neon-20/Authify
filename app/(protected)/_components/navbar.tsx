"use client"
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {motion} from "framer-motion";


const NavBar = () => {
    const pathname = usePathname();
    return ( 
        <nav className="
        border shadow-md flex justify-between items-center p-4
        rounded-xl w-[390px] md:w-[600px] backdrop-blur-sm">
        <div className="flex gap-x-2">
        {/* Now with this gap render all the navbar list items */}
        <motion.button
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full"
            >
        <Button
        className="hover:bg-accent"
        variant={pathname === "/server" ? "outline" : "ghost"}
        asChild>
            <Link href="/server">
            Server
            </Link>
        </Button>
        </motion.button>
        <motion.button
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full"
            >
        <Button
        className="hover:bg-accent"
        variant={pathname === "/client" ? "outline" : "ghost"}
        asChild>
            <Link href="/client">
            Client
            </Link>
        </Button>
        </motion.button>
        <motion.button
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full"
            >
        <Button
        className="hover:bg-accent"
        variant={pathname === "/admin" ? "outline" : "ghost"}
        asChild>
            <Link href="/admin">
            Admin
            </Link>
        </Button>
        </motion.button>
        <motion.button
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full"
            >
        <Button
        className="hover:bg-accent"
        variant={pathname === "/settings" ? "outline" : "ghost"}
        asChild>
            <Link href="/settings">
            Settings
            </Link>
        </Button>
        </motion.button>
        </div>
        <UserButton/>
        </nav>
    );
}

export default NavBar;