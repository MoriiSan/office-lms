"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EmailIcon from "../../../public/assets/icons/email";
import PasswordIcon from "../../../public/assets/icons/password";
import EyeIcon from "../../../public/assets/icons/eye";
import EyeClosedIcon from "../../../public/assets/icons/eyeClosed";
import WarningIcon from "../../../public/assets/icons/warning";
import ValidIcon from "../../../public/assets/icons/valid";
import { FcGoogle } from "react-icons/fc";
import { VscGithubInverted } from "react-icons/vsc";

const Signup: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordInputType = showPassword ? "text" : "password";

  const isEmailValid = (email: string) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isEmailInvalid = email && !isEmailValid(email);

  const isSubmitDisabled = !(email && password && fName && lName);

  return (
    <>
      <div className="">
        <div className="border border-[#3d481e] p-8 rounded-lg w-[450px]">
          <h2 className="flex justify-center text-lg font-extrabold text-[#3d481e]">
            Join AcademiaQuest and forge your skills!
          </h2>
          <p className="flex justify-center text-[#3d481e] mb-4">
            Forge your path with AcademyQuest!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-[15px] mb-4">
              <div>
                <input
                  type=""
                  id=""
                  className="w-full px-3 py-2 border border-[#939d90] bg-transparent focus:bg-transparent rounded-md focus:outline-none focus:border-[#60712f] text-sm text-[#3d481e] focus:text-[#3d481e]"
                  placeholder="First Name"
                  value={fName}
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type=""
                  id=""
                  className="w-full px-3 py-2 border border-[#939d90] bg-transparent focus:bg-transparent rounded-md focus:outline-none focus:border-[#60712f] text-sm text-[#3d481e] focus:text-[#3d481e]"
                  placeholder="Last Name"
                  value={lName}
                  onChange={(e) => setLname(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="relative mb-4">
              <span className="absolute h-6 w-6 top-1/2 translate-y-[-45%] left-3">
                <EmailIcon hex={"#3d481e"} />
              </span>
              <input
                type="email"
                className={`w-full px-3 ps-12 py-2 border ${
                  isEmailInvalid ? "border-[#be1809]" : "border-[#939d90]"
                } bg-transparent focus:bg-transparent rounded-md focus:outline-none focus:border-[#60712f] text-sm text-[#3d481e] focus:text-[#3d481e]`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {isEmailValid(email) && (
                <span className="absolute h-4 w-4 top-1/2 translate-y-[-45%] right-3">
                  <ValidIcon hex={"#2da94e"} />
                </span>
              )}
              {isEmailInvalid && (
                <span className="absolute h-4 w-4 top-1/2 translate-y-[-45%] right-3">
                  <WarningIcon hex={"#be1809"} />
                </span>
              )}
            </div>
            <div className="relative mb-4">
              <span className="absolute h-5 w-5 top-1/2 translate-y-[-45%] left-3">
                <PasswordIcon hex={"#3d481e"} />
              </span>
              <input
                type={passwordInputType}
                className="w-full px-3 ps-12 py-2 border border-[#939d90] bg-transparent focus:bg-transparent rounded-md focus:outline-none focus:border-[#60712f] text-sm text-[#3d481e] focus:text-[#3d481e]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute h-5 w-5 top-1/2 translate-y-[-45%] right-3"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeIcon hex={"#3d481e"} />
                ) : (
                  <EyeClosedIcon hex={"#3d481e"} />
                )}
              </span>
            </div>
            <div className="flex justify-center text-xs text-[#939d90]">
              {" "}
              <span>
                By clicking sign up, you agree to AcademyQuest's{" "}
                <u className="cursor-pointer">Terms of Services</u> &{" "}
                <u className="cursor-pointer">Privacy Policy</u>.
              </span>
            </div>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`w-full bg-[#3d481e] text-sm text-white py-2 rounded-md ${
                isSubmitDisabled ? "cursor-not-allowed" : "hover:bg-[#313a18]"
              } mt-2`}
              // title={isSubmitDisabled ? "Please fill out all fields" : ""}
              onClick={() => router.push("/dashboard")}
            >
              Sign Up
            </button>
            <div className="flex justify-center items-center gap-2 text-[#666666]">
              <div>-</div>
              <div className="flex justify-center text-sm text-[#666666] my-2">
                or
              </div>
              <div>-</div>
            </div>
          </form>
          <div className="gap-4">
            <button
              // type="submit"
              className="flex items-center justify-center w-full border border-[#3d481e] bg-[#f1ede5] hover:bg-[#ffffff] text-sm text-[#3d481e] py-2 mb-4 rounded-md hover:border-[#3d481e] hover:text-[#3d481e]"
            >
              <span className="flex justify-center items-center mr-2">
                <FcGoogle size={20} />
              </span>
              Continue with Google
            </button>
            <button
              // type="submit"
              className="flex items-center justify-center w-full border border-[#3d481e] bg-[#f1ede5] hover:bg-[#ffffff] text-sm text-[#3d481e] py-2 rounded-md hover:border-[#3d481e] hover:text-[#3d481e]"
            >
              <span className="flex justify-center items-center mr-2">
                <VscGithubInverted size={20} />
              </span>
              Continue with Github
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
