import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./CTAButton";
import TypeAnimationComponent from "./TypeAnimationComponent";

type CodeBlocksProps = {
  position: string;
  heading: React.ReactNode;
  subHeading: string;
  ctabtn1: {
    btnText: string;
    link: string;
    active: boolean;
  };
  ctabtn2: {
    btnText: string;
    link: string;
    active: boolean;
  };
  codeblock: string;
  backgroundGradient: React.ReactNode;
  codeColor: string;
};

function CodeBlocks({
  position,
  heading,
  subHeading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}: CodeBlocksProps) {
  return (
    <section
      className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}
    >
      {/* Section 1 */}
      <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
        {heading}

        <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
          {subHeading}
        </div>

        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkTo={ctabtn2.link}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkTo={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="h-fit flex flex-row code-border py-3 text-[10px] sm: text-sm leading-[18px] relative w-[100%] lg:w-[470px]">
        {backgroundGradient}

        <div className="flex flex-col text-center select-none font-inter font-bold w-[10%] text-richblack-400">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div
          className={`${codeColor} flex flex-col gap-2 w-[90%] font-bold font-mono pr-1`}
        >
          <TypeAnimationComponent codeblock={codeblock} />
        </div>
      </div>
    </section>
  );
}

export default CodeBlocks;
