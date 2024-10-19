"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

export default function ResetPassword({
  params,
}: {
  params: { email: string };
}) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    token: "",
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword, token } = formData;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password & ConfirmPassword must be same");

      return;
    }

    const loading = toast.loading("Trying to Reset Password");

    try {
      const response = await fetch("/api/resetPassword", {
        method: "PUT",
        body: JSON.stringify({
          email: decodeURIComponent(params.email),
          password,
          confirmPassword,
          token,
        }),
      }).then((res) => res.json());

      if (!response || !response.success) {
        toast.dismiss(loading);
        toast.error(response.message);

        return;
      }

      toast.dismiss(loading);
      toast.success(response.message);

      router.push("/auth/login");
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Something went wrong while trying to Reset Password");
    }
  };
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
          Choose new password
        </h1>

        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
          Almost done. Enter your new password and you&apos;re all set.
        </p>

        <form onSubmit={handleOnSubmit}>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              New Password <sup className="text-pink-200">*</sup>
            </p>

            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
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
          </label>

          <label className="relative block mt-3">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm New Password <sup className="text-pink-200">*</sup>
            </p>

            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="form-style w-full !pr-10"
            />

            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label className="relative block mt-3">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Verification Token <sup className="text-pink-200">*</sup>
            </p>

            <input
              required
              type="text"
              name="token"
              value={token}
              onChange={handleOnChange}
              placeholder="Token"
              className="form-style w-full !pr-10"
            />
          </label>

          <button
            type="submit"
            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
          >
            Reset Password
          </button>
        </form>

        <div className="flex items-center justify-between mt-6">
          <Link href="/auth/login">
            <p className="flex items-center gap-x-2 text-richblack-5">
              <BiArrowBack /> Back To Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
