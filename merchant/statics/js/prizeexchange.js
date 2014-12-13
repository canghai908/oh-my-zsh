var prizeInfoId;
var prizeInfoNum = 0;
var PrizeCodeCost = "";
var IsFalse = true;
var IntNum = 1;
var prizeexchange = {
    prizeInfos: [],
    title: "",
    limitEndTime: "",
    authenticationbytext: function() {
        if (!IsFalse) {
            return
        }
        IsFalse = false;
        var A = $.trim($("#prizeskey").val());
        if (A == null || A == "" || A == "输入兑奖密码") {
            $("#divShow").css("display", "none");
            $("#submit_btn").css("display", "none");
            $("#change_password").css("height", "150px");
            $("#prompt").css("visibility", "visible");
            $("#prompt").html("请输入兑奖密码！");
            IsFalse = true
        } else {
            $("#prompt").css("visibility", "hidden");
            $("#prompt").html("");
            $("#div01").css("display", "block");
            $.ajax({
                url: "/merchant/prize_query",
                type: "get",
                cache: false,
                data: {
                    "prize_key": A
                },
                dataType:"json",
                success: function(D) {
                	console.log(D)
                    if (D.State == "无效") {
                        var B = '<div class="clearfix" style="margin-top:30px; font-size:14px;">';
                        B += '<div class="fl f_l_s">兑&nbsp;奖&nbsp;密&nbsp;码：</div>';
                        B += ' <div class="fl" style="margin-left:20px;width:270px;"><span class="fl">' + A + '</span><span class="fr shenghe_color" style="font-size:20px;">无&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;效</span> </div>';
                        B += "</div>";
                        $("#submit_btn").css("display", "none");
                        $("#divShow").css("display", "block");
                        $("#change_password").css("height", "350px");
                        $("#divShow").html(B);
                        IsFalse = true
                    } else {
                        if (D.State == "已领过奖") {
                            prizeexchange.title = D.Title;
                            var B = '<div class="clearfix">';
                            B += '<div class="fl f_l_s" style="width:100px;">兑 奖 密 码：</div>';
                            B += '<div class="fl" style="width:300px;"><span class="fl">' + A + '</span> <span class="fr shenghe_color" style="font-size:20px;">已领过奖</span></div><div>';
                            B += '<div class="clearfix">';
                            B += '<div class="fl f_l_s" style="width:100px;">参 与 活 动：</div>';
                            B += '<div class="fl">' + prizeexchange.title + "</div></div>";
                            B += ' <div class="clearfix">';
                            B += '<div class="fl f_l_s" style="width:100px;">已 兑 奖 品：</div>';
                            B += ' <div class="fl">' + D.PrizeContent + "</div></div>";
                            B += ' <div class="w420 mt10 clearfix"><div class="fl">该用户第<a class="red_color">' + D.prizeCout + '</a>次兑奖</div><a class="fr color_blue shareshowinfo" onclick="prizeexchange.showinfo(\'' + D.ShareId + "',0)\">查看会员信息</a></div>";
                            $("#submit_btn").css("display", "none");
                            $("#divShow").css("display", "block");
                            $("#change_password").css("height", "390px");
                            $("#divShow").html(B);
                            IsFalse = true
                        } else {
                            if (D.State == "活动已过期") {
                                prizeexchange.title = D.Title;
                                prizeexchange.limitEndTime = D.LimitEndTime;
                                var B = '<div class="clearfix">';
                                B += '<div class="fl f_l_s" style="width:100px;">兑 奖 密 码：</div>';
                                B += '<div class="fl" style="width:300px;"><span class="fl">' + A + '</span> <span class="fr shenghe_color" style="font-size:20px;">兑奖已结束</span></div><div>';
                                B += '<div class="clearfix">';
                                B += '<div class="fl f_l_s" style="width:100px;">参 与 活 动：</div>';
                                B += '<div class="fl">' + prizeexchange.title + "</div></div>";
                                B += ' <div class="clearfix">';
                                B += '<div class="fl f_l_s" style="width:100px;">活动结束日期：</div>';
                                B += ' <div class="fl">' + prizeexchange.limitEndTime + "</div></div>";
                                B += ' <div class="w420 mt10 clearfix"><div class="fl">该用户第<a class="red_color">' + D.prizeCout + '</a>次兑奖</div><a class="fr color_blue shareshowinfo" onclick="prizeexchange.showinfo(\'' + D.ShareId + "',0)\" >查看会员信息</a></div>";
                                $("#submit_btn").css("display", "none");
                                $("#divShow").css("display", "block");
                                $("#change_password").css("height", "390px");
                                $("#divShow").html(B);
                                IsFalse = true
                            } else {
                                if (D.State == "奖品已领完") {
                                    prizeexchange.title = D.Title;
                                    var B = '<div class="clearfix">';
                                    B += '<div class="fl f_l_s" style="width:100px;text-align:right;">兑&nbsp;&nbsp;奖&nbsp;&nbsp;密&nbsp;&nbsp;码：</div>';
                                    B += '<div class="fl" style="width:300px;"><span class="fl">' + A + '</span> <span class="fr shenghe_color" style="font-size:20px;">奖品已领完</span></div></div>';
                                    B += '<div class="clearfix" style="margin-top:50px;">';
                                    B += '<div class="fl f_l_s" style="width:100px;text-align:right;">参&nbsp;&nbsp;与&nbsp;&nbsp;活&nbsp;&nbsp;动：</div>';
                                    B += '<div class="fl">' + prizeexchange.title + "</div></div>";
                                    B += ' <div class="w420 mt10 clearfix" style="margin-top:20px;"><div class="fl">该用户第<a class="red_color">' + D.prizeCout + '</a>次兑奖</div><a class="fr color_blue shareshowinfo" onclick="prizeexchange.showinfo(\'' + D.ShareId + "')\">查看会员信息</a></div>";
                                    $("#submit_btn").css("display", "none");
                                    $("#divShow").css("display", "block");
                                    $("#change_password").css("height", "390px");
                                    $("#divShow").html(B);
                                    IsFalse = true
                                } else {
                                    prizeexchange.prizeInfos = D.prizeInfos;
                                    prizeexchange.title = D.Title;
                                    prizeexchange.limitEndTime = D.LimitEndTime;
                                    var B = '<div class="clearfix">';
                                    B += '<div class="fl f_l_s">兑奖密码：</div>';
                                    B += ' <div class="fl w345">';
                                    B += '<span class="fl">' + A + "</span>";
                                    B += ' <span class="fr shenghe_color">有效</span></div></div>';
                                    B += '<div class="clearfix">';
                                    B += ' <div class="fl f_l_s">参与活动：</div>';
                                    B += ' <div class="fl w345 f_t_r" style="height:auto;">' + prizeexchange.title + "</div></div>";
                                    B += '<div class="clearfix">';
                                    B += '<div class="fl f_l_s">可兑奖品：</div>';
                                    B += '<div class="fl w345 l30">';
                                    var C = prizeexchange.prizeInfos;
                                    B += ' <input type="button" name="choseRows" id="choseRows0" class="check_btn checked_btn" onclick="prizeexchange.btn_Click(' + 0 + "," + C.Id + ')"/>';
                                    B += '<label class="fl labRows ft_cor"  id="labRows0">' + C.PrizeContent + "</label>";
                                    prizeInfoId = C.Id;
                                    B += "</div> </div>";
                                    B += '<div class="w420 mt10 clearfix">';
                                    B += '<div class="fl">该用户第<a class="red_color">' + D.prizeCout + "</a>次兑奖</div>";
                                    if (D.IsvisitorDetailInfo) {
                                        B += '<a id="wzcolor_blue" class="fr color_gray " onclick="prizeexchange.showinfo(\'' + D.ShareId + "'," + IntNum + ')">查看会员信息</a></div>'
                                    } else {
                                        B += '<a class="fr color_blue" onclick="prizeexchange.showinfo(\'' + D.ShareId + "',0)\">查看会员信息</a></div>"
                                    }
                                    $("#divShow").css("display", "block");
                                    $("#submit_btn").css("display", "block");
                                    $("#change_password").css("height", "390px");
                                    $("#divShow").html(B);
                                    IsFalse = true
                                }
                            }
                        }
                    }
                }
            })
        }
    },
    redeem_prizes: function() {
        var A = $("#prizeskey").val();
        var B = prizeInfoId;
        if (PrizeCodeCost == A) {
            return
        }
        $.ajax({
            url: "/Prize/RedeemPrizes",
            type: "get",
            cache: false,
            data: {
                "PrizeCode": A,
                "prizeId": B
            },
            success: function(C) {
                if (C == true) {
                    $(".finish").css("display", "block");
                    $("#wzcolor_blue").removeClass("color_gray").addClass("color_blue");
                    IntNum = 0;
                    setTimeout(function() {
                        $(".finish").css("display", "none");
                        $("#divShow").css("display", "none");
                        $("#submit_btn").css("display", "none");
                        $("#change_password").css("height", "150px")
                    }, 3000);
                    PrizeCodeCost = A
                } else {}
            }
        })
    },
    btn_Click: function(C, D) {
        var B = document.getElementsByName("choseRows");
        for (var A = 0; A < B.length; A++) {
            if (A == C) {
                $(".check_btn").removeClass("checked_btn");
                $(".labRows").removeClass("ft_cor");
                $("#choseRows" + A).addClass("checked_btn");
                $("#labRows" + A).addClass("ft_cor");
                prizeInfoNum = A;
                prizeInfoId = D
            }
        }
    },
    Init: function() {
        $("#menu_prize").addClass("p_cur");
        $("#showdetails1").dialog({
            autoOpen: false,
            width: 600,
            height: 400,
            title: "会员详细",
            dialogClass: "pop_container",
            close: function(B, A) {
                addmorecount = 0;
                $("#showdetails1").empty()
            }
        })
    },
    showinfo: function(C, B) {
        if (B == 1) {
            return
        }
        var A = new Date();
        $("#showdetails1").load("/Prize/ShowInfo?id=" + C + "&date=" + Date.UTC(A.getYear(), A.getMonth(), A.getDate(), A.getHours(), A.getMinutes(), A.getSeconds()) + "", function() {
            var E = $(".tf_select[name='divmoretype']").length;
            var D = 420 + 36 * E + 10;
            if (E == 1) {
                D = 420
            }
            $("#showdetails1").dialog({
                height: D
            });
            $("#showdetails1").dialog("open")
        })
    }
};
