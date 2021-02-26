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
  });
});