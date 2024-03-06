import React from "react";

const Page: React.FC = () => {
  return (
    <div className="원티드이력서소개">
      <h3>
        <b>원티드 이력서 소개</b>
      </h3>
      <HtmlBox />
    </div>
  );
};

const HtmlBox: React.FC = () => {
  return (
    <div
      className="resumateListBox"
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #BDBDBD",
        borderRadius: "0px",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <p>
        <b>새 이력서 작성</b>
      </p>
    </div>
  );
};

export default Page;
