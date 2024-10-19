"use server";

import { AppDataSource } from "@/database/dataSource";
import { NEXT_AUTH } from "@/services/NextAuth";
import { getServerSession } from "next-auth";

type UserData = {
  firstName: FormDataEntryValue | null;
  lastName: FormDataEntryValue | null;
  dateOfBirth: FormDataEntryValue | null;
  gender: FormDataEntryValue | null;
  contactNumber: FormDataEntryValue | null;
  about: FormDataEntryValue | null;
};

export async function EditProfileAction(data: FormData) {
  try {
    const userData: UserData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      dateOfBirth: data.get("dateOfBirth"),
      gender: data.get("gender"),
      contactNumber: data.get("contactNumber"),
      about: data.get("about"),
    };

    console.log(userData);

    const session = await getServerSession(NEXT_AUTH);

    if (!session || !data) return;

    const user = await AppDataSource.getRepository("User").findOne({
      where: { id: session?.user.id },
      relations: ["additionalInformation"],
    });

    if (!user) return;

    const profile = await AppDataSource.getRepository("Profile").findOne({
      where: {
        id: user.additionalInformation.id,
      },
    });

    if (!profile) return;

    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.contactNumber = userData.contactNumber;

    profile.gender = userData.gender;
    profile.dateOfBirth = userData.dateOfBirth;
    profile.about = userData.about;

    await AppDataSource.getRepository("User").save(user);
    await AppDataSource.getRepository("Profile").save(profile);
  } catch (error) {
    console.log(error);
  }
}
