export const range = inputRange => {
  const r = inputRange
  let currValue = r.defaultValue
  let rafId
  const maxValue = r.max
  const speed = 5


  // bind events
  r.addEventListener('mousedown', unlockStartHandler, false)
  r.addEventListener('mousestart', unlockStartHandler, false)
  r.addEventListener('mouseup', unlockEndHandler, false)
  r.addEventListener('touchend', unlockEndHandler, false)

  // move gradient
  r.addEventListener('input', function() {
    //Change slide thumb color on way up
    if (r.value > 20) {
      r.classList.add('ltpurple')
    }
    if (r.value > 40) {
      r.classList.add('purple')
    }
    if (r.value > 60) {
      r.classList.add('pink')
    }

    //Change slide thumb color on way down
    if (r.value < 20) {
      r.classList.remove('ltpurple')
    }
    if (r.value < 40) {
      r.classList.remove('purple')
    }
    if (r.value < 60) {
      r.classList.remove('pink')
    }
  })


  // listen for unlock
  const unlockStartHandler = () => {
    // clear raf if trying again
    window.cancelAnimationFrame(rafId)

    // set to desired value
    currValue = +r.value
  }

  const unlockEndHandler = () => {
    // store current value
    currValue=+r.value
    // determine if we have reached success or not
    if (currValue >= maxValue) {
      successHandler()
    } else {
      rafId(window.requestAnimationFrame(animateHandler))
    }
  }

  // handle r animation
  const animateHandler = () => {

    // calculate gradient transition
    // var transX = currValue - maxValue

    // update input r
    r.value = currValue

    //Change slide thumb color on mouse up
    if (currValue < 20) {
      r.classList.remove('ltpurple')
    }
    if (currValue < 40) {
      r.classList.remove('purple')
    }
    if (currValue < 60) {
      r.classList.remove('pink')
    }

    // determine if we need to continue
    if (currValue > -1) {
      window.requestAnimationFrame(animateHandler)
    }

    // decrement value
    currValue = currValue - speed
  }

  // handle successful unlock
  const successHandler = () => {
    alert('Unlocked')
  }
}
