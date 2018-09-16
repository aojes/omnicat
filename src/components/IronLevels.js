import React from 'react'
//import { hot } from 'react-hot-loader'
import './../css/IronLevels.sass'
// import { contract } from "utils/ethereumSetup"
const { log, error, info, warn } = console
class IronOptimiser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      serumIron: null,
      transferrinIBC: null,
      transferrinSaturation: null,
      serumFerritinAssay: null,
      results: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validate = this.validate.bind(this)
    this.tallyResults = this.tallyResults.bind(this)
  }

  validate() {
    log(Object.keys(this.state), Object.values(this.state))
    return ! [this.state.serumIron, this.state.transferrinIBC,
                this.state.transferrinSaturation, this.state.serumFerritinAssay]
              .map((val) => typeof(val) === 'number')
              .includes(false)
  }

  handleChange(event) {
    this.setState({ [event.target.id]: parseInt(event.target.value, 10) })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.validate()) {
      log('valid')
      this.tallyResults()
      return true
    } else {
      alert('Please provide values for all 4')
      return false
    }
  }

  tallyResults() {
    const si = this.state.serumIron, ti = this.state.transferrinIBC,
          ts = this.state.transferrinSaturation, sfa = this.state.serumFerritinAssay
    // NOTE call contract?
    const report_si = (si === 20 ? 'Optimal' :
          si >= 15 && si <= 19 ? 'Normal low' :
          si >= 21 && si <= 25 ? 'Normal high' :
          si >= 10 && si <= 14 ? 'Suboptimal low' :
          si >= 26 && si <= 33 ? 'Suboptimal high' :
          si < 10 ? 'Abnormal low' : 'Abnormal high') + ' Serum Iron levels'
    const report_ti = (ti === 60 ? 'Optimal' :
          ti >= 55 && ti <= 59 ? 'Normal low' :
          ti >= 61 && ti <= 65 ? 'Normal high' :
          ti >= 45 && ti <= 54 ? 'Suboptimal low' :
          ti >= 66 && ti <= 70 ? 'Suboptimal high' :
          ti < 45 ? 'Abnormal low' : 'Abnormal high') + ' TransferrinIBC levels'
    const report_ts = (ts === 40 ? 'Optimal' :
          ts >= 35 && ts <= 39 ? 'Normal low' :
          ts >= 41 && ts <= 45 ? 'Normal high' :
          ts >= 16 && ts <= 34 ? 'Suboptimal low' :
          ts >= 46 && ts <= 50 ? 'Suboptimal high' :
          ts < 16 ? 'Abnormal low' : 'Abnormal high' ) + ' Transferrin Saturation levels'
    const report_sfa = (sfa === 150 ? 'Optimal' :
         sfa >= 130 && sfa <= 149 ? 'Normal low' :
         sfa >= 151 && sfa <= 180 ? 'Normal high' :
         sfa >= 20 && sfa <= 129  ? 'Suboptimal low' :
         sfa >= 181 && sfa <= 290 ? 'Suboptimal high' :
         sfa < 20 ? 'Abnormal low' : 'Abnormal high') + ' Serum Ferritin Assay levels'
    this.setState({
      results: { si: report_si, ti: report_ti, ts: report_ts, sfa: report_sfa }
    })
  }

  render() {
    return (
      <div className="iron">
        <h2>Iron Optimiser</h2>
        <hr />
        <h3> Please provide values for the following instances </h3>
        <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>

          { this.state.results && <h4>{this.state.results.si}</h4> }
          <label htmlFor="serumIron"> Serum Iron
            <input type="number" min="0" max="999" name="serumIron" onChange={this.handleChange} />
          </label>

          { this.state.results && <h4>{this.state.results.ti}</h4> }
          <label htmlFor="transferrinIBC"> TransferrinIBC
            <input type="number" min="0" max="999" name="transferrinIBC" onChange={this.handleChange} />
          </label>

          { this.state.results && <h4>{this.state.results.ts}</h4> }
          <label htmlFor="transferrinSaturation"> Transferrin Saturation
            <input type="number" min="0" max="999" name="transferrinSaturation" onChange={this.handleChange} />
          </label>

          { this.state.results && <h4>{this.state.results.sfa}</h4> }
          <label htmlFor="serumFerritinAssay"> Serum Ferritin Assay
            <input type="number" min="0" max="999" name="serumFerritinAssay" onChange={this.handleChange} />
          </label>

          <button type="submit" className="pure-button pure-button-primary">See Results</button>
        </form>
      </div>
    )
  }
}
export default IronOptimiser
