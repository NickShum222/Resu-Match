import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";


const Sidebar = () => {
  const navigate = useNavigate();
  const navLinks = [
    {
      name: "Home",
      path: "/dashboard",
    },
    {
      name: "Jobs",
      path: "/jobs",
    },
    {
      name: "Resumes",
      path: "/resumes",
    },
    {
      name: "Account",
      path: "/account",
    },
  ]

  const [activeLink, setActiveLink] = useState(navLinks[0].name)
  return (
   <>
   <div className="bg-secondary w-[10%] h-[100dvh] flex flex-col justify-between items-center py-4">
    <div>
    <h3 className='text-white font-bold text-[20px]'>Resume</h3>
    </div>
    <div>
      Account
    </div>

   </div>
   </>
  )
}

export default Sidebar