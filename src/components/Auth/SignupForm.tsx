import { ACCOUNT_TYPE } from "@/utils/constants";
import PasswordInput from "./PasswordInput";
import Tab from "./Tab";
import SignupAction from "@/actions/SignupAction";
import SubmitButton from "./SubmitButton";

export default async function SignupForm() {
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <section>
      <form action={SignupAction} className="flex flex-col w-full gap-y-4">
        <Tab tabData={tabData} />

        <div className="flex gap-x-4">
          <label htmlFor="">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              name="firstName"
              placeholder="Enter First Name"
              className="w-full form-style"
            />
          </label>

          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              placeholder="Enter last name"
              className="w-full form-style"
            />
          </label>
        </div>

        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            placeholder="Enter email address"
            className="w-full form-style"
          />
        </label>

        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Contact Number <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="contactNumber"
            placeholder="Enter Contact Number"
            className="w-full form-style"
          />
        </label>

        <PasswordInput />

        <SubmitButton>Create Account</SubmitButton>
      </form>
    </section>
  );
}
