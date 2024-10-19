"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import OTPInput from "react-otp-input";

export default function OtpVerification({
  params,
}: {
  params: { email: string };
}) {
  const [counter, setCounter] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (counter !== 0) {
      toast.success("OTP sent again successfully, Please Verify your Email");
      return;
    }

    toast.success("Verify Your Email");
  }, [counter]);

  const email = decodeURIComponent(params.email);

  const [otp, setOtp] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const loading = toast.loading("Trying to SignIn");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      }).then((res) => res.json());

      if (!response.success) {
        toast.dismiss(loading);
        toast.error(response.message);
        setOtp("");
        return;
      }

      toast.dismiss(loading);
      toast.success(response.message);
      router.push("/auth/login");
    } catch (error) {
      router.push(
        `/errorPage/${encodeURIComponent("Problem while Authenticating User")}`
      );
    }
  };

  const handleResendOTP = async () => {
    const loading = toast.loading("Sending OTP");

    const response = await fetch("/api/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .catch(() => {
        toast.dismiss(loading);
        toast.error("Problem while sending OTP");
        return;
      });

    if (!response.success) {
      toast.dismiss(loading);
      toast.error(response.message);
    } else {
      toast.dismiss(loading);
      setCounter(counter + 1);
    }
  };

  return (
    <section className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      <div className="p-4 lg:p-8 max-w-[500px]">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          Verify Email
        </h1>

        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
          A verification code has been sent to you. Enter the code below
        </p>

        <form onSubmit={handleSubmit}>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 6px",
            }}
          />

          <button
            type="submit"
            className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
          >
            Verify Email
          </button>
        </form>

        <div className="flex items-center justify-between mt-6">
          <Link
            href="/auth/signup"
            className="flex items-center text-richblack-5 gap-x-2"
          >
            <BiArrowBack />
            Back to SignUp
          </Link>

          <button
            className="flex items-center text-blue-100 gap-x-2"
            onClick={handleResendOTP}
          >
            <RxCountdownTimer />
            Resend OTP
          </button>
        </div>
      </div>
    </section>
  );
}
