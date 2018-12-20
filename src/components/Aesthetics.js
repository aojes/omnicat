import React from 'react'
import { useState, useEffect } from 'react'
import './../css/Aesthetics.sass'
import { range } from './util/inputRangeFx'
function Aesthetics() {
  useEffect(() => {
    Array.from(document.getElementsByClassName('range')).map(r => range(r))
  })
  return (<div>
    <h2>Aesthetics</h2>
    <p>Beauty, Self Confidence and Awareness, Hygiene, Self Care</p>
    <hr/>
    <form className="aesthetics">
      <div className="row">
        <h3>Skin</h3>
        <p>Skin care and health. Prevention and risk education. Hygiene and routine.</p>
        <input type="range" className="range blue"
          min={0} max={200} name="skin" defaultValue={100} />
        <p>Subject is knowledgeable about skin care and skin cancer prevention. Subject undergoes routine skin check, Subject practices methods of prevention.</p>
      </div>
      <div className="row">
        <h3>Grooming</h3>
        <p>Care and health: hair, ears, mouth, nose, lips, face, hands, nails, feet, toes.</p>
        <input type="range" className="range blue"
            min={0} max={100} name="grooming" defaultValue={50} />
        <p>Subject is well groomed: hair, nails, ears, face, hands.</p>
      </div>
      <div className="row">
        <h3>Hygiene</h3>
        <p>Hygiene education and awareness. Routine and other daily practices.</p>
        <input type="range" className="range blue"
          min={0} max={100} name="hygiene" defaultValue={50} />
        <p>Subject demonstrates appropriate hygiene practices.</p>
      </div>
      <div className="row">
        <h3>Self care</h3>
        <p>Overall maintenance, education, identification. Routine.</p>
        <input type="range" className="range blue"
          min={0} max={100} name="selfcare" defaultValue={50} />
        <p>Subject understands that self-care is important and demonstrates routine.</p>
      </div>
      <div className="row">
        <h3>Self perception</h3>
        <p>Self awareness. Identification of positive and negative features.</p>
        <input type="range" className="range blue"
          min={0} max={100} name="selfperception" defaultValue={50} />
        <p>Subject is able to perceive themselves realistically. Subject is aware of positive and negative features.</p>
      </div>
      <div className="row">
        <h3>Self confidence</h3>
        <p>Bravery, courage, determintation. Understanding of own ability.</p>
        <input type="range" className="range blue"
          min={0} max={100} name="selfconfidence" defaultValue={50} />
        <p>Subject demonstrates confidence in their own ability.</p>
      </div>
      <div className="row">
        <h3>Posture</h3>
        <p>Spinal alignment. Control, strength and balance.</p>
        <input type="range" className="range blue"
          min={0} max={100} name="posture" defaultValue={50} />
        <p>Subject has excellent posture.</p>
      </div>
      <div className="row">
        <h3>Anti-Ageing</h3>
        <p>Education and awareness. Routine and other daily practices.</p>
        <input type="range" className="range blue"
          min={0} max={100} name="antiageing" defaultValue={50} />
        <p>Subject is knowledgeable in regard to benefits of anti-ageing practices. Subject practices anti-ageing measures.</p>
      </div>
      <button type="submit" className="pure-button pure-button-primary">
        See Results (use live tabulation and then commit result)
      </button>
    </form>
  </div>
  )
}

export default Aesthetics
