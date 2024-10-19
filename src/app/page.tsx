import CTAButton from "@/components/HomePage/CTAButton";
import CodeBlocks from "@/components/HomePage/CodeBlocks";
import ExploreMore from "@/components/HomePage/ExploreMore";
import HighlightText from "@/components/HomePage/HighlightText";
import LearningLanguageSection from "@/components/HomePage/LearningLanguageSection";
import TimelineSection from "@/components/HomePage/TimelineSection";
import Footer from "@/components/common/Footer";
import ReviewSlider from "@/components/common/ReviewSlider";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <main>
      <header className="relative z-0 flex flex-col items-center justify-between w-11/12 gap-8 mx-auto text-white max-w-maxContent">
        <Link href="/auth/signup">
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="-z-10 flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become and Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <h1 className="text-4xl font-semibold text-center">
          Empower your Future with
          <HighlightText text="Coding Skills" />
        </h1>

        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row mt-8 gap-7">
          <CTAButton active={true} linkTo="/auth/signup">
            Learn More
          </CTAButton>

          <CTAButton active={false} linkTo="/auth/login">
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
            src={"banner.mp4"}
          ></video>
        </div>

        <div>
          <CodeBlocks
            position="lg:flex-row"
            heading={
              <h2 className="text-4xl font-semibold">
                Unlock your
                <HighlightText text="coding potential " />
                with our online courses.
              </h2>
            }
            subHeading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            ctabtn1={{
              btnText: "Try it yourself",
              link: "/auth/signup",
              active: true,
            }}
            ctabtn2={{
              active: false,
              link: "/auth/signup",
              btnText: "Learn More",
            }}
            codeColor="text-yellow-25"
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="absolute codeblock1"></div>}
          />
        </div>

        <div>
          <CodeBlocks
            position="lg:flex-row-reverse"
            heading={
              <h2 className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text="code in seconds." />
              </h2>
            }
            subHeading="Go ahead, give it a try. Our hands-on learning environment means you'll be writting real code from your very first lesson."
            ctabtn1={{
              active: true,
              link: "/auth/signup",
              btnText: "Continue Lesson",
            }}
            ctabtn2={{
              active: false,
              link: "/auth/signup",
              btnText: "Learn More",
            }}
            codeColor="text-white"
            backgroundGradient={<div className="absolute codeblock2"></div>}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
          />
        </div>

        <ExploreMore />
      </header>

      <section className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          <div className="flex flex-col items-center justify-between w-11/12 gap-8 mx-auto max-w-maxContent">
            <div className="lg:h-[150px]"></div>

            <div className="flex flex-row text-white gap-7 lg:mt-8">
              <CTAButton active={true} linkTo="/auth/signup">
                <div className="flex items-center gap-2">
                  Explore More Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkTo="/auth/login">
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-11/12 gap-8 mx-auto max-w-maxContent">
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <h2 className="text-4xl font-semibold lg:w-[45%]">
              Get the skill you need for a
              <HighlightText text="job that is in demand." />
            </h2>

            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion dictates its own terms. Today, to be a
                competitive specialist requires more than professional skills.
              </div>

              <CTAButton active={true} linkTo="/auth/signup">
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>

          <TimelineSection />

          <LearningLanguageSection />
        </div>
      </section>

      <section className="relative flex flex-col items-center justify-between w-11/12 gap-8 mx-auto my-20 text-white max-w-maxContent bg-richblack-900">
        {/* <InstructorSection /> */}

        <h2 className="mt-8 text-4xl font-semibold text-center">
          Reviews from others Learners
        </h2>

        <ReviewSlider />
      </section>

      <Footer />
    </main>
  );
}
