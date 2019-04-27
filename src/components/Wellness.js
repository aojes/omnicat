import React from "react";
import { CSSTransition } from "react-transition-group";

// todo parse data separately from the module
import questionnaire from "./data/Wellness-questionnaire.json";

import { mem, store } from "../utils/localStorageHelper";

const convertLocalState = () => {
  const ls = mem.getset("wellness", []);
  let appState = {},
    i;
  for (i = 0; i < ls.length; i += 1) {
    appState = { ...appState, [ls[i][0]]: ls[i][1] };
  }
  mem.set("wellnessQID", Object.keys(appState).length);
  mem.getset("wellnessVisibleStatement", 0);
  mem.set(
    "wellnessTotalStatementCount",
    questionnaire.statements.flat(9).length
  );
  return appState;
};

class Wellness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: convertLocalState()
    };

    this.state.data = questionnaire;
    this.state.sectionResponse = [];
    this.state.focus = mem.getset("wellnessFocus", 0); // convertLocalState('focus'); // 0, 1... 11, 'Q', 'results'
    this.state.sectionTally = mem.getset("wellnessSectionTally", []); // array up to 13 elements including 'Q' at index[-1]
    this.state.complete = mem.getset("wellnessComplete", []); // convertLocalState('complete'); // [0, 1... 11, 'Q']
    this.state.visibleStatement = mem.getset("wellnessVisibleStatement", 0);
    this.state.statementIndex = mem.getset("wellnessStatementIndex", 0); // Object.keys(convertLocalState()).length;
    // const statements = 407 + Q?
    this.setStorage = this.setStorage.bind(this);
    this.validate = this.validate.bind(this);
    this.validateText = this.validateText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleQSubmit = this.handleQSubmit.bind(this);
    this.handleQBlur = this.handleQBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.incrementStatementIndex = this.incrementStatementIndex.bind(this);
    this.increment = this.increment.bind(this);
  }

  increment() {
    if (!store.get("statementIndex")) {
      store.set("statementIndex", 0);
      return 0;
    } else {
      const currentCount = store.get("statementIndex");
      store.set("statementIndex", currentCount + 1);
      return currentCount;
    }
  }

  incrementStatementIndex() {
    mem.set("wellnessStatementIndex", this.state.statementIndex + 1);
    store.set("statementIndex", 1 + store.get("statementIndex") || 0);
    this.setState({ statementIndex: this.state.statementIndex + 1 });
  }

  handleBlur(e) {
    const [heading, subheading, statement] = e.target.name.split("-");
    const textValue = e.target.value;
    if (this.validateText(textValue)) {
      store.set(
        "wellnessVisibleStatement",
        Object.keys(this.state.response).length
      );
      this.setStorage(`${heading}-${subheading}-${statement}`, textValue);
      this.setState({
        sectionResponse: {
          ...this.state.sectionResponse,
          [`${heading}-${subheading}-${statement}`]: textValue
        },
        response: {
          ...this.state.response,
          ...this.state.sectionResponse,
          [`${heading}-${subheading}-${statement}`]: textValue
        }
      });
    }
    // console.log('strigify state.secResp', JSON.stringify(this.state.sectionResponse));
  }

  setStorage(key, value) {
    let saved = mem.getset("wellness", []);
    if (saved.length === 0) {
      mem.set("wellness", [[key, value]]);
    } else {
      const cell = saved.indexOf(saved.find(statement => statement[0] === key));
      if (cell > -1) {
        saved[cell] = [key, value]; // ar.indexOf(ar.find(n => n[0] === 8));
        mem.set("wellness", saved);
      } else {
        mem.set("wellness", [...saved, [key, value]]);
      }
    }
  }

  handleChange(e) {
    const [heading, subheading, statement, checked] = e.target.value.split("-");
    const statementKey = `${heading}-${subheading}-${statement}`;
    // TODO
    // ! update on each statement text/radio and submit section
    // ? interpolated string is not highlighted
    // this is a normal comment
    const exists = this.state.response[statementKey];
    // could help const numSectionStatements = this.data.statements[heading].lengt
    if (!exists) {
      const nextVisibleStatement = Object.keys(this.state.response).length;

      this.setState({ visibleStatement: nextVisibleStatement });
      // this.incrementStatementIndex()
    }
    this.setStorage(statementKey, parseInt(checked, 10));
    store.set(
      "wellnessVisibleStatement",
      Object.keys(this.state.response).length
    );
    this.setState({
      sectionResponse: {
        ...this.state.sectionResponse,
        [statementKey]: parseInt(checked, 10)
      },
      response: {
        ...this.state.response,
        ...this.state.sectionResponse,
        [statementKey]: parseInt(checked, 10)
      }
    });
    // this.setState({visibleSection: `${heading}-${subheading}-${statement - 1}`})
    // console.log('change secResp:', JSON.stringify(this.state.sectionResponse));
  }

  handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => console.log("let Q get marked complete"), 999);
    const sectionFocus = this.state.focus;
    const element = document.getElementById(
      "section-statement-count-" + sectionFocus
    );
    const sectionStatementIndex = parseInt(element.attributes.allinputs.value);
    const textInputCount = parseInt(element.attributes.textinputs.value);
    const keysAry = Object.keys(this.state.response).filter(
      key => +key.split("-")[0] === sectionFocus
    );
    console.dir(keysAry);

    let valsAry = [];
    for (let i = 0; i < keysAry.length; i += 1) {
      valsAry.push(this.state.response[keysAry[i]]);
    } //Object.values({...keysAry});
    console.dir(valsAry);

    const currentSectionTally = valsAry
      .filter(el => typeof el === "number")
      .reduce((accum, val) => accum + val);

    console.log(
      " ## statements:",
      sectionStatementIndex,
      "\n ## sectionResponses: ",
      valsAry.length,
      "\n ## text statements: ",
      textInputCount,
      "\n ## tally:",
      currentSectionTally
    );

    console.log(" ### ", sectionStatementIndex, valsAry.length);

    if (this.validate(sectionStatementIndex, valsAry.length)) {
      const nextFocus =
        sectionFocus === "Q"
          ? "results"
          : sectionFocus < 11
          ? sectionFocus + 1
          : "Q";
      mem.set("wellnessFocus", nextFocus);
      mem.set("wellnessComplete", this.state.complete.concat(sectionFocus));
      mem.set(
        "wellnessSectionTally",
        this.state.sectionTally.concat(currentSectionTally)
      );
      store.set(
        "wellnessVisibleStatement",
        Object.keys(this.state.response).length
      );
      this.setState({
        sectionTally: this.state.sectionTally.concat(currentSectionTally),
        complete: this.state.complete.concat(sectionFocus),
        focus: nextFocus,
        response: { ...this.state.response, ...this.state.sectionResponse },
        sectionResponse: []
      });
      alert("Your tally for the section: " + currentSectionTally);
      return true;
    }
    alert("Please respond for each statement");
    return false;
  }

  validateText(str) {
    return str && str.length > 0;
  }

  validate(sectionResponseCount, statementCount) {
    if (sectionResponseCount && statementCount) {
      return sectionResponseCount === statementCount;
    } else {
      return false;
    }
  }

  handleQBlur(e) {
    console.info(" ## id ", e.target.id, " ## value ", e.target.value);

    this.setStorage(`${e.target.id}`, e.target.value);
    this.setState({
      sectionResponse: {
        ...this.state.sectionResponse,
        [e.target.id]: e.target.value
      },
      response: {
        ...this.state.response,
        ...this.state.sectionResponse,
        [e.target.id]: e.target.value
      }
    });
    return true;
  }

  handleQSubmit(e) {
    e.preventDefault();
    this.setState({
      sectionTally: this.state.sectionTally.concat("Q"),
      complete: this.state.complete.concat("Q"),
      focus: "results",
      response: { ...this.state.response, ...this.state.sectionResponse },
      sectionResponse: []
    });
    alert("Thank you for completing this long form.");
    return true;
  }

  render() {
    const {
      headings,
      // subheadings,
      // statements,
      // inputTypes,
      // notices,
      questions
    } = this.state.data;
    return (
      <div className="wellness">
        <h1 className="text-focus-in">Wellness &amp; Health Appraisal</h1>
        <hr id="neat" />
        <div className="description">
          <p>
            Your answers to this health appraisal questionnaire will assist your
            practitioner in gaining information about your current symptoms and
            health concerns. Please answer all questions, in each section.
          </p>
          <p>
            Circle the number which best describes the frequency or severity of
            your symptoms over the previous <b>month</b>, or answer the
            <b>yes</b> or <b>no</b> questions by circling the appropriate
            letter.
          </p>
          <p>
            You may note that some questions are repeated throughout the
            questionnaire. We would appreciate it if you can answer <b>all</b>
            questions, as this will ensure the most accurate interpretation of
            your results. You may however leave a question blank if you are
            unsure of the answer.
          </p>
        </div>
        <fieldset>
          <legend>Questionnaire</legend>
          {headings.map((heading, i) => (
            <Form
              key={i}
              index={i}
              super={this}
              data={this.state.data}
              submit={this.handleSubmit}
              text={heading}
            />
          ))}
          {
            <QuestionsForm
              data={questions}
              handleSubmit={this.handleQSubmit}
              handleBlur={this.handleQBlur}
              focus={this.state.focus}
            />
          }
        </fieldset>
      </div>
    );
  }
}

const QuestionsForm = props => {
  const handleSubmit = e => props.handleSubmit(e);
  const handleBlur = e => props.handleBlur(e);
  // const inc = () => props.inc()
  if (props.focus === "Q") {
    return (
      <fieldset>
        <legend>More Info.</legend>
        <form onSubmit={handleSubmit} onBlur={handleBlur}>
          {props.data.map((question, i) => (
            <p className="wellness-question" key={i}>
              <span className="question">{question}</span>
              <textarea id={`questions-${i}`} />
            </p>
          ))}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </fieldset>
    );
  } else {
    return null;
  }
};

const Form = props => {
  const handleSubmit = e => props.super.handleSubmit(e);
  const handleChange = e => props.super.handleChange(e);
  const handleBlur = e => props.super.handleBlur(e);
  // const inc = () => props.inc();
  const focus = props.super.state.focus === props.index;
  const complete = props.super.state.complete.includes(props.index);
  // const showSection = focus && !complete // && current section not done
  // const countAllStatements = props.super.data.statements.flat().length
  // const countSoFar = Object.keys(props.super.state.response).length
  // console.log(Object.keys(props.super.state.response));
  // console.log(props.super.state.response.length);

  // let count = store.get("statementIndex") || 0, //+ Object.keys(props.super.state.response).length, //store.get("wellnessQID"),
  // = 0, // - store.get("wellnessTotalStatementCount"),
  // const increment = () => {returnprops.super.increment();}
  let count = 0,
    isTextCount = 0,
    typeStr;
  if (!focus || complete) return null;
  else if (focus && !complete)
    return (
      <form id={`form-heading-${props.index}`} onSubmit={handleSubmit}>
        <h3>{props.text}</h3>
        {props.index === 10
          ? [
              <span key={10} className="notice-heading">
                {props.data.notices.headings[10]}
              </span>,
              props.data.statements[10][0].map((statement, i) => {
                typeStr = props.data.inputTypes[10][0][i];
                if (typeStr.includes("text")) {
                  isTextCount += 1;
                }
                return (
                  <Statement
                    inputTypeStr={typeStr}
                    key={`10-0-${i}`}
                    blur={handleBlur}
                    count={count++}
                    id={`10-0-${i}`}
                    text={statement}
                    radioChange={handleChange}
                    super={props.super}
                  />
                );
              })
            ]
          : props.data.subheadings[props.index].map((subheading, i) => [
              <Subheading key={`sh-${i}`} text={subheading} />,
              <SubheadingNotice
                key={`shn-${i}`}
                data={
                  props.data.notices.subheadings[`${props.index + 1}.${i + 1}`]
                }
              />,
              [
                props.data.statements[props.index][i].map((statement, j) => {
                  typeStr = props.data.inputTypes[props.index][i][j];
                  if (typeStr.includes("text")) {
                    isTextCount += 1;
                  }
                  return (
                    <Statement
                      inputTypeStr={typeStr}
                      key={`${props.index}-${i}-${j}`}
                      blur={handleBlur}
                      count={count++}
                      id={`${props.index}-${i}-${j}`}
                      text={statement}
                      radioChange={handleChange}
                      super={props.super}
                    />
                  );
                })
              ]
            ])}
        <input
          type="hidden"
          id={`section-statement-count-${props.index}`}
          textinputs={isTextCount}
          allinputs={count}
        />
        <button type="submit" className="btn btn-primary">
          See Results
        </button>
      </form>
    );
};

const Subheading = props =>
  // <div style={{display: props.visibility}}>
  props.text.length > 0 ? <h4>{props.text}</h4> : null;
// </div>

const SubheadingNotice = props =>
  props.data ? <span className="notice-subheading">{props.data}</span> : null;

const Statement = props => {
  const inputs = props.inputTypeStr; // "1 bold ny3", "12 ny6", "24 0248a", "48 text"
  const id = props.id;
  // console.log('resp[id]', props.super.state.response[id]);

  const checked = props.super.state.response[id];

  const numkeys = Object.keys(props.super.state.response).length;
  // const numSecKeys = props.super.state.data.statements.flat().length
  // console.log('numSecKeys :', numSecKeys);

  const handleChange = e => props.radioChange(e);
  const handleBlur = e => props.blur(e);

  let first, second, third, fourth, yesValue, key1, key2, key3, key4;

  const bolden = inputs.includes("bold");
  const textIn = inputs.includes("text");
  const localText = textIn ? props.super.state.response[id] : "";

  const radioIn2 = inputs.match(/ny(\d{1,2})?/);
  const radioIn4 = inputs.match(/[0-9]{3}a|[0-9]{4}\+?/);

  // const numSectionStatements =
  // console.dir(props.super.state.data.headings[0].length)
  // console.log(numSectionStatements);

  // console.log("count : ", props.count, "numkeys", numkeys, 'statementIndex', props.statementIndex);
  // const showIt = true
  // if (numkeys > props.statementIndex) {
  // const visibleStatement = store.get("wellnessVisibleStatement");

  // (typeof checked === "undefined" || (textIn && localText.length === 0)) &&
  const sectionResponseCount = Object.keys(props.super.state.response).filter(
    el => el.split("-")[0] === id.split("-")[0]
  ).length;
  const show = sectionResponseCount === props.count; // ||
  // sectionResponseCount + 1 === props.count;
  // const show = props.count === numkeys;
  // count resp with sub 0, 1, 3 then add
  // props.count === id.split("-")[1] + +id.split("-")[2];

  // === store.get("wellnessVisibleStatement") && store.get("wellnessVisibleStatement") === numkeys //numkeys + props.count - 1 === numkeys // store.get("wellnessQID"); //store.get("wellnessQID");
  // mem.get("wellnessVisibleStatement")
  // && (numkeys === props.statementIndex)
  // console.log("count / numkeys", props.count, " / ", numkeys);

  console.log(
    "count / wellnessQID / visibleStatement / sectionResponseCount / numkeys",
    props.count,
    store.get("wellnessQID"),
    store.get("wellnessVisibleStatement"),
    sectionResponseCount,
    numkeys
  );

  // || props.statementIndex + numkeys - 1 === - props.count - 1)) //&& props.count === mem.getset("visible", props.statementIndex) //&& props.count === props.statementIndex
  // const show = props.count === showingStatement;
  // props.count === numkeys && props.statementIndex + 1 == props.count; //() => {
  //   // check the count, and/or numkeys (same as currentQid)
  //   // props.count (at index)
  //   // props.count === mem.get("wellCurrentQId") // +1 from index // ! set current on each MEM.SET && SETSTATE
  //   // ! SEND COUNT BACK TO FORM
  // }

  // TODO
  // ! not showing section 2
  // const hide = () => (checked || hasLocalText) //&&
  // if (result) {

  // }
  // (props.statementIndex === numkeys ||
  //   (numkeys === 0 && props.statementIndex === 0));

  if (radioIn4) {
    first = parseInt(radioIn4[0].slice(0, 1), 16);
    second = parseInt(radioIn4[0].slice(1, 2), 16);
    third = parseInt(radioIn4[0].slice(2, 3), 16);
    fourth = parseInt(radioIn4[0].slice(3, 4), 16);
    if (radioIn4.input.includes("+")) {
      [key1, key2, key3, key4] = radioIn4.input.split("+ ")[1].split(", ");
    }
  } else if (radioIn2) {
    yesValue =
      radioIn2[0] === "ny" ? 3 : parseInt(radioIn2[0].split("ny")[1], 10);
  }

  if (textIn) {
    return (
      <CSSTransition in={show} timeout={300} classNames="fade">
        <div
          stid={props.statementIndex}
          className="wellness-statement"
          style={{ display: show ? "block" : "none" }}
        >
          <p>
            <span style={{ fontWeight: bolden ? "bold" : "normal" }}>
              {props.text}
            </span>
            <input
              name={`${id}-text`}
              type="text"
              onBlur={handleBlur}
              defaultValue={localText}
            />
          </p>
        </div>
      </CSSTransition>
    );
  } else if (radioIn4) {
    return (
      <CSSTransition in={show} timeout={300} classNames="fade">
        <div
          stid={props.statementIndex}
          className="wellness-statement"
          style={{ display: show ? "block" : "none" }}
        >
          <p>
            <span style={{ fontWeight: bolden ? "bold" : "normal" }}>
              {props.text}
            </span>
          </p>
          <div className="">
            <RadioButton
              name={`${id}-${first}`}
              extraKey={key1}
              radioChange={handleChange}
              checked={checked}
              index={first}
            />
            <RadioButton
              name={`${id}-${second}`}
              extraKey={key2}
              radioChange={handleChange}
              checked={checked}
              index={second}
            />
            <RadioButton
              name={`${id}-${third}`}
              extraKey={key3}
              radioChange={handleChange}
              checked={checked}
              index={third}
            />
            <RadioButton
              name={`${id}-${fourth}`}
              extraKey={key4}
              radioChange={handleChange}
              checked={checked}
              index={fourth}
            />
          </div>
        </div>
      </CSSTransition>
    );
  } else if (radioIn2) {
    return (
      // <CSSTransition in={checked || window.lookForPrevResponse} timeout={300} classNames="fade">
      <CSSTransition in={show} timeout={300} classNames="fade">
        <div
          stid={props.statementIndex}
          className="wellness-statement"
          style={{ display: show ? "block" : "none" }}
        >
          <p>
            <span style={{ fontWeight: bolden ? "bold" : "normal" }}>
              {props.text}
            </span>
          </p>
          <div className="">
            <RadioButton
              name={`${id}-0`}
              extraKey={false}
              radioChange={handleChange}
              checked={checked}
              index={0}
            />
            <RadioButton
              name={`${id}-${yesValue}`}
              extraKey={false}
              radioChange={handleChange}
              checked={checked}
              index={yesValue}
            />
          </div>
        </div>
      </CSSTransition>
    );
  } else {
    console.log(
      "r2",
      radioIn2,
      " r4",
      radioIn4,
      " text",
      textIn,
      " \ninputs",
      inputs
    );
    return null;
  }
};

const RadioButton = props => {
  const handleChange = e => props.radioChange(e);
  return (
    <div className="radio-group">
      <input
        type="radio"
        value={props.name}
        name={props.name}
        id={props.name}
        checked={props.checked === props.index}
        onChange={handleChange}
      />
      <label htmlFor={props.name}>
        <span>{props.extraKey || props.index}</span>
      </label>
    </div>
  );
};

export default Wellness;
