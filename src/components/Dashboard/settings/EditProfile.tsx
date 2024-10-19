import { EditProfileAction } from "@/actions/EditProfileAction";
import InitializeDatabase, { AppDataSource } from "@/database/dataSource";
import { NEXT_AUTH } from "@/services/NextAuth";
import { getServerSession } from "next-auth";

const genders = ["Male", "Female", "Others"] as const;

export type ProfileFormData = {
  [key: string]: string;
};

export default async function EditProfile() {
  const session = await getServerSession(NEXT_AUTH);

  await InitializeDatabase();

  const user = await AppDataSource.getRepository("User").findOne({
    where: { id: session?.user.id },
    relations: ["additionalInformation"],
  });

  return (
    <form action={EditProfileAction}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <h2 className="text-lg font-semibold text-richblack-5">
          Profile Information
        </h2>
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstName" className="text-white label-style">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              className="form-style"
              defaultValue={user?.firstName}
              required
            />
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastName" className="text-white label-style">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              className="form-style"
              defaultValue={user?.lastName}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="dateOfBirth" className="text-white label-style">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              className="text-white form-style"
              defaultValue={user?.additionalInformation?.dateOfBirth}
              required
            />
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="gender" className="text-white label-style">
              Gender
            </label>
            <select
              name="gender"
              required
              defaultValue={user?.additionalInformation?.gender}
              className="form-style"
            >
              {genders.map((ele, i) => (
                <option key={i} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="contactNumber" className="text-white label-style">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              placeholder="Enter Contact Number"
              className="form-style"
              defaultValue={user?.contactNumber}
              required
            />
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="about" className="text-white label-style">
              About
            </label>
            <input
              type="text"
              name="about"
              placeholder="Enter Bio Details"
              className="form-style"
              defaultValue={user?.additionalInformation?.about}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="reset"
          className="px-5 py-2 font-semibold rounded-md cursor-pointer bg-richblack-700 text-richblack-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900"
        >
          Save
        </button>
      </div>
    </form>
  );
}
