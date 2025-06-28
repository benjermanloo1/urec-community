import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center flex">
        <Image src="/jmu-white.png" alt="Logo" width={75} height={75} />
        <p className="font-roboto-slab font-semibold text-white text-3xl ml-10">UREC Community</p>
      </div>
    </Link>
  );
};
