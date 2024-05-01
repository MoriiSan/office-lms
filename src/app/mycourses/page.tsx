"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUserCircle } from "react-icons/fa";

const App: React.FC = () => {
  return (
    <>
      <div className=" flex flex-col h-screen bg-[#fbe9da] text-[#071e22] ">
        <Navbar isDashboardPage={true} />
        <div className="flex flex-grow justify-start items-stretch gap-4 px-16 py-4">
          <div className="sidebar-component flex flex-col w-[300px] border-[#3d481e] text-[#071e22] gap-6 ">
            <div className="flex gap-4">
              <FaUserCircle
                size={40}
                className="cursor-pointer text-[#071e22]"
              />
              <div className="flex flex-col items-start justify-center">
                <div className="text-sm font-bold">
                  Jhenna Mariejoy Dela Torre
                </div>
                <div className="text-xs font-normal">
                  jhenna.torre@trajectorservices.com
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="py-2 px-4 bg-[#] text-[#071e22] rounded-md">
                Dashboard
              </div>
              <div className="py-2 px-4 bg-[#] text-[#071e22] rounded-md">
                My Courses
              </div>
              <div className="py-2 px-4 bg-[#] text-[#071e22] rounded-md">
                Notifications
              </div>
              <div className="py-2 px-4 bg-[#] text-[#071e22] rounded-md">
                Settings
              </div>
            </div>
          </div>
          <div className="content-component">
            <div>Keep Learning</div>
            <div>Start Learning</div>
            <div>Discover more courses</div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
