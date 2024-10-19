"use client";

import { useState, ChangeEvent } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function PasswordInput() {
  const [showText, setShowText] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const toggleShowText = (field: "password" | "confirmPassword") => {
    setShowText((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);

  return (
    <>
      <div className="flex gap-x-4">
        <label htmlFor="password" className="relative w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            onChange={handlePasswordChange}
            required
            type={showText.password ? "text" : "password"}
            name="password"
            value={password}
            placeholder="Enter Password"
            className="form-style w-full !pr-10"
          />
          <span
            onClick={() => toggleShowText("password")}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showText.password ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>

        <label htmlFor="confirmPassword" className="relative w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Confirm Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            type={showText.confirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Re-Enter Password"
            className="form-style w-full !pr-10"
          />
          <span
            onClick={() => toggleShowText("confirmPassword")}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showText.confirmPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>
      </div>
      <span
        className={`${
          password === confirmPassword ? "hidden" : "block"
        } mb-1 text-[0.875rem] leading-[1.375rem] text-pink-100`}
      >
        Password and Confirm Password must be the same <sup>*</sup>
      </span>
    </>
  );
}
