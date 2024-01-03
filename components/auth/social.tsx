"use client";

import { Button } from "../ui/button";
import {FcGoogle} from "react-icons/fc";
import { FaGithub } from "react-icons/fa";


export const Social = () =>{


    return(
    <div className="flex items-center w-full gap-x-2">
    <Button
    size="lg"
    className="w-full cursor-pointer hover:bg-slate-900 z-10"
    variant="outline"
    onClick={() => {}}
    >
    <FcGoogle className="h-5 w-5"/>
    </Button>
    <Button
    size="lg"
    className="w-full hover:bg-slate-900 z-10"
    variant="outline"
    onClick={()=>{}}
    >
    <FaGithub className="h-5 w-5" />
    </Button>
    </div>
    )
}