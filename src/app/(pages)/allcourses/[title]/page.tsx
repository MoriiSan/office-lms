"use client";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";

interface Course {
  _id: string;
  instructorId: string;
  courseCode: string;
  title: string;
  description: string;
}

interface SessionUser {
  _id: string;
}

const previewCourses = () => {
  const { data: session } = useSession();
  const params = useParams();
  const title = Array.isArray(params.title) ? params.title[0] : params.title;
  const [course, setCourse] = useState<Course | null>(null);
  const [courseId, setCourseId] = useState("");
  const [student, setStudent] = useState("");
  const [loading, setLoading] = useState(true);

  // let user;
  // if (session) {
  //   // alert(session!.user!.id);
  //   user = session!.user!.id;
  // }

  const stripHtmlTags = (str: string) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/course/${title}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
        setCourseId(data._id);
        console.log("fetchCourseId:", data._id)
        // setStudent(session!.user!.id);
      } else {
        console.error("Failed to fetch course.");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateEnrollees = async (enrollee: string, courseId: string) => {
    console.log("CourseId[updateEnrollees]", courseId);
    console.log("Student[updateEnrollees]", enrollee);
    try {
      const response = await fetch(`/api/course/${title}/enroll`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enrollee }),
      });
      if (response.ok) {
        const data = await response.json();
        // const courseId = data.id
        // console.log("CourseIdd",courseId)
        await studentEnroll(enrollee, courseId);
      } else {
        console.log("Failed to update enrollees.");
      }
    } catch (error) {
      console.log("Error updating enrollees: ", error);
    }
  };

  const studentEnroll = async (studentId: string, courseId: string) => {
    console.log("StudentId[studentEnroll]", studentId);
    console.log("courseId[studentEnroll]", courseId);
    try {
      const response = await fetch(`/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId, courseId }),
      });
      if (response.ok) {
        // const data = await response.json();
        console.log("Student enrolled successfully");
      } else {
        console.log("Student failed to enroll.");
      }
    } catch (error) {
      console.log("Error enrolling to a course: ", error);
    }
  };

  useEffect(() => {
    if (title) {
      fetchCourse();
    }
  }, [title]);

  const handleEnrollClick = () => {
    if (session) {
      updateEnrollees(session!.user!.id, courseId);
    }
  };

  return (
    <>
      <div className="  flex flex-col h-auto bg-[#F8F7F4] text-[#071e22] ">
        <Navbar isLandingPage={false} />
        <div className="flex flex-grow justify-start items-stretch ">
          <div className="flex flex-col flex-1 overflow-y-auto ">
            {loading ? (
              <div className="animate-pulse px-24 py-4 bg-[#fac105]">
                <div className="flex flex-col justify-between p-8 mb-12 rounded-md border border-gray-500 bg-[#F8F7F4]">
                  <div className="h-[20px] w-1/6 rounded bg-gray-200 mb-2"></div>
                  <div className="h-[40px] w-full rounded bg-gray-200 mb-4"></div>
                  <div className="h-[96px] w-full rounded bg-gray-200"></div>
                </div>
              </div>
            ) : (
              <div className="px-24 py-4 bg-[#fac105]">
                <div className="flex flex-col justify-between p-8 mb-12 rounded-md border border-gray-500 bg-[#F8F7F4]">
                  {course && (
                    <>
                      <div className="text-sm ">{course!.courseCode}</div>

                      <div className="text-4xl font-bold mt-1 mb-4">
                        {course!.title}
                      </div>
                      <div className="">
                        {stripHtmlTags(course!.description)}
                      </div>
                    </>
                  )}

                  <div className="flex flex-row items-center mt-4 gap-2">
                    <button
                      className="p-1 px-3 h-[40px] w-[250px] rounded text-white font-semibold bg-[#3510bc] hover:bg-[#393299]"
                      onClick={handleEnrollClick}
                    >
                      Enroll
                    </button>
                    <div className="flex flex-row items-center gap-2 text-sm">
                      <div># Students Enrolled</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="relative top-[-30px] px-24 pb-4 bg-[#]">
              <div className="flex flex-col rounded-md border border-gray-500">
                <div className="flex flex-col p-6 rounded-t-md bg-[#F8F7F4] border-b border-gray-500 gap-2">
                  <div className="text-lg font-semibold">Syllabus</div>
                  <div className="text-sm">5 Modules | 2 quizzes</div>
                </div>
                <div className="flex flex-row justify-between items-center p-6 font-medium bg-[#F8F7F4] border-b border-gray-500">
                  <div className="flex flex-row items-center gap-4">
                    <div className="flex items-center justify-center h-[40px] w-[40px] text-xl font-bold rounded-full bg-gray-300">
                      1
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-lg font-semibold">Module Title</div>
                      <div className="text-sm">Module Description</div>
                    </div>
                  </div>
                  <IoIosArrowDown size={28} />
                </div>
                <div className="flex flex-row justify-between items-center p-6 font-medium bg-[#F8F7F4] border-b border-gray-500">
                  <div className="flex flex-row items-center gap-4">
                    <div className="flex items-center justify-center h-[40px] w-[40px] text-xl font-bold rounded-full bg-gray-300">
                      2
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-lg font-semibold">Module Title</div>
                      <div className="text-sm">Module Description</div>
                    </div>
                  </div>
                  <IoIosArrowDown size={28} />
                </div>
                <div className="flex flex-row justify-between items-center p-6 font-medium bg-[#F8F7F4]  border-b border-gray-500">
                  <div className="flex flex-row items-center gap-4">
                    <div className="flex items-center justify-center h-[40px] w-[40px] text-xl font-bold rounded-full bg-gray-300">
                      3
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-lg font-semibold">Quiz Title 1</div>
                      <div className="text-sm">Quiz items #</div>
                    </div>
                  </div>
                  <IoIosArrowDown size={28} />
                </div>
                <div className="flex flex-row justify-between items-center p-6 font-medium rounded-b-md bg-[#F8F7F4]">
                  <div className="flex flex-row items-center gap-4">
                    <div className="flex items-center justify-center h-[40px] w-[40px] text-xl font-bold rounded-full bg-gray-300">
                      4
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-lg font-semibold">Module Title</div>
                      <div className="text-sm">Module Description</div>
                    </div>
                  </div>
                  <IoIosArrowDown size={28} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* creator info */}
        <div className="flex flex-row justify-center items-center py-12 gap-8  bg-[#]">
          <div className="w-[250px] text-3xl font-bold">
            Meet the creator of the course
          </div>
          <div className="flex flex-col w-[450px]">
            <div className="flex flex-row items-center mb-4 gap-2">
              <IoPersonCircleOutline size={64} />
              <div className="flex flex-col">
                <div className="font-semibold">Instructor Name</div>
                <div className="text-sm">Instructor Background | Degree</div>
              </div>
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tempor efficitur blandit. Vestibulum sem justo, ultrices ut diam
              a, ultrices accumsan lorem. Nullam gravida leo id leo efficitur,
              in fermentum.
            </div>
          </div>
        </div>

        <div className="h-[250px] bg-[#fac105]">
          <div>Enrol</div>
        </div>

        <div className="h-[250px] bg-[#e7e4da]">
          <div>Related Courses</div>
        </div>

        <div className="h-[250px] bg-[#]">
          <div>Upgrade Plan</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default previewCourses;
