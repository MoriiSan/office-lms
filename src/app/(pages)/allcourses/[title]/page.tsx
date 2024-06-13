"use client";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { IoArrowBack, IoPersonCircleOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";

import { IInstructor } from "@/models/instructorModel";
import { toast } from "sonner";

interface Course {
  _id: string;
  instructor: IInstructor;
  courseCode: string;
  title: string;
  description: string;
  students: [string];
}

const previewCourses = () => {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const title = Array.isArray(params.title) ? params.title[0] : params.title;
  const [course, setCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState([""]);
  const [courseId, setCourseId] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  const stripHtmlTags = (str: string) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  if (session && !isEnrolled) {
    if (students.includes(session!.user.id)) {
      setIsEnrolled(true);
    }
  }

  if (session && isEnrolled) {
    if (!students.includes(session!.user.id)) {
      setIsEnrolled(false);
    }
  }

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/course/${title}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
        setCourseId(data._id);
        setStudents(data.students);
      } else if (response.status == 404) {
        toast.error("Course not found.", {
          position: "top-right",
          classNames: {
            title: "text-red-600",
            description: "text-red-600",
            error: "text-red-600",
          },
        });
        router.push("/404-not-found");
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
    try {
      const response = await fetch(`/api/course/${title}/enroll`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enrollee }),
      });
      if (response.ok) {
        // const data = await response.json();
        await studentEnroll(enrollee, courseId);
      } else {
        console.log("Failed to update enrollees.");
      }
    } catch (error) {
      console.log("Error updating enrollees: ", error);
    }
  };

  const studentEnroll = async (studentId: string, courseId: string) => {
    try {
      const response = await fetch(`/api/user/enroll`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId, courseId }),
      });
      if (response.ok) {
        // const data = await response.json();
        await fetchCourse();
        console.log("Student enrolled successfully");
        toast.success("Enrolled successfully.", {
          position: "top-right",
          classNames: {
            title: "text-green-600",
            description: "text-green-600",
            success: "text-green-600",
          },
        });
      } else {
        await fetchCourse();
        console.log("Failed to enroll.");
        toast.error("Failed to enroll.", {
          position: "top-right",
          classNames: {
            title: "text-red-600",
            description: "text-red-600",
            error: "text-red-600",
          },
        });
      }
    } catch (error) {
      console.log("Error occurred while enrolling to a course: ", error);
      toast.error("Error occurred while enrolling to a course", {
        position: "top-right",
        classNames: {
          title: "text-red-600",
          description: "text-red-600",
          error: "text-red-600",
        },
      });
    }
  };

  const courseUnenroll = async (enrollee: string, courseId: string) => {
    try {
      const response = await fetch(`/api/course/${title}/enroll`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enrollee }),
      });
      if (response.ok) {
        // const data = await response.json();
        await studentUnenroll(enrollee, courseId);
      } else {
        console.log("Failed to update enrollees.");
      }
    } catch (error) {
      console.log("Error updating enrollees: ", error);
    }
  };

  const studentUnenroll = async (studentId: string, courseId: string) => {
    try {
      const response = await fetch(`/api/user/enroll`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId, courseId }),
      });
      if (response.ok) {
        // const data = await response.json();
        await fetchCourse();
        console.log("Student unenrolled.");
        toast.success("Successfully unenrolled", {
          position: "top-right",
          classNames: {
            title: "text-green-600",
            description: "text-green-600",
            success: "text-green-600",
          },
        });
      } else {
        await fetchCourse();
        console.log("Failed to unenroll.");
        toast.error("Failed to unenroll.", {
          position: "top-right",
          classNames: {
            title: "text-red-600",
            description: "text-red-600",
            error: "text-red-600",
          },
        });
      }
    } catch (error) {
      console.log("Error unenrolling to a course: ", error);
      toast.error("Error occurred while enrolling to a course", {
        position: "top-right",
        classNames: {
          title: "text-red-600",
          description: "text-red-600",
          error: "text-red-600",
        },
      });
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [title, isEnrolled]);

  const handleEnroll = () => {
    if (session) {
      updateEnrollees(session!.user!.id, courseId);
    }
  };

  const handleUnenroll = () => {
    if (session) {
      courseUnenroll(session!.user!.id, courseId);
    }
  };

  return (
    <>
      <div className="  flex flex-col h-auto bg-[#F8F7F4] text-[#071e22] ">
        <Navbar isLandingPage={false} />
        <div className="relative flex flex-row justify-start">
          {/* <div className="mt-4">
            <Sidebar />
          </div> */}

          <div className="w-full">
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
                      <Link href="/dashboard">
                        <div className="flex flex-row mt-[-20px] ml-[-15px] mb-4 items-center text-gray-500 hover:text-blue-800">
                          <div>
                            <IoArrowBack />
                          </div>
                          <div className="ml-1 text-sm font-medium">
                            Back to Home
                          </div>
                        </div>
                      </Link>
                      {course && (
                        <>
                          <div className="text-sm ">{course.courseCode}</div>

                          <div className="text-4xl font-bold mt-1 mb-4">
                            {course.title}
                            <div className=" flex flex-row text-sm font-normal text-gray-400">
                              Publisher:
                              <div className="ml-1">
                                {course.instructor.name}
                              </div>
                            </div>
                          </div>

                          <div className="">
                            {stripHtmlTags(course!.description)}
                          </div>
                        </>
                      )}

                      {isEnrolled ? (
                        <>
                          <div className="flex flex-row justify-between items-center mt-4">
                            <div className="flex flex-row gap-2">
                              <button
                                className="p-1 px-3 h-[40px] w-[250px] rounded text-white font-semibold bg-[#3510bc] hover:bg-[#393299]"
                                // onClick={handleEnrollClick}
                              >
                                Start
                              </button>
                              <div className="flex flex-row items-center gap-2 text-sm">
                                <div>
                                  <b>{course!.students.length}</b> Students
                                  Enrolled
                                </div>
                              </div>
                            </div>
                            <button
                              className="p-1 px-3 rounded border border-[#F8F7F4] hover:border-red-600 text-gray-500 hover:text-red-600 text-sm font-medium"
                              onClick={handleUnenroll}
                            >
                              Unenroll
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-row items-center mt-4 gap-2">
                            <button
                              className="p-1 px-3 h-[40px] w-[250px] rounded text-white font-semibold bg-[#3510bc] hover:bg-[#393299]"
                              onClick={handleEnroll}
                            >
                              Enroll
                            </button>
                            <div className="flex flex-row items-center gap-2 text-sm">
                              <div>
                                <b>{course?.students.length}</b> Students
                                Enrolled
                              </div>
                            </div>
                          </div>
                        </>
                      )}
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
                          <div className="text-lg font-semibold">
                            Module Title
                          </div>
                          <div className="text-sm">Module Description</div>
                        </div>
                      </div>
                      {isEnrolled && (
                        <>
                          <Link href={`/allcourses/${title}/modules`}>
                            <IoIosArrowDown size={28} />
                          </Link>
                        </>
                      )}
                    </div>
                    <div className="flex flex-row justify-between items-center p-6 font-medium rounded-b-md bg-[#F8F7F4]">
                      <div className="flex flex-row items-center gap-4">
                        <div className="flex items-center justify-center h-[40px] w-[40px] text-xl font-bold rounded-full bg-gray-300">
                          2
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="text-lg font-semibold">
                            Quiz Title 1
                          </div>
                          <div className="text-sm">Module Description</div>
                        </div>
                      </div>
                      {isEnrolled && (
                        <>
                          <Link href={`/allcourses/${title}/quizzes`}>
                            <IoIosArrowDown size={28} />
                          </Link>
                        </>
                      )}
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
                    <div className="text-sm">
                      Instructor Background | Degree
                    </div>
                  </div>
                </div>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  tempor efficitur blandit. Vestibulum sem justo, ultrices ut
                  diam a, ultrices accumsan lorem. Nullam gravida leo id leo
                  efficitur, in fermentum.
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
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default previewCourses;
