"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import EmailIcon from "../../../public/assets/icons/email";
import PasswordIcon from "../../../public/assets/icons/password";
import EyeIcon from "../../../public/assets/icons/eye";
import EyeClosedIcon from "../../../public/assets/icons/eyeClosed";
import WarningIcon from "../../../public/assets/icons/warning";
import ValidIcon from "../../../public/assets/icons/valid";
import { FcGoogle } from "react-icons/fc";
import { VscGithubInverted } from "react-icons/vsc";
import { GoX } from "react-icons/go";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [emailInputActive, setEmailInputActive] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
    }
  }, [isOpen]);

  const isEmailValid = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isEmailValid(email)) {
      setError("Email is invalid.");
      return;
    }

    if (!password) {
      setError("Password is invalid.");
      return;
    }
    try {
      setIsPending(true);
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.error) {
        setError("Invalid Credentials");
        setIsPending(false);
        return;
      }
      router.replace("/dashboard");
    } catch (error) {
      setIsPending(false);
      setError("Something went wrong.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordInputType = showPassword ? "text" : "password";

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
          <div className="relative box-border border border-[#071e22] hover:border-[#3510bc] bg-[#F8F7F4] p-8 rounded-md h-auto w-[450px]">
            <div className="absolute cursor-pointer right-7 top-7 text-black hover:text-red-500"
            onClick={onClose}>
              <GoX size={25} />
            </div>
            <h2 className="flex justify-center text-2xl font-extrabold text-[#071e22]">
              Welcome Back!
            </h2>
            <p className="flex justify-center text-[#071e22] mb-4">
              Log in to SkillForge
            </p>

            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                {error && (
                  <span className="error flex text-white text-sm w-full px-3 py-2 rounded-md bg-[#ee2e31]">
                    {error}
                  </span>
                )}
              </div>
              <div className="relative mb-4">
                <span className="absolute h-6 w-6 top-1/2 translate-y-[-45%] left-3">
                  <EmailIcon hex={"#071e22"} />
                </span>
                <input
                  data-testid="email-login-field"
                  ref={emailInputRef} // Add ref to email input
                  type="email"
                  className={`w-full px-3 ps-12 py-2 border ${
                    !isEmailValid(email) // Only apply border color when email input is touched
                      ? "border-[#ee2e31]"
                      : "border-[#071e22]"
                  } bg-transparent focus:bg-transparent rounded-md focus:outline-none focus:border-[#3510bc] text-sm text-[#071e22] focus:text-[#071e22]`}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailInputActive(true); // Mark email input as touched on change
                  }}
                  required
                />
                {isEmailValid(email) && emailInputActive ? ( // Display icon only if email is valid and input is touched
                  <span className="absolute h-4 w-4 top-1/2 translate-y-[-45%] right-3">
                    <ValidIcon hex={"#007b75"} />
                  </span>
                ) : emailInputActive ? ( // Display warning icon if input is touched but email is not valid
                  <span className="absolute h-4 w-4 top-1/2 translate-y-[-45%] right-3">
                    <WarningIcon hex={"#ee2e31"} />
                  </span>
                ) : null}
              </div>
              <div className="relative mb-4">
                <span className="absolute h-5 w-5 top-1/2 translate-y-[-45%] left-3">
                  <PasswordIcon hex={"#071e22"} />
                </span>
                <input
                  data-testid="password-login-field"
                  type={passwordInputType}
                  className="w-full px-3 ps-12 py-2 border border-[#071e22] bg-transparent focus:bg-transparent rounded-md focus:outline-none focus:border-[#3510bc] text-sm text-[#071e22] focus:text-[#071e22]"
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
                    <EyeIcon hex={"#071e22"} />
                  ) : (
                    <EyeClosedIcon hex={"#071e22"} />
                  )}
                </span>
              </div>
              <button
                data-testid="login-button"
                type="submit"
                disabled={isPending ? true : false}
                className={`w-full bg-[#4014e4] text-sm text-white py-2 rounded-md
                 "cursor-not-allowed" : "hover:bg-[#3510bc]" `}
              >
                {isPending ? "Logging In" : "Log In"}
              </button>

              <div className="flex justify-center items-center gap-2 text-[#679289]">
                <div>-</div>
                <div className="flex justify-center text-sm text-[#679289] my-2">
                  or log in using
                </div>
                <div>-</div>
              </div>
            </form>
            <div className="gap-4">
              <button
                data-testid="google-login-button"
                className="flex items-center justify-center w-full border border-[#ff3e00] hover:bg-[#ffffff] text-sm text-[#ff3e00] py-2 mb-2 rounded-md hover:border-[#3510bc] hover:text-[#3510bc]"
                onClick={async () =>
                  await signIn("google", { callbackUrl: "/dashboard" })
                }
              >
                <span className="flex justify-center items-center mr-2">
                  <FcGoogle size={20} />
                </span>
                Continue with Google
              </button>
              <button
              className="flex items-center justify-center w-full border border-[#772e9b] hover:bg-[#ffffff] text-sm text-[#772e9b] py-2 rounded-md hover:border-[#3510bc] hover:text-[#3510bc]"
              onClick={async () =>
                  await signIn("github", { callbackUrl: "/dashboard" })
                }
              >
                <span className="flex justify-center items-center mr-2">
                  <VscGithubInverted size={20} />
                </span>
                Continue with Github
              </button>
              <div className="flex justify-center mt-2 gap-2 text-xs text-[#679289] ">
                <div>Don't have an account yet?</div>
                <button
                  data-testid="login-signup-button"
                  className="text-[#071e22] font-medium"
                  onClick={onClose}
                >
                  Sign up here.
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
