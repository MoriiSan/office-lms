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
import { RxDashboard } from "react-icons/rx";
import { PiBooksLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";

const App: React.FC = () => {
  return (
    <>
      <div className=" flex flex-col h-screen bg-[#F8F7F4] text-[#071e22] ">
        <Navbar isDashboardPage={true} />
        <div className="flex flex-grow justify-start items-stretch">
          {/* px-16 py-4 */}
          <div className="sidebar-component flex flex-col flex-wrap ps-16 p-3 w-[364px] min-w-[250px] border border-r-[#071e22] bg-[#F8F7F4] text-[#071e22] ">
            {/* h-screen fixed top-[72px]  */}
            <div className="profile-component items-center flex gap-4  text-[#071e22]">
              <FaUserCircle
                size={40}
                className=" cursor-pointer text-[#071e22]"
              />
              <div className="flex flex-col items-start justify-center">
                <div className="text-sm font-bold">
                  Jhenna Mariejoy Dela Torre
                </div>
                <div className="text-xs font-normal">Student</div>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-md font-normal text-[#071e22] mt-6">
              <div className="relative flex mb-2 border-[#071e22] bg-[#EEEADF] text-[#071e22] font-semibold hover:text-[#4014e4] ">
                <div className="p-1 bg-[#071e22] "></div>
                <div className="flex flex-1 py-1.5 px-2 justify-end items-center ">
                  <span className="relative h-6 w-6 flex justify-center items-center">
                    {/* change dashboard icon */}
                    <RxDashboard size={23} />
                  </span>
                  <p className="relative ms-2">Dashboard</p>
                </div>
              </div>
              <div className="relative flex mb-2 border-[#071e22] bg-[#] text-[#071e22] font-semibold hover:text-[#4014e4] ">
                <div className="flex flex-1 py-1.5 px-2 justify-start items-center">
                  <span className="relative h-6 w-6">
                    {/* change dashboard icon */}
                    <PiBooksLight size={25} />
                  </span>
                  <p className="relative ms-2">My Courses</p>
                </div>
              </div>
              <div className="relative flex mb-2 border-[#071e22] bg-[#] text-[#071e22] font-semibold hover:text-[#4014e4]">
                <div className="flex flex-1 py-1.5 px-2 justify-start items-center">
                  <span className="relative h-6 w-6">
                    {/* change dashboard icon */}
                    <IoNotificationsOutline size={24} />
                  </span>
                  <p className="relative ms-2">Notifications</p>
                </div>
              </div>
              <div className="relative flex mb-2 border-[#071e22] bg-[#] text-[#071e22] font-semibold hover:text-[#4014e4]">
                <div className="flex flex-1 py-1.5 px-2 justify-start items-center">
                  <span className="relative h-6 w-6">
                    {/* change dashboard icon */}
                    <IoSettingsOutline size={24} />
                  </span>
                  <p className="relative ms-2">Settings</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 overflow-y-auto bg-[#F8F7F4]">
            <div className="content-component flex flex-col flex-1 text-[#071e22] h-auto min-w-[530px] px-3">
              <div className="card-component mt-3 mb-16 ">
                <div className="flex font-bold text-2xl mb-2">
                  Keep Learning
                </div>
                <div className="cardd ">
                  <div className="flex border border-b-0 border-[#071e22] rounded-t-md font-semibold">
                    <div className="flex p-2 pe-16 w-auto rounded-tl-md  bg-[#ee2e31] text-sm text-[#F8F7F4]">
                      13%
                    </div>
                    <div className="flex flex-1 p-2 rounded-tr-md  bg-[#c4af9e]"></div>
                  </div>
                  <div className="flex border border-[#071e22] bg-[#F8F7F4] p-8">
                    <div className="mb-6">
                      <div className="text-sm">Course</div>
                      <div className="text-xl font-bold mb-2">
                        Learn JavaScript
                      </div>
                      <div>Current Module: Welcome to Learn JavaScript</div>
                    </div>
                  </div>
                  <div className="flex border border-t-0 border-[#071e22] bg-[#F8F7F4] rounded-b-md font-semibold">
                    <button className="flex flex-1 justify-center p-2">
                      View Syllabus
                    </button>
                    <button className="flex flex-1 justify-center p-2 bg-[#4014e4] rounded-br-md text-[#F8F7F4]">
                      Resume Course
                      <span className="relative h-6 w-6 ms-2">
                        <ResumeIcon hex={"#fbe9da"} />
                      </span>
                    </button>
                  </div>
                </div>
                <button className="mt-2 font-semibold text-sm text-[#4014e4]">
                  View all courses in progress
                </button>
              </div>

              <div className=""> 
                <div className="font-bold text-2xl mb-2">Start Learning</div>
                <div className="flex small-cardds text-sm gap-4">
                  <div className="single-card flex flex-col flex-1 w-[250px] h-[270px] cursor-pointer">
                    <div className="border border-b-0 border-[#071e22] bg-[#ffabab] rounded-t py-1 px-3">
                      Free Course
                    </div>
                    <div className="border border-y-0 border-[#071e22] py-1 px-3">
                      <div className="font-extrabold text-lg mb-1">
                        Learn Python 3
                      </div>
                      <div className="">
                        Learn the basics of Python 3, one of the most powerful,
                        versatile, and in-demand programming languages today.
                      </div>
                    </div>
                    <div className="flex border border-[#071e22] justify-between rounded-b py-1 px-3">
                      <div>
                        <b>Beginner</b> Friendly
                      </div>
                      <div>1 hour</div>
                    </div>
                  </div>
                  <div className="single-card flex flex-col flex-1 w-[250px] h-[270px] cursor-pointer">
                    <div className="border border-b-0 border-[#071e22] bg-[#ffabab] rounded-t py-1 px-3">
                      Free Course
                    </div>
                    <div className="border border-y-0 border-[#071e22] py-1 px-3">
                      <div className="font-extrabold text-lg mb-1">
                        Learn Python 3
                      </div>
                      <div className="">
                        Learn the basics of Python 3, one of the most powerful,
                        versatile, and in-demand programming languages today.
                      </div>
                    </div>
                    <div className="flex border border-[#071e22] justify-between rounded-b py-1 px-3">
                      <div>
                        <b>Beginner</b> Friendly
                      </div>
                      <div>1 hour</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-bold text-2xl">Tasks</div>
              <div className="font-bold text-2xl">Discover more courses</div>
            </div>

            <div className="other-sidebar flex flex-col pe-16 p-3 w-[364px] min-w-[250px] border border-l-[#071e22] bg-[#F8F7F4] text-sm text-[#071e22] gap-2">
              {/* <div className="border border-[#071e22] rounded-md p-3">Week</div> */}
              <div className="flex items-center text-xs my-2 gap-3">
                <div className="flex justify-evenly border border-[#071e22] gap-4 p-2 px-4 rounded-md ">
                  <div className="flex justify-center items-center font-bold text-lg">
                    11
                  </div>
                  <div className="flex justify-center items-center text-start font-medium">
                    Courses Completed
                  </div>
                </div>
                <div className="flex justify-evenly border border-[#071e22] gap-4 p-2 px-4 rounded-md">
                  <div className="flex justify-center items-center font-bold text-lg">
                    3
                  </div>
                  <div className="flex justify-center items-center text-start font-medium">
                    Courses in Progress
                  </div>
                </div>
              </div>
              <div className="border border-[#071e22] rounded-md p-3 font-semibold">
                Achievements
              </div>
              <div className="border border-[#071e22] rounded-md p-3 ">
                <div className="font-semibold">Announcements</div>
                <div className="flex gap-3 py-3 ">
                  <FaUserCircle
                    size={30}
                    className=" cursor-pointer text-[#071e22]"
                  />
                  <div className="">John Doe has created a new course</div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
