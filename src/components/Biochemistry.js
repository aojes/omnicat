import React from "react";
import StyledButton from "./StyledButton";

const Biochemistry = () => (
  <div>
    <h1 className="text-focus-in">Biochemistry</h1>
    <hr id="neatness" />
    <StyledButton type="back" text="BACK" />
    <StyledButton type="next" text="NEXT" />
    <StyledButton type="angle" text="angle" />
    <StyledButton type="anglefill" text="anglefill" />
    <StyledButton type="plus" text="plus" />{" "}
    <StyledButton type="email" text="email" />
    <StyledButton type="settings" text="settings" />
    <StyledButton type="search" text="search" />
  </div>
);

export default Biochemistry;
