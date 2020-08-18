// inner = 'window';

// function say() {
//     console.log(this)
//     console.log(this.inner)
// }

// var obj1 = (function() {
//     var inner = '1-1';
//     return {
//         inner: '1-2',
//         say: function() {
//             console.log(inner);
//             console.log(this.inner);
//         }
//     }
// })();

// say();
// obj1.say();
// console.log([]==[])
// console.log([1].valueOf())
function A() {
  this.get = function() { console.log(this); };
}

var b =(new A())
b.get.call({})