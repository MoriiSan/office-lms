"use client";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

const Subscription = () => {
  const subscribe = async () => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const { url } = await response.json();
        // console.log(data)
        console.log("Subscribe successfully.");
        window.location.assign(url);
      }
    } catch (error) {
      console.log("Error subscribing: ", error);
    }
  };

  return (
    <>
      <div className="  flex flex-col h-auto bg-[#F8F7F4] text-[#071e22] ">
        <Navbar isLandingPage={false} />
        <div className="relative flex min-h-[82vh] flex-row justify-start mx-4 my-4">
          <div className="flex flex-col flex-1 overflow-y-auto border-gray-800 rounded-lg ">
            <div className="flex flex-col justify-center items-center mt-12 text-center font-sans ">
              <div className="text-5xl font-black">
                Level Up Your Learning with Pro
              </div>
              <div className="max-w-[590px] text-sm font-semibold mt-8">
                Transform your learning journey by upgrading to Pro. Unlock new
                realms of knowledge and exclusive content to enhance your
                skills!
              </div>
            </div>
            <div className="flex flex-row mt-12 gap-8 justify-center items-center">
              <div className="flex flex-row p-4 gap-4 border border-gray-900 ">
                <div className="flex flex-col">
                  <div className="flex flex-row mb-2 gap-2 items-center">
                    <div className="text-lg font-bold">Free</div>
                    <div className="flex jsutify-center items-center h-[20px] text-xs leading-3 font-medium border px-3 border-gray-900 rounded-full">
                      Default
                    </div>
                  </div>
                  <div className="w-[200px] text-sm">
                    Start learning something new with free access
                  </div>
                  <div className="flex flex-row my-4 gap-2 items-center">
                    <div className="text-4xl font-bold">$0</div>
                    <div className="text-sm font-medium ">Always</div>
                  </div>
                  <div className="flex self-end h-[40px] w-[200px] justify-center items-center text-gray-900 font-medium border border-gray-900">
                    Current
                  </div>
                </div>
                <div className="flex flex-col w-[200px] gap-2 text-xs font-medium">
                  <div>Access to a limited selection of courses</div>
                  <div>Basic course materials and resources</div>
                  <div>Track your progress with basic analytics</div>
                  <div>Community support forum</div>
                  <div>Free certification for completed courses</div>
                </div>
              </div>
              <div className="p-2 border border-gray-900">
                <div className="flex flex-row p-4 gap-4 border border-gray-900 ">
                  <div className="flex flex-col">
                    <div className="flex flex-row mb-2 gap-2 items-center">
                      <div className="text-lg font-bold">Pro</div>
                      <div className="flex jsutify-center items-center h-[20px] text-xs leading-3 font-medium border px-3 border-gray-900 bg-[#fcdc1c] rounded-full">
                        Default
                      </div>
                    </div>
                    <div className="w-[200px] text-sm">
                      Start learning something new with free access
                    </div>
                    <div className="flex flex-row my-4 gap-2 items-center">
                      <div className="text-4xl font-bold">$49.99</div>
                      <div className="text-sm font-medium ">Lifetime</div>
                    </div>
                    <button className="flex self-end h-[40px] w-[200px] justify-center items-center text-white font-medium bg-gray-900">
                      Upgrade
                    </button>
                  </div>
                  <div className="flex flex-col w-[200px] gap-2 text-xs font-medium">
                    <div>Access to a limited selection of courses</div>
                    <div>Basic course materials and resources</div>
                    <div>Track your progress with basic analytics</div>
                    <div>Community support forum</div>
                    <div>Free certification for completed courses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Subscription;
