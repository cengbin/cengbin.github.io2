import{_ as e,o as t,c as a,Q as o}from"./chunks/framework.9cedb9c5.js";const b=JSON.parse('{"title":"不可见分隔符/空格 引发的血案","description":"","frontmatter":{},"headers":[],"relativePath":"41 _不可见分隔符与空格_引发的血案总结/README.md","filePath":"41 _不可见分隔符与空格_引发的血案总结/README.md"}'),r={name:"41 _不可见分隔符与空格_引发的血案总结/README.md"},n=o('<h1 id="不可见分隔符-空格-引发的血案" tabindex="-1">不可见分隔符/空格 引发的血案 <a class="header-anchor" href="#不可见分隔符-空格-引发的血案" aria-label="Permalink to &quot;不可见分隔符/空格 引发的血案&quot;">​</a></h1><p>链接1-&gt;<a href="https://teststatic.google.com/kayak-project/partner/html/index.html" target="_blank" rel="noreferrer">https://teststatic.google.com/kayak-project/partner/html/index.html</a></p><p>编码: encodeURIComponent(&#39;<a href="https://teststatic.google.com/kayak-project/partner/html/index.html" target="_blank" rel="noreferrer">https://teststatic.google.com/kayak-project/partner/html/index.html</a>&#39;); // &#39;https%3A%2F%2Fteststatic.google.com%2Fkayak-project%2Fpartner%2Fhtml%2Findex.html&#39;</p><p>链接2-&gt;<a href="https://teststatic.google.com/kayak-project/partner/html/index.html" target="_blank" rel="noreferrer">https://teststatic.google.com/kayak-project/partner/html/index.html</a></p><p>编码: encodeURIComponent(&#39;⁣<a href="https://teststatic.google.com/kayak-project/partner/html/index.html" target="_blank" rel="noreferrer">https://teststatic.google.com/kayak-project/partner/html/index.html</a>&#39;); // &#39;%E2%81%A3https%3A%2F%2Fteststatic.google.com%2Fkayak-project%2Fpartner%2Fhtml%2Findex.html&#39;</p><p>肉眼看链接1和链接2没有任何的区别，但是分别对链接1和链接2编码后却发现不同。链接2通过编码后在https之前多了<code>%E2%81%A3</code>,what fuck！！！！</p><h2 id="分析原因" tabindex="-1">分析原因 <a class="header-anchor" href="#分析原因" aria-label="Permalink to &quot;分析原因&quot;">​</a></h2><p>UTF-8 编码 <code>%E2%81%A3</code> 对应的Unicode码是 <code>U+2063</code>, 表示的是不可见分隔符。</p><p>%E2%81%A3的学术名词叫 Zero-width-space(零宽空格) ，顾名思义，它是一个Unicode字符，却肉眼不可见。</p><h4 id="如下是一个正常的字符串" tabindex="-1">如下是一个正常的字符串 <a class="header-anchor" href="#如下是一个正常的字符串" aria-label="Permalink to &quot;如下是一个正常的字符串&quot;">​</a></h4><p>&#39;abc&#39;</p><p>encodeURIComponent(&#39;abc&#39;); // &#39;abc&#39;</p><h4 id="如下是分别在字母b的左边和右边插入了不见分割符的字符串-你能看出来吗" tabindex="-1">如下是分别在字母b的左边和右边插入了不见分割符的字符串，你能看出来吗？ <a class="header-anchor" href="#如下是分别在字母b的左边和右边插入了不见分割符的字符串-你能看出来吗" aria-label="Permalink to &quot;如下是分别在字母b的左边和右边插入了不见分割符的字符串，你能看出来吗？&quot;">​</a></h4><p>&#39;a⁣b⁣c&#39;</p><p>encodeURIComponent(&#39;a⁣b⁣c&#39;); // &#39;a%E2%81%A3b%E2%81%A3c&#39; （编码一下就看出来了，如果要测试需要复制字符串）</p><h2 id="解决方法" tabindex="-1">解决方法 <a class="header-anchor" href="#解决方法" aria-label="Permalink to &quot;解决方法&quot;">​</a></h2><p>可能存在复制源里面的文字带了空白url编码%E2%81%A3，空白编码没有宽度，虽然看不到但是会影响结果无法正确匹配对应的中文字。需要对用户录入的链接文本做处理，去掉<strong>空格</strong>，去掉<strong>不可见分隔符</strong>。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">decodeURIComponent(encodeURIComponent(&#39;a⁣b⁣c &#39;).replace(/%E2%81%A3/g,&quot;&quot;)).trim();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">decodeURIComponent(encodeURIComponent(&#39;a⁣b⁣c &#39;).replace(/%E2%81%A3/g,&quot;&quot;)).trim();</span></span></code></pre></div><h3 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h3><ul><li><a href="https://www.utf8-chartable.de/unicode-utf8-table.pl?start=8192&amp;number=128&amp;names=-&amp;htmlent=1" target="_blank" rel="noreferrer">UTF-8 encoding table and Unicode characters</a></li><li><a href="https://unicode-table.com/cn/2063/" target="_blank" rel="noreferrer">Unicode字符百科</a></li></ul>',20),c=[n];function l(p,s,h,i,d,m){return t(),a("div",null,c)}const k=e(r,[["render",l]]);export{b as __pageData,k as default};
