import React, { useState, useEffect } from "react";
import { GoHome } from "react-icons/go";
import { PiNotePencil } from "react-icons/pi";
import { IoDocumentTextOutline, IoPersonOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const navLinks = [
    {
      name: "Home",
      path: "/dashboard",
      icon: GoHome,
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: PiNotePencil,
    },
    {
      name: "Resumes",
      path: "/resumes",
      icon: IoDocumentTextOutline,
    },
    {
      name: "Account",
      path: "/account",
      icon: IoPersonOutline,
    },
  ];

  const [activeLink, setActiveLink] = useState(navLinks[0].name);
  return (
    <>
      <div className="bg-secondary px-8 absolute left-0 top-0 w-[275px] h-[100dvh] flex flex-col justify-between items-start py-8  border-border border-solid">
        <div>
          <h3 className="text-white font-bold text-[28px] text-center mb-10">
            Resu<span className="text-tertiary">Match</span>
          </h3>
          {navLinks.map((link, index) => {
            const { path, name, icon: IconComponent } = link;
            return (
              <Link to={path} key={index}>
                <div
                  className={`flex items-center justify-start w-[100%] py-2 px-4 gap-4 rounded-lg cursor-pointer text-[24px] text-[#Bfbfbf] hover:text-white transition-colors duration-250 font-light`}
                  onClick={() => setActiveLink(name)}
                >
                  <IconComponent />
                  <div>{name}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <div>Account</div>
      </div>
    </>
  );
};

export default Sidebar;
