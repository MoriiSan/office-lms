"use client";

import React from "react";
import Link from "next/link";

const SubscriptionSuccess: React.FC = () => {
  return (
    <div className="flex  items-center h-screen bg-gray-100">
      <div className="ml-32">
        <div className="flex mb-2 justify-start items-center text-3xl text-gray-900 font-extrabold">
          Subscription Successful {`:>`}
        </div>
        <p className="flex justify-start text-gray-500 text-sm font-medium">
          Thank you for upgrading to Skillforge Student Pro. You can now access
          PRO courses.
        </p>
        <Link href="/allcourses" className="flex justify-start items-center">
          <div className="flex px-2 mt-4 h-[36px] w-[200px] justify-center items-center text-sm font-semibold text-green-800 border border-green-800 hover:text-white hover:bg-green-800 rounded ">
            <button>Return to courses</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
