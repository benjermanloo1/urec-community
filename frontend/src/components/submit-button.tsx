import React from "react";

interface SubmitButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
}

export const SubmitButton = ({
  onClick,
  children,
  type = "primary",
  disabled = false,
  className = "",
}: SubmitButtonProps) => {
  const baseClasses =
    "w-full py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent transform transition-all duration-200";

  const typeClasses = {
    primary:
      "bg-gradient-to-r from-[#450084] to-[#B599CE] text-white hover:from-[#450084] hover:to-[#DACCE6] focus:ring-[#450084] hover:scale-[1.02] shadow-lg",
    secondary:
      "bg-white border border-[#B2B2B2] text-[#333333] hover:bg-[#F4EFE1] hover:border-[#CBB677] focus:ring-[#450084]",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type="button"
      onClick={(e) => {
        if (!disabled) onClick();
      }}
      disabled={disabled}
      className={`${baseClasses} ${typeClasses[type]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};
