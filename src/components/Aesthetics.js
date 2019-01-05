import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import '../css/Aesthetics.sass'
import { range } from './util/inputRangeFx'

const Aesthetics = () => {
  const [keypairs] = useState({
    skin: 100, // Set the original, median value
    grooming: 50,
    hygiene: 50,
    selfcare: 50,
    selfperception: 50,
    selfconfidence: 50,
    posture: 50,
    antiageing: 50,
  })

  useEffect(() => {
    Array.from(document.getElementsByClassName('range')).map(r => range(r))
  })

  // TODO handle focus?
  function handleBlur(e) {
    keypairs[e.target.name] = +e.target.value
    console.log(e.target.name, +e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const tally = Object.values(keypairs).reduce((a, b) => a + b, 0)
    console.log(tally, '/900')
    alert(`placeholder for tally of ${tally}/900`)
  }

  return (<div className="pure-u" id="aesthetics">
    <h2>Aesthetics </h2>
    <p>Beauty, Self Confidence and Awareness, Hygiene, Self Care</p>
    <hr/>
    <form className="aesthetics" onSubmit={handleSubmit}>
      <div className="row">
        <h3>Skin</h3>
        <p>Skin care and health. Prevention and risk education. Hygiene and routine.</p>
        <input type="range" className="range blue" onBlur={handleBlur}
          min={0} max={200} name="skin" />
        <p>Knowledgeable about skin care and skin cancer prevention. Undergoes routine skin
          check, practices methods of prevention.
        </p>
      </div>
      <div className="row">
        <h3>Grooming</h3>
        <p>Care and health: hair, ears, mouth, nose, lips, face, hands, nails, feet, toes.</p>
        <input type="range" className="range blue"
          min={0} max={100} name="grooming" onBlur={handleBlur} />
        <p>Well groomed: hair, nails, ears, face, hands.</p>
      </div>
      <div className="row">
        <h3>Hygiene</h3>
        <p>Hygiene education and awareness. Routine and other daily practices.</p>
        <input type="range" className="range blue" onBlur={handleBlur}
          min={0} max={100} name="hygiene" />
        <p>Demonstrates appropriate hygiene practices.</p>
      </div>
      <div className="row">
        <h3>Self care</h3>
        <p>Overall maintenance, education, identification. Routine.</p>
        <input type="range" className="range blue" onBlur={handleBlur}
          min={0} max={100} name="selfcare" />
        <p>Understands that self-care is important and demonstrates routine.</p>
      </div>
      <div className="row">
        <h3>Self perception</h3>
        <p>Self awareness. Identification of positive and negative features.</p>
        <input type="range" className="range blue" onBlur={handleBlur}
          min={0} max={100} name="selfperception" />
        <p>Able to perceive oneself realistically. Aware of positive and negative features.</p>
      </div>
      <div className="row">
        <h3>Self confidence</h3>
        <p>Bravery, courage, determintation. Understanding of own ability.</p>
        <input type="range" className="range blue" onBlur={handleBlur}
          min={0} max={100} name="selfconfidence" />
        <p>Demonstrates confidence in their own ability.</p>
      </div>
      <div className="row">
        <h3>Posture</h3>
        <p>Spinal alignment. Control, strength and balance.</p>
        <input type="range" className="range blue" onBlur={handleBlur}
          min={0} max={100} name="posture" />
        <p>Shows good posture.</p>
      </div>
      <div className="row">
        <h3>Anti-Ageing</h3>
        <p>Education and awareness. Routine and other daily practices.</p>
        <input type="range" className="range blue" onBlur={handleBlur}
          min={0} max={100} name="antiageing" />
        <p>Knowledgeable in regard to benefits of anti-ageing practices.
          Practices anti-ageing measures.
        </p>
      </div>
      <button type="submit" className="pure-button pure-button-primary">
        See Results (pending/use live tabulation and then commit result)
      </button>
    </form>
  </div>
  )
}

export default hot(module)(Aesthetics)
