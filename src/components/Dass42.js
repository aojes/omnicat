import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import data from './data/Dass42-statements.json'
import mem from '../utils/localStorageHelper'
import dassResultsImg from '../images/dass-score-table.png'

const Dass42 = () => {
  const initial = mem.getset('dass42', {
    scores: false, depression: 0, anxiety: 0, stress: 0
  })
  const [selections, setSelections] = useState([])
  const [statements] = useState(data)
  const [results, setResults] = useState(initial)
  const [begin, setBegin] = useState(null)

  const handleChange = e => {
    const [id, value] = e.target.value.split('-')
    mem.set('dass42', {...selections, [id]: parseInt(value, 10)})
    setSelections({
      ...selections, [id]: parseInt(value, 10),
    })

  }

  const validate = () => {
    if (Object.keys(selections).length !== 42) {
      console.log('not enuf keys')
      return false
    }
    for (let i = 0, valid = false; i < Object.keys(selections).length; i += 1) {
      valid = (
        selections[i] === 0
        || selections[i] === 1
        || selections[i] === 2
        || selections[i] === 3
      )
      if (!valid) {
        console.log('not right values')
        return false
      }
    }
    return true
  }

  const tallyResults = () => {
    const response = selections
    let d = 0
    let a = 0
    let s = 0

    // Depression # 3, 5, 10, 13, 16, 17, 21, 24, 26, 31, 34, 37, 38, 42
    d = response[2] + response[4] + response[9] + response[12] + response[15]
      + response[16] + response[20] + response[23] + response[25]
      + response[30] + response[36] + response[37] + response[41]
    // Anxiety # 2, 4, 7, 9, 15, 19, 20, 23, 25, 28, 30, 36, 40, 41
    a = response[1] + response[3] + response[6] + response[8] + response[14]
      + response[18] + response[19] + response[22] + response[24] + response[27]
      + response[29] + response[35] + response[39] + response[40]
    // Stress # 1, 6, 8, 11, 12, 14, 18, 22, 27, 29, 32, 33, 35, 39
    s = response[0] + response[5] + response[7] + response[10] + response[11]
      + response[13] + response[17] + response[21] + response[26] + response[28]
      + response[31] + response[32] + response[34] + response[38]

    const tabulations = {scores: true, depression: d, anxiety: a, stress: s }

    mem.set('dass42', {...tabulations})
    setResults({...tabulations})
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      tallyResults()
      return true
    }
    alert('please answer all 42 questions')
    return false
  }

  const colorCodeResult = (key, val) => {
    let clr
    switch (key) {
      case 'depression':
        clr = val < 10 ? 'bg-info' : val < 14 ? 'bg-success' : val > 20 && val < 28 ? 'bg-warning' : 'bg-danger'
        break
      case 'anxiety':
        clr = val < 8 ? 'bg-info' : val < 10 ? 'bg-success' : val < 20 ? 'bg-warning' : 'bg-danger'
        break
      case 'stress':
        clr = val < 15 ? 'bg-info' : val < 18 ? 'bg-success' : val < 26 ? 'bg-warning' : 'bg-danger'
        break
      default:
        return false
    }
    return <span id={key} className={clr}>{val}</span>
  }

  return (
    <div className="dass">
      <h1 className="text-focus-in">Dass42</h1>
      <hr id="neatness" />
      <h3 id="leading-statement" className="message">
        Please read each statement and select a number 0, 1, 2 or 3 which indicates
        how much the statement applied to you <b>over the past week</b>.
        There are no right or wrong answers. Do not spend too much time on any statement.
      </h3>
      <CSSTransition in={!begin && !results.scores} timeout={300} classNames="message">
        {() => begin
          || <div className="message">
            <div className="card m-3 p-3 shadow">
              <br/>0, if the statement does not apply to me at all, or&mdash;
              <br/>1, if it applies to me to some degree, or some of the time
              <br/>2, if it applies to me to a considerable degree, or a good part of time
              <br/>3, if it applies to me very much, or most of the time
            </div>
            <button href="#" className="btn btn-primary ml-4 mt-2" onClick={() => setBegin(true)}>
              Begin
            </button>
          </div>
        }
      </CSSTransition>
      <CSSTransition in={begin && !results.scores} timeout={300} classNames="transition-statements">
        {() => (begin && !results.scores
          && <Dass42Form handleSubmit={handleSubmit}
              className="transition-statements" handleChange={handleChange}
              statements={statements} selections={selections} />
        ) || (!begin && results.scores && <br />)
        }
      </CSSTransition>
      <CSSTransition in={results.scores} timeout={300} classNames="results">
        {() => !results.scores
          || <div className="results message mt-5">
            <span id="scores">
              {colorCodeResult('depression', results.depression)}
              {colorCodeResult('anxiety', results.depression)}
              {colorCodeResult('stress', results.depression)}
            </span>
            <img alt="dass score table" src={dassResultsImg} />
          </div>
        }
      </CSSTransition>
    </div>
  )
}

const Dass42Form = props => {
  const isVisible = (i = 0) => {
    const current = Object.values(props.selections).length
    if(i === current || i === current - 1) {
      return 'block'
    }
    return 'none'
  }

  const canSubmit = (selections) => {
    if (Object.keys(selections).length === 42) {
      return 'block'
    }
    return 'none'
  }

  return(
    <form className="dass xlensCursor" onSubmit={props.handleSubmit}>
      {
        props.statements.map(
          (statement, index) => (
            <div style={{display: isVisible(index)}} key={`radio-group-${index}`}
              className="form-row form-group">
              <div className="row dass-keys">
                <h4 className="col-12 m-2">{`${index+1}. ${statement}`}</h4>
                <div className="col-3 radio-item">
                  <input type="radio" value={`${index}-0`} key={`${index}-0`} id={`${index}-0`}
                    className="form-control"
                    checked={props.selections[index] === 0}
                    onChange={props.handleChange} />
                  <label htmlFor={`${index}-0`} ><span>0</span>&nbsp;</label>
                </div>
                <div className="col-3 radio-item">
                  <input type="radio" value={`${index}-1`} key={`${index}-1`} id={`${index}-1`}
                    className="form-control"
                    checked={props.selections[index] === 1}
                    onChange={props.handleChange} />
                  <label htmlFor={`${index}-1`} ><span>1</span>&nbsp;</label>
                </div>
                <div className="col-3 radio-item">
                  <input type="radio" value={`${index}-2`} key={`${index}-2`} id={`${index}-2`}
                    className="form-control"
                    checked={props.selections[index] === 2 }
                    onChange={props.handleChange} />
                  <label htmlFor={`${index}-2`} ><span>2</span>&nbsp;</label>
                </div>
                <div className="col-3 radio-item">
                  <input type="radio" value={`${index}-3`} key={`${index}-3`} id={`${index}-3`}
                    className="form-control"
                    checked={props.selections[index] === 3}
                    onChange={props.handleChange} />
                  <label htmlFor={`${index}-3`} ><span>3</span>&nbsp;</label>
                </div>
              </div>
            </div>
          )
        )
      }
      <button style={{display: canSubmit(props.selections)}} type="submit" className="btn btn-primary">See Results</button>
    </form>
  )
}

export default Dass42
