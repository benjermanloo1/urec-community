import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="flex-row items-center mb-auto">
        <p className="font-semibold text-white text-3xl">UREC Community</p>
      </div>
    </Link>
  );
};
