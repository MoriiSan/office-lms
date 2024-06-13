"use client";

import Link from "next/link";
import React from "react";

const Forbidden = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="">
        <div className="flex justify-center items-center text-[128px] text-gray-900 font-extrabold">
          403
        </div>
        <p className="flex justify-center text-2xl font-bold text-gray-900">
          Access Denied :0
        </p>
        <p className="flex justify-center text-sm text-gray-500">
          You do not have permission to access this page.
        </p>
        <Link href="/dashboard">
          <div className="flex px-2 mt-4 h-[36px] justify-center items-center text-white bg-blue-500 hover:bg-blue-600 rounded ">
            <button>Home</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
