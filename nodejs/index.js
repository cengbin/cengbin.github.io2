/**
 * Created by weibin.zeng on 2015/7/6.
 */

//调用less编译器
var less=require("less");

less.render(".class{width:1+1}",function(e,css){
    console.log(css);
});

//手动调用解析器和编译器
/*
var parser = new(less.Parser);

parser.parse('.class { width: 1 + 1 }', function (err, tree) {
    if (err) { return console.error(err) }
    console.log(tree.toCSS());
});*/



//配置
//你可以向解析器传递参数
var parser=new(less.Parser)({
    //    为@ import指令指定搜索路径
    //    指定一个文件名,为更好的错误消息
    paths:[".","./lib"],
    filename:"style.less"
});
parser.parse('.class {width:1+1}',function(e,tree){
    tree.toCSS({compress:true});//        贬低CSS输出
})