"use client";
import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtoProps{
    label:string,
    href:string
}

export const BackButton = ({
    label,
    href
}:BackButtoProps) =>{
return(
    <Button
    size="sm"
    variant="link"
    className="font-normal w-full z-10 hover:animate-pulse"
    asChild
    >
        <Link href = {href}>
            {label}
        </Link>
    </Button>
)
}