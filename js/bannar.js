/**
 * Created by Administrator on 14-4-18.
 */
/*
 * 参数说明：
 * width是相对屏幕可视区域宽的比例,如:0.86
 * height是相对width的比例,如：0.47
 * top,left是margin-top,margin-left的值,如:'7%','20px'（注意这里要加引号，建议加单引号）
 * */
function setBannar (width,height,top,left) {
    //screenWidth宽度为可视区域的宽度（否则界面会乱）
    var screenWidth = document.documentElement.clientHeight < document.documentElement.offsetHeight?document.documentElement.clientWidth:document.documentElement.offsetWidth;
    var ul = document.getElementById("thelist");
    var li = ul.getElementsByTagName("li");
    var liCount = li.length;
    var wrapperWidth = parseInt(screenWidth*width);//这里取整很重要，否则会出现细微的差别
    var wrapperHeight = wrapperWidth*height;
    $(".bannarImg").width(wrapperWidth);
    $(".bannarImg").height(wrapperHeight);
    $("#wrapper").width(wrapperWidth);
    $("#wrapper").height(wrapperHeight);
    $("#wrapper").css({"margin-left":left,"margin-top":top});
    $("#scroller").width(wrapperWidth*liCount);
    for(var i = 0; i<liCount; i++){
        li[i].style.width = wrapperWidth+"px";
        li[i].style.height = wrapperWidth*height+"px";//图片的标准100:47
    }
    setNav(screenWidth,wrapperWidth);
    setScroll();
}

function setNav(screenWidth,wrapperWidth){
    var navTop = -20 - wrapperWidth*0.03;
    var navRight = (screenWidth-wrapperWidth)/2+wrapperWidth*0.05;
    $("#nav").css({"margin-top":navTop,"margin-right":navRight});
}
function setScroll(){
    var myScroll = new iScroll('wrapper', {
        snap: true,
        momentum: false,
        hScrollbar: false,
        onScrollEnd: function () {
            document.querySelector('#indicator > li.active').className = '';
            document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
        }
    });
}