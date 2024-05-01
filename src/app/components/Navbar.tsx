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
        className={`sticky z-10 top-0 flex w-full flex-wrap items-center justify-between px-14 py-2 text-[#071e22] lg:py-4 
            ${
              scrolled ? `border-b border-[#274029] bg-white` : "bg-[#fbe9da] "
            }`}
      >
        <div className="flex w-full items-center justify-between h-[40px]  mx-2">
          <div className="flex items-center">
            <a
              className="text-xl font-extrabold hover:text-[#24948e] mr-10"
              href="/"
            >
              AcademiaQuest!
            </a>
            <div className="flex gap-10 font-normal text-sm">
              <p className="flex gap-1 items-center justify-center hover:text-[#24948e]">
                Courses <GoChevronDown />
              </p>
              <p className="flex gap-2 items-center justify-center hover:text-[#24948e]">
                Resources <GoChevronDown />
              </p>
              <p className="flex gap-2 items-center justify-center hover:text-[#24948e]">
                Community <GoChevronDown />
              </p>
              <p className="flex gap-2 items-center justify-center hover:text-[#24948e]">
                Pricing <GoChevronDown />
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            {isDashboardPage ? (
              // Render the user icon for the dashboard page
              <div className="flex gap-4">
                Logout
              </div>
            ) : (
              // Render the login button for other pages
              <div className="hover:bg-[#effbfb] rounded-md py-2 px-3 text-[#071e22] text-sm font-bold">
                Log In
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
