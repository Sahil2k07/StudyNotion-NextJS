"use client";

import { FormEvent, useState } from "react";
import NextAuthProviders from "./NextAuthProviders";
import SubmitButton from "./SubmitButton";
import LoginAction from "@/actions/LoginAction";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const router = useRouter();

  const login = async (e: FormEvent) => {
    e.preventDefault();

    const success = await LoginAction(formData);

    if (success) {
      router.push("/dashboard/my-profile");
      router.refresh();
    }
  };

  return (
    <main>
      <form onSubmit={login} className="flex flex-col w-full mt-6 gap-y-4">
        <label htmlFor="email" className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>

          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            type="email"
            name="email"
            placeholder="Enter Your Email Address"
            className="w-full form-style"
          />
        </label>

        <label htmlFor="password" className="relative">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Password <sup className="text-pink-200">*</sup>
          </p>

          <input
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            className="form-style w-full !pr-10"
          />

          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>

          <Link href="/forgot-password">
            <p className="mt-1 ml-auto text-xs text-blue-100 max-w-max">
              Forgot Password
            </p>
          </Link>
        </label>

        <SubmitButton>Login</SubmitButton>
      </form>
      <div className="text-richblack-100 relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <NextAuthProviders />
    </main>
  );
}
