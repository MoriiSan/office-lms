import React, { useEffect, useState } from 'react';
import { GoChevronDown } from "react-icons/go";


const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav className={`fixed fixed top-0 flex w-full flex-wrap items-center justify-between bg-zinc-50 px-10 py-2 dark:bg-[#f1ede5] text-[#274029] lg:py-4 
            ${scrolled ? `border-b border-[#274029]` : ''}`}>
                <div className="flex w-full flex-wrap items-center justify-between px-3">
                    <div className="flex items-center ms-2">
                        <a className="text-xl font-extrabold hover:text-[#9ea93f] mr-10" href="">AcademiaQuest!</a>
                        <div className='flex gap-10 font-medium'>
                            <p className='flex gap-1 items-center justify-center hover:text-[#9ea93f]'>Courses <GoChevronDown /></p>
                            <p className='flex gap-2 items-center justify-center hover:text-[#9ea93f]'>Resources <GoChevronDown /></p>
                            <p className='flex gap-2 items-center justify-center hover:text-[#9ea93f]'>Community <GoChevronDown /></p>
                            <p className='flex gap-2 items-center justify-center hover:text-[#9ea93f]'>Pricing <GoChevronDown /></p>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='rounded-lg py-1 px-2'>Log In</div>
                        <div className='border rounded-md border-[#3d481e] py-1 px-2'>Sign Up</div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
