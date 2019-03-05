import React from "react";
import omniscopeConceptImg from "../images/omniscopeConcept.png";
import noodleArrowDownRightAImg from "../images/noodleArrowDownRightA.png";

const Products = () => (
  <div>
    <h1 className="text-focus-in">Products</h1>
    <hr id="neatness" />
    <h3 className="text-focus-in">
      <span style={{ position: "relative", top: "-0.5rem", left: "-0.6rem" }}>
        <img alt="arrow" src={noodleArrowDownRightAImg} />
      </span>
      OmniScope Concept
    </h3>
    <img
      alt="omniscope concept illustration"
      width="100%"
      src={omniscopeConceptImg}
    />
  </div>
);

export default Products;
