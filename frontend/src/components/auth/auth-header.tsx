import React from "react";
import { User } from "lucide-react";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-r from-[#450084] to-[#B599CE] rounded-full mx-auto mb-4 flex items-center justify-center">
        <User className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-[#333333] mb-2">{title}</h1>
      <p className="text-[#595959]">{subtitle}</p>
    </div>
  );
};
