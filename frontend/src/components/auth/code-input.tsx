import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

import { ResendCode } from "./resend-code";
import { useSignUp } from "@/app/context/SignUpContext";
import { sendVerification } from "@/lib/api/user";

interface CodeInputProps {
  onCodeChange?: (code: string) => void;
  hasError?: boolean;
  onClearError?: () => void;
}

export const CodeInput = ({ onCodeChange, hasError, onClearError }: CodeInputProps) => {
  const { data, updateData } = useSignUp();
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [shake, setShake] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const email = data.email;

  const focusInput = (index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      setActiveIndex(index);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const updatedCode = [...code];
    updatedCode[index] = value.slice(-1);
    setCode(updatedCode);

    if (value && index < 5) {
      focusInput(index + 1);
    }
  };

  useEffect(() => {
    if (hasError) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [hasError]);

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const updatedCode = [...code];

      if (code[index]) {
        updatedCode[index] = "";
        setCode(updatedCode);
      } else if (index > 0) {
        updatedCode[index - 1] = "";
        setCode(updatedCode);
        focusInput(index - 1);
      }
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index > 0) focusInput(index - 1);
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (index < 5) focusInput(index + 1);
    }

    if (e.key === "Delete") {
      e.preventDefault();
      const updatedCode = [...code];
      updatedCode[index] = "";
      setCode(updatedCode);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, 6);

    if (digits.length > 0) {
      const updatedCode = [...code];
      for (let i = 0; i < 6; i++) {
        updatedCode[i] = digits[i] || "";
      }
      setCode(updatedCode);
      focusInput(Math.min(digits.length, 5));
    }
  };

  const handleSubmit = async () => {
    await sendVerification({ email });
  };

  const clearCode = () => {
    setCode(["", "", "", "", "", ""]);
    focusInput(0);

    if (onClearError) {
      onClearError();
    }
  };

  const hasValue = code.some((digit) => digit !== "");

  useEffect(() => {
    focusInput(0);
  }, []);

  useEffect(() => {
    if (onCodeChange) {
      onCodeChange(code.join(""));
    }
  }, [code, onCodeChange]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Enter Verification Code</h2>

      <div className="relative">
        <div className={`flex gap-2 transition-all ${shake ? "animate-shake" : ""}`}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => setActiveIndex(index)}
              className={`w-12 h-12 text-center text-black text-xl font-bold border-2 rounded-lg outline-none transition-all duration-200 bg-white ${
                hasError ? "border-red-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {hasValue && (
          <button
            onClick={clearCode}
            className="absolute -right-8 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Clear code"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {hasError && <p className="text-sm text-red-600 font-medium mt-2 text-center">Code does not match</p>}

      <div className="text-sm text-gray-600 text-center">
        <p>Enter the 6-digit code sent to your device</p>
        <ResendCode onResend={handleSubmit} />
      </div>
    </div>
  );
};
