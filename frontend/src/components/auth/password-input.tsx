import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export const PasswordInput = ({
  value,
  onChange,
  label = "Password",
  placeholder = "Enter your password",
  required = true,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-[#333333] mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-[#B2B2B2] rounded-lg text-[#333333] placeholder-[#595959] focus:outline-none focus:ring-2 focus:ring-[#450084] focus:border-[#450084] transition-all duration-200 pr-12"
          placeholder={placeholder}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#595959] hover:text-[#450084] transition-colors"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};
