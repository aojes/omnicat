import React from "react";
import omniscopeConceptImg from "../images/omniscopeConcept.png";
import noodleArrowDownRightAImg from "../images/noodleArrowDownRightA.png";

const Home = () => (
  <div className="text-focus-in">
    <h1>Welcome to OmniCAT</h1>
    <h2>At Home Ai Guided Biometrics Optimization</h2>
    <hr id="neatness" className="homepage" />
    <p>
      <a
        href="https://github.com/tidelake/omnicat"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          alt="link to source on github"
          src="https://img.shields.io/badge/open%20source-react%20|%20blockchain-brightgreen.svg?logo=github&logoColor=white"
        />
      </a>
    </p>
    <div>
      <h2>Products</h2>
      <h3>
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
  </div>
);

export default Home;

// {
//   /* &nbsp;
//   <a
//     href="https://github.com/tidelake/omnicat"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <img
//       alt="activity"
//       src="https://img.shields.io/github/commit-activity/m/tidelake/omnicat.svg?logo=github&style=plastic"
//     />
//   &nbsp;
//   <a
//     href="https://www.codacy.com/app/tidelake/omnicat?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=tidelake/omnicat&amp;utm_campaign=Badge_Grade"
//     rel="noopener noreferrer"
//     target="_blank"
//   >
//     <img
//       alt="codacy grade"
//       src="https://api.codacy.com/project/badge/Grade/0d5f1e7437034b7f99b3aaea705eceb1"
//     />
//   </a>
// </p>
// <iframe
//   title="sign up for the quarterly email"
//   src="https://docs.google.com/forms/d/e/1FAIpQLSd8R62ecsGXiAUz2Qe6dRixq1yDvCJ3J3cJ0cAIvEJA59Svmw/viewform?embedded=true"
//   width="640"
//   height="687"
//   frameBorder="0"
//   marginHeight="0"
//   marginWidth="0"
// >
//   Loading...
// </iframe> */
// }
