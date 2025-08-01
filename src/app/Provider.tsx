"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface NextAuthProviderProps {
  children: ReactNode; // Explicitly typed as ReactNode
}

export const NextAuthProvider = ({ children }: NextAuthProviderProps) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};
