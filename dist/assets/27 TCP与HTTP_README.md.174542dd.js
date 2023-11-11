import{_ as e,o as t,c as T,Q as o}from"./chunks/framework.9cedb9c5.js";const a="/blog/assets/640.09412eea.jpeg",p="/blog/assets/640-1.d8f3109b.jpeg",s="/blog/assets/640-2.c7a5b179.jpeg",u=JSON.parse('{"title":"TCP与HTTP","description":"","frontmatter":{},"headers":[],"relativePath":"27 TCP与HTTP/README.md","filePath":"27 TCP与HTTP/README.md"}'),l={name:"27 TCP与HTTP/README.md"},r=o('<h1 id="tcp与http" tabindex="-1">TCP与HTTP <a class="header-anchor" href="#tcp与http" aria-label="Permalink to &quot;TCP与HTTP&quot;">​</a></h1><blockquote><p>时间：2021.08.13<br> 作者：chuck</p></blockquote><p>在 HTTP/1.0 中，一个服务器在发送完一个 HTTP 响应后，会断开 TCP 链接。但是这样每次请求都会重新建立和断开 TCP 连接，代价过大。所以虽然标准中没有设定，某些服务器对 Connection: keep-alive 的 Header 进行了支持。意思是说，完成这个 HTTP 请求之后，不要断开 HTTP 请求使用的 TCP 连接。这样的好处是连接可以被重新使用，之后发送 HTTP 请求的时候不需要重新建立 TCP 连接，以及如果维持连接，那么 SSL 的开销也可以避免。</p><p>两张图片是我短时间内两次访问 <a href="https://www.github.com" target="_blank" rel="noreferrer">https://www.github.com</a> 的时间统计：</p><p><img src="'+a+'" alt=""></p><p>头一次访问，有初始化连接和 SSL 开销</p><p><img src="'+p+'" alt=""></p><p>初始化连接和 SSL 开销消失了，说明使用的是同一个 TCP 连接。</p><p>持久连接：既然维持 TCP 连接好处这么多，HTTP/1.1 就把 Connection 头写进标准，并且默认开启持久连接，除非请求中写明 Connection: close，那么浏览器和服务器之间是会维持一段时间的 TCP 连接，不会一个请求结束就断掉。</p><p>如果维持连接，一个 TCP 连接是可以发送多个 HTTP 请求的。</p><h3 id="一个-tcp-连接中-http-请求发送可以一起发送么-比如一起发三个请求-再三个响应一起接收" tabindex="-1">一个 TCP 连接中 HTTP 请求发送可以一起发送么（比如一起发三个请求，再三个响应一起接收）？ <a class="header-anchor" href="#一个-tcp-连接中-http-请求发送可以一起发送么-比如一起发三个请求-再三个响应一起接收" aria-label="Permalink to &quot;一个 TCP 连接中 HTTP 请求发送可以一起发送么（比如一起发三个请求，再三个响应一起接收）？&quot;">​</a></h3><p>HTTP/1.1 存在一个问题，单个 TCP 连接在同一时刻只能处理一个请求，意思是说：两个请求的生命周期不能重叠，任意两个 HTTP 请求从开始到结束的时间在同一个 TCP 连接里不能重叠。</p><p>虽然 HTTP/1.1 规范中规定了 Pipelining 来试图解决这个问题，但是这个功能在浏览器中默认是关闭的。</p><p>但是，HTTP2 提供了 Multiplexing 多路传输特性，可以在一个 TCP 连接中同时完成多个 HTTP 请求。至于 Multiplexing 具体怎么实现的就是另一个问题了。我们可以看一下使用 HTTP2 的效果。</p><p><img src="'+s+'" alt=""></p><p>绿色是发起请求到请求返回的等待时间，蓝色是响应的下载时间，可以看到都是在同一个 Connection，并行完成的。</p><p>所以这个问题也有了答案：在 HTTP/1.1 存在 Pipelining 技术可以完成这个多个请求同时发送，但是由于浏览器默认关闭，所以可以认为这是不可行的。在 HTTP2 中由于 Multiplexing 特点的存在，多个 HTTP 请求可以在同一个 TCP 连接中并行进行。</p><p>那么在 HTTP/1.1 时代，浏览器是如何提高页面加载效率的呢？主要有下面两点：</p><ol><li>维持和服务器已经建立的 TCP 连接，在同一连接上顺序处理多个请求。</li><li>和服务器建立多个 TCP 连接。</li></ol><h3 id="浏览器对同一-host-建立-tcp-连接到数量有没有限制" tabindex="-1">浏览器对同一 Host 建立 TCP 连接到数量有没有限制？ <a class="header-anchor" href="#浏览器对同一-host-建立-tcp-连接到数量有没有限制" aria-label="Permalink to &quot;浏览器对同一 Host 建立 TCP 连接到数量有没有限制？&quot;">​</a></h3><p>假设我们还处在 HTTP/1.1 时代，那个时候没有多路传输，当浏览器拿到一个有几十张图片的网页该怎么办呢？肯定不能只开一个 TCP 连接顺序下载，那样用户肯定等的很难受，但是如果每个图片都开一个 TCP 连接发 HTTP 请求，那电脑或者服务器都可能受不了，要是有 1000 张图片的话总不能开 1000 个TCP 连接吧，你的电脑同意 NAT 也不一定会同意。</p><p>所以答案是：有。Chrome 最多允许对同一个 Host 建立六个 TCP 连接。不同的浏览器有一些区别。</p><p><a href="https://developers.google.com/web/tools/chrome-devtools/network/issues#queued-or-stalled-requestsdevelopers.google.com" target="_blank" rel="noreferrer">https://developers.google.com/web/tools/chrome-devtools/network/issues#queued-or-stalled-requestsdevelopers.google.com</a></p><h4 id="那么回到最开始的问题-收到的-html-如果包含几十个图片标签-这些图片是以什么方式、什么顺序、建立了多少连接、使用什么协议被下载下来的呢" tabindex="-1">那么回到最开始的问题，收到的 HTML 如果包含几十个图片标签，这些图片是以什么方式、什么顺序、建立了多少连接、使用什么协议被下载下来的呢？ <a class="header-anchor" href="#那么回到最开始的问题-收到的-html-如果包含几十个图片标签-这些图片是以什么方式、什么顺序、建立了多少连接、使用什么协议被下载下来的呢" aria-label="Permalink to &quot;那么回到最开始的问题，收到的 HTML 如果包含几十个图片标签，这些图片是以什么方式、什么顺序、建立了多少连接、使用什么协议被下载下来的呢？&quot;">​</a></h4><p>如果图片都是 HTTPS 连接并且在同一个域名下，那么浏览器在 SSL 握手之后会和服务器商量能不能用 HTTP2，如果能的话就使用 Multiplexing 功能在这个连接上进行多路传输。不过也未必会所有挂在这个域名的资源都会使用一个 TCP 连接去获取，但是可以确定的是 Multiplexing 很可能会被用到。</p><p>如果发现用不了 HTTP2 呢？或者用不了 HTTPS（现实中的 HTTP2 都是在 HTTPS 上实现的，所以也就是只能使用 HTTP/1.1）。那浏览器就会在一个 HOST 上建立多个 TCP 连接，连接数量的最大限制取决于浏览器设置，这些连接会在空闲的时候被浏览器用来发送新的请求，如果所有的连接都正在发送请求呢？那其他的请求就只能等等了。</p>',26),P=[r];function i(n,c,h,d,H,C){return t(),T("div",null,P)}const m=e(l,[["render",i]]);export{u as __pageData,m as default};
