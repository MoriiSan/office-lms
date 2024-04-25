'use client'

import React, { useState } from 'react';

const Navbar: React.FC = () => {
    return (
        <>
            <nav className=" border-[#60712f] fixed top-0 flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 dark:bg-[#e8e8e8] lg:py-2">
                <div className="flex w-full flex-wrap items-center justify-between px-3">
                    <div className="ms-2">
                        <a className="text-xl font-extrabold text-[#333333] dark:text-[#60712f]" href="#">Academia Quest</a>
                    </div>
                    <div className='flex gap-4'>
                        <div className='text-[#60712f] border-2 rounded-lg py-1 px-2'>Log In</div>
                        <div className='text-[#60712f] border-2 rounded-md border-[#60712f] py-1 px-2'>Sign Up</div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
