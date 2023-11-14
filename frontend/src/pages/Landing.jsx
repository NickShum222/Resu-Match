import React from 'react'
import { Button } from '@material-tailwind/react'
export default function Landing() {
  return (
    <div className='bg-black h-[100vh] w-100 justify-start items-center flex-col'>
      <div className="w-100 flex justify-end items-center text-white">
      <Button
              className="rounded-none normal-case py-3 px-8 font-normal font-mono text-[14px] md:text-[16px] lg:text-[18px]   text-highlight transition-all hover:bg-highlight/10 active:bg-highlight/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none  "
              data-ripple-light="true"
            >
              <a >Contact</a>
            </Button>
        <button>get started</button>
      </div>
      <div className="flex justify-center items-center  flex-col">
        <div className="text-white font-bold text-[48px]">Resume</div>
        <div className='font-bold text-white'>Elevate Your Job Application Game</div>
        <div className='w-[70%] bg-[#BFBFBF] h-[500px]'/>
      </div>
    </div>
  )
}
