import React from 'react'
import './../css/IronLevels.sass'
// import { contract } from "utils/ethereumSetup"

export default class IronOptimiser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      serumIron: null,
      transferrinIBC: null,
      transferrinSaturation: null,
      serumFerritinAssay: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validate = this.validate.bind(this)
  }

  validate(event) {
    console.log(Object.keys(this.state), Object.values(this.state))
    return ! Object.values(this.state)
               .map((val) => typeof(val) === 'number').includes(false)
  }

  handleChange(event) {
    this.setState({ [event.target.id]: parseInt(event.target.value, 10) })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.validate()) {
      console.log('valid')
      return true
    } else {
      console.log('nopp')
      return false
    }
  }

  render() {
    return (
      <div className="iron">
        <h2>Iron Optimiser</h2>
        <hr />
        <h3> Please provide values for the following instances </h3>
        <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>

          <label htmlFor="serumIron"> Serum Iron
            <input type="number" min="0" max="999" id="serumIron" onChange={this.handleChange} />
          </label>

          <label htmlFor="transferrinIBC"> TransferrinIBC
            <input type="number" min="0" max="999" id="transferrinIBC" onChange={this.handleChange} />
          </label>

          <label htmlFor="transferrinSaturation"> Transferrin Saturation
            <input type="number" min="0" max="999" id="transferrinSaturation" onChange={this.handleChange} />
          </label>

          <label htmlFor="serumFerritinAssay"> Serum Ferritin Assay
            <input type="number" min="0" max="999" id="serumFerritinAssay" onChange={this.handleChange} />
          </label>

          <button type="submit" className="pure-button pure-button-primary">See Results</button>
        </form>
      </div>
    )
  }
}
