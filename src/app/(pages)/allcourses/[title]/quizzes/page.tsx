"use client";

import React, { useEffect } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import Sidebar from "../../../../components/Sidebar";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

const Quizzes = () => {
  const params = useParams();
  const title = Array.isArray(params.title) ? params.title[0] : params.title;
  const router = useRouter();

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/course/${title}/quizzes`);
      if (response.ok) {
        const data = await response.json();
      } else if (response.status == 403) {
        toast.error("Access Denied.", {
          position: "top-right",
          classNames: {
            title: "text-red-600",
            description: "text-red-600",
            error: "text-red-600",
          },
        });
        router.push("/403-forbidden");
      } else {
        console.error("Failed to fetch course.");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [title]);
  
  return (
    <>
      <div className="  flex flex-col h-auto bg-[#F8F7F4] text-[#071e22] ">
        <Navbar isLandingPage={false} />
        <div className="relative flex flex-row justify-start mx-4 my-4 ml-0">
          <div>
            <Sidebar />
          </div>
          <div className="flex flex-1 overflow-y-auto bg-[#e7e4da] rounded-lg ">
            <p className="flex flex-1 justify-center items-center">Quizzes</p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Quizzes;
