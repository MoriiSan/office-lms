"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUserCircle } from "react-icons/fa";
import ResumeIcon from "../../../public/assets/icons/resume";
import BookmarkIcon from "../../../public/assets/icons/bookmark";
import DashboardIcon from "../../../public/assets/icons/dashboard";
import BooksIcon from "../../../public/assets/icons/books";
import SettingsIcon from "../../../public/assets/icons/settings";

const App: React.FC = () => {
  return (
    <>
      <div className=" flex flex-col h-screen bg-[#fbe9da] text-[#071e22] ">
        <Navbar isDashboardPage={true} />
        <div className="flex flex-grow justify-start items-stretch gap-6 px-16 py-4">
          <div className="sidebar-component flex flex-col flex-wrap p-3 w-[300px] min-w-[250px] bg-[#071e22] text-[#071e22] rounded-md gap-6 ">
            <div className="profile-component items-center flex gap-4 px-2 text-[#fbe9da]">
              <FaUserCircle
                size={40}
                className=" cursor-pointer text-[#fbe9da]"
              />
              <div className="flex flex-col items-start justify-center">
                <div className="text-sm font-bold">
                  Jhenna Mariejoy Dela Torre
                </div>
                <div className="text-xs font-normal">Student</div>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-md font-normal text-[#fbe9da]">
              <div className="relative flex py-1.5 px-4 mb-2 justify-start items-center bg-[#fbe9da] text-[#071e22] font-semibold rounded-md">
                <span className="relative h-8 w-8">
                  {/* change dashboard icon */}
                  <DashboardIcon hex={"#071e22"} />
                </span>
                <p className="ms-2">Dashboard</p>
                <span className="absolute h-10 w-10 top-1/3 right-0">
                  <BookmarkIcon hex={"#007b75"} />
                </span>
              </div>
              <div className="relative flex py-1.5 px-4 justify-start items-center bg-[#] text-[#fbe9da] rounded-md">
                <span className="relative h-6 w-6">
                  <BooksIcon hex={"#fbe9da"} />
                </span>
                <p className="ms-2">My Courses</p>
              </div>
              <div className="relative flex py-1.5 px-4 justify-start items-center bg-[#] text-[#fbe9da] rounded-md">
                <span className="relative h-8 w-8">
                  <DashboardIcon hex={"#fbe9da"} />
                </span>
                <p className="ms-2">Notifications</p>
              </div>
              <div className="relative flex py-1.5 px-4 justify-start items-center bg-[#] text-[#fbe9da] rounded-md">
                <span className="relative h-6 w-6">
                  <SettingsIcon hex={"#fbe9da"} />
                </span>
                <p className="ms-2">Settings</p>
              </div>
            </div>
          </div>

          <div className="content-component flex flex-col flex-1 text-[#071e22] h-[83vh] min-w-[530px] ">
            <div className="card-component mt-3 mb-16">
              <div className="flex font-bold text-2xl mb-2">Keep Learning</div>

              <div className="cardd">
                <div className="flex border border-b-0 border-[#071e22] rounded-t-md font-semibold">
                  <div className="flex p-2 pe-16 w-auto rounded-tl-md  bg-[#ee2e31] text-[#fbe9da]">
                    13%
                  </div>
                  <div className="flex flex-1 p-2 rounded-tr-md  bg-[#c4af9e]"></div>
                </div>
                <div className="flex border border-[#071e22] bg-white p-8">
                  <div className="mb-6">
                    <div className="text-sm">Course</div>
                    <div className="text-xl font-bold mb-2">
                      Learn JavaScript
                    </div>
                    <div>Current Module: Welcome to Learn JavaScript</div>
                  </div>
                </div>
                <div className="flex border border-t-0 border-[#071e22] bg-white rounded-b-md font-semibold">
                  <button className="flex flex-1 justify-center p-2">
                    View Syllabus
                  </button>
                  <button className="flex flex-1 justify-center p-2 bg-[#007b75] rounded-br-md text-[#fbe9da]">
                    Resume Course
                    <span className="relative h-6 w-6 ms-2">
                      <ResumeIcon hex={"#fbe9da"} />
                    </span>
                  </button>
                </div>
              </div>
              <button className="mt-2 font-semibold text-[#007b75]">
                View all courses in progress
              </button>
            </div>

            <div className="font-bold text-2xl">Start Learning</div>
            <div className="font-bold text-2xl">Tasks</div>
            <div className="font-bold text-2xl">Discover more courses</div>
          </div>
          <div className="other-sidebar flex flex-col w-[300px] min-w-[250px] border-[#071e22] text-sm text-[#071e22] gap-2">
            {/* <div className="border border-[#071e22] rounded-md p-3">Week</div> */}
            <div className="border border-[#071e22] rounded-md p-3 font-semibold">
              Achievements
            </div>
            <div className="border border-[#071e22] rounded-md p-3 ">
              <div className="font-semibold">Announcements</div>
              <div className="flex ">
                <FaUserCircle
                  size={40}
                  className=" cursor-pointer text-[#071e22]"
                />
                <div className="">John Doe has created a new course</div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
