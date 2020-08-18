//https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/378

function multiReq (urls=[], maxCount) {
  let counter = 0;
  let res = [];

  return new Promise((resolve) => {
    while (counter < maxCount) {
      exec();
    }
    function exec() {
      let current = counter++;
      if (current >= urls.length && res.length === urls.length) resolve(res);
      _fetch(urls[current]).then(d => {
        res[current] = new Date().valueOf();
        if (current < urls.length) {
          exec();
        }
      });
    }
  });
}

function _fetch(i) {
  return new Promise(r => {
    setTimeout(() => { r(i); }, 1000);
  });
}

multiReq([1,2,3,4,5,6,7,8,9,10], 3).then(res => {console.log(res)});