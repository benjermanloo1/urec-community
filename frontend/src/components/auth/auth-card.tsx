import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#450084] via-[#B599CE] to-[#DACCE6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#CBB677]/30 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};
