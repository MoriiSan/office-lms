'use client'

import React, { useState, useEffect } from 'react';
import TerminalLoader from './loading';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  if (isLoading) {
    return <TerminalLoader />
  }

  return (
    <>
      <div className='flex flex-col bg-[#f1ede5] h-screen'>
        <Navbar />
        <div className='flex flex-grow justify-around items-center mx-10 mt-[25px]'>
          <div className='w-1/2'>
            <h1 className='font-sans text-4xl font-extrabold text-[#181f1c] '>Level Up Your Skills With AcademiaQuest!</h1>
            <p className='font-sans text-lg  font-medium text-[#181f1c] my-2.5'>Begin a transformative journey with
              6,900+ immersive quests, certificates, and degrees from top universities and companies. Unleash boundless
              opportunities on your path to success!
            </p>
          </div>
          <Signup />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
