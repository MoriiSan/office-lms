"use client";

import React from "react";
import Lottie from "lottie-react";
import Error404 from "../../../Error404.json";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="">
        <div className="flex justify-center items-center">
          <Lottie
            animationData={Error404}
            style={{ height: "450px", width: "450px" }}
          />
        </div>
        <p className="flex justify-center text-[#999999]">
          The course you are looking for does not exist.
        </p>
        <Link href="/dashboard" className="flex justify-center items-center">
          <div className="flex px-2 mt-4 h-[36px] w-[200px] justify-center items-center text-white bg-blue-500 hover:bg-blue-600 rounded ">
            <button>Home</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
