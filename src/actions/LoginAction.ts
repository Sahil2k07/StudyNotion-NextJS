"use client";

import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

type FormDataType = {
  email: string;
  password: string;
};

export default async function LoginAction({ email, password }: FormDataType) {
  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!response?.ok) {
      if (response?.error === "CredentialsSignin") {
        toast.error("Invalid Email or Password");
        return false;
      }
      toast.error("Login Failed");
      return false;
    }

    toast.success("Login Successful");
    return true;
  } catch (error) {
    toast.error("Failed to login");
    return false;
  }
}
