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

## HTTP2的区别

> HTTPS的加入，二进制格式，多路复用，头部压缩，服务器推送。

> HTTP1.1中多个请求将在队列中单线程进行，任意请求的超时就会导致后续请求的阻塞；HTTP2中多个请求可以共用一个链接。由于HTTP基于TCP链接，重复建立十分的低效。HTTP2通过TCP分帧的形式复用TCP链接，在一个TCP链接中发送多个请求，并通过标签区分不同的请求。

> HTTP请求中头部带有大量的信息，HTTP1会重复发送这些信息而HTTP2会在两端各保存一份缓存，只进行增量更新，同时使用encoder进行压缩。

> HTTP2支持服务器推送。通过stream的方式可以在客户端请求HTML的同时将所需要的JS或其他文件一并推送给客户端，省去了客户端解析后发起请求的步骤。

## 前端在页面加载前的优化

> CDN可以带来好处，但同域名CDN会有cookie的问题，可以考虑使用不同域名的CDN。

> 原理上可以在本地做部分接口的缓存，但是这取决于接口所提供的数据是否可以离线缓存。

> 框架的首屏渲染是需要时间的，这时候基于HTML的骨架屏和SSR就存在的意义。

> 减少静态资源的大小，tree shaking / 分割打包

> `dns-prefetch`和`preconnect`标签。在页面大量引用跨域节点的时候这两个标签可以提前进行DNS解析，后者还会在DNS解析的基础上建立TCP链接。

> `defer`和`async`标签。两者都可以使script资源并行下载而不影响页面的解析。区别在于`defer`在`DOMContentLoaded`事件触发前根据引用顺序依次执行，而`async`标签则会在下载完后立刻执行，没有明确的时间点。

> 浏览器渲染的阻塞顺序为 CSS -> JS -> HTML。意为当浏览器在构建CSSOM时JS解析将被暂停，在JS执行时DOM的解析将被暂停，所以我们应当在引入资源时优先引入CSS，然后在body标签的最后引入JS

> 现代浏览器在HTML解析上十分的优化，主线程之外还会有用于预加载静态资源的线程

> 浏览器对同域名有6个请求的限制

1. 资源的下载与否取决于JS执行的结果 -> 带有src的标签可以被移除
2. JS的执行取决于CSS渲染的结果 -> JS依赖CSS接口提供的数值
3. 浏览器存在prefetch优化

## AJAX实现

```javascript
//原生
const xhr = function(url, method, body, success, fail) {
  let req = new XMLHttpRequest()
  req.open(url, method)
  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      if (req.status >= 200 && req.status < 400) {
        success.call(undefined, req.responseText)
      } else if (req.status >= 400) {
        fail.call(undefined, req)
      }
    }
  }
  req.send(body)
}
//Promise
const xhr = function(url, method, body, success, fail) {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest()
    req.open(url, method)
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status >= 200 && req.status < 400) {
          resolve.call(undefined, req.responseText)
        } else if (req.status >= 400) {
          reject.call(undefined, req)
        }
      }
    }
    req.send(body)
    })
}
```

## HTTPS加密过程

### 基本流程
1. 客户端发起HTTPS请求（443端口）
2. 服务端接受请求，返回证书（public key）
3. 客户端接受证书，解析并验证
4. （SSL/TLS）验证证书后，生产随机值并用public key加密，发回服务器
   1. 这里的随机值在之后将被用于对称加密。
5. 服务器接受客户端发回的随机值，使用private key解密（非对称加密），并验证。
6. 服务器验证通过后，解密随机值获得用于对称加密的private key。
7. 服务器使用private key加密数据开始进行数据传输。

### 中间人攻击
> 上述的实现中可能存在中间人攻击，假设服务器为A，客户端为B，中间人为C

1. 在客户端B向服务器A发起请求时，中间人C拦截来自A的证书，并替换为自己的public key返回给客户端。
2. 客户端B使用中间人C的public key加密生成的随机值，返回给服务器A。
3. 中间人C拦截客户端B的返回值，用自己的private key对随机值解密，获得客户端B用于对称加密的private key。
4. 中间人C对随机值用服务器A的真实public key加密并发回给服务器A。
5. 服务器A正常解密并开始用客户端B的private key进行对称加密通讯。
6. 所有的请求都会被中间人C拦截并用已经获得的private key解密。

> 中间人攻击的解决方案是在浏览器内预存受信证书机构，服务器不向客户端直接发送证书，而是客户端（浏览器）主动获取受信证书机构的数字签名。

数字签名生成： 
1. CA机构对证书明文进行hash。
2. 对hash值利用private key加密生成数字签名，连同明文一起发送给客户端。

客户端验证过程：
1. 接受证书，获得明文以及数字签名。
2. 通过预装的CA证书public key对签名解密的到解密后的明文。
3. 通过相同的hash算法对明文计算，得到明文hash值。
4. 比较解密和hash值是否相等。

> 由HTTPS带来的非对称加密性能可以通过session解决，服务端可以维护session并保存private key。

## Nodejs事件循环
> Node是单线程非阻塞I/O模型的，这里的单线程指的是Javascript的运行环境是单线程。由Node唤起的I/O操作将由底层的C++交给操作系统执行实现非阻塞。

### 事件循环阶段
1. timers (`setTimeout, setInterval`)
2. I/O callback （执行系统操作回调）
3. idel, prepare
4. poll (network request, incoming connection, etc) 
   1. 获取新I/O事件，根据I/O操作指令node可以在这里阻塞
   2. 如果poll队列为空，检查是否有`setImmediate`回调
      1. 有则结束poll进入check
      2. 无则阻塞在poll直到有回调进入队列
   3. 如果poll不为空，同步执行队列回调直到清空。
   4. 在进入poll阶段时，如果poll队列为空将检查timer，如果有已经到达时间的timer则返回timer阶段执行回调。
5. check（`setImeediate`)
6. close callback （链接关闭等回调，或通过nextTick触发）

### nextTick 和 Promise

> 这两者是同一类的插队回调，有比timer更高的优先级。其中nextTick会比promise先执行

## 项目经历

### Kurve Module

> 提出了产品的构想，独立完成了设计和开发。通过把日常公司内反复出现的项目进行抽象，归纳，形成的一套框架，让开发可以快速的搭建起基本的骨架。
> 数据加载 - 数据计算/过滤 - 数据展示
> 通过env文件和webpack plugin使接口配置简单友好
> 架构上的思考：数据的处理应该放在哪？

## Kurve
> 参与迭代，主要负责组件的重构和数据处理方面的优化。
> Web Worker，code split，优化加载时间。
> 利用axios的拦截器格式化请求数据，减去了在组件层面parse的麻烦。
> 推进工具化，测试，以及开发规范。

## 浏览器的重绘和回流

> 浏览器使用的是流式布局，渲染通常为线性复杂度。但是Table布局的元素会比较复杂（约3倍的时间）。

> 元素的尺寸，结构，部分属性会导致浏览器部分或全部重新渲染，这被称为回流

1. 页面首次渲染
2. 浏览器窗口大小改变
3. 元素的尺寸和位置发生改变 //TODO
4. 元素的内容发生改变（文字，图片大小）
5. 元素的字体发生改变
6. 添加或者删除**可见**的元素
7. 激活css伪类（hover）
8. 查询或调用部分CSS方法
   1. client-Width,Height, Top, Left
   2. offset-Width, Height, Top, Left
   3. scroll-Width, Height, Top, Left
   4. scrollIntoView, (ifNeeded)
   5. getComputedStyle
   6. getBoundingClientRect
   7. scrollTo

> 元素的样式发生的改变并不影响其在文档流中的位置时，浏览器只会重新绘制当前元素并赋予新的样式，这被成为重绘

1. 回流必定触发重绘，重绘不一定触发回流
2. 浏览器有针对回流和重绘的batch update机制，但是上述第八点中的方法会强制执行update以确保结果的准确
3. 单一元素的回流经常会引起父级和与他相连元素的回流
   1. 具有复杂动画的元素应该使用绝对定位，让它脱离文档流

> 优化

1. 避免使用table布局
2. 尽可能在最小的范围内修改class
3. 使用transform修改元素位置
4. 避免多层的内联样式
   1. css选择器是从右至左匹配的（层级过多会导致递归过程的复杂）
   2. `div > a > span { color: red }`没有`span { color: red } `好
5. 将动画设置在absolute或fixed定位的元素上（脱离文档流）
6. 避免使用css表达式（calc）
7. 避免频繁的修改样式，应当一次性重写覆盖
8. 避免频繁的直接操作DOM
9.  针对display none的元素的修改不会触发回流和重绘
   1. 如果需要隐藏元素可以使用visibility，只会触发重绘而不会触发回流
10. 避免频繁的使用上面会触发回流重绘的方法，适当缓存
    

## HTML5 Drag
https://juejin.im/post/6844903513491767303

## HTML5 视频
https://juejin.im/post/6844903976312242183
https://zhuanlan.zhihu.com/p/160949364

## 隐式转换
https://juejin.im/post/6844903557968166926