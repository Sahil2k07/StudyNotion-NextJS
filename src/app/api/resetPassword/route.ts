import InitializeDatabase, { AppDataSource } from "@/database/dataSource";
import { tokenTemplate } from "@/mails/passwordUpdateEmail";
import mailer from "@/services/Nodemailer";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcrypt";

export const POST = async function (req: NextRequest) {
  const { email } = await req.json();

  await InitializeDatabase();

  const user = await AppDataSource.getRepository("User").findOne({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Invalid User",
    });
  }

  const token = Math.floor(100000 + Math.random() * 900000).toString();

  user.token = token;

  try {
    await mailer(email, "Password Reset Email", tokenTemplate(token));
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error sending Verification mail to the Provided Email",
    });
  }

  await AppDataSource.getRepository("User").save(user);

  return NextResponse.json({
    success: true,
    message: "Check Email for a Verification Token",
  });
};

export const PUT = async function (req: NextRequest) {
  const { email, password, confirmPassword, token } = await req.json();

  if (password !== confirmPassword || !email || !token) {
    return NextResponse.json({
      success: false,
      message: "Invalid Inputs",
    });
  }

  console.log(email);
  console.log(token);
  console.log(password);

  await InitializeDatabase();

  const user = await AppDataSource.getRepository("User").findOne({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Invalid Email",
    });
  }

  if (token !== user.token) {
    return NextResponse.json({
      success: false,
      message: "Not Authorized, Invalid Token",
    });
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_ROUNDS)
  );

  user.password = hashedPassword;
  user.token = null;

  await AppDataSource.getRepository("User").save(user);

  return NextResponse.json({
    success: true,
    message: "Password Reset Successfull",
  });
};
