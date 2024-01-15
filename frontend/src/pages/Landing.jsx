import React, { useState } from "react";
import { styles } from "../styles";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
export default function Landing() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const toSignup = () => {
    if (!email) return;
    navigate("/signup", { state: email });
    console.log(email);
  };
  return (
    <>
      <div
        className={`relative bg-black h-[100dvh] px-[50px] py-[20px] w-100 justify-start items-center flex flex-col overflow-hidden`}
      >
        <div className="w-full flex justify-end items-center text-white">
          <Link to="/login">
            <Button
              className="rounded-none normal-case py-3 px-8 font-normal text-[12px] md:text-[14px] lg:text-[16px]   text-highlight transition-all hover:bg-tertiary/40 active:bg-tertiary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-transparent"
              data-ripple-light="true"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              className="rounded-full normal-case py-2 px-5 font-normal text-[12px] md:text-[14px] lg:text-[16px]  text-white transition-all bg-tertiary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none  "
              data-ripple-light="true"
            >
              Get Started
            </Button>
          </Link>
        </div>
        <div className="flex justify-center items-center  flex-col mt-[7%]">
          <div className="text-white font-bold text-[64px]">
            Resu.<span className="text-tertiary">me</span>
          </div>
          <div className="font-bold text-white text-[48px]">
            Elevate Your Job Application Game
          </div>
          <div className="flex justify-center items-center w-full mt-5">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="bg-transparent border-[1px] border-r-0 text-[20px] outline-none rounded-l-full border-white rounded text-[#bfbfbf] px-5 py-2 w-[75%]"
              size="lg"
            />
            <Button
              size="sm"
              className={`text-[20px] border-t-[1px] border-r-[1px] border-b-[1px] border-white font-normal normal-case rounded-r-full px-5 py-2 ${
                email
                  ? "bg-tertiary text-white"
                  : "bg-tertiary/40 text-[#bfbfbf]"
              }`}
              onClick={toSignup}
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="w-[75%]">
          {/* <div className="bg-[#BFBFBF] w-full h-[500px]" /> */}
        </div>
        <div className="bg-tertiary blur-[750px] w-[75%] h-[75%] absolute -left-1/2 -bottom-1/3" />
        <div className="bg-tertiary blur-[750px] w-[75%] h-[75%] absolute -right-1/2 -bottom-1/3" />
      </div>
      <div />
    </>
  );
}
