import Image from "next/image";
import logo from "@/public/logo-xl.png";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex items-center justify-center md:hidden">
      <Link href="/">
        <Image src={logo} height={40} alt="Logo" className="object-contain" />
      </Link>
    </div>
  );
}
