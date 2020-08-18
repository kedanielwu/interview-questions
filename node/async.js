const { count } = require("yargs");

const fetchWithTimeout = (url, ms=3000) => {
  return Promise.race([
    fakeReq(url),
    timeoutFunc(ms)
  ]);
};

const timeoutFunc = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('sad for you');
    }, ms);
  });
};

const fakeReq = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url);
    }, 3000);
  });
};

const workQueue = ['url1', 'url2', 'url3', 'url4'];

function multiReq(n=3, urls) {
  const res = [];
  let counter = 0;
  return new Promise((resolve, reject) => {
    while (counter < n) exec();
    function exec() {
      let time = new Date().getTime();
      let current = counter++;
      if (current >= urls.length && res.length === urls.length) { resolve(res); return; }
      fakeReq(urls[current]).then((data) => {
        res[current] = [data, time];
        if (current < urls.length) exec();
      });
    }
  });
}

multiReq(3, workQueue).then((res)=>{console.log(res)});