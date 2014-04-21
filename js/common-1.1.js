/**
 * Created by Administrator on 14-4-19.
 */
/*
* 判断是否pc设备或者手持设备
* */
function isPC()
{
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}

/*
 * rgb格式的颜色转化成16进制格式
 * */
//function called to return hex string value
function RGBtoHEX(str)
{
    //check that string starts with 'rgb'
    if (str.substring(0, 3) == 'rgb') {
        var arr = str.split(",");
        var r = arr[0].replace('rgb(','').trim(), g = arr[1].trim(), b = arr[2].replace(')','').trim();
        var hex = [
            toHex(r),
            toHex(g),
            toHex(b)
        ];
        return "#" + hex.join('');
    }
    else{
        //string not rgb so return original string unchanged
        return str;
    }
}
function toHex(N) {
    if (N==null) return "00";
    N=parseInt(N); if (N==0 || isNaN(N)) return "00";
    N=Math.max(0,N); N=Math.min(N,255); N=Math.round(N);
    return "0123456789ABCDEF".charAt((N-N%16)/16) + "0123456789ABCDEF".charAt(N%16);
}

/*
 * 图片加载，并且替换原来的图（主要用于模糊图片的渐变替换）
 * */
function setlazyload(imgTag,src){
    var img = new Image();
    img.src = src;
    img.onload=function(){
        $(imgTag).attr("src",this.src);
    }
}
/*
 jquery的图片预加载
 */
(function($) {
    var imgList = [];
    $.extend({
        preload: function(imgArr, option) {
            var setting = $.extend({
                init: function(loaded, total) {},
                loaded: function(img, loaded, total) {},
                loaded_all: function(loaded, total) {}
            }, option);
            var total = imgArr.length;
            var loaded = 0;

            setting.init(0, total);
            for(var i in imgArr) {
                imgList.push($("<img />")
                    .attr("src", imgArr[i])
                    .load(function() {
                        loaded++;
                        setting.loaded(this, loaded, total);
                        if(loaded == total) {
                            setting.loaded_all(loaded, total);
                        }
                    })
                );
            }

        }
    });
})(jQuery);

/*
 iscroll
 1、取消select,input,textarea等默认不可点击效果
 2、解决iscroll.js和loadlazy.js冲突
 */
function scroll(id){
    document.getElementById(id).style.position = "absolute";
    var myScroll = new iScroll(id, {
        useTransform: false,
        onBeforeScrollStart: function (e) {
            var target = e.target;
            while (target.nodeType != 1) target = target.parentNode;
            //在iscroller里经常会有select,input等属性默认不可点击，阻止默认操作就可以点击了
            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA' && target.tagName != 'A')
                e.preventDefault();
        },
        onScrollMove: function(){
            $("#"+id).trigger('scroll');//iscroller和loadlazy.js图片缓冲完毕后不能及时刷新，加上这个模拟浏览器被滑动，那么图片就可以刷新了
        },
        onScrollEnd: function(){
        }
    });
    return myScroll;
}

/*
 初始化全屏的scroll，
 1、设置id="wrapper"部分enscroll ( 参数依次是：id 上 右 下 左   （wrapper默认是position:absolute，overflow:hidden） scroller放在onload()里不容易出现界面混乱)
 2、阻止浏览器默认滑动
 */
function scrollWithLocation(id,top,right,bottom,left){
    var wrapper = document.getElementById(id);
    wrapper.style.top = top;
    wrapper.style.right = right;
    wrapper.style.bottom = bottom;
    wrapper.style.left = left;
    wrapper.style.overflow = "hidden";
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);//阻止浏览器的默认滑动
    return scroll(id);
}

/*
 touchmove和touchend的冲突解决方案
 */
function touchHandle(li,touchAction){
    var dragging = false;
    $(li).on("touchmove",function(){
        dragging = true;
    });
    $(li).on("click",function(){
        if(dragging)
            return;
        else{
            touchAction(this);
        }
    });
    $(li).on("touchstart",function(){
        dragging = false;
    });
}

/**
 *  ajax异步请求
 * */
function ajaxSubmit(url,successCallBack) {
    var config = {
        type:"get",
        url:url ,
        dataType:"json",
        beforeSend:function() {
        },
        success:successCallBack,
        complete:function(data){
            console.log(data);
        }
    };
    return $.ajax(config);
}

/**
 * 弹出框
 * */
function openAlertWindow(title,type,timeOut) {
    $("#alert_span").html(title);
    if(type == 1) {
        $("#alert_img").attr("src","../res/wifi/images/loading.gif");
    }else if(type == 2) {
        $("#alert_img").attr("src","../res/wifi/images/gou.png");
    }else if(type == 3){
        $("#alert_img").attr("src","../res/wifi/images/error.png");
    }
    $("#alert_div").fadeIn(200);
    if(type == 2 || type == 3) {
        setTimeout(function(){
            $("#alert_div").fadeOut(500);
        },timeOut);
    }else {
        setTimeout(function(){
            $("#alert_div").fadeOut(500);
        },20000);
    }
}

/**
 * 关闭弹出框
 * */
function closeAlertWindow() {
    $("#alert_div").hide(500);
}

function loadAlertDivTag() {
    $("body").append('<div id="alert_div" style="display:none; position: fixed;top: 0px;bottom: 0px;left: 0px;right: 0px;"><table border="0" style="width: 100%;height: 100%;"><tr><td align="center" valign="center"><div style="display: block;width: 100px;height: 100px;background-color: rgba(0,0,0,0.8);border-radius: 10px;text-align: center;"><img id="alert_img" style="position: relative;top: 20px;" src="../res/wifi/images/gou.png" width="32px"/><span id="alert_span" style="position: relative;top: 25px;display: block;color: #ffffff;font-size: 15px;">操作成功</span></div></td></tr></table></div>');
}