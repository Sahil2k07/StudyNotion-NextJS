import InitializeDatabase, { AppDataSource } from "@/database/dataSource";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcrypt";

export const POST = async function (req: NextRequest) {
  const { id, oldPassword, newPassword, confirmNewPassword } = await req.json();

  if (newPassword !== confirmNewPassword) {
    return NextResponse.json({
      success: false,
      message: "NewPassword and ConfirmNewPassword must be same",
    });
  }

  await InitializeDatabase();

  const user = await AppDataSource.getRepository("User").findOne({
    where: { id },
  });

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Invalid User",
    });
  }

  if (!bcrypt.compare(oldPassword, user.password)) {
    return NextResponse.json({
      success: false,
      message: "Password Incorrect",
    });
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(process.env.BCRYPT_ROUNDS)
  );

  user.password = hashedPassword;

  await AppDataSource.getRepository("User").save(user);

  return NextResponse.json({
    success: true,
    message: "Password changed Successfully",
  });
};
