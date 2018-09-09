import React from 'react'
import './../css/Wellness.sass'
import questionnaire from './data/Wellness-questionnaire.json'
let { log, error, warn, info } = console

export default class Wellness extends React.Component {
  constructor() {
    super()
    this.state = {
      data: questionnaire,
      response: []
    }
    // const statements = 407
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validate = this.validate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    log('Event!')
    let [id, checked] = event.target.value.split('-')
    this.setState({
      response: {
        ...this.state.response,
        [id]: parseInt(checked, 10)
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    return this.validate() ?
      log('valid') && true :
      error('nopp') && false
  }

  validate() {
    return true
  }
// pure-form-[aligned, stacked] pure-group pure-control pure-control-group span.pure-form-message-inline
  render() {
    // eslint-disable-next-line
    const {headings, subheadings, statements, notices, questions} = this.state.data
    let statementID = 0
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
          <form className="pure-form" onSubmit={this.handleSubmit}>
          { headings.map( (heading, i) => (
                [ <h3 key={i}>{heading}</h3>,
                  i === 10 && <span className="notice-heading">{notices.headings[10]}</span>,
                  subheadings[i].length === 0 ?
                    statements[i][0].map( (statement, j) =>
                    <div id={"statement" + statementID}>
                      <p>{statement}</p>
                      <div className="pure-control-group">
                        <input type="radio"
                          value={`${statementID}-0`} name={`${statementID}-0`} id={`${statementID}-0`}
                          checked={this.state.response[statementID] === 0}
                          onChange={this.handleChange}
                        />
                        <label htmlFor={`${statementID}-0`}>0</label>
                        <input type="radio"
                          value={`${statementID}-1`} name={`${statementID}-1`} id={`${statementID}-1`}
                          checked={this.state.response[statementID] === 1}
                          onChange={this.handleChange}
                        />
                        <label htmlFor={`${statementID}-1`}>1</label>
                        <input type="radio"
                          value={`${statementID}-2`} name={`${statementID}-2`} id={`${statementID}-2`}
                          checked={this.state.response[statementID] === 2}
                          onChange={this.handleChange}
                        />
                        <label htmlFor={`${statementID}-2`}>2</label>
                        <input
                          type="radio"
                          value={`${statementID}-3`} name={`${statementID}-3`} id={`${statementID}-3`}
                          checked={this.state.response[statementID] === 3}
                          onChange={this.handleChange}
                        />
                        <label htmlFor={`${statementID++}-3`}>3</label>
                      </div>
                    </div>
                    ) :
                  subheadings[i].map( (subheading, j) => (
                    [<h4 key={j}>{subheading}</h4>,
                      notices.subheadings[`${i+1}.${j+1}`] && <span className="notice-subheading">{notices.subheadings[`${i+1}.${j+1}`]}</span>,
                    statements[i][j].map( (statement, k) => (
                      <div id={"statement" + statementID}>
                        <p>{statement}</p>
                        <div className="pure-control-group">
                          <input type="radio"
                            value={`${statementID}-0`} name={`${statementID}-0`} id={`${statementID}-0`}
                            checked={this.state.response[statementID] === 0}
                            onChange={this.handleChange}
                          />
                          <label htmlFor={`${statementID}-0`}>0</label>
                          <input type="radio"
                            value={`${statementID}-1`} name={`${statementID}-1`} id={`${statementID}-1`}
                            checked={this.state.response[statementID] === 1}
                            onChange={this.handleChange}
                          />
                          <label htmlFor={`${statementID}-1`}>1</label>
                          <input type="radio"
                            value={`${statementID}-2`} name={`${statementID}-2`} id={`${statementID}-2`}
                            checked={this.state.response[statementID] === 2}
                            onChange={this.handleChange}
                          />
                          <label htmlFor={`${statementID}-2`}>2</label>
                          <input
                            type="radio"
                            value={`${statementID}-3`} name={`${statementID}-3`} id={`${statementID}-3`}
                            checked={this.state.response[statementID] === 3}
                            onChange={this.handleChange}
                          />
                          <label htmlFor={`${statementID++}-3`}>3</label>
                        </div>
                      </div>
                        )
                      )
                    ]
                  ))
                ])
          )}
          <button type="submit" className="pure-button pure-button-primary">
            See Results
          </button>
          </form>
        </fieldset>
      </div>
    )
  }
}

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
