import IconBtn from "@/components/common/IconBtn";
import InitializeDatabase, { AppDataSource } from "@/database/dataSource";
import { NEXT_AUTH } from "@/services/NextAuth";
import { formattedDate } from "@/utils/dateFormatter";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { RiEditBoxLine } from "react-icons/ri";

export default async function MyProfile() {
  const session = await getServerSession(NEXT_AUTH);

  await InitializeDatabase();

  const user = await AppDataSource.getRepository("User").findOne({
    where: { id: session?.user.id },
    relations: ["additionalInformation"],
  });

  return (
    <main>
      <h1 className="text-3xl z-[1] font-medium mb-14 text-richblack-5">
        My Profile
      </h1>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 px-4 sm:p-8 sm:px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
            width={78}
            height={54}
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{session?.user?.email}</p>
          </div>
        </div>
        <Link href={"/dashboard/settings"}>
          <IconBtn text="Edit">
            <RiEditBoxLine />
          </IconBtn>
        </Link>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 px-4 sm:p-8 sm:px-12">
        <div className="flex items-center justify-between w-full">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <Link href={"/dashboard/settings"}>
            <IconBtn text="Edit">
              <RiEditBoxLine />
            </IconBtn>
          </Link>
        </div>
        <p
          className={`${
            user?.additionalInformation?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalInformation?.about ??
            "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 px-4 sm:p-8 sm:px-12">
        <div className="flex items-center justify-between w-full">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <Link href={"/dashboard/settings"}>
            <IconBtn text="Edit">
              <RiEditBoxLine />
            </IconBtn>
          </Link>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {session?.user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalInformation?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalInformation?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
