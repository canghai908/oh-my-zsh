$(function() {
    window.i = 1;
    window.ii = 0; //通过鼠标滚动次数来存储当前屏的当前索引值
    window.ii_sub = 0; //通过鼠标滚动次数来存储当前屏的当前索引值,子page 页面
    window.iii = 0; //通过鼠标滚动次数来存储翻页效果的当前索引值
    window.nextEnd = false; //用于判断书页效果是否已处于最后一页
    window.prevEnd = false; //用于判断书页效果是否已处于第一页
    window.isAnimating = false; //用于设置书页的动画状态
    var navTopShown = true;
    var logoOver = false;


    var div_logo = $('#js-logo'); //网站logo
    var div_top_nav = $('#top-nav'); //顶部固定栏导航
    var div_top_nav_li = $('#top-nav li'); //顶部固定栏导航li
    var div_top_nav_a = $('#top-nav li a'); //顶部固定栏导航li a
    var section_nav = $('#section-nav'); //侧边导航
    var section_nav_li = $('#section-nav li'); //侧边导航li

    var page_yes = $('.page.yes'); //计数的page
    var showTimes = '';
    window.m2 = 1;
    var page_length = $(".page").length;
    var page_last = page_length - 1;
    var pagesub_length = $(".page-sub").length;
    var pagesub_last = pagesub_length - 1;
    var waittime = 1000;
    
    var understand = $("#js-understand"); //判断是否了解页面
    var understand_length = understand.length;
    
    // 定义窗口重载动作
    //这里要注意的是，除了初始化的功能动作，窗口重载的这个事件是其他所有其他后续动作的入口，也就是说，一旦窗口重载事件发生后，后续事件会重新执行一次。
    $(window).resize(function() {
        if (window.innerHeight != undefined) {
            var windowW = window.innerWidth;
            var windowH = window.innerHeight;
        } else {
            var windowW = $(window).width();
            var windowH = $(window).height();
        };
        window.width = windowW;

        $('body,.page.yes,.page .page-sub').height(windowH);

    });

    // 获取当前窗口的宽度和高度
    window.openi = 0;
    if (window.innerHeight != undefined) {
        var windowW = window.innerWidth;
        var windowH = window.innerHeight;
    } else {
        var windowW = $(window).width();
        var windowH = $(window).height();
    };
    window.width = windowW;

    // 设置图片适配窗口大小
    $('.img-bg-auto').each(function() {
        var w = windowW / 2;
        var imgw = 715; //默认该图片宽度
        var imgh = 734; //默认该图片高度
        // 宽高比
        if (w / windowH < imgw / imgh) {
            $(this).css({
                'width': 'auto',
                'height': windowH + 10 + 'px'
            });
        } else {
            $(this).css({
                'height': 'auto',
                'width': w + 10 + 'px',
                'left': '-5px'
            });
        }
    });

    //var loadtop=windowH/2-20;
    //$('body').append('<div id="loading" style="top:'+loadtop+'px;color:#000;font-size:18px;">loading...</div>');      
    $("body").ready(function() {
        //$('#loading').remove();
         page_yes.eq(0).show(); //显示索引为0 的第一屏
        $('body,.page.yes,.page .page-sub').height(windowH); //设置每一屏的高度为窗口高度，设置全屏
    });
    
    // 设置 window.m 来控制鼠标滚轮的滚动频率
    setTimeout(function() {
        window.m = 1;
    }, waittime);

    //滚动滚轮事件
    if(page_yes.length != 0){
        page_yes.mousewheel(function(event, delta) {
            event.stopPropagation();
            if (window.m == 1) {
                // delta = 1 时是鼠标向上滚动，delta = -1 时是鼠标向下滚动
                if (delta > 0) {
                    var ii = window.ii - 1;
                    if (ii == -1) {
                        ii = 0;
                    } else {
                        $.setprevgopage(ii);
                    };
                } else {
                    // 这里设置最后一屏的索引值
                    var ii = window.ii + 1;
                    if (ii == page_length) {
                        ii = page_last;
                    } else {
                        $.setnextgopage(ii);
                    };
                };

                // 存储当前屏的索引值
                window.ii = ii;

                // 设置每隔多少秒可以使用鼠标滚动换屏
                window.m = 0;
                setTimeout(function() {
                    window.m = 1;
                }, waittime)
            };
        });
    };
    
    // 向上滚动一屏
    $.setprevgopage = function(ii) {
        if (ii < 0) { //已经到达最后一屏的话，默认6屏
            window.ii = 0;
        } else {
            if (ii == 0) { //是第1屏的话，则显示顶部滚动条
                timeoutShow = setTimeout(function() {
                    //$.showTopNav();  /显示顶部滚动条
                    section_nav.fadeOut("slow"); //隐藏侧边栏导航
                }, 700);
            };
            $.gopage(ii, 2);
        };
        //执行换屏之后的动画
        $.showprevpage(ii);
    };

    // 向下滚动一屏
    $.setnextgopage = function(ii) {
        if (ii > 2) { //已经到达最后一屏的话，默认6屏
            window.ii = 2;
        } else {
            //是第2屏的话，则隐藏顶部滚动条
            if (ii == 1) {
                timeoutHide = setTimeout(function() {
                    //$.hideTopNav(); //隐藏顶部滚动条
                    section_nav.fadeIn("slow"); //显示侧边栏导航
                }, 700);

            };
            $.gopage(ii, 1);
        };
        //执行换屏之后的动画
        $.shownextpage(ii);
    };

    //动画函数
       $.gopage = function(ii, up) {

        // 设置全屏
        var showTime = 1000;
        if (window.innerHeight != undefined) {
            var windowW = window.innerWidth;
            var windowH = window.innerHeight;
        } else {
            var windowW = $(window).width();
            var windowH = $(window).height();
        };

        //防止同层点击
        if (window.m2 == 1) {
            if (up == 1) {
                var previi = ii - 1;
            } else {
                var previi = ii + 1;
            };
            clearTimeout(showTimes);

            page_yes.eq(ii).show();
            page_yes.eq(previi).show();

            //判断上下方向
            if (ii > previi) { //向下
                if (ii >= page_length) {  //已经到达最后一屏的话，默认6屏
                    
                    
                } else {
                    //判断是否到顶    ，取绝对定位的 top 值，如果 =0 ，则表示动画完成
                    var thisTop = page_yes.eq(previi).position().top;
                    if (thisTop == 0) {
                        // 索引值为1 的第二屏有更多的鼠标滚动动作，所以需要单独拿出来
                        page_yes.eq(ii).css({
                            'top': windowH + 'px',
                            'display': 'block'
                        });

                        setTimeout(function() {
                            page_yes.eq(previi).animate({
                                'top': -windowH + 'px'
                            }, showTime);

                            page_yes.eq(ii).animate({
                                'top': '0px'
                            }, showTime);
                        }, 300);
                    };
                };
            } else { //向上
                if (ii >= page_length) { //已经到达最后一屏的话，默认6屏
                    
                } else {
                    //判断是否到顶    
                    var thisTop = page_yes.eq(previi).position().top;
                    if (thisTop == 0) {
                        page_yes.eq(ii).css({
                            'top': -windowH + 'px',
                            'display': 'block'
                        });

                        setTimeout(function() {
                            page_yes.eq(previi).animate({
                                'top': windowH + 'px'
                            }, showTime);

                            page_yes.eq(ii).animate({
                                'top': '0px'
                            }, showTime);
                        }, 300);
                    };
                };
            };



            //第一屏时显示最顶部导航，其他屏时隐藏最顶部导航（0.6秒之后）
            // setTimeout(function() {
            //     if (ii == 0) {
            //         $('#topnav').animate({
            //             top: '40px'
            //         }, 500);
            //     };
            //     if (ii == 1) {
            //         $('#topnav').animate({
            //             top: '0px'
            //         }, 500);
            //     };
            // }, 600);



        }
    };

    // 显示下一屏之后执行的动作
    $.shownextpage = function(ii) {
        $.clear();
        var showTime = 1000;
        switch (ii) {
            case 0:
                // console.log(0);

                break;
            case 1:
                if (window.iii == 0) {
                    $.dingwei(showTime);
                };
                $.showmypage(0,0);
                window.nextEnd = false;
                window.prevEnd = false;
                break;
            case 2:
                var js_page_3 = $("#js-page-3");
                var js_page_3_h6 = $("#js-page-3 h6");
                var js_page_3_a = $("#js-page-3 a");
                var js_page_3_img = $("#js-page-3 img");

                js_page_3_h6.css('opacity', 0);
                js_page_3_a.css('opacity', 0);
                js_page_3_img.css('opacity', 0);

                setTimeout(function() {
                    js_page_3_img.animate({
                        opacity: 1
                    }, showTime);
                }, showTime);
                setTimeout(function() {
                    js_page_3_h6.animate({
                        opacity: 1
                    }, showTime);
                }, showTime * 1.5);

                setTimeout(function() {
                    js_page_3_a.animate({
                        opacity: 1
                    }, showTime)
                }, showTime * 1.8);

                $.shownextpage_case_2();

                window.nextEnd = false;
                window.prevEnd = false;
                break;
            case 3:
                break;
            case 4:
                break;    
        }
    };

    //显示上一屏之后执行的动作
    $.showprevpage = function(ii) {
        $.clear();
        var showTime = 1000;
        // 由于在
        if (ii == 0) {
            $.showprevpage_case_0();
        };
        switch (ii) {
            case 1:
                if(window.ii_sub == 1){
                    $.sub_2_1();
                }else if(window.ii_sub == 2){
                    $.sub_2_2();
                }else{
                    if (window.iii == 0) {
                        $.dingwei(showTime);
                    };
                };
                break;
            case 2:
                var js_page_3 = $("#js-page-3");
                var js_page_3_h6 = $("#js-page-3 h6");
                var js_page_3_a = $("#js-page-3 a");
                var js_page_3_img = $("#js-page-3 img");

                js_page_3_h6.css('opacity', 0);
                js_page_3_a.css('opacity', 0);
                js_page_3_img.css('opacity', 0);

                setTimeout(function() {
                    js_page_3_img.animate({
                        opacity: 1
                    }, showTime);
                }, showTime);
                setTimeout(function() {
                    js_page_3_h6.animate({
                        opacity: 1
                    }, showTime);
                }, showTime * 1.5);

                setTimeout(function() {
                    js_page_3_a.animate({
                        opacity: 1
                    }, showTime)
                }, showTime * 1.8);

                $.shownextpage_case_2();

                break;
            case 3:
                break;
            case 4:
                break;
        }
    };

    //书页动画翻页后执行的小动画
    $.showmypage = function(old, page, isLimit) {
        $.clear();
        var showTime = 1000;
        var index = page + 1;
        var box = $("#js-page-2 .s-page"+index);
        var box_h6 = box.find("h6");
        var box_p = box.find("p");
        var box_sm = box.find(".js-s-m");

        if(window.prevEnd)return;
        if(window.nextEnd)return;
        box_h6.css({'margin-top':'50px',"opacity":"0"});
        box_p.css({'margin-top':'-10px',"opacity":"0"});
        box_sm.css({"opacity":"0"});
        box_h6.animate({
            opacity: 1,
            marginTop: '60px'
        }, showTime * 0.8);
        setTimeout(function() {
            box_p.animate({
                opacity: 1,
                marginTop: '0px'
            }, showTime * 0.8);     
        }, 500);
        
        setTimeout(function() {
            box_sm.animate({
                opacity: 1
            }, showTime * 0.8,function(){
                switch (page) {
                    case 0:
                        //如果是返回到第一屏，则返回 
                        if (window.ii == 0) return;
                        $.dingwei(showTime);
                        break;
                    case 1:

                        $('.js-circle .right').css('transform', "rotate(0deg)");
                        $('.js-circle .left').css('transform', "rotate(0deg)");
                        $('.js-circle .js-circle-percent').text(0);
                        break;
                    case 2:
                        step_go();

                        break;
                    case 3:
                        $(".js-page-5-1").css('top', "40px").children(".column-img-5").css("left","0");

                        $('.js-circle .right').css('transform', "rotate(0deg)");
                        $('.js-circle .left').css('transform', "rotate(0deg)");
                        $('.js-circle .js-circle-percent').text(0);
                        break;
                    case 4:
                        $(".js-page-5-1").animate({
                            'top': "10px"
                        }, showTime, function() {
                            var that = this;
                            $(that).children(".column-img-3").addClass("animation");
                            setTimeout(function() {
                                $(that).children(".column-img-5").animate({left:"230px"},500);
                            }, 1000);
                            
                        });

                        break;
                    case 5:
                        $(".js-page-5-1").css('top', "40px").children(".column-img-5").css("left","0");
                        $("#js-page-2 .s-page7 .column-img-1").css("marginLeft","0");
                        $("#js-page-2 .s-page6 .column-img-2").addClass("animation");
                        $("#js-page-2 .s-page6 .column-img-3").addClass("animation");
                        $("#js-page-2 .s-page6 .column-img-4").addClass("animation");
                        break;
                    case 6:
                        
                        var a6_1 = $("#js-page-2 .s-page7 .column-img-1");
                        a6_1.animate({
                            marginLeft: "-50px"
                        }, showTime);
                        break;
                    case 7:
                        $("#js-page-2 .s-page7 .column-img-1").css("marginLeft","0");
                        $("#js-page-2 .s-page9 .column-img-2").removeClass("animation");

                        break;
                    case 8:
                        $("#js-page-2 .s-page9 .column-img-2").addClass("animation");
                        break;
                    case 9:
                        $("#js-page-2 .s-page9 .column-img-2").removeClass("animation");
                        break;
                    case 10:
                        break;
                }
            });    
        }, 800);

    };

    $.showprevpage_case_0 = function() {
        var showTime = 1000;
        $('#js-page1-word1,#js-page1-word2,#js-page1-hand,#js-page1-gm,#js-page1-cp,#js-page1-gd').css('opacity', 0);
        $('#js-page1-hand').css('bottom', '-80px');
        $('#js-page1-word1').css('top', '250px');
        $('#js-page1-word2').css('top', '326px');
        $('#js-page1-gm').css('top', '500px');

        setTimeout(function() {
            $('#js-page1-hand').animate({
                opacity: 1,
                'bottom': '-60px'
            }, showTime);
        }, showTime * 1.2);
        setTimeout(function() {
            $('#js-page1-gd').animate({
                opacity: 1
            }, showTime);
        }, showTime * 1.2);
        setTimeout(function() {
            $('#js-page1-cp').animate({
                opacity: 1,
                'bottom': '-60px'
            }, showTime);
        }, showTime * 1.2);
        setTimeout(function() {
            $('#js-page1-gm').animate({
                opacity: 1,
                'top': '478px'
            }, showTime);
        }, showTime * 1.2);
        setTimeout(function() {
            $('#js-page1-word1').animate({
                opacity: 1,
                'top': '276px'
            }, showTime / 2);
        }, showTime * 1.5);
        setTimeout(function() {
            $('#js-page1-word2').animate({
                opacity: 1,
                'top': '336px'
            }, showTime / 2);
        }, showTime * 1.8);
    };

    $.shownextpage_case_2 = function() {
        var showTime = 1000;
    };

    // 书页定位的动画
    $.dingwei = function(showTime) {
        $('#js-dingwei2-1,#js-dingwei2-2,#js-dingwei2-3,#js-dingwei2-4').animate({
            'opacity': 0.4
        }, 500);

        window.dingweiTime1 = setInterval(function() {
            $('#js-dingwei2-1,#js-dingwei2-4').css('opacity', 1);
            setTimeout(function() {
                $('#js-dingwei2-4').css('opacity', 0.4);
                $('#js-dingwei2-1').css('opacity', 1);
            }, 200);
            setTimeout(function() {
                $('#js-dingwei2-1').css('opacity', 0.4);
                $('#js-dingwei2-2').css('opacity', 1);
            }, 500);
            setTimeout(function() {
                $('#js-dingwei2-2').css('opacity', 0.4);
                $('#js-dingwei2-3').css('opacity', 1);
            }, 800);
            setTimeout(function() {
                $('#js-dingwei2-3').css('opacity', 0.4);
            }, 1000);
        }, 1200);
    };

    // 书页第3页 进度条
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // name has changed in Webkit
                window[vendors[x] + 'CancelRequestAnimationFrame'];
        };
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        };
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        };
    }());

    function step_go() {
        var circle_0 = $('.js-circle');
        window.circle_right = circle_0.find('.right');
        window.circle_left = circle_0.find('.left');
        window.circle_percent = $(".js-circle-percent");
        window.count = 0, window.end = 81;
        window.animateID = window.requestAnimationFrame(step);
    };

    function circle(num) {
        var deg = num * 3.6;
        if (deg <= 180) {
            window.circle_right.css('transform', "rotate(" + deg + "deg)");
        } else {
            window.circle_right.css('transform', "rotate(180deg)");
            window.circle_left.css('transform', "rotate(" + (deg - 180) + "deg)");
        };
        window.circle_percent.text(num);
    };

    function step() {
        circle(window.count);
        window.count = window.count + 1;
        window.animateID = window.requestAnimationFrame(step);
        if (window.count == window.end) {
            window.cancelAnimationFrame(window.animateID);
            window.count = 0;
        };
    };

    // 清除定时器
    $.clear = function() {
        // 清除翻页第1屏定时器
        clearInterval(window.dingweiTime1);
        window.cancelAnimationFrame(window.animateID);
    };


	// 动画显示顶部导航
    $.showTopNav = function() {
        if (navTopShown) {
            return;
        }
        navTopShown = true;

        div_top_nav.animate({
            top: 0
        }, 500);

    };

    // 动画隐藏顶部导航
    $.hideTopNav = function(delay) {
        if (!navTopShown) {
            return;
        };
        if (logoOver) {
            return;
        };
        navTopShown = false;

        div_top_nav.stop(true, true).animate({
            top: -51
        }, 500);
    };

    // 添加子page 页面鼠标滚轮事件
    //th 为事件对象，prev为前一屏索引，next为后一屏索引，fun为附带的
    $.subpageM = function(event, delta,th,prev,next,fun) {
        event.stopPropagation();
        // delta = 1 时是鼠标向上滚动，delta = -1 时是鼠标向下滚动
        if (window.m == 1) {
            // delta = 1 时是鼠标向上滚动，delta = -1 时是鼠标向下滚动
            if (delta > 0) {
                var ii_sub = window.ii_sub - 1;
                if (ii_sub == -1) {
                    ii_sub = 0;
                    //了解页面直接返回false
                    if(understand_length != 0){
					 	return false;
				    }else{
				    	$.setprevgopage(prev);
                   		window.ii = prev;
				    };
                } else {
                    $.setprevgoSubpage(ii_sub,th);
                    if(fun)fun.call(this,ii_sub);
                };
            } else {
                // 这里设置最后一屏的索引值
                var ii_sub = window.ii_sub + 1;
                if (ii_sub == pagesub_length) {
                    ii_sub = pagesub_last;
                    $.setnextgopage(next);
                    window.ii = next;
                } else {
                    $.setnextgoSubpage(ii_sub,th);
                    if(fun)fun.call(this,ii_sub);
                };
            };

            // 存储当前屏的索引值
            window.ii_sub = ii_sub;

            // 设置每隔多少秒可以使用鼠标滚动换屏
            window.m = 0;
            setTimeout(function() {
                window.m = 1;
            }, waittime)
        };
    };

    // 子page向上滚动
    $.setprevgoSubpage = function(ii,th) {
        var previi = ii + 1;
        setTimeout(function() {
            th.eq(previi).animate({
                'top': windowH + 'px'
            }, 800,function(){
                th.eq(previi).css({
                    'zIndex': '1'
                });
                th.eq(ii).css({
                    'zIndex': '10'
                });
            });
        }, 300);
    };

    // 子page向下滚动
    $.setnextgoSubpage = function(ii,th) {
        var previi = ii - 1;
        th.eq(ii).css({
            'top': windowH + 'px',
            'zIndex': '10'
        });
        setTimeout(function() {
            th.eq(previi).css({
                'zIndex': '1'
            });

            th.eq(ii).animate({
                'top': '0px'
            }, 800);
        }, 300);
    };

    // 第二个子page页面判断
    function sub_2(ii){
        var showTime = 1000;
        switch (ii) {
            case 0:
                window.nextEnd = false;
                window.prevEnd = false;
                break;
            case 1:
                $.sub_2_1();
                window.nextEnd = false;
                window.prevEnd = false;
                break;
            case 2:
                $.sub_2_2();
                window.nextEnd = false;
                window.prevEnd = false;
                break;
        }
    };

    $.sub_2_1 = function() {
        var showTime = 1000;
        $('#js-wacare .elem-2,#js-wacare .elem-3,#js-wacare .elem-4,#js-wacare .elem-5,#js-wacare .elem-6,#js-wacare .elem-7,#js-wacare .elem-8,#js-wacare .elem-9,#js-wacare .elem-10,#js-wacare .elem-11,#js-wacare .elem-12').css('opacity', 0);
        $('#js-ps2 h6').css('opacity', '0');
        $('#js-ps2 p').css('opacity', '0');
        setTimeout(function() {
            $('#js-wacare .elem-2').animate({
                opacity: 1
            }, showTime);
        }, showTime);
        setTimeout(function() {
            $('#js-ps2 p').animate({
                opacity: 1
            }, showTime / 2);
        }, showTime * 1.8);

        setTimeout(function() {
            $('#js-wacare .elem-8').animate({
                opacity: 1
            }, showTime)
        }, showTime * 2);
        setTimeout(function() {
            $('#js-wacare .elem-9').animate({
                opacity: 1
            }, showTime)

        }, showTime * 2.4);
        setTimeout(function() {
            $('#js-wacare .elem-10').animate({
                opacity: 1
            }, showTime)
        }, showTime * 2.8);
        setTimeout(function() {
            $('#js-wacare .elem-11').animate({
                opacity: 1
            }, showTime)
        }, showTime * 3.2);
        setTimeout(function() {
            $('#js-wacare .elem-12').animate({
                opacity: 1
            }, showTime)
        }, showTime * 3.6);

        setTimeout(function() {
            $('#js-wacare .elem-3').animate({
                opacity: 1
            }, showTime)
        }, showTime * 2.2);
        setTimeout(function() {
            $('#js-wacare .elem-4').animate({
                opacity: 1
            }, showTime)

        }, showTime * 2.4);
        setTimeout(function() {
            $('#js-wacare .elem-5').animate({
                opacity: 1
            }, showTime)
        }, showTime * 2.6);
        setTimeout(function() {
            $('#js-wacare .elem-6').animate({
                opacity: 1
            }, showTime)
        }, showTime * 3.0);
        setTimeout(function() {
            $('#js-wacare .elem-7').animate({
                opacity: 1
            }, showTime)
        }, showTime * 3.4);


        setTimeout(function() {
            $('#js-ps2 h6').animate({
                opacity: 1
            }, showTime / 2);
        }, showTime * 1.5);

    };

    $.sub_2_2 = function() {
        var showTime = 1000;
        var js_sub_5 = $("#js-ps3");
        var js_sub_5_H6 = $("#js-ps3 h6");
        var js_sub_5_img = $("#js-ps3 img");
        var js_sub_5_a = $("#js-ps3 a");

        js_sub_5_H6.css('opacity', 0);
        js_sub_5_img.css('opacity', 0);
        js_sub_5_a.css('opacity', 0);

        setTimeout(function() {
            js_sub_5_img.animate({
                opacity: 1
            }, showTime);
        }, showTime);
        setTimeout(function() {
            js_sub_5_H6.animate({
                opacity: 1
            }, showTime);
        }, showTime * 1.5);

        setTimeout(function() {
            js_sub_5_a.animate({
                opacity: 1
            }, showTime)
        }, showTime * 1.4);
    };

    // 给 #js-page-2 .page-sub 单独添加鼠标滚轮事件
    var page_sub_2 = $('#js-page-2 .page-sub');
    if(page_sub_2.length != 0){
        page_sub_2.mousewheel(function(event, delta) {
        	if(understand_length != 0){
			 	$.subpageM(event, delta,page_sub_2,0,1,sub_2);
		    }else{
		    	$.subpageM(event, delta,page_sub_2,0,2,sub_2);
		    };
        });
    };
    
    // 翻页效果
    var Page = (function() {
        var config = {
                $bookBlock: $('#bb-bookblock'),
                $navNext: $('#bb-nav-next'),
                $navPrev: $('#bb-nav-prev'),
                $navFirst: $('#bb-nav-first'),
                $navLast: $('#bb-nav-last')
            },
            init = function() {
                var bookblock1 = config.$bookBlock.bookblock({
                    speed: 800,
                    shadowSides: 0.8,
                    shadowFlip: 0.7,
                    onEndFlip : function(old, page, isLimit) { 
                        $.showmypage(old, page, isLimit);
                        return false;
                    },
                    onBeforeFlip : function(page) {
                        $("#js-page-2 .animation").removeClass("animation");
                        return false; 
                    }
                });

                initEvents();
                os();
            },
            initEvents = function() {

                var $slides = config.$bookBlock.children();

                // add navigation events
                config.$navNext.on('click touchstart', function() {
                    config.$bookBlock.bookblock('next');
                    return false;
                });

                config.$navPrev.on('click touchstart', function() {
                    config.$bookBlock.bookblock('prev');
                    return false;
                });

                config.$navFirst.on('click touchstart', function() {
                    config.$bookBlock.bookblock('first');
                    return false;
                });

                config.$navLast.on('click touchstart', function() {
                    config.$bookBlock.bookblock('last');
                    return false;
                });

                // add swipe events
                $slides.on({
                    'swipeleft': function(event) {
                        config.$bookBlock.bookblock('next');
                        return false;
                    },
                    'swiperight': function(event) {
                        config.$bookBlock.bookblock('prev');
                        return false;
                    }
                });

                // 添加键盘事件
                $(document).keydown(function(e) {
                    var keyCode = e.keyCode || e.which,
                        arrow = {
                            left: 37,
                            up: 38,
                            right: 39,
                            down: 40
                        };

                    switch (keyCode) {
                        case arrow.left:
                            if(window.ii != 1)return;
                            config.$bookBlock.bookblock('prev');
                            break;
                        case arrow.right:
                            if(window.ii != 1)return;
                            config.$bookBlock.bookblock('next');
                            break;
                        case arrow.up:
                            if (window.m == 1) {

                                var ii = window.ii - 1;
                                if (ii == -1) {
                                    ii = 0;
                                } else {
                                    $.setprevgopage(ii);
                                };

                                // 存储当前屏的索引值
                                window.ii = ii;

                                // 设置每隔多少秒可以使用鼠标滚动换屏
                                window.m = 0;
                                setTimeout(function() {
                                    window.m = 1;
                                }, waittime)
                            };
                            break;
                        case arrow.down:
                            if (window.m == 1) {

                                // 这里设置最后一屏的索引值
                                var ii = window.ii + 1;
                                if (ii == page_length) {
                                    ii = page_last;
                                } else {
                                    $.setnextgopage(ii);
                                };

                                // 存储当前屏的索引值
                                window.ii = ii;

                                // 设置每隔多少秒可以使用鼠标滚动换屏
                                window.m = 0;
                                setTimeout(function() {
                                    window.m = 1;
                                }, waittime)
                            };
                            break;
                    };

                });

                $('#js-sub-sections').mousewheel(function(event, delta) {
                    event.stopPropagation();
                    if (window.m == 1) {
                        // delta = 1 时是鼠标向上滚动，delta = -1 时是鼠标向下滚动
                        if (delta > 0) {
                        	if(understand_length != 0){
							 	return false;
						    }else{
						    	config.$bookBlock.bookblock('prev');
						    };
                        } else {
                            config.$bookBlock.bookblock('next');
                        };
                        // 设置每隔多少秒可以使用鼠标滚动换屏
                        window.m = 0;
                        setTimeout(function() {
                            window.m = 1;
                        }, waittime)
                    };
                });

            },
            os = function() {
                return config.$bookBlock.bookblock('isActive');
            };

        return {
            init: init, 
            os:os
        };

    })();

    var bb_bookblock = $("#bb-bookblock");

    if(bb_bookblock.length != 0){
        Page.init();
    };

    // 支持车型列表模板
    $.car = function() {
        $.ajax({
            url: './data/models.json',
            type: "GET",
            async: true, //转化为同步执行
            data: "ajaxtime=true",
            dataType: "json",
            success: function(data) {
                // 插入字符模板
                var models = data.models;

                var tpl =  $("#table-template").html();
                var divScroll = $("#divScroll");

                //预编译模板
                var template = Handlebars.compile(tpl);

                //匹配json内容
                var html = template(models);
                //输入模板
                divScroll.html(html);
                
                
                // 车型选择里设置滚动条
                divScroll.slimScroll({
                    height: '570px',
                    width: '958px',
                    railVisible: true,
                    railColor: '#f00'
                });

                // 添加锚点功能
                $.maodian = function(id) {
                    var dian = $("#" + id);
                    var prev = dian.prevAll();
                    var h = 0;
                    prev.each(function() {
                        h = h + $(this).height();
                    });
                    return h;
                };

                // 绑定锚点点击事件
                setTimeout(function() {
                    var elem_1_li = $("#js-page-5 .elem-1 li");
                    $("#js-page-5 .elem-1 a").each(function() {
                        var that = this;

                        var id = $(this).data("id");
                        var p = $(this).parent("li");

                        var t = $.maodian(id);

                        $(this).on({
                            click: function() {
                                divScroll.slimScroll({
                                    scrollTo: t
                                });
                                elem_1_li.find("strong").css({
                                    "color":"#000"
                                });
                                elem_1_li.removeClass("active");
                                p.addClass("active");
                            }
                        });
                    });
                    $("#js-page-5 .elem-2 a").each(function() {
                        var that = this;

                        var id = $(this).data("id");
                        var arr = id.split(""); //将字符串拆分成数组
                        var t1 = $.maodian(arr[0]);
                        var t2 = $.maodian(id);
                        var t3 = $("#" + arr[0]).find("thead").height();
                        var t4 = t1 + t2 + t3 - 1 ;

                        $(this).on({
                            click: function() {
                                divScroll.slimScroll({
                                    scrollTo: t4
                                });
                                elem_1_li.removeClass("active");
                                elem_1_li.find("strong").css({
                                    "color":"#00AAD2"
                                });
                            }
                        });
                    });
                }, 2000);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("请在线上测试");
            }
        });
    };

    var model = $("#js-models");

    if(model.length != 0){
        $.car();
    };
    
    
    //如果是了解页面，则执行的动作
    if(understand_length != 0){
		$.showmypage(0,0);
		$.dingwei();
    };
    
    
    
    
    


});
