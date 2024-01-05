import React, { useState, useEffect } from "react";
import { IoMdHome } from "react-icons/io";
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
  ];

  const [activeLink, setActiveLink] = useState(navLinks[0].name);
  return (
    <>
      <div className="bg-secondary absolute left-0 top-0 w-[10%] h-[100dvh] flex flex-col justify-between items-center py-4">
        <div>
          <h3 className="text-white font-bold text-[24px] text-center mb-10">
            Resu.<span className="text-tertiary">me</span>
          </h3>
          <div className="text-white text-[20px">
            {navLinks.map((link, index) => (
              <Link to={link.path} key={index}>
                <div
                  className={`flex items-center justify-center w-[100%] py-2 px-4 rounded-lg cursor-pointer ${
                    activeLink === link.name
                      ? " text-white"
                      : "text-white/50 hover:text-tertiary/50"
                  }`}
                  onClick={() => setActiveLink(link.name)}
                >
                  {link.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div>Account</div>
      </div>
    </>
  );
};

export default Sidebar;
