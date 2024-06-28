"use client";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { IInstructor } from "@/models/instructorModel";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlinePerson } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

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

const AllCourses = () => {
  const [courses, setCourses] = useState<iCourse[]>([]);
  const [loading, setLoading] = useState(true);

  const stripHtmlTags = (str: string) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const getCourses = async () => {
    try {
      const response = await fetch(`/api/course`);
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.log("Failed to fetch courses.");
      }
    } catch (error) {
      console.log("Error fetching courses: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <div className=" flex flex-col h-auto bg-[#F8F7F4] text-[#071e22] ">
        <Navbar isLandingPage={false} />
        <div className="relative flex flex-row justify-start mx-4 my-4 ml-0">
          <div className="sticky top-[88px] min-w-[260px] flex flex-col">
            <Link href="/dashboard">
              <div className="flex flex-row items-center mx-4 mb-2 text-gray-500 hover:text-blue-800">
                <IoArrowBack size={14} />
                <div className="ml-1 text-xs font-medium">Back to Home</div>
              </div>
            </Link>
            <div className="p-4 mx-4 border rounded-md  border-gray-300">
              <div>Filters</div>
              <div>
                Price | View pricing
                <div>Free</div>
                <div>Paid</div>
              </div>
              <div>Most Popular || Most Recent</div>
              <div></div>
            </div>
          </div>
          <div className="right-container flex flex-col min-h-[85vh] flex-1 p-4 gap-4 bg-[#e7e4da] rounded-lg ">
            <div className="flex flex-row justify-between items-center p-4 pt-3 rounded-md border border-[#071e22] text-[#071e22] bg-[#F8F7F4]">
              <div>
                <div className="text-lg font-bold">UPGRADE TO PRO</div>
                <div className="flex text-sm">
                  Level up with practical skills. Dive into real projects,
                  assessments, and certifications.
                </div>
              </div>
              <Link href={"/pricing"}>
                <button className="relative block border rounded hover:bg-[#071e22] transition-all">
                  <div className="relative hover:left-1.5 hover:bottom-1.5  flex items-center justify-center h-[40px] px-3 text-sm font-semibold rounded bg-[#fac105] text-[#071e22]">
                    Upgrade
                  </div>
                </button>
              </Link>
            </div>
            <div className="flex flex-row justify-between items-center p-4 pt-3 rounded-md text-gray-100 bg-[#071e22] shadow">
              <div className="text-2xl font-bold">Explore the catalog</div>
            </div>

            <div className="p-4 pt-3 rounded-md bg-[#F8F7F4] shadow">
              <div className="flex flex-row items-center font-bold text-xl mb-4 ">
                <div>Browse all courses</div>
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
                          className="flex flex-col h-[250px] justify-between w-full p-4  rounded-md border border-gray-600"
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
                            href={`/allcourses/${course.title}`}
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

export default AllCourses;
