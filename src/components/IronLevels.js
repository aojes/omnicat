import React, { useState } from 'react'
import './../css/IronLevels.sass'
const { log } = console

const IronOptimiser = () => {
  const [serumIron, setSerumIron] = useState(null)
  const [transferrinIBC, setTransferrinIBC] = useState(null)
  const [transferrinSaturation, setTransferrinSaturation] = useState(null)
  const [serumFerritinAssay, setSerumFerritinAssay] = useState(null)
  const [results, setResults] = useState(null)

  const validate = () => {
    return ! [serumIron, transferrinIBC, transferrinSaturation, serumFerritinAssay]
              .map((val) => typeof(val) === 'number')
              .includes(false)
  }

  const handleChange = event => {
    const val = parseInt(event.target.value, 10),
          name = event.target.name
    log(name, val)
    switch(name) {
      case 'serumIron':
        return setSerumIron(val)
      case 'transferrinIBC':
        return setTransferrinIBC(val)
      case 'transferrinSaturation':
        return setTransferrinSaturation(val)
      case 'serumFerritinAssay':
        return setSerumFerritinAssay(val)
      default:
        return true
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validate()) {
      log('valid')
      tallyResults()
      return true
    } else {
      alert('Please provide values for all 4')
      return false
    }
  }

  const tallyResults = () => {
    const si = serumIron, ti = transferrinIBC,
          ts = transferrinSaturation, sfa = serumFerritinAssay
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

    setResults({ si: report_si, ti: report_ti, ts: report_ts, sfa: report_sfa })
  }

  return (
    <div className="iron">
      <h2>Iron Optimiser</h2>
      <hr />
      <h3> Please provide values for the following instances </h3>
      <form className="pure-form pure-form-stacked" onSubmit={handleSubmit}>

        { results && <h4>{results.si}</h4> }
        <label htmlFor="serumIron"> Serum Iron
          <input type="number" min="0" max="999" name="serumIron" onChange={handleChange} />
        </label>

        { results && <h4>{results.ti}</h4> }
        <label htmlFor="transferrinIBC"> TransferrinIBC
          <input type="number" min="0" max="999" name="transferrinIBC" onChange={handleChange} />
        </label>

        { results && <h4>{results.ts}</h4> }
        <label htmlFor="transferrinSaturation"> Transferrin Saturation
          <input type="number" min="0" max="999" name="transferrinSaturation" onChange={handleChange} />
        </label>

        { results && <h4>{results.sfa}</h4> }
        <label htmlFor="serumFerritinAssay"> Serum Ferritin Assay
          <input type="number" min="0" max="999" name="serumFerritinAssay" onChange={handleChange} />
        </label>

        <button type="submit" className="pure-button pure-button-primary">See Results</button>
      </form>
    </div>
  )
}
export default IronOptimiser
