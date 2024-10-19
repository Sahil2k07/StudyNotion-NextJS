"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loading = toast.loading("Trying to verify Email");

    try {
      const response = await fetch("/api/resetPassword", {
        method: "POST",
        body: JSON.stringify({ email }),
      }).then((res) => res.json());

      if (!response || !response.success) {
        toast.dismiss(loading);

        toast.error(response.message);

        return;
      }
      toast.dismiss(loading);

      toast.success(response.message);

      router.push(`/reset-password/${encodeURIComponent(email)}`);
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Problem while Verifying email");
    }
  };

  return (
    <section className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
          {!emailSent ? "Reset Your Password" : "CheckEmail"}
        </h1>

        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
          {!emailSent
            ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
            : `We have sent the reset email to ${email}`}
        </p>

        <form onSubmit={handleSubmit}>
          {!emailSent && (
            <label className="w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Email Address <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full form-style"
              />
            </label>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
          >
            {!emailSent ? "Sumbit" : "Resend Email"}
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
    </section>
  );
}
