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
    const {headings, subheadings, statements} = this.state.data
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
          { headings.map( (heading, i) =>
                [ <h3 key={i}>{heading}</h3>,
                  subheadings[i].length === 0 ?
                    statements[i][0].map( (statement, j) =>
                      <p key={j}>{statement}</p>,
                    ) :
                  subheadings[i].map( (subheading, j) => (
                    [<h4 key={j}>{subheading}</h4>,
                    statements[i][j].map( (statement, k) =>
                      <p key={k} style={{color: 'green'}}>{statement}</p> )
                    ]
                  ))
                ])
          }
        </fieldset>
      </div>
    )
  }
}


// <fieldset>
// <legend>questionnaire</legend>
// { this.state.data.headings.map( (heading, i) =>
//     <h3 key={i}>{heading}</h3> &&
//       ((this.state.data.subheadings[i].length === 0 &&
//         this.state.data.statements[i].map((statement, _j) =>
//           <p key={i+_j}>{statement}</p>)) ||
//         (this.state.data.subheadings[i].map((subheading, j) =>
//           <h4 key={i + j}>{subheading}</h4> &&
//           this.state.data.statements[i][j].map((statement, k) =>
//             <p key={i+j+k}>{statement}</p>))
//         )
//       )
//     )
//   }
// </fieldset>

// <fieldset>
//   <legend>Questionnaire</legend>
//   <form className="pure-form wellness-form" onSubmit={this.handleSubmit}>
//     <h3>SECTION 1: GASTROINTESTINAL</h3>
//     <h4>Section 1.1 Stomach: Hypoacidity</h4>
//     <h5>1. Indigestion</h5>
//     <label className="pure-radio">0<input type="radio" checked={this.state.response[0] === 0} onChange={this.handleChange} /></label>
//     <label className="pure-radio">1<input type="radio" checked={this.state.response[0] === 1} onChange={this.handleChange} /></label>
//     <label className="pure-radio">2<input type="radio" checked={this.state.response[0] === 2} onChange={this.handleChange} /></label>
//     <label className="pure-radio">3<input type="radio" checked={this.state.response[0] === 3} onChange={this.handleChange} /></label>
//     <h5>2. Excessive belching, burping</h5>
//     <label className="pure-radio">0<input type="radio" checked={this.state.response[1] === 0} onChange={this.handleChange} /></label>
//     <label className="pure-radio">1<input type="radio" checked={this.state.response[1] === 1} onChange={this.handleChange} /></label>
//     <label className="pure-radio">2<input type="radio" checked={this.state.response[1] === 2} onChange={this.handleChange} /></label>
//     <label className="pure-radio">3<input type="radio" checked={this.state.response[1] === 3} onChange={this.handleChange} /></label>
//     <h5>3. Bloating or fullness commencing during or shortly after a meal</h5>
//     <label className="pure-radio">0<input type="radio" checked={this.state.response[2] === 0} onChange={this.handleChange} /></label>
//     <label className="pure-radio">1<input type="radio" checked={this.state.response[2] === 1} onChange={this.handleChange} /></label>
//     <label className="pure-radio">2<input type="radio" checked={this.state.response[2] === 2} onChange={this.handleChange} /></label>
//     <label className="pure-radio">3<input type="radio" checked={this.state.response[2] === 3} onChange={this.handleChange} /></label>
//     <h5>4. Sensation of food sitting in stomach for a prolonged period after a meal</h5>
//     <label className="pure-radio">0<input type="radio" checked={this.state.response[3] === 0} onChange={this.handleChange} /></label>
//     <label className="pure-radio">1<input type="radio" checked={this.state.response[3] === 1} onChange={this.handleChange} /></label>
//     <label className="pure-radio">2<input type="radio" checked={this.state.response[3] === 2} onChange={this.handleChange} /></label>
//     <label className="pure-radio">3<input type="radio" checked={this.state.response[3] === 3} onChange={this.handleChange} /></label>
//     <h5>5. Bad breath</h5>
//     <label className="pure-radio">0<input type="radio" checked={this.state.response[4] === 0} onChange={this.handleChange} /></label>
//     <label className="pure-radio">1<input type="radio" checked={this.state.response[4] === 1} onChange={this.handleChange} /></label>
//     <label className="pure-radio">2<input type="radio" checked={this.state.response[4] === 2} onChange={this.handleChange} /></label>
//     <label className="pure-radio">3<input type="radio" checked={this.state.response[4] === 3} onChange={this.handleChange} /></label>
//     <h5>6. Loss of appetite, or nausea</h5>
//     <label className="pure-radio">0<input type="radio" checked={this.state.response[5] === 0} onChange={this.handleChange} /></label>
//     <label className="pure-radio">1<input type="radio" checked={this.state.response[5] === 1} onChange={this.handleChange} /></label>
//     <label className="pure-radio">2<input type="radio" checked={this.state.response[5] === 2} onChange={this.handleChange} /></label>
//     <label className="pure-radio">3<input type="radio" checked={this.state.response[5] === 3} onChange={this.handleChange} /></label>
//     <h5>7. History of anaemia</h5>
//     <label className="pure-radio">0<input type="radio" checked={this.state.response[6] === 0} onChange={this.handleChange} /></label>
//     <label className="pure-radio">1<input type="radio" checked={this.state.response[6] === 1} onChange={this.handleChange} /></label>
//     <label className="pure-radio">2<input type="radio" checked={this.state.response[6] === 2} onChange={this.handleChange} /></label>
//     <label className="pure-radio">3<input type="radio" checked={this.state.response[6] === 3} onChange={this.handleChange} /></label>
//     <h4>Section 1.2 Stomach: Hyperacidity</h4>
//     ["1. Stomach pain, burning or aching, 1-4 hours after eating", "2. Feeling hungry just an hour or two after eating", "3. Indigestion or heartburn from spicy or fatty food, citrus, alcohol, or caffeine", "4. Stomach discomfort or pain in response to strong emotions, thoughts, or smell of food", "5. Heartburn aggravated by lying down or bending forward", "6. Antacids, carbonated beverages, milk, cream or food relieve the above symptoms", "7. Constipation", "8. Difficulty or pain when swallowing", "9. Black tarry stools", "10. Vomiting blood or vomitus has appearance of coffee-grounds"]
//     <h4>Section 1.3 Small Intestine/Pancreas</h4>
//     ["1. Indigestion, bloating and fullness for several hours after eating", "2. Abdominal cramps or aches", "3. Nausea and/or vomiting", "4. Excessive passage of gas", "5. Diarrhoea (loose, watery or frequent bowel movements)", "6. Constipation (requiring straining, or a hard, dry or small stool)", "7. Alternating constipation and diarrhoea", "8. Undigested food in stools", "9. Stools greasy, smelly or stick to toilet bowl", "10. Black tarry stools", "11. Certain foods worsen abdominal symptoms", "12. Dry flaky skin and dry brittle hair", "13. Difficulty gaining weight"]
//     <h4>Section 1.4 Colon</h4>
//     ["1. Lower abdominal pain, cramping and/or spasms", "2. Lower abdominal pain relieved by passing gas or stool", "3. Excessive gas and bloating", "4. Certain foods or stress aggravate lower abdominal pain", "5. Diarrhoea (loose, watery or frequent bowel movements)", "6. Constipation (requiring straining, or a hard, dry or small stool)", "7. Alternating diarrhoea and constipation", "8. Sensation of incomplete emptying of bowel", "9. Extremely narrow stools", "10. Mucus or pus in stool", "11. Red blood with bowel movement", "12. Rectal pain or cramps", "13. Anal itching"],
//     <h4>Section 1.5 Liver/Gall Bladder/Pancreas</h4>
//     ["1. Upper abdominal pain, or pain under ribs", "2. Bloating or feeling of fullness after eating", "3. Excessive belching or gas", "4. Fatty foods cause indigestion or nausea", "5. Loss of appetite", "6. Nausea and/or vomiting", "7. Unexplained itchy skin", "8. Yellowish discolouration of skin or eyes, or dark coloured urine", "9. Pale clay-coloured stools", "10. Fatigue, malaise or weakness", "11. Fluid retention, oedema", "12. Easy bruising, or bleeding (e.g. of gums)", "13. Loss or thinning of body hair", "14. Red skin, particularly on palms", "15. Dry, flaky skin, or dry hair"]
//   </form>
// </fieldset>
