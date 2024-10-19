"use client";

import { TypeAnimation } from "react-type-animation";

function TypeAnimationComponent({ codeblock }: { codeblock: string }) {
  return (
    <TypeAnimation
      sequence={[codeblock, 1000, ""]}
      cursor={true}
      repeat={Infinity}
      style={{
        whiteSpace: "pre-line",
        display: "block",
      }}
      omitDeletionAnimation={true}
    />
  );
}

export default TypeAnimationComponent;
