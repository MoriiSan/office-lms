"use client";

import React, { useState, useEffect } from "react";
import TerminalLoader from "./loading";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <TerminalLoader />;
  }

  return (
    <>
      <div className="flex flex-col flex-grow bg-[#f1ede5] h-auto">
        <Navbar />
        <div className="flex flex-wrap flex-row justify-around items-stretch px-16 py-4 mt-[72px] gap-10">
          <div className="features-carousel-id flex-grow flex flex-col rounded-md bg-[#3d481e] w-1/2 text-[#f1ede5] min-w-[450px] px-10 py-20">
            <h1 className="font-sans text-3xl font-extrabold">
              Level Up Your Skills With AcademiaQuest!
            </h1>
            <p className="font-sans text-md font-medium my-2.5">
              Begin a transformative journey with 6,900+ immersive quests,
              certificates, and degrees from top universities and companies.
              Unleash boundless opportunities on your path to success!
            </p>
          </div>
          <Signup />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
