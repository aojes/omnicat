import React, { Component } from 'react'

import './../css/Dass42.sass'

class Dass42 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selections: [],
      statements: "I found myself getting upset by quite trivial things+I was aware of dryness of my mouth+I couldn't seem to experience any positive feeling at all+I experienced breathing difficulty (eg, excessively rapid breathing, breathlessness in the absence of physical exertion)+I just couldn't seem to get going+I tended to over-react to situations+I had a feeling of shakiness (eg, legs going to give way)+I found it difficult to relax+I found myself in situations that made me so anxious I was most relieved when they ended+I felt that I had nothing to look forward to+I found myself getting upset rather easily+I felt that I was using a lot of nervous energy+I felt sad and depressed+I found myself getting impatient when I was delayed in any way (eg, lifts, traffic lights, being kept waiting)+I had a feeling of faintness+I felt that I had lost interest in just about everything+I felt I wasn't worth much as a person+I felt that I was rather touchy+I perspired noticeably (eg, hands sweaty) in the absence of high temperatures or physical exertion+I felt scared without any good reason+I felt that life wasn't worthwhile+I found it hard to wind down+I had difficulty in swallowing+I couldn't seem to get any enjoyment out of the things I did+I was aware of the action of my heart in the absence of physical exertion (eg, sense of heart rate increase, heart missing a beat)+I felt down-hearted and blue+I found that I was very irritable+I felt I was close to panic+I found it hard to calm down after something upset me+I feared that I would be \"thrown\" by some trivial but unfamiliar task+I was unable to become enthusiastic about anything+I found it difficult to tolerate interruptions to what I was doing+I was in a state of nervous tension+I felt I was pretty worthless+I was intolerant of anything that kept me from getting on with what I was doing+I felt terrified+I could see nothing in the future to be hopeful about+I felt that life was meaningless+I found myself getting agitated+I was worried about situations in which I might panic and make a fool of myself+I experienced trembling (eg, in the hands)+I found it difficult to work up the initiative to do things"
          .split('+')
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validate     = this.validate.bind(this)
  }

  handleChange(event) {
    const [id, value] = event.target.value.split('-')
    this.setState({
      selections: {
          ...this.state.selections,
          [id]: parseInt(value, 10)
      }
    })
    console.log(JSON.stringify(this.state.selections))
  }

  validate(event) {
    if (Object.keys(this.state.selections).length !== 42) {
      console.log('nopp enuf keys')
      return false
    }
    for(let i = 0, valid = false; i < Object.keys(this.state.selections).length; i++) {
      valid = ( this.state.selections[i] === 0 || this.state.selections[i] === 1 ||
                    this.state.selections[i] === 2 || this.state.selections[i] === 3 )
      if (!valid) {
        console.log('nopp values')
        return false
      }
    }
    return true
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.validate()) {
      alert("Valid!")
      return true
    } else {
      alert("not yet")
      return false
    }
  }

  // 0 Did not apply to me at all
  // 1 Applied to me to some degree, or some of the time
  // 2 Applied to me to a considerable degree, or a good part of time
  // 3 Applied to me very much, or most of the time
  render() {
    return (
      <div className="dass">
        <h2>Dass42</h2>
        <hr />
        <h3>
          Please read each statement and select a number 0, 1, 2 or 3 which indicates
          how much the statement applied to you <b>over the past week</b>.
          There are no right or wrong answers. Do not spend too much time on any statement.
        </h3>
        <form className="pure-form" onSubmit={this.handleSubmit}>
          {
            this.state.statements.map(
              (statement, index) => (
                <div key={`radio-group-${index}`} className="pure-g">
                  <div className="pure-u-1 pure-u-md-21-24 pure-control-group dass-keys">
                    <h4 className="form-control">{index+1}. &nbsp; {statement}</h4>
                    <div className="pure-u-5-24">
                      <input type="radio" value={`${index}-0`} key={`${index}-0`} id={`${index}-0`}
                        checked={this.state.selections[index] === 0 }
                        onChange={this.handleChange} />
                      <label htmlFor={`${index}-0`} className="pure-radio">  0 </label>
                    </div>
                    <div className="pure-u-5-24">
                      <input type="radio" value={`${index}-1`} key={`${index}-1`} id={`${index}-1`}
                        checked={this.state.selections[index] === 1}
                        onChange={this.handleChange } />
                      <label htmlFor={`${index}-1`} className="pure-radio">  1 </label>
                    </div>
                    <div className="pure-u-5-24">
                      <input type="radio" value={`${index}-2`} key={`${index}-2`} id={`${index}-2`}
                        checked={this.state.selections[index] === 2 }
                        onChange={this.handleChange } />
                      <label htmlFor={`${index}-2`} className="pure-radio">  2 </label>
                    </div>
                    <div className="pure-u-5-24">
                      <input type="radio" value={`${index}-3`} key={`${index}-3`} id={`${index}-3`}
                        checked={this.state.selections[index] === 3 }
                        onChange={this.handleChange } />
                      <label htmlFor={`${index}-3`} className="pure-radio">  3 </label>
                    </div>
                  </div>
                </div>
              )
            )
          }
          <button type="submit" className="pure-button pure-button-primary">
            See Results
          </button>
        </form>
      </div>
    )
  }
}

export default Dass42
