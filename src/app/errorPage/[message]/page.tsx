"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

export default function ErrorPage({ params }: { params: { message: string } }) {
  const router = useRouter();

  const message =
    decodeURIComponent(params.message) || "Oops! Something went wrong";

  useEffect(() => {
    toast.error(message);
  }, [message]);

  return (
    <div className="flex items-center justify-center flex-1 h-screen flex-col bg-richblack-900 z-10 absolute top-0 w-full gap-5">
      <p className="bg-gradient-to-b from-[#FF0000] to-[#FF7D7D] text-6xl text-transparent bg-clip-text font-bold">
        Error !!
      </p>
      <p className="text-xl text-white lg:text-3xl">{message}</p>
      <div
        className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] bg-yellow-50 text-black  hover:shadow-none hover:scale-95 transition-all duration-200 `}
      >
        <div className="flex items-center gap-2" onClick={() => router.back()}>
          <FaArrowLeft />
          Go Back
        </div>
      </div>
    </div>
  );
}
