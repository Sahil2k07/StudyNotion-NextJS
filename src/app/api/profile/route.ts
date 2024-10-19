import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/services/NextAuth";
import { NextResponse, type NextRequest } from "next/server";
import InitializeDatabase, { AppDataSource } from "@/database/dataSource";
import {
  CloudinaryConnect,
  uploadImageToCloudinary,
} from "@/services/Cloudinary";

export const PUT = async function (req: NextRequest) {
  const session = await getServerSession(NEXT_AUTH);

  if (!session) {
    return NextResponse.json({
      success: false,
      message: "Route is reserved for users only",
    });
  }

  const formData = await req.formData();
  const displayPicture = formData.get("displayPicture") as File;

  if (!displayPicture) {
    return NextResponse.json({
      success: false,
      message: "No File Provided",
    });
  }

  // Convert the file into a buffer
  const arrayBuffer = await displayPicture.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await InitializeDatabase();

  const user = await AppDataSource.getRepository("User").findOne({
    where: { id: session.user.id },
  });

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User not found",
    });
  }

  await CloudinaryConnect();

  // Upload the file buffer to Cloudinary
  const image = await uploadImageToCloudinary(
    buffer,
    process.env.FOLDER_NAME!,
    1000,
    1000,
    displayPicture.type // Pass the MIME type (e.g., 'image/png')
  );

  if (!image) {
    return NextResponse.json({
      success: false,
      message: "Error while uploading image",
    });
  }

  // Update the user's profile picture
  user.image = image.secure_url;
  await AppDataSource.getRepository("User").save(user);

  return NextResponse.json({
    success: true,
    message: "Picture changed successfully",
    image: image.secure_url,
  });
};

export const POST = async function (req: NextRequest) {
  const { id } = await req.json();

  await InitializeDatabase();

  const user = await AppDataSource.getRepository("User").findOne({
    where: { id },
    relations: ["additionalInformation"],
  });

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User does not exist",
    });
  }

  return NextResponse.json({
    success: true,
    message: "User information fetched successfully",
    user,
  });
};
