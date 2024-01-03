"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { HeaderSection } from "./header";
import { Social } from "./social";

interface CardWrapperProps{
    children:React.ReactNode
    headerLabel:string
    backButtonlabel:string
    backButtonHref:string
    showSocial:boolean
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonlabel,
    backButtonHref,
    showSocial
}:CardWrapperProps) => {
    return ( 
            <Card className="w-[400px] shadow-md bg-black">
            <CardHeader>
            <HeaderSection label = {headerLabel}/>
            </CardHeader>
        <CardContent>
        {children}
        </CardContent>
        {showSocial && (
            <CardFooter>
                <Social/>
            </CardFooter>
        )}
        <CardFooter>
            <BackButton
            label = {backButtonlabel}
            href = {backButtonHref}
            />
        </CardFooter>
        </Card>
    );
} 
