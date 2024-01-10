"use client"
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";


const NavBar = () => {
    const pathname = usePathname();
    return ( 
        <nav className="
        border shadow-md  border-purple-400 flex justify-between items-center p-4
        rounded-xl w-[600px] backdrop-blur-sm">
        <div className="flex gap-x-2">
        {/* Now with this gap render all the navbar list items */}
        <Button
        className="hover:bg-accent"
        variant={pathname === "/server" ? "outline" : "ghost"}
        asChild>
            <Link href="/server">
            Server
            </Link>
        </Button>
        <Button
        className="hover:bg-accent"
        variant={pathname === "/client" ? "outline" : "ghost"}
        asChild>
            <Link href="/client">
            Client
            </Link>
        </Button>
        <Button
        className="hover:bg-accent"
        variant={pathname === "/admin" ? "outline" : "ghost"}
        asChild>
            <Link href="/admin">
            Admin
            </Link>
        </Button>
        <Button
        className="hover:bg-accent"
        variant={pathname === "/settings" ? "outline" : "ghost"}
        asChild>
            <Link href="/settings">
            Settings
            </Link>
        </Button>
        </div>
        <UserButton/>
        </nav>
    );
}

export default NavBar;