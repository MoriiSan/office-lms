"use client";

import React, { useState } from "react";
import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import EmailIcon from "../../../public/assets/icons/email";
import PasswordIcon from "../../../public/assets/icons/password";
import EyeIcon from "../../../public/assets/icons/eye";
import EyeClosedIcon from "../../../public/assets/icons/eyeClosed";
import WarningIcon from "../../../public/assets/icons/warning";
import ValidIcon from "../../../public/assets/icons/valid";
import { FcGoogle } from "react-icons/fc";
import { VscGithubInverted } from "react-icons/vsc";
import UsernameIcon from "../../../public/assets/icons/username";
import TerminalLoader from "../loading";
import Login from "./Login";

const Signup: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginOpen(true);
  };
  const handleCloseModal = () => {
    setLoginOpen(false);
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    if (!isEmailValid(email)) {
      setError("Email is invalid.");
      return;
    }

    if (!password) {
      setError("Password is invalid.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });
      if (res.status === 400) {
        setError("This email is already registered.");
      }
      if (res.status === 200) {
        setError("");
        setLoginOpen(true);
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   if (!fullName || !email || !password) {
  //     setError("Must provide all the credentials.");
  //   }
  //   try {
  //     setIsPending(true);
  //     const res = await fetch(`/api/register`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ fullName, email, password }),
  //     });
  //     const createUser = await res.json();
  //     if (res.ok) {
  //       setIsPending(false);
  //       const form = e.target as HTMLFormElement;
  //       form.reset();
  //       setError(createUser.message);
  //     } else {
  //       setError(createUser.message);
  //       setIsPending(false);
  //     }
  //   } catch (error) {
  //     setIsPending(false);
  //     setError("Something went wrong.");
  //   }
  // }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordInputType = showPassword ? "text" : "password";

  const isEmailInvalid = email && !isEmailValid(email);

  const isSubmitDisabled = !(email && password && fullName);

  // if (isPending) {
  //   return <TerminalLoader />;
  // }

  return (
    <>
      <div className="">
        <div className="box-border border border-[#071e22] hover:border-[#3510bc] bg-[#F8F7F4] p-8 rounded-md h-[500px] w-[450px]">
          <h2 className="flex justify-center text-lg font-extrabold text-[#071e22]">
            Join SkillForge and build your skills!
          </h2>
          <p className="flex justify-center text-[#071e22] mb-4">
            Forge your path with SkillForge
          </p>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <span className="absolute h-6 w-6 top-1/2 translate-y-[-45%] left-3">
                <UsernameIcon hex={"#071e22"} />
              </span>
              <input
                type="text"
                id="fullName"
                className="w-full px-3 ps-12 py-2 border border-[#071e22] bg-transparent focus:bg-transparent rounded-md focus:outline-none focus:border-[#3510bc] text-sm text-[#071e22] focus:text-[#071e22]"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                required
              />
            </div>
            <div className="relative mb-4">
              <span className="absolute h-6 w-6 top-1/2 translate-y-[-45%] left-3">
                <EmailIcon hex={"#071e22"} />
              </span>
              <input
                type="email"
                id="email"
                className={`w-full px-3 ps-12 py-2 border ${
                  isEmailInvalid ? "border-[#ee2e31]" : "border-[#071e22]"
                } bg-transparent focus:bg-transparent rounded-md focus:outline-none focus:border-[#3510bc] text-sm text-[#071e22] focus:text-[#071e22]`}
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              {isEmailValid(email) && (
                <span className="absolute h-4 w-4 top-1/2 translate-y-[-45%] right-3">
                  <ValidIcon hex={"#007b75"} />
                </span>
              )}
              {isEmailInvalid && (
                <span className="absolute h-4 w-4 top-1/2 translate-y-[-45%] right-3">
                  <WarningIcon hex={"#ee2e31"} />
                </span>
              )}
            </div>
            <div className="relative mb-4">
              <span className="absolute h-5 w-5 top-1/2 translate-y-[-45%] left-3">
                <PasswordIcon hex={"#071e22"} />
              </span>
              <input
                type={passwordInputType}
                id="password"
                className="w-full px-3 ps-12 py-2 border border-[#071e22] bg-transparent focus:bg-transparent rounded-md focus:outline-none focus:border-[#3510bc] text-sm text-[#071e22] focus:text-[#071e22]"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <span
                className="absolute h-5 w-5 top-1/2 translate-y-[-45%] right-3"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeIcon hex={"#071e22"} />
                ) : (
                  <EyeClosedIcon hex={"#071e22"} />
                )}
              </span>
            </div>
            <div className="flex justify-center text-xs text-[#679289]">
              <span>
                By clicking sign up, you agree to AcademyQuest's{" "}
                <u className="cursor-pointer">Terms of Services</u> &{" "}
                <u className="cursor-pointer">Privacy Policy</u>.
              </span>
            </div>
            {error && <span className="message text-red-600 text-sm">{error}</span>}
            <button
              type="submit"
              disabled={isPending ? true : false}
              className={`w-full bg-[#4014e4] text-sm text-white py-2 rounded-md ${
                isSubmitDisabled ? "cursor-not-allowed" : "hover:bg-[#3510bc]"
              } mt-2`}
              // title={isSubmitDisabled ? 'Please fill out all fields' : ''}
              // onClick={() => router.push("/dashboard")}
            >
              {isPending ? "Enrolling" : "Start Learning"}
            </button>
            <div className="flex justify-center items-center gap-2 text-[#679289]">
              <div>-</div>
              <div className="flex justify-center text-sm text-[#679289] my-2">
                or sign up using
              </div>
              <div>-</div>
            </div>
          </form>
          <div className="gap-4">
            <button
              // type='submit'
              className="flex items-center justify-center w-full border border-[#071e22] bg-[#f1ede5] hover:bg-[#ffffff] text-sm text-[#071e22] py-2 mb-4 rounded-md hover:border-[#3510bc] hover:text-[#3510bc]"
            >
              <span className="flex justify-center items-center mr-2">
                <FcGoogle size={20} />
              </span>
              Continue with Google
            </button>
            <button
              // type='submit'
              className="flex items-center justify-center w-full border border-[#071e22] bg-[#f1ede5] hover:bg-[#ffffff] text-sm text-[#071e22] py-2 rounded-md hover:border-[#3510bc] hover:text-[#3510bc]"
            >
              <span className="flex justify-center items-center mr-2">
                <VscGithubInverted size={20} />
              </span>
              Continue with Github
            </button>
            <div className="flex justify-center mt-2 gap-2 text-xs text-[#679289] ">
              <div>Already have an account?</div>
              <button
                className="text-[#071e22] font-medium"
                onClick={handleLoginClick}
              >
                Log in here.
              </button>
            </div>
          </div>
        </div>
      </div>
      <Login isOpen={loginOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Signup;
