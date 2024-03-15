import React from "react";

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
export default HtmlBox;
