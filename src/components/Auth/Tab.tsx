"use client";

import { ACCOUNT_TYPE } from "@/utils/constants";
import { useState } from "react";

type TabProps = {
  tabData: {
    id: number;
    tabName: string;
    type: string;
  }[];
};

export default function Tab({ tabData }: TabProps) {
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.INSTRUCTOR);
  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex p-1 my-6 rounded-lg bg-richblack-800 gap-x-1 max-w-max"
    >
      {tabData.map((tab) => (
        <label key={tab.id} className="cursor-pointer">
          <input
            type="radio"
            name="accountType"
            value={tab.type}
            checked={accountType === tab.type}
            onChange={() => setAccountType(tab.type)}
            className="hidden"
          />
          <div
            className={`${
              accountType === tab.type
                ? "bg-richblack-900 text-richblack-5"
                : "bg-transparent text-richblack-200"
            } py-2 px-5 rounded-full transition-all duration-200`}
          >
            {tab.tabName}
          </div>
        </label>
      ))}
    </div>
  );
}
