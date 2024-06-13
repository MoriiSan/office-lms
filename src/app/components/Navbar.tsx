"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Login from "./Login";
import { GoChevronDown } from "react-icons/go";
import { signOut } from "next-auth/react";
import Link from "next/link";

const NavbarItems = [
  { label: "Courses", icon: <GoChevronDown />, href: "/allcourses", testid: "available-courses" },
  { label: "Resources", icon: <GoChevronDown />, href: "/resources" },
  { label: "Community", icon: <GoChevronDown />, href: "/community" },
  { label: "Pricing", icon: <GoChevronDown />, href: "/pricing" },
];
``
interface NavbarProps {
  isLandingPage?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLandingPage = true }) => {
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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
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
            <button className="flex gap-10 font-normal text-sm">
              {NavbarItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className="flex gap-1 items-center justify-center hover:text-[#fac105]"
                  data-testid={item.testid}
                >
                  {item.label}
                  {item.icon}
                </Link>
              ))}
            </button>
          </div>
          <div className="flex gap-4">
            {!isLandingPage ? (
              // Render the user icon for the dashboard page
              <div
                data-testid="logout-button"
                className="cursor-pointer hover:bg-[#fac105] rounded py-2 px-4 hover:text-[#071e22] text-sm font-bold"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </div>
            ) : (
              // Render the login button for other pages
              <div
                data-testid="login-signup-button"
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
