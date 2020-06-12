function loadData(url, type, success) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      if (success) success(xmlhttp.responseText)
    }
  }
  xmlhttp.open(type, url, true);
  xmlhttp.send();
}

//添加 项目集
loadData("data/works.json", "GET", function (data) {
  var items = JSON.parse(data);
  for (var i = 0; i < items.length; i++) {
    var item = items[i]

    if (!item.link) item.link = "javascript:void(0);"
    item.thumbnailUrl = "./img/pro/" + item.name + "_" + item.time + ".jpg";
    item.codeUrl = (item.codeImg === 0) ? null : null;
  }

  var item_template = document.getElementById('itemTemplte').innerHTML
  var renderFun = mito(item_template)
  var html = renderFun({
    items: items
  })
  document.getElementById('projectView').innerHTML = html;
});


