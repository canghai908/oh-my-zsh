/// <reference path="../jquery-1.8.2.js" />
/// <reference path="../jquery-ui-1.8.24.js" />
//创建线图处理方法
Highcharts.SparkLine = function (options, callback) {
    var defaultOptions = {
        chart: {
            renderTo: (options.chart && options.chart.renderTo) || this,
            backgroundColor: null,
            borderWidth: 0,
            type: 'line',
            margin: [10, 0, 0, 0],
            width: 154,
            height: 100,
            style: {
                overflow: 'visible'
            },
            skipClone: true
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        xAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                animation: false,
                lineWidth: 2,
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                marker: {
                    radius: 1,
                    states: {
                        hover: {
                            radius: 1
                        }
                    }
                },
                fillOpacity: 0.25
            },
            line: {
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: false
            }
        }
    };
    options = Highcharts.merge(defaultOptions, options);

    return new Highcharts.Chart(options, callback);
};


//创建饼图处理方法

Highcharts.SparkPie = function (options, callback) {
    var defaultOptions = {
        chart: {
            renderTo: (options.chart && options.chart.renderTo) || this,
            backgroundColor: null,
            borderWidth: 0,
            type: 'pie',
            margin: [5, 0, 0, 0],
            width: 186,
            height: 100,
            style: {
                overflow: 'visible'
            },
            skipClone: true
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        xAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                }
            }
        }
    };
    options = Highcharts.merge(defaultOptions, options);

    return new Highcharts.Chart(options, callback);
};


//总结，这里通过数据创建各种图
var summary = {
    LastSevenDaysViewCount: "",
    LastSevenDaysShareCount: "",
    NoGetPrizeCount: 0,//未兑奖人数
    TotalCanGetPrizeCount: 0,//总获奖数
    ExchangePrizeCount: 0,//已兑奖
    UsedCount: 0,
    SurplusCount: 0,
    init: function () {
        summary.getCurCount();

        $(".cur_p").hover(function () {
            $(".er_code").show();
        },
        function ()
        {
            $(".er_code").hide();
        });
        $("#menu_Sys").addClass("cur_1");
        //初始化线图
        //建立七天浏览量图表
        $("#viewCountChart").highcharts('SparkLine', {
            chart: {
                height: 90
            },
            series: [
			{
			    data: summary.LastSevenDaysViewCount,
			    pointStart: 1
			}]
        });

        //建立7天分享量趋势图
        $("#shareCountChart").highcharts('SparkLine', {
            chart: {
                height: 90
            },
            series: [{
                data: summary.LastSevenDaysShareCount,
                pointStart: 1
            }
            ]
        });


        //奖品情况饼图处理
        //判断未兑奖人数和已兑奖人数是否都为0
        if (summary.TotalCanGetPrizeCount == 0) {
            $("#prizeCountChart").html("");
        } else {
            $("#prizeCountChart").highcharts("SparkPie", {
                chart: {
                    marginLeft: 90
                },
                colors: ['#fff', '#EB6751', '#EB6751'],
                series: [
                    {
                        type: 'pie',
                        name: 'Browser share',
                        data: [
                            {
                                name: '未兑奖人数',
                                y: summary.NoGetPrizeCount,
                                sliced: true,
                                selected: true
                            },
                            ['已兑奖人数', summary.ExchangePrizeCount],
                            ['未领码人数', summary.TotalCanGetPrizeCount - (summary.ExchangePrizeCount + summary.NoGetPrizeCount)]
                        ]
                    }],
                tooltip: {
                    pointFormat: '<b>{point.y}</b>'
                }
            });
        }

        //活动饼图处理
        $("#activeCountChart").highcharts("SparkPie", {
            chart: {
                marginLeft: 90
            },
            colors: ['#fff', '#41C3A6'],
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    {
                        name: '已发起活动数',
                        y: summary.UsedCount,
                        sliced: true,
                        selected: true
                    },
                    ['剩余活动数', summary.SurplusCount]
                ]
            }],
            tooltip: {
                pointFormat: '<b>{point.y}个</b>'
            }
        });

        //帮助信息弹出框
        $("#showHelp").dialog({
            autoOpen: false,
            width: 600,
            minHeight: 300,
            maxHeight: 600,
            modal: true,
            title: "帮助信息",
            dialogClass: 'pop_container notice_tit'
        });
        //系统信息弹出框
        $("#showNoticeInfo").dialog({
            autoOpen: false,
            width: 600,
            minHeight: 300,
            maxHeight: 600,
            title: "系统通知",
            modal: true,
            dialogClass: 'pop_container notice_tit'
        });
        //二维码弹出框
        $("#showActivePic").dialog({
            autoOpen: false,
            width: 300,
            height: 350,
            title: "活动二维码",
            modal: true,
            dialogClass: 'pop_container'
        });
        //获取所有需要分三列格式化的数字
        var $divs = $("div[data-curcount]");
        var len = $divs.length;
        for (i = 0; i < len; i++) {
            summary.createNumber($divs[i]);
        }

        //10个活动显示处理
        var $divActives = $(".column");
        $divActives.each(function (i, n) {
            $(n).hover(function () {
                //鼠标移入,显示层
                $(n).find(".coupons_hover").show();
            }, function () {
                //鼠标移出,隐藏层
                $(n).find(".coupons_hover").hide();
            });
        });
    },
    //创建当前在线数字
    createNumber: function (obj) {
        var $div = $(obj);
        var stringdata = $div.data('curcount');
        var d = 0;
        var h = 0;
        var s = 0;
        var m = 0;
        if (stringdata >= 1000) {
            d = Math.floor(stringdata / 1000);
            h = Math.floor((stringdata % 1000) / 100);
            s = Math.floor((stringdata % 100)/10);
            m = stringdata % 10;
        }
        else if (stringdata >= 100) {
            h = Math.floor(stringdata / 100);
            s = Math.floor((stringdata % 100) / 10);
            m= stringdata % 10;
        }
       else  if (stringdata >= 10) {
            s = Math.floor((stringdata % 100) / 10);
            m = stringdata % 10;
        }
       else if (stringdata < 10) {
            m = stringdata % 10;
        }
        //console.log($div.find("span").length);
        if ($div.find("span").length == 0) {

            //无子对象，生成子对象
            var html = "";
            html = '<span class=" numbers_d">' + d + '</span>';
            html += '<span class=" numbers_h">' + h + '</span>';
            html += '<span class=" numbers_s">' + s + '</span>';
            html += '<span class=" numbers_m">' + m + '</span>';
            $div.html(html);
        } else {
            //获取所有span对象
            var $listSpan = $div.find("span");
            //循环对象，判断各对象的值，判断是否需要更改，从最后一个开始
            for (var i = $listSpan.length; i > 0; i--) {
                var $spanD = $($listSpan[i - 1]);
                //获取当前span值
                var d1 = $spanD.text();
                var val = s;
                var change = true;
                //根据当前所在位置，判断相关的值是否相等
                switch (i) {
                    case 3:
                        change = (d1 == s);
                        val = s;
                        break;
                    case 2:
                        change = (d1 == h);
                        val = h;
                        break;
                    case 1:
                        change = (d1 == d);
                        val = d;
                        break;
                }
                //判断是否需要变更。
                if (!change) {
                    //需要变更
                    $spanD.animate({ height: "0px", top: "25px" }, 80);
                    $spanD.text(val);
                    $spanD.animate({ height: "28px", top: "0px" }, 80);
                }
            }
        }
    },
    //获取当前浏览量和当前分享量
    getCurCount: function () {
        //var rand1 = parseInt(Math.random() * 999);
        //var rand2 = parseInt(Math.random() * 999);
        ////当前浏览量
        //$($(".numbers")[0]).data("curcount", rand1);
        //summary.createNumber($(".numbers")[0]);
        ////当前分享量
        //$($(".numbers")[1]).data("curcount", rand2);
        //summary.createNumber($(".numbers")[1]);
        //setTimeout(summary.getCurCount, 10000);

		//这个ajax请求会每隔1秒请求一次
        $.ajax({
            url: '/Sys/GetOnlineViewCountAndShareCount',
            type: 'get',
            dataType: 'json',
            cache: false,
            data: {
                rand: parseInt(Math.random() * 100)
            },
            success: function (data) {
                if (data != "") {
                    //当前浏览量
                    $($(".numbers")[0]).data("curcount", data.ViewCount);
                    summary.createNumber($(".numbers")[0]);
                    //当前分享量
                    $($(".numbers")[1]).data("curcount", data.ShareCount);
                    summary.createNumber($(".numbers")[1]);
                }

                setTimeout(summary.getCurCount, 1000);
            }
        });

    },
    //显示帮助信息
    showHelp: function (helpId, title) {
        //$("#showHelp").html(title).dialog("open");
        $.ajax({
            url: '/Sys/GetHelpInfo',
            type: 'get',
            dataType: 'json',
            cache: false,
            data: {
                id: helpId
            },
            success: function (data) {
                if (data != '') {
                    var html = '';
                    html += '<div class="pop_bd bc">';
                    html += '<h1 class="bd_tit2">' + data.Title + '</h1>';
                    html += '<div class="bd_cont">' + data.Content + '</div>';
                    html += '<div class="clearfix mb30"><a  href="javascript:void(0)" class="fr close_txt">关闭窗口</a></div>';
                    html += '</div>';

                    $("#showHelp").html(html).dialog("open");

                    $("#showHelp .close_txt").click(function () {
                        $("#showHelp").dialog("close");
                    });
                }
            }
        });

    },
    //显示系统系统信息
    showNoticeInfo: function (noticeId, date) {
        $.ajax({
            url: '/Sys/GetNoticeInfo',
            type: 'get',
            cache: false,
            data: {
                id: noticeId
            },
            success: function (data) {
                if (data != '') {
                    var html = '';
                    html += '<div class="pop_bd bc">';
                    html += '<h1 class="bd_tit2"><span class="pr10">' + date + '</span>' + data.Title + '</h1>';
                    html += '<div class="bd_cont">' + data.Content + '</div>';
                    html += '<div class="clearfix mb30"><a  href="javascript:void(0)" class="fr close_txt">关闭窗口</a></div>';
                    html += '</div>';

                    $("#showNoticeInfo").html(html).dialog("open");

                    $("#showNoticeInfo .close_txt").click(function () {
                        $("#showNoticeInfo").dialog("close");
                    });
                }
            }
        });
    },
    //显示二维码弹出框
    showActivePic: function (userId, activeId) {
        $.ajax({
            url: '/QrCode/GetActiveQrCode',
            type: 'get',
            dataType: 'json',
            cache: false,
            data: {
                userId: userId,
                activeId: activeId
            },
            success: function (data) {
                if (data != '') {
                    if (data != "0") {
                        var html = '<img src="' + data + '" id="imgQr">';
                        $("#showActivePic").html(html).dialog("open");
                    }
                    else {
                        alert("出现错误！请稍后再试！");
                    }
                }
            }
        });

    }
};


