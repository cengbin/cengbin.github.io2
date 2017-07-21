/**
 * Created by weibin.zeng on 16/2/2.
 */
//var IP="http://192.168.1.138:8085/";
var IP="http://115.159.43.254:8085/";
$(function(){

    var cobweb=new Cobweb().init();

    function animate(){
        requestAnimationFrame(animate);

        cobweb.update();
    }
    animate();


    //添加 项目集
    $.ajax({
        url:'data/data.json',
        dataType:"json",
        type:"get",
        success:function(data){
            var projectArr=data;
            for(var i=0;i<projectArr.length;i++){

                var _href="javascript:void(0);";
                if(projectArr[i]["link"] && projectArr[i]["link"]!="")
                    _href=projectArr[i]["link"];

                var item_img_url=projectArr[i]["img"];
                var item_img_alt=projectArr[i]["alt"];

                var item_codeimg_url=projectArr[i]["code_img"];
                var item_codeimg_alt= projectArr[i]["alt"];

                var item_title=projectArr[i]["projectName"];
                var item_describe=projectArr[i]["describe"];

                var item="<li class='col-xs-3'>" +
                            "<div class='item-view'>"+
                                "<a href='"+_href+"' target='_blank'>"+
                                    "<div class='item-head'>"+
                                        "<img class='item-img' src='"+item_img_url+"' alt='"+item_img_alt+"'/>"+
                                        "<div class='item-mask'>"+
                                            "<img class='item-codeimg' src='"+item_codeimg_url+"' alt='"+item_codeimg_alt+"'/>"+
                                        "</div>"+
                                    "</div>"+
                                    "<div class='item-title'>"+item_title+"</div>"+
                                "</a>"+
                                "<div class='item-desc'>"+item_describe+"</div>"+
                            "</div>"+
                        "</li>";

                //console.log(item);

                $("#projectView").append(item);
                //console.log(item);
            }
        },
        error:function(error){

        }
    });

    return;

    //获取问题列表
    $.ajax({
        url:IP+"getQuestionsList",
        type:"GET",
        dataType:"jsonp",
        jsonp:"Callback",
        success:function(data){
            //console.log("getQuestionsList,data:\n"+JSON.stringify(data));
//                return;
            /*Single.getClass("Question").questionList=data;*/
            for(var i=0;i<data.length;i++){
                createQuestion(data[i]);
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert("获取数据失败");
            console.log("XMLHttpRequest:"+XMLHttpRequest);
            console.log("textStatus:"+textStatus);
            console.log("errorThrown:"+errorThrown);
        }
    });

    //发表问题点击事件
    $("#postQuestions").click(function(event){
        if($("#questioner").val()=="" || $("#questionDescribed").val()=="" ){
            alert("请填写完整信息");
            return;
        }
        var obj=getFormJson($("#questionform")[0]);
        $.ajax({
            url:IP+"userQuestion",
            type:"GET",
            //dataType:"JSON",
            data:obj,
            dataType:"jsonp",
            jsonp:"Callback",
            success:function(data){
                alert("发表问题成功");
                console.log("success,data:"+JSON.stringify(data));
                $("#questioner").val("");
                $("#questionDescribed").val("");
                createQuestion(data);
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                alert("发表问题失败！");
                console.log("XMLHttpRequest:"+XMLHttpRequest);
                console.log("textStatus:"+textStatus);
                console.log("errorThrown:"+errorThrown);
            }
        });
    });

    function createQuestion(data){
//            var o=decodeURI(JSON.stringify(data));
//            data=JSON.parse(o);
        var questionDate=new Date(Number(data["qdate"]));
        //显示问题
        var qitem=$("<div class='question-item'>"+
        "<div class='user-info'>"+
        "<span>"+data["author"]+"</span>"+
        "<span>   "+questionDate.getFullYear()+"/"+(questionDate.getMonth()+1)+"/"+questionDate.getDate()+"</span>"+
        "<span>   "+questionDate.getHours()+":"+questionDate.getMinutes()+":"+questionDate.getSeconds()+"</span>"+
        "</div>"+
        "<div class='question'>"+
        "<h2>"+data["described"]+"</h2>"+
        "</div>"+
        "<div class='answer'>"+
        "<i class='up_triangle_blue'></i>"+
        "<i class='up_triangle_blue2'></i>"+

        "<div class='comment'>"+
        "   <div class='answer_from' contenteditable='true'></div>"+
        "                   <a class='answerBtn'>回答</a>"+
        "       </div>"+

        "<div class='answer_item_group'>"+
        "</div>"+

        "</div>");
        $("#qc").prepend(qitem);

        var answerBtn=qitem.find(".answerBtn");
        var answerFrom=qitem.find(".answer_from");
        var answerItemGroup=qitem.find(".answer_item_group");

        if(data["answerList"]){
            var answerList=data["answerList"];
            //添加答案
            for(var i=0;i<answerList.length;i++){
                var data=answerList[i];
                var responseTime=new Date(Number(data["answerTime"]));
                var answerItem="<div class='answer_item'>"+
                    "<span>"+responseTime.getFullYear()+"/"+responseTime.getMonth()+"/"+responseTime.getDate()+"</span>"+
                    "<span>"+responseTime.getHours()+":"+responseTime.getMinutes()+":"+responseTime.getSeconds()+"</span>"+
                    "<p>"+data["answerContent"]+"</p>"+
                    "</div>";
                answerItemGroup.prepend(answerItem);
            }
        }

        answerBtn.click(function(event){
            var answer=answerFrom.html();
            if(answer=="" || answer==null){
                alert("请输入回答类容");return;
            }
            $.ajax({
                url:IP+"userAnswer",
                type:"GET",
                dataType:"jsonp",
                jsonp:"Callback",
                data:{
                    questionId:data["questionId"],
                    /*answerId:"null",*/
                    anserContent:answer
                    /*responseTime:"d"*/
                },
                success:function(data){
                    answerFrom.html("");
                    /*var answerInfo={
                     answerId:answerId,
                     questionId:questionId,
                     answerContent:answerContent,
                     responseTime:responseTime
                     };*/
                    console.log("userAnswer return data:"+JSON.stringify(data));
                    var responseTime=new Date(Number(data["answerTime"]));
                    var answerItem="<div class='answer_item'>"+
                        "<span>"+responseTime.getFullYear()+"/"+responseTime.getMonth()+"/"+responseTime.getDate()+"</span>"+
                        "<span>"+responseTime.getHours()+":"+responseTime.getMinutes()+":"+responseTime.getSeconds()+"</span>"+
                        "<p>"+data["answerContent"]+"</p>"+
                        "</div>";
                    answerItemGroup.prepend(answerItem);
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                    alert("回答问题失败");
                }
            });
        });

    }
});
// ps:注意将同名的放在一个数组里
function getFormJson(frm) {
    var o = {};
    var a = $(frm).serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

var class2type={};
var typeArr="Boolean Number String Function Array Date RegExp Object Error".split(" ");
for(var s in typeArr){
    class2type[ "[object " + typeArr[s] + "]" ] = typeArr[s].toLowerCase();
}
var toString = class2type.toString;
function type(obj) {
    return obj == null ? String(obj) : class2type[toString.call(obj)] || "object" ;
}