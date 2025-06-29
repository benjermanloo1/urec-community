import React from "react";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export const EmailInput = ({
  value,
  onChange,
  placeholder = "Enter your JMU email",
  required = true,
}: EmailInputProps) => {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-[#333333] mb-2">
        Email Address
      </label>
      <div className="relative">
        <input
          type="email"
          id="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-[#B2B2B2] rounded-lg text-[#333333] placeholder-[#595959] focus:outline-none focus:ring-2 focus:ring-[#450084] focus:border-[#450084] transition-all duration-200"
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
};
