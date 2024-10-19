import SignupImg from "../../../assets/Images/signup.webp";
import FrameImg from "../../../assets/Images/frame.png";
import Image from "next/image";
import SignupForm from "@/components/Auth/SignupForm";

export default function Signup() {
  return (
    <section className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="flex flex-col-reverse items-center justify-between w-11/12 py-12 mx-auto max-w-maxContent gap-y-12 md:flex-row md:gap-y-0 md:gap-x-12">
        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Join the millions learning to code with StudyNotion for fre
          </h1>

          <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
            <span className="text-richblack-100">
              Build skills for today, tomorrow, and beyond.
            </span>{" "}
            <span className="italic font-bold text-blue-100 font-edu-sa">
              Education to future-proof your career.
            </span>
          </p>

          <SignupForm />
        </div>

        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
          <Image
            src={FrameImg}
            alt="Pattern"
            width={558}
            height={504}
            loading="lazy"
          />

          <Image
            src={SignupImg}
            alt="Student"
            width={558}
            height={504}
            loading="lazy"
            className="absolute z-10 -top-4 right-4"
          />
        </div>
      </div>
    </section>
  );
}
