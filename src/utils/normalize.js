//https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/331

function simuInterval(fn, mills) {
  let timer = null;
  function loop() {
    timer = setTimeout(() => {
      loop();
      fn();
    }, mills);
  };
  loop();

  return () => {
    clearTimeout(timer);
  };
}

var a = {
  i: 1,
  toString() {
    return a.i++;
  }
}

if( a == 1 && a == 2 && a == 3 ) {
  console.log(1);
}
console.log(null == undefined)