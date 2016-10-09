/**
 * Created by weibin.zeng on 2015/8/3.
 */
var Single=(function(){
    var instance={};
    function getSingle(className){
        if(instance[className]==null){
            try{
                eval("instance[className]=new "+className+"()");
            }catch(exception){
                console.log("没有找到实例:"+className);
            }
        }
        return instance[className];
    }
    return {
        getClass:getSingle
    }
})();
/**
 * 通过给定的class解析类名（给定类名则直接返回）
 * @author cuiweiqing  2011-10-9
 * @param  clzss class对象
 * @return 类名
 */
function getClassName(clzss){
    if(typeof clzss == "string"){
        return clzss;
    }
    var s = clzss.toString();
    if(s.indexOf('function') == -1){
        return null;
    }else{
        s = s.replace('function','');
        var idx = s.indexOf('(');
        s = s.substring(0, idx);
        s = s.replace(" ", "");
    }
    return s;
}
function Question(){
    this.questionList=[];
}