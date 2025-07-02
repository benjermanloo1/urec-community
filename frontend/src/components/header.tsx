"use client";

import { usePathname } from "next/navigation";
import { useMedia } from "react-use";

import { HeaderLogo } from "@/components/header-logo";
import { SignInButton } from "@/components/sign-in-button";
import { Navigation } from "@/components/navigation";

export const Header = () => {
  const isMobile = useMedia("(max-width: 1024px)", false);

  const handleLogin = async (): Promise<void> => {
    try {
      window.location.href = "/sign-in";
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const pathname = usePathname();

  const hideHeader = pathname.includes("/sign-in") || pathname.includes("/sign-up");

  if (hideHeader) {
    return null;
  }

  return (
    <header>
      <div className="bg-[#450084] max-w mx-auto py-2">
        <div className="w-full flex items-center justify-between px-4">
          <div className="flex-1 ">{isMobile ? <Navigation /> : <HeaderLogo />}</div>
          <div className="flex-1 flex justify-center">{isMobile ? <HeaderLogo /> : <Navigation />}</div>
          <div className="flex-1 flex justify-end">
            <SignInButton onClick={handleLogin} />
          </div>
        </div>
      </div>
    </header>
  );
};
