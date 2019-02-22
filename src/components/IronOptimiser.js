import React, { useState } from 'react'
import mem from '../utils/localStorageHelper'

const IronOptimiser = () => {

  const initial = mem.getset('ironoptimiser', { scores: null,
    si: 0, ti: 0, ts: 0, sfa: 0, siMsg: null, tiMsg: null, tsMsg: null, sfaMsg: null,
    siPct: null, tiPct: null, tsPct: null, sfaPct: null,
    color_si: null, color_ti: null, color_ts: null, color_sfa: null
  })

  const [serumIron, setSerumIron] = useState(initial.si)
  const [transferrinIBC, setTransferrinIBC] = useState(initial.ti)
  const [transferrinSaturation, setTransferrinSaturation] = useState(initial.ts)
  const [serumFerritinAssay, setSerumFerritinAssay] = useState(initial.sfa)
  const [results, setResults] = useState(initial)

  const validate = () => (
    // basic, returns true if number type for all fields
    ! [serumIron, transferrinIBC, transferrinSaturation, serumFerritinAssay]
              .map((val) => typeof(val) === 'number')
              .includes(false)
  )

  const handleFocus = e => {
    if (+e.target.value === 0) {
      e.target.value = ''
    }
  }

  const handleChange = e => {
    const val = parseInt(e.target.value, 10),
          name = e.target.name
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

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
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

    const siColor = setColorCodes(report_si)
    const tiColor = setColorCodes(report_ti)
    const tsColor = setColorCodes(report_ts)
    const sfaColor = setColorCodes(report_sfa)

    const allResults = { scores: true,
      si: si, ti: ti, ts: ts, sfa: sfa,
      siMsg: report_si, tiMsg: report_ti, tsMsg: report_ts, sfaMsg: report_sfa,
      siPct: (100.0 * si / 20.0).toFixed(0),
      tiPct: (100.0 * ti / 60.0).toFixed(0),
      tsPct: (100.0 * ts / 40.0).toFixed(0),
      sfaPct: (100.0 * sfa / 150.0).toFixed(0),
      color_si: siColor, color_ti: tiColor, color_ts: tsColor, color_sfa: sfaColor
    }

    // WRONG
    // setResults({...allResults})
    // mem.set('ironoptimiser', allResults)

    // WORKS!
    mem.set('ironoptimiser', {...allResults})
    setResults({...allResults})
  }

  const setColorCodes = text => {
    return text.match('Optimal') ? 'bg-gradient-info text-white '
        : text.match('Normal') ? 'bg-gradient-success text-white '
        : text.match('Suboptimal') ? 'bg-gradient-warning text-dark '
        : 'bg-gradient-danger text-white '
  }

  return (
    <div className="iron row">
      <h1 className="text-focus-in">Iron Optimiser</h1>
      <hr id="neatness" />
      <form className="col-sm-12 mt-4" onSubmit={e => e.preventDefault()}>
        <h4> Enter values for the following instances </h4>
        <div className="card">
          { results.scores && <div>{results.siMsg}<br />
            <p className={results.color_si+' d-inline-flex p-2 m-1 bd-highlight'}>
              {results.siPct}% of optimal</p></div> }
          <label htmlFor="serumIron"> Serum Iron
            <input type="number" min="0" max="999" name="serumIron" defaultValue={results.si} onFocus={handleFocus} onChange={handleChange} />
          </label>
        </div>
        <div className="card">
          { results.scores && <div>{results.tiMsg}<br />
            <p className={results.color_ti+' d-inline-flex p-2 m-1 bd-highlight'}>
              {results.tiPct}% of optimal</p></div> }
          <label htmlFor="transferrinIBC"> TransferrinIBC
            <input type="number" min="0" max="999" name="transferrinIBC" defaultValue={results.ti} onFocus={handleFocus} onChange={handleChange} />
          </label>
        </div>
        <div className="card">
          { results.scores && <div>{results.tsMsg}<br />
            <p className={results.color_ts+' d-inline-flex p-2 m-1 bd-highlight'}>
              {results.tsPct}% of optimal</p></div> }
          <label htmlFor="transferrinSaturation"> Transferrin Saturation
            <input type="number" min="0" max="999" name="transferrinSaturation" defaultValue={results.ts} onFocus={handleFocus} onChange={handleChange} />
          </label>
        </div>
        <div className="card">
          { results.scores && <div>{results.sfaMsg}<br />
            <p className={results.color_sfa+' d-inline-flex p-2 m-1 bd-highlight'}>
              {results.sfaPct}% of optimal</p></div> }
          <label htmlFor="serumFerritinAssay"> Serum Ferritin Assay
            <input type="number" min="0" max="999" name="serumFerritinAssay" defaultValue={results.sfa} onFocus={handleFocus} onChange={handleChange} />
          </label>
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">See Results</button>
      </form>
    </div>
  )
}

export default IronOptimiser
