import React from "react";

interface RememberMeCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  showForgotPassword?: boolean;
}

export const RememberMeCheckbox = ({ checked, onChange, showForgotPassword = true }: RememberMeCheckboxProps) => {
  return (
    <div className="flex items-center justify-between">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 text-[#450084] bg-white border-[#B2B2B2] rounded focus:ring-[#450084] focus:ring-2"
        />
        <span className="ml-2 text-sm text-[#595959]">Remember me</span>
      </label>
      {showForgotPassword && (
        <a href="#" className="text-sm text-[#450084] hover:text-[#B599CE] transition-colors">
          Forgot password?
        </a>
      )}
    </div>
  );
};
