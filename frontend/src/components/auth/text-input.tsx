import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export const TextInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#333333] mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-3 bg-white border border-[#B2B2B2] rounded-lg text-[#333333] placeholder-[#595959] focus:outline-none focus:ring-2 focus:ring-[#450084] focus:border-[#450084] transition-all duration-200 ${
            type === "password" ? "pr-12" : ""
          }`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#595959] hover:text-[#450084] transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
};
