import React, { useState, useEffect } from "react";
import mem from "../utils/localStorageHelper";

const Aesthetics = () => {
  const initial = mem.getset("aesthetics", {
    skin: 100, // Set the original, median value
    grooming: 50,
    hygiene: 50,
    selfcare: 50,
    selfperception: 50,
    selfconfidence: 50,
    posture: 50,
    antiageing: 50
  });

  const [keypairs, setKeypairs] = useState(initial);

  const handleChange = e => {
    // Change slide thumb color on way up
    if (+e.target.value > +e.target.max * 0.8) {
      e.target.className = "range blue";
    } else if (+e.target.value > +e.target.max * 0.6) {
      e.target.className = "range ltpurple";
    } else if (+e.target.value > +e.target.max * 0.3) {
      e.target.className = "range purple";
    } else if (+e.target.value > 0.0) {
      e.target.className = "range pink";
    }
  };

  // TODO handle focus?
  const handleBlur = e => {
    setKeypairs({ ...keypairs, [e.target.name]: +e.target.value });
    mem.set("aesthetics", keypairs);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const tally = Object.values(keypairs).reduce((a, b) => a + b, 0);
    mem.set("aesthetics", keypairs);
    console.log(tally, "/900");
    alert(`placeholder for tally of ${tally}/900`);
  };

  useEffect(() => {
    console.log("hello");
  });

  return (
    <div id="aesthetics">
      <h1 className="text-focus-in">Aesthetics</h1>
      <hr id="neatness" />
      <form className="aesthetics xlensCursor" onSubmit={handleSubmit}>
        <div className="row">
          <h3>Skin</h3>
          <p>
            Skin care and health. Prevention and risk education. Hygiene and
            routine.
          </p>
          <input
            type="range"
            className="range blue"
            onChange={handleChange}
            onBlur={handleBlur}
            min={0}
            max={200}
            defaultValue={keypairs.skin}
            name="skin"
          />
          <p>
            Knowledgeable about skin care and skin cancer prevention. Undergoes
            routine skin check, practices methods of prevention.
          </p>
        </div>
        <div className="row">
          <h3>Grooming</h3>
          <p>
            Care and health: hair, ears, mouth, nose, lips, face, hands, nails,
            feet, toes.
          </p>
          <input
            type="range"
            className="range blue"
            min={0}
            max={100}
            defaultValue={keypairs.grooming}
            name="grooming"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p>Well groomed: hair, nails, ears, face, hands.</p>
        </div>
        <div className="row">
          <h3>Hygiene</h3>
          <p>
            Hygiene education and awareness. Routine and other daily practices.
          </p>
          <input
            type="range"
            className="range blue"
            onChange={handleChange}
            onBlur={handleBlur}
            min={0}
            max={100}
            defaultValue={keypairs.hygiene}
            name="hygiene"
          />
          <p>Demonstrates appropriate hygiene practices.</p>
        </div>
        <div className="row">
          <h3>Self care</h3>
          <p>Overall maintenance, education, identification. Routine.</p>
          <input
            type="range"
            className="range blue"
            onChange={handleChange}
            onBlur={handleBlur}
            min={0}
            max={100}
            defaultValue={keypairs.selfcare}
            name="selfcare"
          />
          <p>
            Understands that self-care is important and demonstrates routine.
          </p>
        </div>
        <div className="row">
          <h3>Self perception</h3>
          <p>
            Self awareness. Identification of positive and negative features.
          </p>
          <input
            type="range"
            className="range blue"
            onChange={handleChange}
            onBlur={handleBlur}
            min={0}
            max={100}
            defaultValue={keypairs.selfperception}
            name="selfperception"
          />
          <p>
            Able to perceive oneself realistically. Aware of positive and
            negative features.
          </p>
        </div>
        <div className="row">
          <h3>Self confidence</h3>
          <p>Bravery, courage, determintation. Understanding of own ability.</p>
          <input
            type="range"
            className="range blue"
            onChange={handleChange}
            onBlur={handleBlur}
            min={0}
            max={100}
            defaultValue={keypairs.selfconfidence}
            name="selfconfidence"
          />
          <p>Demonstrates confidence in their own ability.</p>
        </div>
        <div className="row">
          <h3>Posture</h3>
          <p>Spinal alignment. Control, strength and balance.</p>
          <input
            type="range"
            className="range blue"
            onChange={handleChange}
            onBlur={handleBlur}
            min={0}
            max={100}
            defaultValue={keypairs.posture}
            name="posture"
          />
          <p>Shows good posture.</p>
        </div>
        <div className="row">
          <h3>Anti-Ageing</h3>
          <p>Education and awareness. Routine and other daily practices.</p>
          <input
            type="range"
            className="range blue"
            onChange={handleChange}
            onBlur={handleBlur}
            min={0}
            max={100}
            defaultValue={keypairs.antiageing}
            name="antiageing"
          />
          <p>
            Knowledgeable in regard to benefits of anti-ageing practices.
            Practices anti-ageing measures.
          </p>
        </div>
        <button type="submit" className="btn btn-primary">
          See Results (pending/use live tabulation and then commit result)
        </button>
      </form>
    </div>
  );
};

export default Aesthetics;
