"use client";

import { useState } from "react";
import { HomePageExplore } from "../../data/homePageExplore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value: string) => {
    setCurrentTab(value);

    const result = HomePageExplore.filter((course) => course.tag === value);

    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <section>
      {/* Explore more section  */}
      <div className="my-10 text-4xl font-semibold text-center">
        <h2>
          Unlock the
          <HighlightText text="Power of Code" />
        </h2>
        <p className="mt-1 text-lg font-semibold text-center text-richblack-300">
          Learn to build anything you can imagine
        </p>
      </div>

      {/* Tabs section  */}
      <div className="drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium">
        {tabsName.map((e, i) => (
          <div
            className={` text-[16px] flex flex-row items-center gap-2 ${
              currentTab === e
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200"
            } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
            key={i}
            onClick={() => setMyCards(e)}
          >
            {e}
          </div>
        ))}
      </div>

      <div className="hidden lg:block lg:h-[200px]"></div>

      {/* Cards group */}
      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((e, i) => (
          <CourseCard
            key={i}
            cardData={e}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </section>
  );
}

export default ExploreMore;
