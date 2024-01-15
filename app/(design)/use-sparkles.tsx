"use client";
import React from "react";
import  SparklesCore  from '../../components/sparkles';
import { ThreeDCardDemo } from "./use-3dcard";
import { LoginButton } from "@/components/auth/login-button";
import { StartNowButton } from "./landing-start-button";
import Lottie from "lottie-react";
import animationData from "@/public/lottie/moving-file/Animation1.json";
import Link from "next/link";
import {motion} from "framer-motion";
import Logo from "../(marketing)/_components/logo";

export function SparklesPreview() {
  return (
    <div className="h-screen relative w-full flex flex-col items-center justify-center">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
        />
      </div>
      <div className="top-0 fixed left-0 p-4">
      <Logo/>
      </div>
      <div className="cursor-pointer">
      <motion.button
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full"
            >
      <Link href="https://www.producthunt.com/posts/authify?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-authify" target="_blank" className="cursor-pointer">
      <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=434549&theme=light" alt="Authify - Quick Authentication Setup for Devs | Product Hunt"
      className="w-[200px] h-[54px] backdrop-blur-sm hover:transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 duration-300"/>
      </Link>
      </motion.button>
      </div>
      <div className="flex justify-center items-center">
      <Lottie
        animationData={animationData}
        className="flex justify-center h-32 items-center"
        loop={true}
      />
      </div>
      <div className="flex flex-col items-center justify-center 
      w-full mb-6 z-50">
      <div className="inline-flex gap-x-4">
      <h1 className="mb-2 flex text-4xl font-bold sm:text-5xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-tr from-violet-600 to-neutral-300/90 capitalize max-sm:text-[1.4rem] md:max-w-3xl lg:max-w-5xl">
        Authify For Devs 
      </h1>
      <span className="text-6xl mt-2 font-bold hidden lg:flex">🔐</span>
      </div>
      <p className="max-w-[720px] leading-7 font-medium text-center text-[16px] bg-clip-text text-transparent bg-gradient-to-br from-violet-200  to-slate-500 max-sm:text-xs">
      Authify presents a simple yet robust authentication system designed to meet the specific needs of developers. 👨🏻‍💻</p>
      </div>
      {/* <div className="flex flex-col items-center justify-center w-full"> */}
      <LoginButton asChild>
        {/* Can put mode="modal" if wanted later */}
      <StartNowButton/>
      </LoginButton>
      {/* </div> */}
    </div>
  );
}
