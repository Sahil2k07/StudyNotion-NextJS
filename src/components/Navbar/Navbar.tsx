import Link from "next/link";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/services/NextAuth";
import ProfileDropDown from "./ProfileDropDown";
import { ACCOUNT_TYPE } from "@/utils/constants";
import NavbarLinks from "@/components/Navbar/NavLinks";

async function Navbar() {
  const session = await getServerSession(NEXT_AUTH);

  const totalItems = 0;
  return (
    <nav className="flex z-50 justify-center items-center h-14 border-b-[1px] border-b-richblack-700 transition-all duration-200 sticky">
      <div className="flex items-center justify-between w-11/12 max-w-maxContent">
        <Link href="/">
          <Image src={Logo} width={160} height={42} alt="Logo" />
        </Link>

        <NavbarLinks />

        <div className="items-center hidden gap-x-4 md:flex">
          {session?.user &&
            session?.user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link href={"/dashboard/cart"} className="relative">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />

                {totalItems > 0 && (
                  <span className="absolute grid w-5 h-5 overflow-hidden text-xs font-bold text-center text-yellow-100 rounded-full -bottom-2 -right-2 place-items-center bg-richblack-600">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

          {session === null && (
            <Link href={"/auth/login"}>
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log In
              </button>
            </Link>
          )}

          {session === null && (
            <Link href="/auth/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign Up
              </button>
            </Link>
          )}

          {session !== null && <ProfileDropDown id={session?.user?.id} />}
        </div>

        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="AFB2BF" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
