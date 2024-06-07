"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";

const Profile = () => {
  return (
    <>
      <div className="  flex flex-col h-auto bg-[#F8F7F4] text-[#071e22] ">
        <Navbar isLandingPage={false} />
        <div className="relative flex flex-row justify-start mx-4 my-4 ml-0">
          <div>
            <Sidebar />
          </div>
          <div className="flex flex-1 overflow-y-auto bg-[#e7e4da] rounded-lg ">
            <p className="flex flex-1 justify-center items-center">Profile</p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
