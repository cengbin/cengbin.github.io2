import{_ as e,o as a,c as t,Q as o}from"./chunks/framework.9cedb9c5.js";const r="/assets/746387-20170223155932085-1172851114.1ac99f74.png",M=JSON.parse('{"title":"数据驱动视图","description":"","frontmatter":{},"headers":[],"relativePath":"29 数据驱动视图/README.md","filePath":"29 数据驱动视图/README.md"}'),i={name:"29 数据驱动视图/README.md"},s=o('<h1 id="数据驱动视图" tabindex="-1">数据驱动视图 <a class="header-anchor" href="#数据驱动视图" aria-label="Permalink to &quot;数据驱动视图&quot;">​</a></h1><p>什么是数据驱动视图？</p><p>数据驱动视图就是当数据发生变化的时候，用户界面发生相应的变化，开发者不需要手动的去修改dom。</p><p>优点：只关心数据的处理，数据变化后自然的通知页面进行重新渲染，不会导致混乱。</p><h2 id="mvvm框架" tabindex="-1">MVVM框架 <a class="header-anchor" href="#mvvm框架" aria-label="Permalink to &quot;MVVM框架&quot;">​</a></h2><p>Vuejs的数据驱动是通过MVVM这种框架来实现的。MVVM框架主要包含3个部分:model、view和 viewmodel。</p><p>Model:指的是数据部分，对应到前端就是javascript对象</p><p>View:指的是视图部分，对应前端就是dom</p><p>Viewmodel:就是连接视图与数据的中间件</p><p><img src="'+r+'" alt=""></p><p>数据(Model)和视图(View)是不能直接通讯的，而是需要通过ViewModel来实现双方的通讯。当数据变化的时候，viewModel能够监听到这种变化，并及时的通知view做出修改。同样的，当页面有事件触发时，viewMOdel也能够监听到事件，并通知model进行响应。Viewmodel就相当于一个观察者，监控着双方的动作，并及时通知对方进行相应的操作。</p><h3 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h3><p><a href="https://www.cnblogs.com/caizhenbo/p/6418284.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/caizhenbo/p/6418284.html</a></p>',13),l=[s];function c(n,p,d,m,_,h){return a(),t("div",null,l)}const V=e(i,[["render",c]]);export{M as __pageData,V as default};
