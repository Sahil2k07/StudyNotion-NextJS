"use client";

import IconBtn from "@/components/common/IconBtn";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type PasswordVisibilityState = {
  oldPassword: boolean;
  newPassword: boolean;
  confirmNewPassword: boolean;
};

type Passwords = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function PasswordForm() {
  const [passwordVisibility, setPasswordVisibility] =
    useState<PasswordVisibilityState>({
      oldPassword: false,
      newPassword: false,
      confirmNewPassword: false,
    });

  const [passwords, setPasswords] = useState<Passwords>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { data } = useSession();

  const toggleVisibility = (field: keyof PasswordVisibilityState) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loading = toast.loading("loading");

    if (!data?.user) {
      toast.dismiss(loading);

      toast.error("You are not authorized");

      return;
    }

    try {
      if (passwords.newPassword !== passwords.confirmNewPassword) {
        toast.dismiss(loading);

        toast.error("New Password & Confirm New Password must be same");

        return;
      }

      const response = await fetch("/api/changePassword", {
        method: "POST",
        body: JSON.stringify({
          id: data?.user.id,
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
          confirmNewPassword: passwords.confirmNewPassword,
        }),
      }).then((res) => res.json());

      if (!response || !response.success) {
        toast.dismiss(loading);

        toast.error(response.message);

        return;
      }

      toast.dismiss(loading);

      toast.success(response.message);

      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      toast.dismiss(loading);

      toast.error("Something went wrong");

      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="oldPassword" className="text-white label-style">
              Current Password
            </label>
            <input
              type={passwordVisibility.oldPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="Enter Current Password"
              className="form-style"
              required
              value={passwords.oldPassword}
              onChange={(e) =>
                setPasswords((prev) => ({
                  ...prev,
                  oldPassword: e.target.value,
                }))
              }
            />
            <span
              onClick={() => toggleVisibility("oldPassword")}
              className="absolute right-3 top-[44px] z-[10] cursor-pointer"
            >
              {passwordVisibility.oldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="newPassword" className="text-white label-style">
              New Password
            </label>
            <input
              type={passwordVisibility.newPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Enter New Password"
              className="form-style"
              required
              onChange={(e) =>
                setPasswords((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
            />
            <span
              onClick={() => toggleVisibility("newPassword")}
              className="absolute right-3 top-[44px] z-[10] cursor-pointer"
            >
              {passwordVisibility.newPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
        </div>
        <div className="relative flex flex-col gap-2 lg:w-[48%]">
          <label
            htmlFor="confirmNewPassword"
            className="text-white label-style"
          >
            Confirm New Password
          </label>
          <input
            type={passwordVisibility.confirmNewPassword ? "text" : "password"}
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            className="form-style"
            required
            onChange={(e) =>
              setPasswords((prev) => ({
                ...prev,
                confirmNewPassword: e.target.value,
              }))
            }
          />
          <span
            onClick={() => toggleVisibility("confirmNewPassword")}
            className="absolute right-3 top-[44px] z-[10] cursor-pointer"
          >
            {passwordVisibility.confirmNewPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="reset"
          onClick={() =>
            setPasswords({
              oldPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            })
          }
          className="px-5 py-2 font-semibold rounded-md cursor-pointer bg-richblack-700 text-richblack-50"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Update" />
      </div>
    </form>
  );
}
