"use client";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import { FaPesoSign } from "react-icons/fa6";
import { toast } from "sonner";

const Subscription = () => {
  const [currentPrice, setCurrentPrice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentPrice = async () => {
    try {
      const response = await fetch(`/api/stripe`);
      if (response.ok) {
        const data = await response.json();
        setCurrentPrice(data.price);
      } else {
        console.log("Failed top fetch current price.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
        console.log("Subscribe successfully.");
        window.location.assign(url);
      } else {
        console.log("Failed to subscribe.");
        toast.error("Failed to subscribe.", {
          position: "bottom-right",
          classNames: {
            title: "text-red-600",
            description: "text-red-600",
            error: "text-red-600",
          },
        });
      }
    } catch (error) {
      console.log("Error subscribing: ", error);
    }
  };

  useEffect(() => {
    fetchCurrentPrice();
  }, []);

  return (
    <>
      <div className="  flex flex-col h-auto bg-[#F8F7F4] text-[#071e22] ">
        <Navbar isLandingPage={false} />
        <div className="relative flex min-h-[82vh] flex-row justify-start mx-4 my-4">
          <div className="flex flex-col flex-1 gap-16 border-gray-800 rounded-lg ">
            <div className="flex flex-col ml-8 mt-12 justify-center items-center text-center font-sans">
              <div className="text-6xl font-black">
                Level Up Your Learning with Pro
              </div>
              <div className="max-w-[680px] text-lg font-medium mt-8">
                Transform your learning journey by upgrading to Pro. Unlock new
                realms of knowledge and exclusive content to enhance your
                skills!
              </div>
            </div>

            <div className="flex flex-row gap-8 justify-center items-end">
              <div className="flex flex-row p-6 gap-4 border border-gray-900 ">
                <div className="flex flex-col">
                  <div className="flex flex-row mb-2 gap-2 items-center">
                    <div className="text-lg font-bold">Free</div>
                    <div className="flex jsutify-center items-center h-[20px] text-xs leading-3 font-medium border px-3 border-gray-900 bg-[#fcdc1c] rounded-full">
                      Default
                    </div>
                  </div>
                  <div className="w-[200px] text-sm">
                    Start learning something new with free access.
                  </div>
                  <div className="flex flex-row my-4 gap-2 items-center">
                    <div className="text-4xl font-bold">$0</div>
                    <div className="text-sm font-medium ">Always</div>
                  </div>
                  <div className="flex h-[40px] w-[200px] justify-center items-center text-gray-900 font-medium border border-gray-900">
                    Current
                  </div>
                </div>
                <div className="flex flex-col justify-evenly w-[200px] gap-2 text-xs font-medium">
                  <div>Access to a limited selection of courses</div>
                  <div>Basic course materials and resources</div>
                  <div>Track your progress with basic analytics</div>
                  <div>Community support forum</div>
                  <div>Free certification for completed courses</div>
                </div>
              </div>

              <div className="relative bg-[#071e22]">
                <div className="relative left-2.5 bottom-2 flex flex-row p-6 gap-4 border border-gray-900 bg-[#F8F7F4]">
                  <div className="flex flex-col">
                    <div className="flex flex-row mb-2 gap-2 items-center">
                      <div className="text-lg font-bold">Pro Subscription</div>
                    </div>
                    <div className="w-[250px] text-sm">
                      Unlock exclusive content and elevate your learning
                      experience with no restrictions.
                    </div>
                    <div className="flex flex-row my-4 gap-2 items-end">
                      <div className="flex flex-row items-center text-4xl font-bold">
                        <FaPesoSign size={36} />
                        {isLoading ? (
                          <>
                            <div className="animate-pulse flex flex-row gap-1">
                              <div className="w-[24px] h-[42px] rounded bg-gray-200"></div>
                              <div className="w-[24px] h-[42px] rounded bg-gray-200"></div>
                              <div className="w-[24px] h-[42px] rounded bg-gray-200"></div>
                            </div>
                          </>
                        ) : (
                          <>{currentPrice}</>
                        )}
                        .00
                      </div>
                      <div className="text-sm font-medium mb-1">Lifetime</div>
                    </div>

                    <button className="relative group" onClick={subscribe}>
                      <div className="absolute h-[40px] w-full bg-[#071e22] transition-transform duration-150 group-hover:-translate-x-1 group-hover:translate-y-1"></div>
                      <div className="absolute flex h-[40px] w-full justify-center items-center text-[#071e22] font-medium border  border-[#071e22] bg-[#fcdc1c] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        Upgrade
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col justify-evenly w-[200px] gap-2 text-xs font-medium">
                    <div>Unlimited access to all courses</div>
                    <div>Advanced course materials and resources</div>
                    <div>Detailed progress tracking and advanced analytics</div>
                    <div>Community support forum</div>
                    <div>Free certification for completed courses</div>
                    <div>Early access to new courses and content</div>
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
