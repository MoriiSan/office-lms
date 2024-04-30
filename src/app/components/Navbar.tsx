"use client";

import React, { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa"; // Import the icon you want to use for the dashboard page

interface NavbarProps {
  isDashboardPage?: boolean; // Define a prop to indicate whether the current page is the dashboard page
}

const Navbar: React.FC<NavbarProps> = ({ isDashboardPage = false }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 flex w-full flex-wrap items-center justify-between px-14 py-2 text-[#274029] lg:py-4 
            ${
              scrolled ? `border-b border-[#274029] bg-white` : "bg-[#f1ede5] "
            }`}
      >
        <div className="flex w-full items-center justify-between h-[40px]">
          <div className="flex items-center ms-2">
            <a
              className="text-xl font-extrabold hover:text-[#9ea93f] mr-10"
              href="/"
            >
              AcademiaQuest!
            </a>
            <div className="flex gap-10 font-medium">
              <p className="flex gap-1 items-center justify-center hover:text-[#9ea93f]">
                Courses <GoChevronDown />
              </p>
              <p className="flex gap-2 items-center justify-center hover:text-[#9ea93f]">
                Resources <GoChevronDown />
              </p>
              <p className="flex gap-2 items-center justify-center hover:text-[#9ea93f]">
                Community <GoChevronDown />
              </p>
              <p className="flex gap-2 items-center justify-center hover:text-[#9ea93f]">
                Pricing <GoChevronDown />
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            {isDashboardPage ? (
              // Render the user icon for the dashboard page
              <FaUserCircle
                size={40}
                className="cursor-pointer text-[#3d481e]"
              />
            ) : (
              // Render the login button for other pages
              <div className="rounded-lg py-1 px-2">Log In</div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
