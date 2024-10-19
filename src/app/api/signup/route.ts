import InitializeDatabase, { AppDataSource } from "@/database/dataSource";
import { otpTemplate } from "@/mails/emailVerificationTemplate";
import mailer from "@/services/Nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    await InitializeDatabase();

    const user = await AppDataSource.getRepository("User").findOne({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    if (user.verificationOtp !== otp) {
      return NextResponse.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.verificationOtp = null;
    user.isSignedIn = true;

    try {
      await AppDataSource.getRepository("User").save(user);
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "Error SigningIn User",
      });
    }

    return NextResponse.json({
      success: true,
      message: "User Signed In successfully",
      user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error while trying to SignUp user",
      error,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { email } = await req.json();

    await InitializeDatabase();

    const user = await AppDataSource.getRepository("User").findOne({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User dosen't exist.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.verificationOtp = otp;

    try {
      await mailer(email, "StudyNotion Verification-Email", otpTemplate(otp));
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "Problem while Emailing OTP",
      });
    }

    try {
      await AppDataSource.getRepository("User").save(user);
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "Cannot Authenticate User right now. Try again later!",
      });
    }

    return NextResponse.json({
      success: true,
      email,
      otp: user.verificationOtp,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Problems while resending OTP or SigningIn user",
    });
  }
}
