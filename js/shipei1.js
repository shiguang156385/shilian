/**
 * Created by CD on 2019-1-29.
 */
/*判断浏览器*/
;(function($, window, document,undefined){
    if(!window.browser){

        var userAgent = navigator.userAgent.toLowerCase(),uaMatch;
        window.browser = {}

        /**
         * 判断是否为ie
         */
        function isIE(){
            return ("ActiveXObject" in window);
        }
        /**
         * 判断是否为谷歌浏览器
         */
        if(!uaMatch){
            uaMatch = userAgent.match(/chrome\/([\d.]+)/);
            if(uaMatch!=null){
                window.browser['name'] = 'chrome';
                window.browser['version'] = uaMatch[1];
            }
        }
        /**
         * 判断是否为火狐浏览器
         */
        if(!uaMatch){
            uaMatch = userAgent.match(/firefox\/([\d.]+)/);
            if(uaMatch!=null){
                window.browser['name'] = 'firefox';
                window.browser['version'] = uaMatch[1];
            }
        }
        /**
         * 判断是否为opera浏览器
         */
        if(!uaMatch){
            uaMatch = userAgent.match(/opera.([\d.]+)/);
            if(uaMatch!=null){
                window.browser['name'] = 'opera';
                window.browser['version'] = uaMatch[1];
            }
        }
        /**
         * 判断是否为Safari浏览器
         */
        if(!uaMatch){
            uaMatch = userAgent.match(/safari\/([\d.]+)/);
            if(uaMatch!=null){
                window.browser['name'] = 'safari';
                window.browser['version'] = uaMatch[1];
            }
        }
        /**
         * 最后判断是否为IE
         */
        if(!uaMatch){
            if(userAgent.match(/msie ([\d.]+)/)!=null){
                uaMatch = userAgent.match(/msie ([\d.]+)/);
                window.browser['name'] = 'ie';
                window.browser['version'] = uaMatch[1];
            }else{
                /**
                 * IE10
                 */
                if(isIE() && !!document.attachEvent && (function(){"use strict";return !this;}())){
                    window.browser['name'] = 'ie';
                    window.browser['version'] = '10';
                }
                /**
                 * IE11
                 */
                if(isIE() && !document.attachEvent){
                    window.browser['name'] = 'ie';
                    window.browser['version'] = '11';
                }
            }
        }

        /**
         * 注册判断方法
         */
        if(!$.isIE){
            $.extend({
                isIE:function(){
                    return (window.browser.name == 'ie');
                }
            });
        }
        if(!$.isChrome){
            $.extend({
                isChrome:function(){
                    return (window.browser.name == 'chrome');
                }
            });
        }
        if(!$.isFirefox){
            $.extend({
                isFirefox:function(){
                    return (window.browser.name == 'firefox');
                }
            });
        }
        if(!$.isOpera){
            $.extend({
                isOpera:function(){
                    return (window.browser.name == 'opera');
                }
            });
        }
        if(!$.isSafari){
            $.extend({
                isSafari:function(){
                    return (window.browser.name == 'safari');
                }
            });
        }
    }
})(jQuery, window, document);
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11
    }else{
        return -1;//不是ie浏览器
    }
}
// console.log(IEVersion())

//适配方法
function adp(totalWidth,adpWidth){
    var percent=Math.ceil((adpWidth/totalWidth)*100)/100;
    //aaa=aaa.toFixed();
    if(adpWidth>=1920){
        $(".box").css({
            "width": "1920px",
            "overflow-x": "hidden",
            "-webkit-transform-origin":"left top",
            "-webkit-transform":"scale("+percent+")",
            "-moz-transform-origin":"left top",
            "-moz-transform":"scale("+percent+")",
            "-ms-transform-origin":"left top",
            "-ms-transform":"scale("+percent+")",
            "-o-transform-origin": "left top",
            "-o-transform":"scale("+percent+")",
            "transform-origin": "left top",
            "transform":"scale("+percent+")"
        })
    }
    var h=$(".box").height();
    console.log(h)
    //谷歌1920以下
    if(window.browser.name=="chrome"||window.browser.name=="safari"){
        $(".box").css({
            "width": "1920px",
            "overflow-x": "hidden",
            "-webkit-transform-origin":"left top",
            "-webkit-transform":"scale("+percent+")",
            "transform-origin": "left top",
            "transform":"scale("+percent+")"
        })
    }
    //火狐1920以下
    if((window.browser.name=="firefox"||window.browser.name == 'opera')&&adpWidth<1920){
        $(".box").css({
            "width": "1920px",
            "overflow-x": "hidden",
            "-moz-transform-origin":"left top",
            "-moz-transform":"scale("+percent+")",
            "transform-origin": "left top",
            "transform":"scale("+percent+")"
        })

        $(".box").css("margin-bottom","-10000px")
    }
    //IE9、10、11、edge 1920以下
    if((IEVersion()==9||IEVersion()==10||IEVersion()==11||IEVersion()=="edge")&&adpWidth<1920){
        $(".box").css({
            "transform-origin":"left bottom",
            "transform":"scale("+percent+")"

        })
        $(".box").css("margin-top",(h*percent-h)+'px')
    }
    $("html").height($(".box").height()*percent);
    $("body").height($(".box").height()*percent);
}

//适配浏览器宽度
$(function () {
    var cWidth=$(window).width()+17;
    //var adpArr=[1280,1366,1440,1540,1600,1680,1920,2048,2560]
    adp(1920,cWidth)
//IE7、IE8
    if(IEVersion()==8||IEVersion()==7){
        $("body").css("overflow-x","auto")
        $(".box").css("margin-top",0)

    }
    //改变窗口大小就刷新
    var url = window.location.href;
var parm = parseInt(Math.random() * 10);
if (url.lastIndexOf('?') > -1) {
　　url = url + parm;
} else {
　　url = url + "?" + parm; 
}

    $(window).resize(function () {
        // location.reload(true);
        window.location.href = url;
    })
    $(document).keydown(function (e) {
        if(e.keyCode==116){
            // window.location.reload(true);
            window.location.href = url;
        }
    })


})


