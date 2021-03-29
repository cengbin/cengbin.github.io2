function loadData (url, type, success) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      if (success) success(xmlhttp.responseText)
    }
  }
  xmlhttp.open(type, url, true);
  xmlhttp.send();
}

$(function () {
  loadData("data/works.json", "GET", function (data) {
    var items = JSON.parse(data);
    var item_template = document.getElementById('itemTemplte').innerHTML
    var renderFun = mito(item_template)
    var html = renderFun({
      items: items
    })
    document.getElementById('projectView').innerHTML = html;

    $('.carousel').carousel({});

    let windowHeight = window.innerHeight
    let imgs = [].concat(...document.querySelectorAll('img'))

    window.addEventListener('scroll', function () {
      imgs.forEach((item, idx) => {
        let sourceSrc = item.getAttribute('data-src')
        if (sourceSrc) {
          let currentSrc = item.getAttribute('src')
          let rect = item.getBoundingClientRect()
          if (rect.top < windowHeight && currentSrc !== sourceSrc) {
            // console.log('加载图片', item)
            item.setAttribute('src', sourceSrc)
            imgs.splice(idx, 1)
          }
        }
      })

      if (imgs.length <= 0) window.removeEventListener('scroll', arguments.callee, false)
    }, false)
  })
});