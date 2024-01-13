"use client";
import React from "react";
import  SparklesCore  from '../../components/sparkles';
import { ThreeDCardDemo } from "./use-3dcard";
import { LoginButton } from "@/components/auth/login-button";
import { StartNowButton } from "./landing-start-button";
import Lottie from "lottie-react";
import animationData from "@/public/lottie/moving-file/Animation1.json";

export function SparklesPreview() {
  return (
    <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center">
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
