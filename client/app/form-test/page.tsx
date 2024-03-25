"use client";

import React, { useState } from "react";
import DoubleForm from "./component/double-form";
import SaveButton from "./component/button";

const FormT: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    contentdate: "",
    period: "",
    contents: "",
    count: 1,
  });

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleSubmit = () => {
    console.log(formData); // DoubleForm 컴포넌트에서 입력한 값이 여기서 출력됩니다.
  };

  return (
    <>
      <DoubleForm onChange={handleFormDataChange} />
      <SaveButton onSubmit={handleSubmit} />
    </>
  );
};

export default FormT;
