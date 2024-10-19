"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const matchRoute = (route: string) => {
    return pathname.startsWith(route);
  };
  return (
    <nav className="hidden md:block z-30">
      <ul className="flex gap-x-6 text-richblack-25">
        <Link href="/">
          <li
            className={`${
              pathname === "/" ? "text-yellow-25" : "text-richblack-25"
            }`}
          >
            Home
          </li>
        </Link>
        <Link href="/about">
          <li
            className={`${
              matchRoute("/about") ? "text-yellow-25" : "text-richblack-25"
            }`}
          >
            About
          </li>
        </Link>
        <Link href="/contact">
          <li
            className={`${
              matchRoute("/contact") ? "text-yellow-25" : "text-richblack-25"
            }`}
          >
            ContactUs
          </li>
        </Link>
        <Link href="/dashboard/my-profile">
          <li
            className={`${
              matchRoute("/dashboard") ? "text-yellow-25" : "text-richblack-25"
            }`}
          >
            Dashboard
          </li>
        </Link>
      </ul>
    </nav>
  );
}
