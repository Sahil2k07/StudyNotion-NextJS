"use client";

import Image from "next/image";
import githubLogo from "@/assets/Logo/github.png";
import { signIn } from "next-auth/react";

export default function NextAuthProviders() {
  return (
    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row space-y-8 sm:space-y-0 md:space-y-8 lg:space-y-0 justify-between items-center">
      <div
        onClick={async () => await signIn("google")}
        className="flex items-center justify-center text-black bg-richblack-5 rounded-lg transition duration-300 hover:scale-95"
      >
        <button className="px-4 py-2 flex gap-2 rounded-lg text-slate-700">
          <Image
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
            width={24}
            height={24}
          />
          <span>Login with Google</span>
        </button>
      </div>

      <div
        onClick={async () => await signIn("github")}
        className="flex items-center justify-center bg-black text-richblack-5 rounded-lg transition duration-300 hover:scale-95"
      >
        <button className="px-4 py-2 flex gap-2 rounded-lg text-slate-700">
          <Image
            src={githubLogo}
            loading="lazy"
            alt="google logo"
            width={24}
            height={24}
          />
          <span>Login with Github</span>
        </button>
      </div>
    </div>
  );
}
