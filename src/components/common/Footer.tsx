import { FooterLinks } from "../../data/footerLinks";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaGoogle, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import HighlightText from "../HomePage/HighlightText";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];

const Plans = ["Paid memberships", "For students", "Business solutions"];

const Community = ["Forums", "Chapters", "Events"];

function Footer() {
  return (
    <footer className="bg-richblack-800">
      <div className="relative flex items-center justify-between w-11/12 gap-8 mx-auto leading-6 lg:flex-row max-w-maxContent text-richblack-400 py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between gap-3 pl-3 lg:border-r lg:pr-5 lg:border-richblack-700">
            <div className="w-[30%] flex flex-col gap-3 mb-7 lg:pl-0 lg:w-[30%]">
              <Image src={Logo} alt="" className="object-contain" />

              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Company
              </h1>

              <div className="flex flex-col gap-2">
                {["About", "Carrers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="cursor-pointer transition-all duration-200 text-[14px] hover:text-richblack-50"
                    >
                      <Link href={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3 text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaYoutube />
                <FaXTwitter />
              </div>
            </div>

            <div className="w-[48%] mb-7 lg:w-[30%] lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="cursor-pointer transition-all duration-200 text-[14px] hover:text-richblack-50"
                    >
                      <Link href={e.split(" ").join("-").toLocaleLowerCase()}>
                        {e}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-richblack-50 font-semibold mt-7 text-[16px]">
                Support
              </h1>

              <div className="text-[14px] cursor-pointer transition-all duration-200 mt-2 hover:text-richblack-50">
                <Link href={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div className="mb-7 w-[48%] lg:w-[30%] lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="cursor-pointer transition-all duration-200 text-[14px] hover:text-richblack-50"
                    >
                      <Link href={e.split(" ").join("-").toLocaleLowerCase()}>
                        {e}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="cursor-pointer transition-all duration-200 text-[14px] hover:text-richblack-50"
                    >
                      <Link href={e.split(" ").join("-").toLocaleLowerCase()}>
                        {e}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLinks.map((e, i) => {
              return (
                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-richblack-50 font-semibold text-[16px]">
                    {e.title}
                  </h1>

                  <div className="flex flex-col gap-2 mt-2">
                    {e.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link href={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-11/12 mx-auto text-sm max-w-maxContent pb-14 text-richblack-400">
        {/* Section 1 */}
        <div className="flex flex-col items-center justify-between w-full gap-3 md:flex-row lg:items-start gap-y-8 md:gap-y-0">
          <div className="flex flex-col lg:flex-row">
            {BottomFooter.map((e, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 mt-5 lg:mt-0`}
                >
                  <Link href={e.split(" ").join("-").toLocaleLowerCase()}>
                    {e}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            Made with ❤️ CodeHelp © 2023 Studynotion
          </div>

          <div className="flex gap-4 text-center">
            <a href="https://github.com/bhardwajvivekkumar" target="_blank">
              ❤️
              <HighlightText text="VIVEK " />
            </a>
            <a href="https://github.com/tushar756" target="_blank">
              ❤️
              <HighlightText text="TUSHAR" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
