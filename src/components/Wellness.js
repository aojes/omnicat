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
    // eslint-disable-next-line
    const {headings, subheadings, statements, notices, questions} = this.state.data
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
                      <Statement key={j} text={statement} />,
                    ) :
                  subheadings[i].map( (subheading, j) => (
                    [<h4 key={j}>{subheading}</h4>,
                      notices.subheadings[`${i+1}.${j+1}`] && <span className="notice-subheading">{notices.subheadings[`${i+1}.${j+1}`]}</span>,
                    statements[i][j].map( (statement, k) => (
                          <Statement key={k} text={statement} />
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

class Heading extends React.Component {
  render() {
    return(true)
  }
}

class SubHeading extends React.Component {
  render() {
    return(true)
  }
}

class Statement extends React.Component {
  render() {
    return(
      <div key={this.props.key}>
        <p>{ this.props.text }</p>
        <RadioGroup />
      </div>
    )
  }

}

class StatementNotice extends React.Component {
  // FIXME
  render() {
    const yup = this.props.heading === 10 && (this.props.statement === 6 || this.props.statement === 7)
    return (yup)
    // if (yup) {
    //   const text = this.props.notices.statements[`11-${this.props.k+1}`]
    //   const notice = <div><span style={{color: "green"}}>{text}</span></div>
    // }
    // return( notice )
  }

}

class RadioGroup extends React.Component {
  constructor() {
    super()
    this.state = {

    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    return true
  }

  render() {
    return(
      <span className="component-radio-group">
        <input type="radio"
          checked={false}
          onChange={this.handleChange} />
        <label><span>0</span>&nbsp;</label>
        <input type="radio"
          checked={false}
          onChange={this.handleChange} />
        <label><span>1</span>&nbsp;</label>
        <input type="radio"
          checked={false}
          onChange={this.handleChange} />
        <label><span>2</span>&nbsp;</label>
        <input type="radio"
          checked={false}
          onChange={this.handleChange} />
        <label><span>3</span>&nbsp;</label>
      </span>
    )
  }
}
