"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { useSession } from "next-auth/react";
import { IInstructor } from "@/models/instructorModel";
import Link from "next/link";
import { MdOutlinePerson } from "react-icons/md";

interface iCourse {
  _id: string;
  instructor: IInstructor;
  courseCode: string;
  title: string;
  description: string;
  students: string[];
  subscriptionTier: string;
  isEnrolled: boolean;
}

const MyCourses = () => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<iCourse[]>([]);
  const [loading, setLoading] = useState(true);

  const stripHtmlTags = (str: string) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/courses`);
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses);
        console.log("student: ", data.courses)
      }
    } catch (error) {
      console.log("Error fetching user: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="  flex flex-col h-auto bg-[#F8F7F4] text-[#071e22] ">
        <Navbar isLandingPage={false} />
        <div className="relative flex flex-row justify-start mx-4 my-4 ml-0">
          <div>
            <Sidebar />
          </div>
          <div className="flex flex-col flex-1 p-4 overflow-y-auto bg-[#e7e4da] rounded-lg ">
            <div className="flex flex-col flex-1 p-4 rounded-md bg-[#F8F7F4]">
              <div className="flex items-center font-bold text-2xl mb-2">
                My Courses
                <div className="ml-2 text-zinc-700 text-sm font-normal">
                  {courses.length} results
                </div>
              </div>
              {loading ? (
                <>
                  <div className="animate-pulse">
                    <div className="flex flex-row justify-between gap-8 mb-8">
                      {[1, 2, 3].map((index) => (
                        <div
                          key={index}
                          className="flex flex-col h-[250px] justify-between w-full p-4  rounded-md border border-gray-600 bg-[#F8F7F4]"
                        >
                          <div className="flex flex-col gap-2">
                            <div className="h-[32px] w-[100px] rounded bg-gray-200"></div>
                            <div className="h-[32px] w-full rounded bg-gray-200"></div>
                            <div className="h-[72px] w-full rounded bg-gray-200"></div>
                          </div>
                          <div className="h-[32px] w-full rounded bg-gray-200"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-12 gap-4">
                    {courses.map((course) => (
                      <div
                        key={course._id}
                        className="relative block single-card flex-col col-span-12 lg:col-span-6 xl:col-span-4 rounded hover:bg-[#071e22]"
                      >
                        <div className="relative hover:left-2 hover:bottom-2 rounded bg-[#F8F7F4]">
                          <Link
                            href={`/mycourses/${course.title}`}
                            data-testid={`available-course-{id}`}
                          >
                            <div className="flex flex-row justify-between items-center text-sm font-mono border border-b-0 border-[#071e22] bg-[#ffabab] rounded-t py-1 px-3">
                              <label className="">
                                {course.subscriptionTier} Course
                              </label>
                              {course.isEnrolled && (
                                <div className="font-semibold">Enrolled</div>
                              )}
                            </div>
                            <div className="h-[200px] py-1 px-3 border border-y-0 border-[#071e22]">
                              <div className="font-extrabold text-lg mb-1 mt-3">
                                {course.title}
                              </div>
                              <div>{stripHtmlTags(course.description)}</div>
                            </div>
                            <div className="flex border border-[#071e22] justify-between items-center rounded-b py-1 px-3">
                              <div className="text-zinc-800 text-sm font-medium">
                                {course.instructor.name}
                              </div>
                              <MdOutlinePerson size={16} />
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyCourses;
