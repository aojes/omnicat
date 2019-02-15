import React from 'react'
import '../css/Wellness.sass'
import questionnaire from './data/Wellness-questionnaire.json'

class Wellness extends React.Component {
  constructor() {
    super()
    this.state = {
      data: questionnaire,
      response: [],
      sectionResponse: [],
      focus: 0,    // 0, 1... 11, 'Q', 'results'
      sectionTally: [], // array up to 13 elements including 'Q' at index[-1]
      complete: [] // [0, 1... 11, 'Q']
    }
    // const statements = 407 + Q?
    this.validate = this.validate.bind(this)
    this.validateText = this.validateText.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleQSubmit = this.handleQSubmit.bind(this)
    this.handleQBlur = this.handleQBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleBlur(e) {
    const [ heading, subheading, statement ] = e.target.name.split('-'),
      textValue = e.target.value
    if (this.validateText(textValue)) {
      this.setState({
        sectionResponse: {
          ...this.state.sectionResponse,
          [ `${heading}-${subheading}-${statement}` ] : textValue
        }
      })
    }
    console.log(JSON.stringify(this.state.sectionResponse))
  }

  handleChange(e) {
    const [ heading, subheading, statement, checked ] = e.target.value.split( '-' )
    this.setState({
      sectionResponse: {
        ...this.state.sectionResponse,
        [ `${heading}-${subheading}-${statement}` ] : parseInt(checked)
      }
    })
    console.log(JSON.stringify(this.state.sectionResponse))
  }

  handleSubmit(e) {
    e.preventDefault()
    const sectionFocus = this.state.focus,
      element = document.getElementById('section-statement-count-' + sectionFocus),

      sectionStatementIndex = parseInt(element.attributes.allinputs.value),
      textInputCount = parseInt(element.attributes.textinputs.value),
      valsAry = Object.values(this.state.sectionResponse),
      currentSectionTally = Object.values(this.state.sectionResponse)
        .filter(el => typeof el === 'number')
        .reduce((accum, val) => accum + val)
    console.log(' ## statements:', sectionStatementIndex,
      '\n ## sectionResponses: ', valsAry.length,
      '\n ## text statements: ', textInputCount,
      '\n ## tally:', currentSectionTally)
    console.log(' ### ',sectionStatementIndex, valsAry.length)

    if (this.validate(sectionStatementIndex, valsAry.length)) {
      const nextFocus = sectionFocus === 'Q' ? 'results' :
        sectionFocus < 11 ? sectionFocus + 1 : 'Q'
      this.setState({
        sectionTally: this.state.sectionTally.concat(currentSectionTally),
        complete: this.state.complete.concat(sectionFocus),
        focus: nextFocus,
        response: { ...this.state.response, ...this.state.sectionResponse },
        sectionResponse: []
      })
      alert('Your tally for the section: ' + currentSectionTally)
      return true
    } else {
      alert('Please respond for each statement')
      return false
    }
  }

  validateText(str) {
    return( str && str.length > 0 )
  }

  validate(sectionResponseCount, statementCount) {
    if (sectionResponseCount && statementCount) {
      return sectionResponseCount === statementCount
    } else {
      return false
    }
  }

  handleQBlur(e) {
    console.info(' ## id ', e.target.id, ' ## value ', e.target.value)
    this.setState({
      sectionResponse: { ...this.state.sectionResponse, [e.target.id]: e.target.value }
    })
    return true
  }

  handleQSubmit(e) {
    e.preventDefault()
    this.setState({
      sectionTally: this.state.sectionTally.concat('Q'),
      complete: this.state.complete.concat('Q'),
      focus: 'results',
      response: { ...this.state.response, ...this.state.sectionResponse },
      sectionResponse: []
    })
    alert('Thank you for completing this long form.')
    return true
  }

  // pure-form-[aligned, stacked] pure-group pure-control pure-control-group span.pure-form-message-inline
  render() {
    // eslint-disable-next-line
    const {headings, subheadings, statements, inputTypes, notices, questions} = this.state.data
    return (
      <div className="wellness">
        <h1 className="text-focus-in">Wellness &amp; Health Appraisal</h1>
        <hr id="neatness" />
        <div className="description text-focus-in">
          <p>Your answers to this health appraisal questionnaire will assist your practitioner in gaining information about your current symptoms and health concerns. Please answer all questions, in each section.</p>
          <p>Circle the number which best describes the frequency or severity of your symptoms over the previous <b>month</b>, or answer the <b>yes</b> or <b>no</b> questions by circling the appropriate letter.</p>
          <p>You may note that some questions are repeated throughout the questionnaire. We would appreciate it if you can answer <b>all</b> questions, as this will ensure the most accurate interpretation of your results. You may however leave a question blank if you are unsure of the answer.</p>
        </div>
        <fieldset>
          <legend>Questionnaire</legend>
          { headings.map((heading, i) => (
            <Form
              key={i}
              index={i}
              super={this}
              data={this.state.data}
              submit={this.handleSubmit}
              text={heading}
            />
          ))
          }
          { <QuestionsForm
              data={questions}
              handleSubmit={this.handleQSubmit}
              handleBlur={this.handleQBlur}
              focus={this.state.focus}
            />
          }
        </fieldset>
      </div>
    )
  }
}

const QuestionsForm = props => {
  const handleSubmit = e => props.handleSubmit(e)
  const handleBlur = e => props.handleBlur(e)
  if (props.focus === 'Q') {
    return(
      <fieldset>
        <legend>More Info.</legend>
        <form className="pure-form" onSubmit={handleSubmit} onBlur={handleBlur}>
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
  const handleSubmit = e => props.super.handleSubmit(e)
  const handleChange = e => props.super.handleChange(e)
  const handleBlur = e => props.super.handleBlur(e)

  const focus = props.super.state.focus === props.index
  const complete = props.super.state.complete.includes(props.index)
  let count = 0, isTextCount = 0, typeStr
  if (!focus || complete)
    return null
  else if (focus && !complete) return(
    <form className="pure-form" id={`form-heading-${props.index}`} onSubmit={handleSubmit}>
      <h3>{props.text}</h3>
      {props.index === 10 ?
        [<span key={10} className="notice-heading">{props.data.notices.headings[10]}</span>,
          props.data.statements[10][0].map( (statement, i) => {
            typeStr = props.data.inputTypes[10][i]
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
                        super={props.super} />
                      )
        })]
      : props.data.subheadings[props.index].map( (subheading, i) =>
          [<Subheading key={`sh-${i}`} text={subheading} />,
            <SubheadingNotice key={`shn-${i}`} data={props.data.notices.subheadings[`${props.index+1}.${i+1}`]} />,
            [props.data.statements[props.index][i].map( (statement, j) => {
              typeStr = props.data.inputTypes[props.index][i][j]
              count += 1
              if (typeStr.includes('text')) {
                isTextCount += 1
              }
              return( <Statement  inputTypeStr={typeStr}
                          key={`${props.index}-${i}-${j}`}
                          blur={handleBlur}
                          count={count}
                          id={`${props.index}-${i}-${j}`}
                          text={statement}
                          radioChange={handleChange}
                          super={props.super} />
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
  props.data ? <span className="notice-subheading">{props.data}</span> : null
)

const Statement = props => {
  const inputs = props.inputTypeStr // "1 bold ny3", "12 ny6", "24 0248a", "48 text"
  const id = props.id
  const checked = props.super.state.sectionResponse[id]
  const handleChange = (e) => props.radioChange(e)
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
      <div className='wellness-statement'>
        <p><span style={{fontWeight: bolden ? 'bold' : 'normal'}}>{props.text}</span>
          <input name={`${id}-text`} type="text" onBlur={handleBlur} defaultValue={''} />
        </p>
      </div>
    )
  } else if (radioIn4) {
    return(
      <div className='wellness-statement'>
        <p><span style={{fontWeight: bolden ? 'bold' : 'normal'}}>{props.text}</span></p>
        <div className="pure-control-group">
          <RadioButton name={`${id}-${first}`} extraKey={key1} radioChange={handleChange} checked={checked} index={first} />
          <RadioButton name={`${id}-${second}`} extraKey={key2} radioChange={handleChange} checked={checked} index={second} />
          <RadioButton name={`${id}-${third}`} extraKey={key3} radioChange={handleChange} checked={checked} index={third} />
          <RadioButton name={`${id}-${fourth}`} extraKey={key4} radioChange={handleChange} checked={checked} index={fourth} />
        </div>
      </div>
    )
  } else if (radioIn2) {
    return(
      <div className='wellness-statement'>
        <p><span style={{fontWeight: bolden ? 'bold' : 'normal'}}>{props.text}</span></p>
        <div className="pure-control-group">
          <RadioButton name={`${id}-0`} extraKey={false} radioChange={handleChange} checked={checked} index={0} />
          <RadioButton name={`${id}-${yesValue}`} extraKey={false} radioChange={handleChange} checked={checked} index={yesValue} />
        </div>
      </div>
    )
  } else {
    console.log('r2', radioIn2, ' r4', radioIn4, ' text', textIn, ' \ninputs', inputs)
    return null
  }
}

const RadioButton = props => {
  const handleChange = e => props.radioChange(e)
  return(
    <div className="radio-group">
      <input type="radio"
        value={props.name} name={props.name} id={props.name}
        checked={props.checked === props.index}
        onChange={handleChange}
      />
      <label htmlFor={props.name}>
        <span>{props.extraKey || props.index}</span>
      </label>
    </div>
  )
}

export default Wellness
