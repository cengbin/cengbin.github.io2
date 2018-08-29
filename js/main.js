$(function () {

  var cobweb = new Cobweb().init();

  function animate() {
    requestAnimationFrame(animate);

    cobweb.update();
  }

  animate();
  // return;
  //添加 项目集
  $.ajax({
    url: 'data/works.json',
    dataType: "json",
    type: "get",
    success: function (data) {
      var projectArr = data;
      for (var i = 0; i < projectArr.length; i++) {

        var name = projectArr[i]["name"];
        var brand = projectArr[i]["brand"];
        var pro_name = projectArr[i]["pro_name"];
        var time = projectArr[i]["time"];
        var desc = projectArr[i]["desc"];
        var link = (projectArr[i]["link"] && projectArr[i]["link"] != "")
          ? projectArr[i]["link"]
          : "javascript:void(0);";

        var img_url = "img/pro/" + name + "_" + time + ".jpg";
        var codeimg_url = "img/pro/" + name + "_" + time + "_code.png";
        var mask_ele = (projectArr[i]["code"] === 0)
          ? ""
          : ("<div class='item-mask'><img class='item-codeimg' src='" + codeimg_url + "' alt=''/></div>");

        var item = "<li class='col-6 col-sm-4 col-xl-3'>" +
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

        $("#projectView").append(item);
      }
    },
    error: function (error) {

    }
  });
});