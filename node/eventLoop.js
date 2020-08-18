// const fs = require('fs');

// setTimeout(() => {
//   console.log('timer: ', Date.now());
// }, 1);

// let fsStart = Date.now();
// console.log(fsStart)
// fs.readFile('./largeText.txt', () => {
//   console.log('file: ', Date.now());
//   let start = Date.now();
//   while (start - fsStart < 5000) {
//     start = Date.now();
//   }
// });

// setImmediate(() => {
//   console.log('Immediate: ', Date.now());
// });

// setTimeout(() => {
//   console.log('timeout0');
//   new Promise((resolve, reject) => { resolve('resolved') }).then(res => console.log(res));
//   new Promise((resolve, reject) => {
//     setTimeout(()=>{
//       resolve('timeout resolved')
//     })
//   }).then(res => console.log(res));
//   process.nextTick(() => {
//       console.log('nextTick1');
//       process.nextTick(() => {
//           console.log('nextTick2');
//           process.nextTick(() => {
//             console.log('nextTick3');
//             process.nextTick(() => {
//               console.log('nextTick4');
//           });
//         });
//       });
//   });
//   process.nextTick(() => {
//       console.log('nextTick5');
//   });
//   console.log('sync');
//   setTimeout(() => {
//       console.log('timeout2');
//   }, 0);
// }, 0);


async function async1(){
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2(){
  console.log('async2')
}
console.log('script start')
setTimeout(function(){
  console.log('setTimeout0') 
},0)  
setTimeout(function(){
  console.log('setTimeout3') 
},3)  
setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('nextTick'));
async1();
new Promise(function(resolve){
  console.log('promise1')
  resolve();
  console.log('promise2')
}).then(function(){
  console.log('promise3')
})
console.log('script end')
