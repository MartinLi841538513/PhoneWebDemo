/**
 * Created by Administrator on 14-4-19.
 */
var highlightColor = "#149ABD";//highlightcolor默认设置为"#149ABD"
/*
 * button highlightcolor默认设置为"#149ABD"
 * 判断移动设备和pc设备不一样的触发方式
 * */
function buttonSet(fun){
    var obj =  $(".b_button");
    var backgroundColor = obj.css("backgroundColor");
    if(isPC()){
        obj.mousedown(function(){
            $(this).css("backgroundColor",highlightColor);
        });
        obj.mouseup(function(){
            buttonAction(this,backgroundColor,fun);
        });
    }else{
        obj.on("touchstart",function(){
            $(this).css("backgroundColor",highlightColor);
        });
        obj.on("touchmove",function(){

        });
        obj.on("touchend",function(){
            buttonAction(this,backgroundColor,fun);
        });
    }
}

function buttonAction(obj,backgroundColor,fun){
    var id = $(obj).attr("id");
    $(obj).css("backgroundColor",backgroundColor);
    fun(id);
}

/*
* searchTextField
* */
function searchTextSet(fun){
    var search = $(".b_search");
    var searchButton = $(".b_searchButton");
    var searchWidth = search.width();
    var searchHeight = search.height();
    var buttonHeight = searchButton.height();
    var marginTop = -searchHeight+(searchHeight-buttonHeight)/2;
    var buttonWidth = searchButton.width();
    var marginLeft = searchWidth*0.98-buttonWidth;
    searchButton.css({"margin-top":marginTop,"margin-left":marginLeft});
    if(isPC()){
        searchButton.on("click",function(){
            searchAction(fun);
        });
    }else{
        searchButton.on("touchend",function(){
            searchAction(fun);
        });
    }
}

function searchAction(fun){
    fun();
}

/*
* 导航栏nav的快速使用
* */
function navSet(fun){
    var nav = $(".b_nav");
    var p = $(".b_nav ul li p");
    var li = nav.children("ul").eq(0).children("li");
    var navWidth = nav.width();
    var navHeight = nav.height();
    var pHeight = p.height();
    var navCount = li.length;
    var navLiWidth = parseInt((navWidth-navCount+1)/navCount);
    var navColor = nav.css("backgroundColor");
    li.eq(0).css("backgroundColor",highlightColor);
    nav.width(navLiWidth*navCount+navCount-1);
    li.width(navLiWidth);
    p.css("marginTop",(navHeight-pHeight)/2);
    if(isPC()){
        li.on("click",function(){
            navAction(li,navColor,this,fun);
        });
    }else{
        li.on("touchend",function(){
            navAction(li,navColor,this,fun);
        });
    }
}
function navAction(li,navColor,obj,fun){
    if(RGBtoHEX($(obj).css("backgroundColor")).toUpperCase()==highlightColor.toUpperCase()){
        return;
    }else{
        var index = $(obj).index();
        li.css("backgroundColor",navColor);
        $(obj).css("backgroundColor",highlightColor);
        fun(index);
    }
}


