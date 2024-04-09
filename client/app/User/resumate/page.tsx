"use client";

import React from "react";
import "./HtmlBox";
import ResumateListBox from "./ResumateListBox";

const Page: React.FC = () => {
  let showResumate = false;

  const handleButtonClick = () => {
    showResumate = true;
  };

  return (
    <div className="resumname">
      <h3>
        <b>이력서</b>
      </h3>
      <button onClick={handleButtonClick}>+</button>
      {showResumate && <ResumateListBox />}
    </div>
  );
};

export default Page;
