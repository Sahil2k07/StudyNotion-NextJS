import Image from "next/image";
import TimeLineImage from "../../assets/Images/TimelineImage.png";
import Logo1 from "../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../assets/TimeLineLogo/Logo4.svg";

const Timeline = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skill",
  },
  {
    Logo: Logo4,
    Heading: "Solve the Problem",
    Description: "Code your way to a solution",
  },
];

function TimelineSection() {
  return (
    <section className="flex flex-col items-center gap-20 mb-20 lg:flex-row">
      <div className="flex flex-col gap-14 lg:gap-3 lg:w-[45%]">
        {Timeline.map((ele, i) => {
          return (
            <div key={i} className="flex flex-col lg:gap-3">
              <div key={i} className="flex gap-6">
                <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                  <Image src={ele.Logo} alt="" />
                </div>

                <div>
                  <h2 className="font-semibold text-[18px]">{ele.Heading}</h2>
                  <p className="text-base">{ele.Description}</p>
                </div>
              </div>

              <div
                className={`hidden ${
                  Timeline.length - 1 === i ? "hidden" : "lg:block"
                }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
              ></div>
            </div>
          );
        })}
      </div>

      <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
        <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10">
          <div className="flex items-center gap-5 lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
            <h1 className="text-3xl font-bold w-[75px]">10</h1>
            <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
              Years Experience
            </h1>
          </div>

          <div className="flex items-center gap-5 px-7 lg:px-14">
            <h1 className="text-3xl font-bold w-[75px]">250</h1>
            <h1 className="text-sm text-caribbeangreen-300 w-[75px]">
              Types of Courses
            </h1>
          </div>
        </div>

        <Image
          src={TimeLineImage}
          alt="timeline image"
          className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
        />
      </div>
    </section>
  );
}

export default TimelineSection;
