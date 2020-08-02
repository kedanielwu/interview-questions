## useLayoutEffect和useEffect的执行时机

> `useLayoutEffect`是同步的，而`useEffect`是异步的。具体来说`useLayoutEffect`一定发生在dom渲染之前，所以可以保证渲染的准确性但是会阻塞渲染。

## CommonJS和ES6模块的区别

### CommonJS
> CommonJS是通过`require`来获取文件中的`module.exports`。加载是同步阻塞性的，但是由于这是硬盘上的文件读取操作所以消耗几乎可以不计。同时有缓存`cache`机制，当一个文件被引用的时候就会在缓存中写入含绝对位置信息的key-value，当其他模块再次引用它的时候将直接从缓存中拿取其`export`的值。

> 注意：对于CommonJS来说加载是同步阻塞性的，考虑下面的代码
```javascript
// in main.js
const a = require('./a.js')
console.log('running Main, a.val1 = %j, a.val2 = %j', a.val1, a.val2)
// in a.js
exports.val1 = true;
const b = require('./b.js')
console.log('running a, b loaded = %j', b.val)
exports.val2 = true;
// in b.js
const a = require('./a.js')
exports.val = true
console.log('running b, a.val1 = %j, a.val2 = %j', a.val1, a.val2)
```
结果应该为
```shell
> running b, a.val1 = true, a.val2 = undefined
> running a, b loaded = true
> running Main, a.val1 = true, a.val2 = true
```
其中
> `main`首先加载了`a`，同步阻塞开始运行`a`，并且`a`被写入`cache`

> `a`将`exports.val1`改写为`true`，然后加载`b`，此时开始同步阻塞运行`b`

> `b`加载`a`，`a`已在缓存内，获取了`cache`中的值，然后改写自己的`exports.val`为`true`。
> 开始打印，此时`a.val1`已经被赋值，而`a.val2`还未被赋值。完成`b`的运行

> 回到`a`，开始打印，此时`b.val`已经被赋值。然后改写`exports.val2`为`true`

> 回到`main`，开始打印，此时`a.val1, a.val2`都已经被赋值了

### ES6 Module

> 通过`import`和`export`关键字操作，常用于前端环境。相比于CommonJS的IIFE和闭包的实现方式，ES6 Module是提供了语法层面的模块化实现。在实际使用中，通常会由Babel编译成CommonJS的形式。node环境中的原生支持需要将`package.json`中的`type`改为`module`

#### 运行过程
> ES6模块在程序开始前根据引用关系构建**无环关系图**，实例化所有模块，并且通过缓存使得每个模块都只会执行一次

> 然后预留内存，将`import`和`export`指向这些内存地址。

> 填写`export`和`import`值

### CommonJS和ES6模块的区别

- CommonJS支持运行时的变量`require`，ES6模块不行。因为`import`本身是静态的，需要在执行前进行解析。
- `require`会完成的引入文件中的`exports`而ES6可以只引入一部分，为Tree Shaking提供了可能。
- `import`时如果遇到没有`export`的变量，在编译前就会报错，而`require`则会在运行时报错。

## Webpack Tree-shaking

> 在打包过程中移除未使用的模块和代码。

> 只针对顶层的`import`和`export`变量以及函数进行tree shaking，类并不会被tree shaking。原因是这些文件内可能会有side effect

> CSS也可以通过webpack plugin进行tree shaking

## Webpack Loader Plugin

> Loader为链式调用，上一个loader会把执行过的字符串交给下一个loader执行。通常用于编译不同语言，修改data url一类的操作

> Plugin更为强大，本质是监听webpack的工作流程并执行回调。同时webpack通过compiler和compilation将文件和编译器暴露给plugin。使得plugin可以影响webpack生成的文件和编译的过程。

## JSONP和AJAX和跨域

> JSONP的本质是创建一个script标签，然后通过服务器回复组装好的`callback(arg)`来获取变量执行函数。因为是script标签所以没有跨域的问题。

> AJAX本质是实例化`xmlHttpRequest`，进行标准的网络请求。

> 跨域可以通过服务端设置`access-control-allow-origin`来设置白名单。在这种情况下由客户端发起的HTTP请求如果为非简单请求（操作请求PUT，DELETE；Content-type：Application/JSON）则会先发送一次OPTION请求检查Header字段和访问源是否有效，若有效则会发送正式的HTTP请求

## CDN原理

> CDN将文件分发在不同的服务器上，使用户可以在最靠近的节点上快速获取文件，提升请求响应速度减少网络拥堵。

> CDN通过在一台GSLB（全局复杂均衡）服务器，根据用户DNS查询的IP地址返回最靠近用户的SLB（本地复杂均衡）地址，SLB再根据本地的缓存服务器群的情况将请求重定向到最优化的缓存节点上。

以请求`join.qq.com/video.php`为例

1. 发起HTTP请求，在本地DNS缓存中寻找IP地址。
2. 本地DNS缓存未命中，向根服务器发起DNS查询。
3. 根服务器返回`.com`的顶级DNS地址。
4. 向`.com`顶级DNS服务器发起DNS查询。
5. 顶级DNS完成查询，返回负责`qq.com`的权威DNS的地址。
6. 权威DNS对`join.qq.com`进行查询。
7. 权威DNS发现记录中的`join.qq.com`的CNAME记录包含`join.qq.cdn.com`，并且发现了`join.qq.cdn.com`的A记录中包含的GSLB服务器地址。
8. 本地DNS向GSLB服务器发起DNS查询。
9. GSLB服务器根据IP地址返回所在地的SLB服务器地址。
10. 客户端向SLB服务器发起HTTP请求。
11. SLB服务器根据负载均衡等情况返回请求，重定向到最优节点。
12. 客户端执行重定向请求。
13. 缓存节点服务器判断是否存在该资源以及是否过期，若有则返回资源，请求结束。若无，向源服务器更新数据并返回新资源并缓存。

## HTTP缓存

> 1.0时代使用Pragma作为缓存标签

> 1.1时代使用`Cache-control`作为缓存标签，同时使用`If-None-Match`和`If-Modified-Since`来控制具体的缓存文件标示。

缓存规则：

1. 强缓存（当前Tab）
   1. 客户端发起请求，缓存数据库检查是过期
      1. 命中直接返回数据
      2. 未命中向服务器服务器发起请求，返回结果，写入缓存数据库
2. 协商缓存
   1. 客户端发起请求，缓存数据库返回缓存标签
   2. 向服务器发起请求，检查缓存标签是否有效
      1. 有效则返回（304：Not Modified）调用缓存
      2. 无效则返回新文件，以及新缓存标签
      3. 缓存新文件，写入标签

