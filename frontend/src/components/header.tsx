import { HeaderLogo } from "@/components/header-logo";

export const Header = () => {
  return (
    <header>
      <div className="bg-[#450084] max-w mx-auto">
        <div className="w-full flex items-center justify-between mb-5">
          <div className="flex items-center lg:gap-x-25">
            <HeaderLogo />
          </div>
        </div>
      </div>
    </header>
  );
};
