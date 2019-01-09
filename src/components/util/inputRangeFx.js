const range = (inputRange) => {
  const r = inputRange
  // let currValue = r.defaultValue
  // const speed = 5

  // move gradient
  r.addEventListener('input', () => {
    // Change slide thumb color on way up
    if (r.value > r.max * 0.20) {
      r.classList.add('pink')
    }
    if (r.value > r.max * 0.40) {
      r.classList.add('purple')
    }
    if (r.value > r.max * 0.60) {
      r.classList.add('ltpurple')
    }
    if (r.value > r.max * 0.80) {
      r.classList.add('blue')
    }

    // Change slide thumb color on way down
    if (r.value < r.max * 0.20) {
      r.classList.remove('pink')
    }
    if (r.value < r.max * 0.40) {
      r.classList.remove('purple')
    }
    if (r.value < r.max * 0.60) {
      r.classList.remove('ltpurple')
    }
    if (r.value < r.max * 0.80) {
      r.classList.remove('blue')
    }
    window.requestAnimationFrame(r)
  })
}

export default range
