"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
  interests: string[]; // CHANGE ONCE DEVELOPING
  personalInfo?: {
    bio?: string;
    // ADD OTHER OPTIONAL INFO ONCE DEVELOPING
  };
}

interface SignUpContextType {
  data: SignUpData;
  updateData: (fields: Partial<SignUpData>) => void;
  clearData: () => void;
}

const defaultData: SignUpData = {
  firstName: "",
  lastName: "",
  email: "",
  verified: false,
  interests: [],
  personalInfo: {},
};

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export function SignUpProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SignUpData>(defaultData);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("signUpData");
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const updateData = (fields: Partial<SignUpData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const clearData = () => {
    setData(defaultData);

    try {
      localStorage.removeItem("signUpData");
    } catch {}
  };

  return <SignUpContext.Provider value={{ data, updateData, clearData }}>{children}</SignUpContext.Provider>;
}

export function useSignUp() {
  const ctx = useContext(SignUpContext);
  if (!ctx) {
    throw new Error("useSignUp must be used within SignUpProvider");
  }

  return ctx;
}
