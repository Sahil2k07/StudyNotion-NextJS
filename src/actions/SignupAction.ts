"use server";

import InitializeDatabase, { AppDataSource } from "@/database/dataSource";
import { User } from "@/database/entity/User.entity";
import { redirect } from "next/navigation";
import z from "zod";
import bcrypt from "bcrypt";
import mailer from "@/services/Nodemailer";
import { otpTemplate } from "@/mails/emailVerificationTemplate";
import { Profile } from "@/database/entity/Profile.entity";

enum AccountType {
  ADMIN = "Admin",
  STUDENT = "Student",
  INSTRUCTOR = "Instructor",
}

type UserInput = {
  accountType: AccountType;
  email: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
};

const SignupAction = async (formData: FormData) => {
  const userInput = {
    accountType: formData.get("accountType"),
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    contactNumber: formData.get("contactNumber"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  } as UserInput;

  if (userInput.password !== userInput.confirmPassword) return;

  await InitializeDatabase();

  const existingUser = await AppDataSource.getRepository(User).findOne({
    where: { email: userInput.email },
  });

  if (existingUser) {
    if (existingUser.isSignedIn) {
      redirect(`/errorPage/${encodeURIComponent("Email already registered")}`);
    }

    // Update the verificationOtp with a new OTP and then redirect the user to otp-verification page for checking the OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedPassword = await bcrypt.hash(
      userInput.password,
      Number(process.env.BCRYPT_ROUNDS)
    );

    try {
      await mailer(
        userInput.email,
        "StudyNotion Verification Email",
        otpTemplate(otp)
      );
    } catch (error) {
      redirect(`/errorPage/${encodeURIComponent("Problem while sending OTP")}`);
    }

    existingUser.verificationOtp = otp;
    existingUser.firstName = userInput.firstName;
    existingUser.lastName = userInput.lastName;
    existingUser.contactNumber = userInput.contactNumber;
    existingUser.password = hashedPassword;
    existingUser.accountType = userInput.accountType;
    existingUser.image = `https://api.dicebear.com/5.x/initials/svg?seed=${userInput.firstName} ${userInput.lastName}`;

    try {
      await AppDataSource.getRepository(User).save(existingUser);

      // Create or update the profile for the user
      let profile = await AppDataSource.getRepository("Profile").findOne({
        where: { user: existingUser },
      });

      if (!profile) {
        profile = new Profile();
        profile.user = existingUser;
      }

      await AppDataSource.getRepository(Profile).save(profile);
    } catch (error) {
      redirect(
        `/errorPage/${encodeURIComponent(
          "Problem while signup! Try again later"
        )}`
      );
    }

    redirect(`/auth/otp-verification/${encodeURIComponent(userInput.email)}`);
  }

  const userSchema = z
    .object({
      accountType: z.enum(["Student", "Instructor", "Admin"]),
      firstName: z.string().trim(),
      lastName: z.string().trim(),
      email: z.string().email("Please provide a proper email"),
      contactNumber: z.string().trim().min(10),
      password: z.string().trim(),
      confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password and Confirm Password must be the same",
      path: ["password", "confirmPassword"],
    });

  try {
    userSchema.parse(userInput);
  } catch (error) {
    redirect(
      `/errorPage/${encodeURIComponent(
        "Wrong Inputs! Please ensure correct inputs"
      )}`
    );
  }

  // Now if the user inputs are correct, we will create a new user with a verification OTP inside it and later we will check if the user is correct.
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await mailer(
      userInput.email,
      "StudyNotion Verification Email",
      otpTemplate(otp)
    );
  } catch (error) {
    redirect(`/errorPage/${encodeURIComponent("Problem while sending OTP")}`);
  }

  const hashedPassword = await bcrypt.hash(
    userInput.password,
    Number(process.env.BCRYPT_ROUNDS)
  );

  const user = new User();
  user.accountType = userInput.accountType;
  user.firstName = userInput.firstName;
  user.lastName = userInput.lastName;
  user.email = userInput.email;
  user.password = hashedPassword;
  user.contactNumber = userInput.contactNumber;
  user.verificationOtp = otp;
  user.image = `https://api.dicebear.com/5.x/initials/svg?seed=${userInput.firstName} ${userInput.lastName}`;

  try {
    await AppDataSource.getRepository(User).save(user);

    let profile = new Profile();
    profile.user = user;

    await AppDataSource.getRepository(Profile).save(profile);
  } catch (error) {
    console.log(error);
    redirect(
      `/errorPage/${encodeURIComponent(
        "Problem while signup! Try again later"
      )}`
    );
  }

  redirect(`/auth/otp-verification/${encodeURIComponent(userInput.email)}`);
};

export default SignupAction;
