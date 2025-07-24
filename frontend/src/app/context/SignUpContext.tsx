"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Interest } from "@/lib/types";

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
  interests: Interest[]; // CHANGE ONCE DEVELOPING
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

  useEffect(() => {
    try {
      localStorage.setItem("signUpData", JSON.stringify(data));
    } catch {}
  }, [data]);

  const updateData = useCallback((fields: Partial<SignUpData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  }, []);

  const clearData = useCallback(() => {
    setData(defaultData);
    try {
      localStorage.removeItem("signUpData");
    } catch {}
  }, []);

  return <SignUpContext.Provider value={{ data, updateData, clearData }}>{children}</SignUpContext.Provider>;
}

export function useSignUp() {
  const ctx = useContext(SignUpContext);
  if (!ctx) {
    throw new Error("useSignUp must be used within SignUpProvider");
  }

  return ctx;
}
