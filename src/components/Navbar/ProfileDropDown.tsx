"use client";

import useOnClickOutside from "@/hooks/useOnClickOutside";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";

export default function ProfileDropDown({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    image: "",
    firstName: "",
  });
  const ref = useRef(null);

  const { data } = useSession();

  useEffect(() => {
    async function fetchUserDetails() {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }).then((res) => res.json());

      setUser({
        image: response?.user.image,
        firstName: response?.user.firstName,
      });

      console.log(user.image);
    }

    fetchUserDetails();

    return () => {
      setUser({
        image: "",
        firstName: "",
      });
    };
  }, []);

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div className="relative z-10" ref={ref}>
      <button
        className="flex items-center gap-x-1"
        onClick={() => setOpen((prev) => !prev)}
      >
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </button>
      {open && (
        <div className="absolute top-[118%] right-0 z-[10000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800">
          <Link href="/dashboard/my-profile">
            <div
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
              onClick={() => setOpen(false)}
            >
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 cursor-pointer hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
