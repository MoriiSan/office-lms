"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "inspector";

const AuthProvider = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
