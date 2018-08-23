import React from 'react'
// import { contract } from "utils/ethereumSetup"

export default class IronOptimiser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      serumIron: null,
      transferrinIBC: null,
      transferrinSaturation: null,
      SerumFerritinAssay: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validate = this.validate.bind(this)
  }

  validate() {
    return Object.keys(this.state).map(
      (el) => typeof(this.state[el]) !== 'number'
    ).includes(true)
  }

  handleChange(event) {
    this.setState({ [event.target.id]: parseInt(event.target.value, 10) })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(...this.state)
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
      <div className="pure-form">
        <h2>Iron Optimiser</h2>
        <hr />
        <h3> Please provide values for the following instances </h3>
        <form onSubmit={this.handleSubmit}>

          <input type="number" min="0" max="999" id="serumIron" onChange={this.handleChange} />
          <label htmlFor="serumIron"> Serum Iron </label>

          <input type="number" min="0" max="999" id="transferrinIBC" onChange={this.handleChange} />
          <label htmlFor="transferrinIBC"> TransferrinIBC </label>

          <input type="number" min="0" max="999" id="transferrinSaturation" onChange={this.handleChange} />
          <label htmlFor="transferrinSaturation"> Transferrin Saturation </label>

          <input type="number" min="0" max="999" id="serumFerritinAssay" onChange={this.handleChange} />
          <label htmlFor="serumFerritinAssay"> Serum Ferritin Assay </label>

          <button type="submit">See Results</button>
        </form>
      </div>
    )
  }
}
