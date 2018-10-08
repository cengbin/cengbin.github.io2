function loadData(url,type,success) {
  var xmlhttp;
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  }else {// code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      if(success)success(xmlhttp.responseText)
    }
  }
  xmlhttp.open(type,url,true);
  xmlhttp.send();
}

//添加 项目集
loadData("data/works.json","GET",function(data){
  var html='';
  var projectArr = JSON.parse(data);
  for (var i = 0; i < projectArr.length; i++) {

    var name = projectArr[i]["name"];
    var brand = projectArr[i]["brand"];
    var pro_name = projectArr[i]["pro_name"];
    var time = projectArr[i]["time"];
    var desc = projectArr[i]["desc"];
    var link = (projectArr[i]["link"] && projectArr[i]["link"] != "")
      ? projectArr[i]["link"]
      : "javascript:void(0);";

    var img_url = "http://h5n.180china.com/game/pro/" + name + "_" + time + ".jpg";
    var codeimg_url = "http://h5n.180china.com/game/pro/" + name + "_" + time + "_code.png";
    var mask_ele = (projectArr[i]["code"] === 0)
      ? ""
      : ("<div class='item-mask'><img class='item-codeimg' src='" + codeimg_url + "' alt=''/></div>");

    html += "<li class='col-6 col-sm-4 col-xl-3'>" +
      "<div class='item-view'>" +
      "<a href='" + link + "' target='_blank'>" +
      "<div class='item-head'>" +
      "<img class='item-img' src='" + img_url + "'/>"
      + mask_ele +
      "</div>" +
      "<h2 class='item-brand'>" + brand + "</h2>" +
      "<div class='item-proname'>" + pro_name + "</div>" +
      "</a>" +
      "<div class='item-desc'>" + desc + "</div>" +
      "</div>" +
      "</li>";
  }
  document.getElementById('projectView').innerHTML=html;
});

var cobweb = new Cobweb().init();
function animate() {
  requestAnimationFrame(animate);

  cobweb.update();
}
animate();
