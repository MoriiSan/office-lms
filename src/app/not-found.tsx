'use client'

import React from 'react';
import Lottie from 'lottie-react';
import Error404 from '../Error404.json'

const NotFound: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="">
                <div className="flex justify-center items-center">
                    <Lottie animationData={Error404} style={{ height: '450px', width: '450px' }} />
                </div>
                <p className="flex justify-center text-[#999999]">The page you are looking for does not exist.</p>
            </div>
        </div>
    );
};

export default NotFound;
