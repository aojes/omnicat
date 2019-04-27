import React from "react";
import StyledButton from "./items/StyledButton";

const Biochemistry = () => (
  <div>
    <h1 className="text-focus-in">Biochemistry</h1>
    <hr id="neat" />
    <StyledButton type="back" text="BACK" link="/#" />
    <StyledButton type="next" text="NEXT" link="/#" />
    <StyledButton type="angle" text="angle" link="/#" />
    <StyledButton type="anglefill" text="anglefill" link="/#" />
    <StyledButton type="plus" text="plus" link="/#" />
    <StyledButton type="email" text="email" link="/#" />
    <StyledButton type="settings" text="settings" />
    <StyledButton type="search" text="search" />
  </div>
);

export default Biochemistry;
