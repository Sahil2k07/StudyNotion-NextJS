import CTAButton from "./CTAButton";
import HighlightText from "./HighlightText";
import Know_your_progress from "../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../assets/Images/Plan_your_lessons.png";
import Image from "next/image";

function LearningLanguageSection() {
  return (
    <section>
      <div className="my-10 text-4xl font-semibold text-center">
        <h2>
          Your Swiff Knife for
          <HighlightText text="learning any language" />
        </h2>

        <div className="text-center text-richblack-700 font-medium leading-6 mx-auto text-base mt-3 lg:w-[75%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className="flex flex-col items-center justify-center mt-8 lg:flex-row lg:mt-0">
          <Image
            src={Know_your_progress}
            alt=""
            className="object-contain lg:-mr-32"
          />

          <Image
            src={Compare_with_others}
            alt=""
            className="object-contain -mt-12 lg:-mb-10 lg:-mt-0"
          />

          <Image
            src={Plan_your_lessons}
            alt=""
            className="object-contain -mt-16 lg:-ml-36 lg:-mt-5"
          />
        </div>
      </div>

      <div className="mx-auto mb-8 -mt-5 w-fit lg:mb-20">
        <CTAButton active={true} linkTo="/signup">
          <div>Learn More</div>
        </CTAButton>
      </div>
    </section>
  );
}

export default LearningLanguageSection;
