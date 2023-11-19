import React from "react";
import { styles } from "../styles";
import { Link } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
export default function Landing() {
  return (
    <>
    <div
      className={`relative bg-black h-[100dvh] px-[50px] py-[20px] w-100 justify-between items-center flex flex-col`}
    >
      <div className="w-full flex justify-end items-center text-white">
          <Link to="/login">
            <Button           className="rounded-none normal-case py-3 px-8 font-normal text-[12px] md:text-[14px] lg:text-[16px]   text-highlight transition-all hover:bg-primary/40 active:bg-primary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-transparent"
          data-ripple-light="true">
              Login
            </Button>
          </Link>
 
        <Button
          className="rounded-full normal-case py-2 px-5 font-normal text-[12px] md:text-[14px] lg:text-[16px]  text-white transition-all bg-primary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none  "
          data-ripple-light="true"
        >
          Get Started
        </Button>
      </div>
      <div className="flex justify-center items-center  flex-col">
        <div className="text-white font-bold text-[48px]">
          Resu.<span className="text-primary">me</span>
        </div>
        <div className="font-bold text-white text-[40px]">
          Elevate Your Job Application Game
        </div>
      </div>
      <div className="w-[75%]">
        <div className="bg-[#BFBFBF] w-full h-[500px]"/>
      </div>solid-cyan-600
    </div>
    <div/>
    </>
  );
}
