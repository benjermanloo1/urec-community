import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image src="/jmu-stacked-white.png" alt="Logo" width={300} height={300} />
        <p className="font-robotoSlab font-semibold text-white text-2xl ml-2.5">UREC Community</p>
      </div>
    </Link>
  );
};
