"use client";

import React, { useState, useEffect } from "react";
import "./globals.css";
import TerminalLoader from "./loading";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <TerminalLoader />;
  }

  return (
    <>
      <div className="flex flex-col bg-[#F8F7F4]">
        <Navbar />
        <div className="base-layer flex flex-col lg:flex-row justify-center items-center px-6 py-4 lg:min-h-[87vh] gap-8 bg-[#F8F7F4] h-[80vh]">
          <div className=" carousel-component box-border flex flex-col rounded-md h-[500px] text-[#071e22] px-10 py-20 min-w-[450px]">
            <h1 className="bg-[#F8F7F4] py-2 px-2 font-sans text-6xl font-extrabold">
              Level Up Your Skills With
              <text className="text-[#3510bc]"> SkillForge!</text>
            </h1>
            <p className="bg-[#F8F7F4]  py-4 px-2 font-sans text-lg font-medium ">
              Begin a transformative journey with 6,900+ immersive quests,
              certificates, and degrees from top universities and companies.
              Unleash boundless opportunities on your path to success!
            </p>
          </div>
          <div className="">
            <Signup />
          </div>
        </div>
        <div className="free-popular-courses flex lg:min-h-[87vh] bg-[#3510bc] justify-center items-center text-white">
          free/popular courses
        </div>
        <div className="signup-shortcut flex lg:min-h-[87vh] justify-center items-center">
          signup shortcut
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
