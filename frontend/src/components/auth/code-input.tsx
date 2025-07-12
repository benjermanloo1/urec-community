import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx"; // make sure to install: npm i clsx

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean; // 👈 shake animation trigger
}

export const CodeInput = ({ value, onChange, disabled = false, invalid = false }: CodeInputProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));

  useEffect(() => {
    if (value.length === 6) {
      setDigits(value.split(""));
    }
  }, [value]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;

    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);
    const newValue = newDigits.join("");
    onChange(newValue);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("Text").trim();
    if (!/^\d{6}$/.test(pasted)) return;

    const newDigits = pasted.split("");
    setDigits(newDigits);
    onChange(pasted);
    inputsRef.current[5]?.focus(); // move to last
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && digits[index] === "") {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft") {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight") {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
    <div className={clsx("flex gap-2", invalid && "animate-shake")}>
      {digits.map((digit, idx) => (
        <Input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={disabled}
          ref={(el) => {
            inputsRef.current[idx] = el;
          }}
          onPaste={handlePaste}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          aria-label={`Digit ${idx + 1}`}
          className={clsx(
            "w-10 h-10 text-center text-xl border-b-2 border-black rounded-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-black text-black"
          )}
        />
      ))}
    </div>
  );
};
