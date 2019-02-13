import React, { useState, useEffect, useCallback } from 'react'
import '../css/Wellness.sass'
import questionnaire from './data/Wellness-questionnaire.json'

const Wellness = () => {
  const [data] = useState(questionnaire)
  const [response, setResponse] = useState([])
  const [sectionResponse, setSectionResponse] = useState([])
  const [sectionInFocus, setSectionInFocus] = useState(0)
  const [sectionTally, setSectionTally] = useState([])
  const [complete, setComplete] = useState([])
  const [state] = useState({
    data, response, sectionResponse, sectionInFocus, sectionTally, complete
  })

  const validate = (sectionResponseCount, statementCount) => {
    if (sectionResponseCount && statementCount) {
      return sectionResponseCount === statementCount
    } else {
      return false
    }
  }

  const validateText = (str) => {
    return(
      str && str.length > 0
    )
  }

  const handleChange = (e) => {

    const [ heading, subheading, statement, checked ] = e.target.value.split( '-' )
    console.log('sectionResp', JSON.stringify(sectionResponse))
    setSectionResponse({
      ...sectionResponse, [ `${heading}-${subheading}-${statement}` ] : parseInt(checked)
    })
  }

  const handleBlur = (e) => {
    const [ heading, subheading, statement ] = e.target.name.split('-')
    const textValue = e.target.value
    if (validateText(textValue)) {
      setSectionResponse({
        ...sectionResponse, [ `${heading}-${subheading}-${statement}` ] : textValue
      })
    }
    console.log(JSON.stringify('sectionResponse', sectionResponse))
  }

  const handleQSubmit = (e) => {

    setSectionTally(sectionTally.concat('Q'))
    setComplete(complete.concat('Q'))
    setSectionInFocus('results')
    setResponse({ ...response, ...sectionResponse })
    setSectionResponse([])

    alert('Thank you for completing this long form.')
    return true
  }

  const handleQBlur = (e) => {
    console.info(' ## id ', e.target.id, ' ## value ', e.target.value)
    setSectionResponse({ ...sectionResponse, [e.target.id]: e.target.value })
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // const sectionFocus = sectionInFocus
    const element = document.getElementById('section-statement-count-' + sectionInFocus)

    const sectionStatementIndex = parseInt(element.attributes.allinputs.value)
    const textInputCount = parseInt(element.attributes.textinputs.value)
    const valsAry = Object.values(sectionResponse)
    const currentSectionTally = Object.values(sectionResponse)
                    .filter(el => typeof el === 'number')
                    .reduce((accum, val) => accum + val)

    console.log(' ## statements:', sectionStatementIndex,
      '\n ## sectionResponses: ', valsAry.length,
      '\n ## text statements: ', textInputCount,
      '\n ## tally:', currentSectionTally)

    console.log(' ### ', sectionStatementIndex, valsAry.length)

    if (validate(sectionStatementIndex, valsAry.length)) {
      const nextFocus = sectionInFocus === 'Q' ? 'results' :
                                       sectionInFocus < 11 ? sectionInFocus + 1 : 'Q'
      setSectionTally(sectionTally.concat(currentSectionTally))
      setComplete(complete.concat(sectionInFocus))
      setSectionInFocus(nextFocus)
      setResponse({ ...response, ...sectionResponse })
      setSectionResponse([])

      alert('Your tally for the section: ' + currentSectionTally)
      return true
    } else {
      alert('Please respond for each statement')
      return false
    }}

  // eslint-disable-next-line
  const { headings, subheadings, statements, inputTypes, notices, questions } = data
  return (
    <div className="wellness">
      <h1 className="text-focus-in">Wellness &amp; Health Appraisal</h1>
      <hr id="neatness" />
      <div className="description">
        <p>Your answers to this health appraisal questionnaire will assist your practitioner in gaining information about your current symptoms and health concerns. Please answer all questions, in each section.
        </p>
        <p>Circle the number which best describes the frequency or severity of your symptoms over the previous <b>month</b>, or answer the <b>yes</b> or <b>no</b> questions by circling the appropriate letter.
        </p>
        <p>You may note that some questions are repeated throughout the questionnaire. We would appreciate it if you can answer <b>all</b> questions, as this will ensure the most accurate interpretation of your results. You may however leave a question blank if you are unsure of the answer.
        </p>
      </div>
      <fieldset>
        <legend>Questionnaire</legend>
        { headings.map((heading, i) => (
          <Form
            key={i}
            index={i}
            state={state}
            handleChange={handleChange}
            fns={{handleSubmit, handleChange, handleBlur}}
            text={heading}
          />
        ))
        }
        { <QuestionsForm
            data={questions}
            handleSubmit={handleQSubmit}
            handleBlur={handleQBlur}
            sectionInFocus={sectionInFocus}
          />
        }
      </fieldset>
    </div>
  )
}

const QuestionsForm = props => {
  const handleSubmit = e => props.handleSubmit(e)
  const handleBlur = e => props.handleBlur(e)
  if (props.sectionInFocus === 'Q') {
    return(
      <fieldset>
        <legend>More Info.</legend>
        <form className="" onSubmit={handleSubmit} onBlur={handleBlur}>
          {props.data.map((question, i) => (
            <p  className="wellness-question" key={i}>
              <span className="question">{question}</span>
              <textarea className="pure-u-2-5" id={`questions-${i}`} />
            </p>
            ))
          }
          <button type="submit" className="pure-button pure-button-primary">Submit</button>
        </form>
      </fieldset>
    )
  } else {
    return null
  }
}

const Form = props => {
  const handleSubmit = e => props.fns.handleSubmit(e)
  const handleChange = e => props.handleChange(e)

  // const handleResponseChange = (e) => {
  //   () => {
  //     console.log(e.target.value, 'Checked input')
  //     handleChange(e)
  //   }, [e.target]
  // }
  const handleBlur = e => props.fns.handleBlur(e)

  const focus = props.index === props.state.sectionInFocus
  const complete = props.state.complete.includes(props.index)

  function isVisible(i) {
    const focalIndex = props.state.sectionInFocus
    // note separate `focus` & `complete`
    // const focus = props.index === props.super.state.sectionInFocus
    // const complete = props.super.state.complete.includes(props.index)
    const keys = props.state.sectionResponse
    const numSubheadingStatements = props.state.data.statements[focalIndex][i].length
    // console.log('numStatements', props.data.statements[focalIndex][i].length)
    const matcher = `${focalIndex}-${i}-`
    // console.log(keys)
    const numSubheadingKeys = Object.keys(keys)
                                .map((a) => {if (a.includes(matcher)) return a}).length
                                //.map((el) => {if (typeof el !== undefined) return el})
    // console.log(numSubheadingKeys)
    // const numSubheadingKeys = subheadingKeys.length
    const isFirstSubheading = !('0-0-0' in keys) && focalIndex === 0 && i === 0
    // const incompleteSubheading = !isFirstSubheadingAndIsEmpty
    const woof = numSubheadingKeys < numSubheadingStatements
    const miaow = !(`${focalIndex}-${i}-0` in keys) // && !(`${focalIndex}-${i+1}-0` in keys)

                                  // && j + 1 === numSubheadingStatements

    // const isCurrentSubheading = incompleteSubheading
    //                               && (
    //                                 !(`${focalIndex}-${i}-0` in keys) // next is non or empty
    //                                 && `${focalIndex}-${i-1}-0` in keys  // prev non or full
    //                                   // || `${focalIndex-1}-0-0` in keys // prev heading complete
    //                               )
    //                               // || j + 1 === numSubheadingStatements
    // const isNextSubheadingEmpty = !(`${focalIndex}-${i+1}-` in keys)
    // const keys = Object.keys(keysobj).map((a) => {if (a.includes(`-0-`)) return a}).filter((el) => {if (el) return el})
    // console.log('isVisible called...')
    if (isFirstSubheading) {
      return {display: 'block'}
    } else if (woof || miaow) {
      // console.log('woof', woof, 'miaow', miaow)
      return {display: 'block'}
    }
    return {display: 'none'}
  }

  let count = 0, isTextCount = 0, typeStr
  if (!focus || complete)
    return null
  else if (focus && !complete) return(
    <form className="" id={`form-heading-${props.index}`} onSubmit={handleSubmit}>
      <h3>{props.text}</h3>
      {props.index === 10 ?
        [<span key={10} className="notice-heading">{props.state.data.notices.headings[10]}</span>,
          props.state.data.statements[10][0].map( (statement, i) => {
            typeStr = props.state.data.inputTypes[10][i]
            count += 1
            if (typeStr.includes('text')) {
              isTextCount += 1
            }
            return( <Statement  inputTypeStr={typeStr}
                        key={`10-0-${i}`}
                        blur={handleBlur}
                        count={count}
                        id={`10-0-${i}`}
                        text={statement}
                        radioChange={handleChange}
                        state={props.state} />
                      )
        })]
      : props.state.data.subheadings[props.index].map( (subheading, i) =>
          [<Subheading key={`sh-${i}`} text={subheading} />,
            <SubheadingNotice key={`shn-${i}`} data={props.state.data.notices.subheadings[`${props.index+1}.${i+1}`]} />,
            [props.state.data.statements[props.index][i].map( (statement, j) => {
              typeStr = props.state.data.inputTypes[props.index][i][j]
              count += 1
              if (typeStr.includes('text')) {
                isTextCount += 1
              }
              return( <Statement inputTypeStr={typeStr}
                          key={`${props.index}-${i}-${j}`}
                          blur={handleBlur}
                          count={count}
                          id={`${props.index}-${i}-${j}`}
                          text={statement}
                          radioChange={handleChange}
                          state={props.state}
                          style={isVisible(i)} />
                        )
            })]
          ]
        )
      }
      <input type="hidden" id={`section-statement-count-${props.index}`} textinputs={isTextCount} allinputs={count} />
      <button type="submit" className="pure-button pure-button-primary">See Results</button>
    </form>
  )
}

const Subheading = props => (
  props.text.length > 0 ? <h4>{props.text}</h4> : null
)

const SubheadingNotice = props => (
  props.data ? <span className="notice-subheading">{props.state.data}</span> : null
)

const Statement = props => {
  const inputs = props.inputTypeStr // "1 bold ny3", "12 ny6", "24 0248a", "48 text"
  const id = props.id
  const checked = props.state.sectionResponse[id]

  // const memoizedCallback = useCallback(
  //   () => {
  //     console.log('props changed', props)
  //   },
  //   [props]
  // )
  // const [change, setChange] = useState(false)

  useEffect(() => {
    console.log(props)
    //localStorage.setItem('data', JSON.stringify(props.state))
  }, [props])

  const handleChange = (e) => {

    props.radioChange(e)
  }
  const handleBlur = (e) => props.blur(e)

  let first, second, third, fourth, yesValue, key1, key2, key3, key4

  const bolden   = inputs.includes('bold')
  const textIn   = inputs.includes('text')
  const radioIn2 = inputs.match(/ny(\d{1,2})?/)
  const radioIn4 = inputs.match(/[0-9]{3}a|[0-9]{4}\+?/)

  if (radioIn4) {
    first  = parseInt(radioIn4[0].slice(0, 1), 16)
    second = parseInt(radioIn4[0].slice(1, 2), 16)
    third  = parseInt(radioIn4[0].slice(2, 3), 16)
    fourth = parseInt(radioIn4[0].slice(3, 4), 16)
    if (radioIn4.input.includes('+')) {
      [key1, key2, key3, key4] = radioIn4.input.split('+ ')[1].split(', ')
    }
  } else if (radioIn2) {
    yesValue = radioIn2[0] === 'ny' ? 3 : parseInt(radioIn2[0].split('ny')[1], 10)
  }

  if (textIn) {
    return (
      <div style={props.style} className='wellness-statement'>
        <p><span style={{fontWeight: bolden ? 'bold' : 'normal'}}>{props.text}</span>
          <input name={`${id}-text`} type="text" onBlur={handleBlur} defaultValue={''} />
        </p>
      </div>
    )
  } else if (radioIn4) {
    return(
      <div style={props.style} className='wellness-statement'>
        <p><span style={{fontWeight: bolden ? 'bold' : 'normal'}}>{props.text}</span></p>
        <div className="">
          <RadioButton name={`${id}-${first}`} extraKey={false} radioChange={handleChange} state={props.state} checked={checked} index={first} />
          <RadioButton name={`${id}-${second}`} extraKey={false} radioChange={handleChange} state={props.state} checked={checked} index={second} />
          <RadioButton name={`${id}-${third}`} extraKey={false} radioChange={handleChange} state={props.state} checked={checked} index={third} />
          <RadioButton name={`${id}-${fourth}`} extraKey={false} radioChange={handleChange} state={props.state} checked={checked} index={fourth} />
        </div>
      </div>
    )
  } else if (radioIn2) {
    return(
      <div style={props.style} className='wellness-statement'>
        <p><span style={{fontWeight: bolden ? 'bold' : 'normal'}}>{props.text}</span></p>
        <div className="">
          <RadioButton name={`${id}-0`} extraKey={false} radioChange={handleChange} state={props.state} checked={checked} index={0} />
          <RadioButton name={`${id}-${yesValue}`} extraKey={false} radioChange={handleChange} state={props.state} checked={checked} index={yesValue} />
        </div>
      </div>
    )
  } else {
    console.log('r2', radioIn2, ' r4', radioIn4, ' text', textIn, ' \ninputs', inputs)
    return null
  }
}

const RadioButton = props => {
  const [checked, setChecked] = useState(props.checked)
  const handleChange = (e) => props.radioChange(e)

  return(
    <div className="radio-group">
      <input type="radio"
        value={props.name} name={props.name} id={props.name}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={props.name}>
        <span>{props.extraKey || props.index}</span>
      </label>
    </div>
  )
}

export default Wellness
