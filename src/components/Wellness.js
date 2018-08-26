import React from 'react'
import './../css/Wellness.sass'
import questionnaire from './data/Wellness-questionnaire.json'
let { log, error, warn, info } = console

export default class Wellness extends React.Component {
  constructor() {
    super()
    this.state = { data: questionnaire }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validate = this.validate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({a: true})
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
    return (
      <div className="wellness">
        <h2>Wellness &amp; Health Appraisal</h2>
        <hr />
        <div className="description">
          <p>Your answers to this health appraisal questionnaire will assist your practitioner in gaining information about your current symptoms and health concerns. Please answer all questions, in each section.</p>
          <p>Circle the number which best describes the frequency or severity of your symptoms over the previous <b>month</b>, or answer the <b>yes</b> or <b>no</b> questions by circling the appropriate letter.</p>
          <p>You may note that some questions are repeated throughout the questionnaire. We would appreciate it if you can answer <b>all</b> questions, as this will ensure the most accurate interpretation of your results. You may however leave a question blank if you are unsure of the answer.</p>
        </div>
        <fieldset>
          <legend>Questionnaire</legend>
          <form className="pure-form wellness-form" onSubmit={this.handleSubmit}>
             /* try a for loops */




          </form>
        </fieldset>
      </div>
    )
  }
}

// <div id={`item-${i+1}-${j+1}`} className={`section-${i+1}`}>
//   <label> {`${j+1}. ${s}`} </label>
//   <input type="radio" />
//   <input type="radio" />
//   <input type="radio" />
//   <input type="radio" />
// </div>


// <div className="pure-control-group pure-u-md-2-5">
//   <label className="pure-control"> Label 1
//     <input type="text" className="pure-control" defaultValue="Lorem ipsum" onChange={this.handleChange} />
//   </label>
//   <br />
//   <label className="pure-control"> Label 2
//     <input type="text" className="pure-control" defaultValue="Lorem 2" onChange={this.handleChange} />
//   </label>
// </div>
// <div className="pure-control-group pure-u-md-2-5">
//   <label className="pure-control"> Label 3
//     <input type="text" className="pure-control" defaultValue="Lorem 3" onChange={this.handleChange} />
//   </label>
//   <br />
//   <label className="pure-control"> Label 4
//     <input type="text" className="pure-control" defaultValue="Lorem 4" onChange={this.handleChange} />
//   </label>
// </div>
// <div className="pure-u-1">
//   <button type="submit" className="pure-button pure-button-primary pure-control">See Results</button>
// </div>
