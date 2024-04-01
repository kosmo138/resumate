"use client";

import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import React, { useRef, useEffect } from "react";

export default function ResumeEditor(id: string) {
  const pathName = usePathname();

  const apiUrl = `http://localhost/api${pathName}`;
  const jwt = Cookies.get("authorization");

  let formData = useRef();

  useEffect(() => {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        formData = data;
        console.log(JSON.stringify(formData));
      });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" id="in1" value={formData.title}></input>
        <input type="text" id="in2"></input>
      </form>
    </>
  );
}
