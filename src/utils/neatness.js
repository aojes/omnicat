const neatness = function neatnav(element) {
  const borderColorOpacity = 1,
    borderColor1 = `rgba(249,32,86, ${borderColorOpacity})`,
    borderColor2 = `rgba(0,222,255, ${borderColorOpacity})`

  let i = 0, k = 30, l = 60

  // function getNextShadowPosition(shadow, offset) {
  //   shadow.x = -Math.cos((i + offset)/10) * 10
  //   shadow.y = -Math.sin((i + offset)/10) * 10
  // }

  // function shadowToString() {
  //   getNextShadowPosition(this, this.shadowOffset);
  //
  //   return this.x + 'px ' + this.y + 'px ' + this.blured + 'px ' + this.color
  // }

  function showAndMove() {
    showAndMove.timer = setTimeout(function f() {

      //change border
      element.style.borderImage = `linear-gradient(${i}deg, ${borderColor1} ${k}%, ${borderColor2} ${l}%)`
      i++

      //cycle
      showAndMove.timer = setTimeout(f, 50)
    }, 0)
  }

  return showAndMove()
}

export default neatness
