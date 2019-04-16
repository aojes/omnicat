const neatness = function neatnav(element) {
  let borderColorOpacity = 1,
    borderColor1 = `rgba(249,32,86, ${borderColorOpacity})`,
    borderColor2 = `rgba(0,222,255, ${borderColorOpacity})`,
    i = 0,
    iDirection = true,
    iObj,
    k = 30,
    kDirection = false,
    kObj,
    l = 60,
    lDirection = true,
    lObj;

  //extra functions
  function getNextValue(value, flag, min, max, step) {
    if (flag && value < max) {
      value += step;
    } else if (flag && value >= max) {
      flag = false;
      value -= step;
    } else if (!flag && value > min) {
      value -= step;
    } else if (!flag && value <= min) {
      flag = true;
      value += step;
    }

    return {
      value: value,
      flag: flag
    };
  }

  function shadowToString() {
    getNextShadowPosition(this, this.shadowOffset);

    return this.x + "px " + this.y + "px " + this.blured + "px " + this.color;
  }

  function getNextShadowPosition(shadow, offset) {
    shadow.x = -Math.cos((i + offset) / 10) * 10;
    shadow.y = -Math.sin((i + offset) / 10) * 10;
  }

  function showAndMove() {
    showAndMove.timer = setTimeout(function f() {
      //change border
      element.style.borderImage = `linear-gradient(${i}deg, ${borderColor1} ${k}%, ${borderColor2} ${l}%)`;
      i++;
      kObj = getNextValue(k, kDirection, 0, 50, 1);
      k = kObj.value;
      kDirection = kObj.flag;

      lObj = getNextValue(l, lDirection, 50, 100, 2);
      l = lObj.value;
      lDirection = lObj.flag;
      //cycle
      showAndMove.timer = setTimeout(f, 50);
    }, 0);
  }

  return showAndMove();
};

export default neatness;
