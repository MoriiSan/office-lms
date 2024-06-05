"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";

const Notifications = () => {
  return (
    <>
      <div className="  flex flex-col h-auto bg-[#F8F7F4] text-[#071e22] ">
        <Navbar isLandingPage={false} />
        <div className="flex flex-grow justify-start items-stretch mx-6 my-4">
          <Sidebar currentPage={"dashboard/notifications"} />
          <div className="flex flex-1 overflow-y-auto bg-[#e7e4da] rounded-lg ">
            <p className="flex flex-1 justify-center items-center">
              Notifications
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Notifications;
