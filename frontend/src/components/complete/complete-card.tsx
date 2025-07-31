import React from "react";

interface CompleteCardProps {
  children: React.ReactNode;
}

export const CompleteCard = ({ children }: CompleteCardProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#450084] via-[#B599CE] to-[#DACCE6] flex items-center justify-center p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#CBB677]/30 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};
