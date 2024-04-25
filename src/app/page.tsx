'use client'

import React, { useState, useEffect } from 'react';
import TerminalLoader from './loading';
import Login from './components/Login';

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
      <div className='flex justify-around items-center h-screen bg-[#e8e8e8]'>
        <div className='w-1/2'>
          <h1 className='font-sans text-4xl font-extrabold text-[#333333] '>Level Up Your Skills With Academia Quest!</h1>
          <p className='font-sans text-lg  font-medium text-[#333333] my-2.5'>Begin a transformative journey with
            6,900+ immersive quests, certificates, and degrees from top universities and companies. Unleash boundless
            opportunities on your path to success!
          </p>
        </div>
        <Login />
      </div>
    </>
  );
};

export default App;
