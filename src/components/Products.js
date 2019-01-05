
import React from 'react'
import { hot } from 'react-hot-loader'

import omniscopeConceptImg from '../images/omniscope-concept.png'

const Products = () => (
  <div className="pure-u">
    <h2>Products</h2>
    <hr />
    <h3>OmniScope Concept</h3>
    <img alt="omniscope concept illustration" width="100%" src={omniscopeConceptImg} />
  </div>
)

export default hot(module)(Products)
