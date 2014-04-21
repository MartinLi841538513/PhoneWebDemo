/**
 * Created by Administrator on 14-4-19.
 */
var highlightColor = "#149ABD";//highlightcolor默认设置为"#149ABD"
var screenWidth = document.documentElement.clientHeight < document.documentElement.offsetHeight?document.documentElement.clientWidth:document.documentElement.offsetWidth;

/*
* init tableview
* */
function tableviewInit(id,fun){
    var tableview = $("#"+id);
    var ul = $("#"+id+" ul");
    var li =$("#"+id+" ul li");
    var header = $("#"+id+" ul li header");
    var liHeight = li.height();
    var liCount = li.length;
    var margintop = (liHeight - header.height())/2;
    var cellColor = li.css("backgroundColor");
    header.css("marginTop",margintop);
    tableview.height(liHeight*liCount+liCount-1);
    ul.height(tableview.height());
    if(isPC()){
        li.mousedown(function(){
            $(this).css("backgroundColor",highlightColor);
        });
        li.mouseup(function(){
            tableviewcellAction(this,cellColor,fun);
        });
    }else{
        li.on("touchstart",function(){
            $(this).css("backgroundColor",highlightColor);
        });
        li.on("touchmove",function(){
            $(obj).css("backgroundColor",cellColor);
        })
        li.on("touchend",function(){
            tableviewcellAction(this,cellColor,fun);
        });
    }
    return scroll(id);
}

/*
* 带箭头的tableview
* */
function tableviewInitWithArrow(id,fun){
    tableviewInit(id,fun);
    canvasArrow(id);
}

/*
* 带image的tableview
* */
function tableviewInitWithImage(id,fun){
    tableviewInitWithArrow(id,fun);
    $("#"+id).width(screenWidth*0.8);
    cellImage(id);
}

/*
* 带有image detailtext 的tableview
* */
function tableviewInitWithRightDetail(id,fun){
    tableviewInitWithImage(id,fun);
    rightDetail(id);
}

/*
* 带有image detailtext的tableview
* */

function tableviewInitWithDownDetail(id,fun){
    tableviewInitWithImage(id,fun);
    downDetaile(id);
}

function downDetaile(id){
    var li =$("#"+id+" ul li");
    var header = $("#"+id+" ul li header");
    var detailText = $("#"+id+" ul li .b_downDetail");
    var liHeight = li.height();
    var headerHeight = header.height();
    var headerWidth = header.width();
    var detailHeight = detailText.height();
    var margintop = (liHeight-headerHeight-detailHeight)/3;
    header.css("marginTop",margintop);
    detailText.css({"margin-top":margintop*2+headerHeight,"margin-left":-headerWidth});
}

function rightDetail(id){
    var li =$("#"+id+" ul li");
    var detailText = $("#"+id+" ul li .b_rightDetail");
    var liHeight = li.height();
    var detailHeight = detailText.height();
    var margintop = (liHeight-detailHeight)*2/3;
    detailText.css("marginTop",margintop);
}

function cellImage(id){
    var li =$("#"+id+" ul li");
    var image = $("#"+id+" ul li .b_cellImg");
    var title = $("#"+id+" ul li header");
    var liHeight = li.height();
    var imageHeight = image.height();
    var margintop = (liHeight-imageHeight)/2;
    image.css({"margin-top":margintop,"margin-left":margintop});
    title.css("marginLeft","7px");
}

/*
* 用canvas画出arrow
* */
function canvasArrow(id){
    var id = "#"+id;
    var li = $(id+" ul li");
    var arrow = $(id+" .b_arrow canvas");
    var liHeight = li.height();
    for(var i=0;i<arrow.length;i++){
        var cxt = arrow.get(i).getContext('2d');
        drawArrow(arrow,liHeight,cxt,i);
    }
}
function drawArrow(arrow,liHeight,cxt,i){
    var arrowHeight = arrow.height();
    var arrowWidth = arrow.width();
    var margintop = (liHeight-arrowHeight)/2;
    arrow.eq(i).parent().css("marginTop",margintop);
    arrow.eq(i).attr("width",arrowWidth);
    arrow.eq(i).attr("height",arrowHeight);
    cxt.moveTo(0,0);
    cxt.lineTo(arrowWidth-1,arrowHeight/2);
    cxt.lineTo(0,arrowHeight);
    cxt.lineWidth = 2;
    cxt.strokeStyle = '#959095';
    cxt.stroke();

}

function tableviewcellAction(obj,cellColor,fun){
    var index = $(obj).index();
    $(obj).css("backgroundColor",cellColor);
    fun(index);
}
/*
 * button highlightcolor默认设置为"#149ABD"
 * 判断移动设备和pc设备不一样的触发方式
 * */
function buttonInit(fun){
    var obj =  $(".b_button");
    var title = $(".b_button p");
    var backgroundColor = obj.css("backgroundColor");
    var buttonHeight = obj.height();
    var titleHeiht = title.height();
    var margintop = (buttonHeight-titleHeiht)/2;
    title.css("marginTop",margintop);
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
function searchTextInit(fun){
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
function navInit(fun){
    var nav = $(".b_nav");
    var p = $(".b_nav ul li p");
    var li = nav.children("ul").eq(0).children("li");
    var navWidth = nav.width();
    var navHeight = nav.height();
    var pHeight = p.height();
    var navCount = li.length;
    var navLiWidth = parseInt((navWidth-navCount+1)/navCount);
    var navColor = nav.css("backgroundColor");
    nav.width(navLiWidth*navCount+navCount-1);
    li.width(navLiWidth);
    p.css("marginTop",(navHeight-pHeight)/2);
    //初始化触发事件.nav1高亮，并且触发
    li.eq(0).css("backgroundColor",highlightColor);
    fun(li.eq(0).index());

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
    //如果选中了，再点击就会没有效果
    if(RGBtoHEX($(obj).css("backgroundColor")).toUpperCase()==highlightColor.toUpperCase()){
        return;
    }else{
        var index = $(obj).index();
        li.css("backgroundColor",navColor);
        $(obj).css("backgroundColor",highlightColor);
        fun(index);
    }
}


