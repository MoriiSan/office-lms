"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";

const App: React.FC = () => {
  return (
    <>
      <div className="flex justify-around items-center h-screen bg-[#f1ede5] text-[#666666]">
        <Navbar />
        <div className="flex flex-grow gap-4 px-16">
          <div className="">sidebar</div>
          <div>contents</div>
        </div>
      </div>
    </>
  );
};

export default App;
