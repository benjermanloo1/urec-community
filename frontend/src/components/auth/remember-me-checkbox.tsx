import React from "react";

interface RememberMeCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const RememberMeCheckbox = ({ checked, onChange }: RememberMeCheckboxProps) => {
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
    </div>
  );
};
