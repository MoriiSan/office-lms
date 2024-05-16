"use client";

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FaUserCircle } from "react-icons/fa";
import ResumeIcon from "../../../public/assets/icons/resume";
import { RxDashboard } from "react-icons/rx";
import { PiBooksLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsRocketTakeoffFill } from "react-icons/bs";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import TerminalLoader from "../loading";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const router = useRouter();

  return (
    <>
      <div className=" flex flex-col h-auto bg-[#F8F7F4] text-[#071e22] ">
        <Navbar isLandingPage={false} />
        <div className="flex flex-grow justify-start items-stretch mx-6 my-4">
          {/* px-16 py-4 */}

          <Sidebar />

          <div className="flex flex-1 overflow-y-auto bg-[#e7e4da] rounded-lg ">
            <div className="content-component flex flex-col flex-1 text-[#071e22] h-auto min-w-[530px] px-4">
              <div className="card-component my-4 p-4 pt-3 rounded-md bg-[#F8F7F4] shadow ">
                <div className="flex font-bold text-2xl mb-2">
                  Keep Learning
                </div>
                <div className="cardd ">
                  <div className="flex border border-b-0 border-[#071e22] rounded-t-md font-semibold">
                    <div className="flex p-2 pe-16 w-auto rounded-tl-md border-r border-[#071e22] bg-[#fac105] text-sm text-[#071e22]">
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
                    <button className="flex flex-1 justify-center p-2 bg-[#3510bc] rounded-br-md text-[#F8F7F4]">
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

              <div className="mb-4 p-4 pt-3 rounded-md bg-[#F8F7F4] shadow">
                <div className="font-bold text-2xl mb-2 ">Start Learning</div>
                <div className="flex small-cardds text-sm gap-4 ">
                  <div className="single-card flex flex-col w-auto cursor-pointer">
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
                  <div className="single-card flex flex-col w-auto cursor-pointer">
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
                        <b>Nightmare</b>
                      </div>
                      <div>1 hour</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-bold text-2xl">Tasks</div>
              <div className="font-bold text-2xl">Discover more courses</div>
            </div>
            <div className="other-component flex flex-col rounded-md ms-0 m-4 p-4 w-[300px] min-w-[250px] bg-[#F8F7F4] text-sm text-[#071e22] gap-2">
              {/* <div className="border border-[#071e22] rounded-md p-3">Week</div> */}
              <div className="flex items-center text-xs gap-3">
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

export default Dashboard;
