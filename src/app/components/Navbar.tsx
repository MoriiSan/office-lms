'use client'

import React, { useState } from 'react';
import { GoChevronDown } from "react-icons/go";


const Navbar: React.FC = () => {
    return (
        <>
            <nav className=" border-[#60712f] fixed top-0 flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 dark:bg-[#f5ffe5] lg:py-4">
                <div className="flex w-full flex-wrap items-center justify-between px-3">
                    <div className="flex items-center ms-2">
                        <a className="text-xl font-extrabold text-[#333333] dark:text-[#274029] mr-10" href="#">Academia Quest</a>
                        <div className='flex gap-10 text-[#274029]'>
                            <p className='flex gap-1 items-center justify-center'>Courses <GoChevronDown/></p>
                            <p className='flex gap-2 items-center justify-center'>Resources <GoChevronDown/></p>
                            <p className='flex gap-2 items-center justify-center'>Community <GoChevronDown/></p>
                            <p className='flex gap-2 items-center justify-center'>Pricing <GoChevronDown/></p>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='text-[#274029] rounded-lg py-1 px-2'>Log In</div>
                        <div className='text-[#274029] border-2 rounded-md border-[#274029] py-1 px-2'>Sign Up</div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
