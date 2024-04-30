"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const App: React.FC = () => {
  return (
    <>
      <div className=" flex flex-col h-screen bg-[#f1ede5] text-[#666666] ">
        <Navbar isDashboardPage={true} />
        <div className="flex flex-grow justify-start items-stretch gap-4 px-16 py-4 mt-[72px]">
          <div className="flex flex-col w-[300px] border-[#3d481e] text-[#274029] gap-2">
            <div className="py-2 px-4 bg-[#9ea93f] text-[#3d481e] rounded-md">
              Dashboard
            </div>
            <div className="py-2 px-4 bg-[#e6ebc0] text-[#3d481e] rounded-md">
              My Quests
            </div>
            <div className="py-2 px-4 bg-[#e6ebc0] text-[#3d481e] rounded-md">
              Notifications
            </div>
            <div className="py-2 px-4 bg-[#e6ebc0] text-[#3d481e] rounded-md">
              Dashboard
            </div>
          </div>
          <div className="">
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
