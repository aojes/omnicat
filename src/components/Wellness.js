import React from 'react'
//import { hot } from 'react-hot-loader'
import './../css/Wellness.sass'
import questionnaire from './data/Wellness-questionnaire.json'
const { log, error, info } = console
class Wellness extends React.Component {
  constructor() {
    super()
    this.state = {
      data: questionnaire,
      response: [],
      focus: 11, // ([0-9]+|Q)
      sectionTally: [],
      focusStatements: 0,
      complete: [] // ...([0-9]+|Q)
    }
    // const statements = 407
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validate = this.validate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleBlur(e) {
    log(e.target.value)
  }

  handleChange(e) {
    info(e.target)
    const [ heading, subheading, statement, checked ] = e.target.value.split( '-' )
    this.setState({
      response: {
        ...this.state.response,
        [ `${heading}-${subheading}-${statement}` ] : parseInt(checked)
      }
    })
    log(JSON.stringify(this.state.response))
    // log(JSON.stringify(this.state.newResponse))
  }

  handleSubmit(e) {
    e.preventDefault()
    const sectionFocus = this.state.focus,
      element = document.getElementById('section-statement-count-' + sectionFocus),
      sectionStatementCount = parseInt(element.value),
      vals  = Object.values(this.state.response),
      thisSectionTally = vals.reduce((a, b) => a + b)
    log('statements:', sectionStatementCount, ' tally:', thisSectionTally)

    if (this.validate(sectionStatementCount, vals.length)) {
      this.setState({
        sectionTally: this.state.sectionTally.push(thisSectionTally),
        focus: sectionFocus + 1
      })
      alert('Your tally for the section is ' + thisSectionTally)
      return true
    } else {
      alert('Please answer all questions')
      return false
    }
  }

  validate(a, b) {
    return a === b
  }
  // pure-form-[aligned, stacked] pure-group pure-control pure-control-group span.pure-form-message-inline
  render() {
    // eslint-disable-next-line
    const {headings, subheadings, statements, inputTypes, notices, questions} = this.state.data
    return (
      <div className="wellness">
        <h2>Wellness &amp; Health Appraisal</h2>
        <hr/>
        <div className="description">
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
              handleSubmit={this.handleSubmit}
              handleBlur={this.handleBlur}
              focus={this.state.focus}
            />
          }
        </fieldset>
      </div>
    )
  }
}

const QuestionsForm = props => {
  const handleSubmit = (e) => props.handleSubmit(e)
  const handleBlur = (e) => props.handleBlur(e)
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
  let count = 0
  if (!focus || complete)
    return null
  else if (focus && !complete) return(
    <form className="pure-form" id={`form-heading-${props.index}`} onSubmit={handleSubmit}>
      <h3>{props.text}</h3>
      {props.index === 10 ?
        [<span key={10} className="notice-heading">{props.data.notices.headings[10]}</span>,
          props.data.statements[10][0].map( (statement, i) => (
            <Statement  inputTypeStr={props.data.inputTypes[10][i]}
                        key={`10-0-${i}`}
                        blur={handleBlur}
                        count={count++}
                        id={`10-0-${i}`}
                        text={statement}
                        radioChange={handleChange}
                        super={props.super} />
        ))]
      : props.data.subheadings[props.index].map( (subheading, i) =>
          [<Subheading key={`sh-${i}`} text={subheading} />,
            <SubheadingNotice key={`shn-${i}`} data={props.data.notices.subheadings[`${props.index+1}.${i+1}`]} />,
            [props.data.statements[props.index][i].map( (statement, j) => (
              <Statement  inputTypeStr={props.data.inputTypes[props.index][i][j]}
                          key={`${props.index}-${i}-${j}`}
                          blur={handleBlur}
                          count={count++}
                          id={`${props.index}-${i}-${j}`}
                          text={statement}
                          radioChange={handleChange}
                          super={props.super} />
            ))]
          ]
        )
      }
      <input type="hidden" id={`section-statement-count-${props.index}`} value={count} />
      <button type="submit" className="pure-button pure-button-primary">See Results</button>
    </form>
  )
}

const Subheading = props => (
  props.text.length > 0 ? <h4>{props.text}</h4> : ''
)

const SubheadingNotice = props => (
  props.data ? <span className="notice-subheading">{props.data}</span> : ''
)

const Statement = props => {
  // NOTE Add text type not just radio
  const inputs = props.inputTypeStr // "1 bold ny3", "12 ny6"
  const id = props.id
  const checked = props.super.state.response[id]
  const handleChange = (e) => props.radioChange(e)
  const handleBlur = (e) => props.blur(e)

  // TODO checkbox input (as section 12.4)
  let first, second, third, fourth, yesValue, extraKeys,
    key1, key2, key3, key4

  const bolden   = inputs.includes('bold')
  const textIn   = inputs.includes('text')
  const radioIn2 = inputs.match(/ny(\d{1,2})?/)
  const radioIn4 = inputs.match(/[0-9]{3}a|[0-9]{4}\+?/)
  if (radioIn4) {
    // TODO change label for 0123+ (1, 2, 3, 4) values display above radios
    first  = parseInt(radioIn4[0].slice(0, 1), 16)
    second = parseInt(radioIn4[0].slice(1, 2), 16)
    third  = parseInt(radioIn4[0].slice(2, 3), 16)
    fourth = parseInt(radioIn4[0].slice(3, 4), 16)
    if (radioIn4.input.includes('+')) {
      [key1, key2, key3, key4] = radioIn4.input.split('+ ')[1].split(', ')
    }
  } else if (radioIn2) {
    yesValue = radioIn2[0] === 'ny' ? 3 : parseInt(radioIn2[0].split('ny')[1], 16)
  }

  if (textIn) {
    return (
      <div className='wellness-statement'>
        <p><span style={{fontWeight: bolden ? 'bold' : 'normal'}}>{props.text}</span>
          <input name={`${id}-text`} type="text" onBlur={handleBlur} />
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
    return(// TODO
      <div className='wellness-statement'>
        <p><span style={{fontWeight: bolden ? 'bold' : 'normal'}}>{props.text}</span></p>
        <div className="pure-control-group">
          <RadioButton name={`${id}-0`} extraKey={false} radioChange={handleChange} checked={checked} index={0} />
          <RadioButton name={`${id}-${yesValue}`} extraKey={false} radioChange={handleChange} checked={checked} index={yesValue} />
        </div>
      </div>
    )
  } else {
    log('r2', radioIn2, ' r4', radioIn4, ' text', textIn, ' \ninputs', inputs)
    return null
  }

}

const RadioButton = props => {
  const handleChange = e => props.radioChange(e)
  // const keyWidth = props.extraKey ? props.extraKey.length : props.index.toString().length
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

// const ExtraKey = props => {
//   if (typeof props.text !== 'undefined') {log(props.text)}
//   if (typeof props.text === 'string') {
//     return(
//       <span style={{position: 'relative', top: '-30px', left: '-30px', float: 'left', clear: 'both'}}>{props.text}</span>
//     )
//   } else {
//     return null
//   }
// }

export default Wellness
// const Statement = props => {
//   return(
//     <div id={"statement" + statementID}>
//       <p>{statement}</p>
//       <div className="pure-control-group">
//         <input type="radio"
//           value={`${statementID}-0`} name={`${statementID}-0`} id={`${statementID}-0`}
//           checked={this.state.response[statementID] === 0}
//           onChange={this.handleChange}
//         />
//         <label htmlFor={`${statementID}-0`}><span>0</span>&nbsp;</label>
//         <input type="radio"
//           value={`${statementID}-1`} name={`${statementID}-1`} id={`${statementID}-1`}
//           checked={this.state.response[statementID] === 1}
//           onChange={this.handleChange}
//         />
//         <label htmlFor={`${statementID}-1`}><span>1</span>&nbsp;</label>
//         <input type="radio"
//           value={`${statementID}-2`} name={`${statementID}-2`} id={`${statementID}-2`}
//           checked={this.state.response[statementID] === 2}
//           onChange={this.handleChange}
//         />
//         <label htmlFor={`${statementID}-2`}><span>2</span>&nbsp;</label>
//         <input
//           type="radio"
//           value={`${statementID}-3`} name={`${statementID}-3`} id={`${statementID}-3`}
//           checked={this.state.response[statementID] === 3}
//           onChange={this.handleChange}
//         />
//         <label htmlFor={`${statementID++}-3`}><span>3</span>&nbsp;</label>
//       </div>
//     </div>
//   )
// }

//
// const Statement = props => {
//   const handleRadioGroupChange = (id, checked) => {
//     console.log("In Statement: Called by RadioGroup:", id, checked);
//     props.onRadioClick(id, checked);
//   };
//
//   return (
//     <div id={"statement" + props.id}>
//       <p>{props.text}</p>
//       // <RadioGroup
//       //   id={props.id}
//       //   checkedRadio={props.currentChecked}
//       //   onRadioChange={handleRadioGroupChange}
//       // />
//     </div>
//   );
// };

// const RadioGroup = props => {
//   const handleChange = e => {
//     let [id, currentChecked] = e.target.value.split('-')
//     id = parseInt(id, 10)
//     currentChecked = parseInt(currentChecked, 10)
//     console.log(
//       "Going to call parent's method and will give the value:",
//       id, currentChecked
//     );
//     props.onRadioChange(id, currentChecked);
//   };
//   return (
//     <div id={`group-${props.id}`}>
//       <input
//         type="radio"
//         value={`${props.id}-0`}
//         checked={props.checkedRadio === 0}
//         onChange={handleChange}
//       />
//       <label>0</label>
//       <input
//         type="radio"
//         value={`${props.id}-1`}
//         checked={props.checkedRadio === 1}
//         onChange={handleChange}
//       />
//       <label>1</label>
//       <input
//         type="radio"
//         value={`${props.id}-2`}
//         checked={props.checkedRadio === 2}
//         onChange={handleChange}
//       />
//       <label>2</label>
//       <input
//         type="radio"
//         value={`${props.id}-3`}
//         checked={props.checkedRadio === 3}
//         onChange={handleChange}
//       />
//       <label>3</label>
//     </div>
//   );
// };
