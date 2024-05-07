"use client";

import React, { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { useRouter } from "next/navigation";
import Login from "./Login";

interface NavbarProps {
  isDashboardPage?: boolean; // Define a prop to indicate whether the current page is the dashboard page
}

const Navbar: React.FC<NavbarProps> = ({ isDashboardPage = false }) => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  const handleCloseModal = () => {
    setLoginOpen(false);
  };

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
        className={`sticky z-10 top-0 flex w-full flex-wrap items-center justify-between px-6 py-4
            ${
              scrolled
                ? `border-b border-[#071e22] text-[#071e22] bg-[#F8F7F4]`
                : "bg-[#071e22] text-[#F8F7F4]"
            }`}
      >
        <div className="flex w-full items-center justify-between h-[40px]  mx-2">
          <div className="flex items-center">
            <a
              className="text-xl font-extrabold hover:text-[#fac105] mr-10"
              href="/"
            >
              SkillForge
            </a>
            <div className="flex gap-10 font-normal text-sm">
              <p className="flex gap-1 items-center justify-center hover:text-[#fac105]">
                Courses <GoChevronDown />
              </p>
              <p className="flex gap-2 items-center justify-center hover:text-[#fac105]">
                Resources <GoChevronDown />
              </p>
              <p className="flex gap-2 items-center justify-center hover:text-[#fac105]">
                Community <GoChevronDown />
              </p>
              <p className="flex gap-2 items-center justify-center hover:text-[#fac105]">
                Pricing <GoChevronDown />
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            {isDashboardPage ? (
              // Render the user icon for the dashboard page
              <div
                className="flex gap-4 cursor-pointer"
                onClick={() => router.push("/")}
              >
                Logout
              </div>
            ) : (
              // Render the login button for other pages
              <div
                className="cursor-pointer hover:bg-[#fac105] rounded py-2 px-4 hover:text-[#071e22] text-sm font-bold"
                onClick={handleLoginClick}
              >
                Log In
              </div>
            )}
          </div>
        </div>
      </nav>
      <Login isOpen={loginOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Navbar;
