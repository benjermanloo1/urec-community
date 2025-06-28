import { HeaderLogo } from "@/components/header-logo";

export const Header = () => {
  return (
    <header>
      <div className="bg-[#450084] max-w mx-auto px-6 py-1.5">
        <div className="w-full-screen flex items-center justify-center mb-5">
          <div className="flex items-center lg:gap-x-25">
            <HeaderLogo />
          </div>
        </div>
      </div>
    </header>
  );
};
