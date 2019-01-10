
import React from 'react'
import { hot } from 'react-hot-loader'

import omniscopeConceptImg from '../images/omniscopeConcept.png'
import noodleArrowDownRightImg from '../images/noodleArrowDownRight.png'

const Products = () => (
  <div>
    <h2>Products</h2>
    <hr />
    <h3><span style={{ position: 'relative', top: '-0.5rem', left: '-0.6rem' }}><img alt="arrow" src={noodleArrowDownRightImg} /></span>OmniScope Concept</h3>
    <img alt="omniscope concept illustration" width="100%" src={omniscopeConceptImg} />
  </div>
)

export default hot(module)(Products)
