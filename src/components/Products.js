
import React from 'react'

import omniscopeConceptImg from './../images/omniscope-concept.png'

class Products extends React.Component {
  render() {
    return(
      <div>
        <h2>Products</h2>
        <hr />
        <h3>OmniScope Concept</h3>
        <img alt="omniscope concept illustration" width="100%" src={omniscopeConceptImg} />
      </div>
    )
  }
}

export default Products
