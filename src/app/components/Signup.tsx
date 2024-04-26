'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

const Signup: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <>
      <div className=''>
        <div className='border border-[#3d481e] p-8 rounded-lg w-[500px] min-w-96'>
          <h2 className='flex justify-center text-3xl font-extrabold text-[#3d481e]'>Forge Your Destiny</h2>
          <p className='flex justify-center text-[#3d481e] mb-4'>Forge your path with AcademyQuest!</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#3d481e] font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-[#3d481e] bg-transparent rounded-md focus:outline-none focus:border-[#60712f] text-[#181f1c]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-[#3d481e] font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-[#3d481e] bg-transparent rounded-md focus:outline-none focus:border-[#60712f] text-gray-700"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='flex justify-center text-sm text-[#93ad48]'>By clicking sign up, you agree to AcademyQuest's
              Terms of Services & Privacy Policy</div>

            <button
              type="submit"
              className="w-full bg-[#3d481e] text-white py-2 rounded-md hover:bg-[#313a18] mt-2"
              onClick={() => router.push('/dashboard')}
            >
              Sign Up
            </button>
            <div className='flex justify-center items-center gap-2 text-[#879e42]'>
              <div>-</div>
              <div className='flex justify-center text-[#879e42] my-4'>or continue with</div>
              <div>-</div>
            </div>
            <div className='flex gap-6'>
              <button
                type="submit"
                className="w-full border border-[#3d481e] text-[#3d481e] py-2 rounded-md hover:bg-white"
              >
                Google
              </button>
              <button
                type="submit"
                className="w-full border border-[#3d481e] text-[#3d481e] py-2 rounded-md hover:bg-white"
              >
                Github
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
