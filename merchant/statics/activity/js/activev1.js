//活动主函数
var active = function (u, a, v, p, l, i, b, t) {
    this.visitor = v;
    this.parent = p;
    this.level = l;
    this.icon = i;
    this.baseUrl = b;
    this.title = t;
    var self = this;
    
    if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', function () { self.weixinReady.call(self); }, false);
    } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', function () { self.weixinReady.call(self); }, false);
        document.attachEvent('onWeixinJSBridgeReady', function () { self.weixinReady.call(self); });
    }
};
//活动状态
active.prototype.ActivityStat = {
    Started: 3,
    Over: 4
};
//活动规则公示点击事件
active.prototype.Publicity = function (content) {
    $('#divIconContainer').bind('click', function () {
        var isExpand = $(this).data('expand') == 'true';
        if (isExpand) {
            $(this).data('expand', 'false');
            $(this).children('.publicity_down').removeClass('publicity_up');
            $('#divPublicityInfo').slideUp(100);
        } else {
            $(this).data('expand', 'true');
            $(this).children('.publicity_down').addClass('publicity_up');
            if ($.trim($('#divPublicityInfo').html()) == '') {

                var html = '';
                html += '<ul class="publicity-expand">';
                html += '<li class="publicity-title">奖品设置</li>';
                var startDate = new Date(parseInt(content.start_datetime.substr(6)));
                var endDate = new Date(parseInt(content.end_datetime.substr(6)));
                $.each(content.prize_policy_array, function (i, n) {
                    html += '<li><span class="publicity-num">' + (i + 1) + '.</span>集 <b>' + n.condition_min + '</b> 个分享获 <b>' + n.prize + ' </b>' + (!n.IsLimitPrizeCount ? '' : '共' + n.total_number + '份') + '</li>';
                });
                html += '<li class="publicity-title publicity-topline">活动时间</li>';
                html += '<li>' + active.dateFormat(startDate) + ' — ' + active.dateFormat(endDate) + '</li>';
                html += '<li class="publicity-title publicity-topline">兑奖方法</li>';
                html += '<li>' + content.ExchangeMethod + '</li>';
                html += '<li class="publicity-title publicity-topline">咨询电话</li>';
                html += '<li>' + content.Phone + '<a href="tel:' + data.Phone + '" class="publicity-call"><span class="publicity-call-icon"></span> 直接拨打</a></li>';
                html += '</ul>';
                $('#divPublicityInfo').html(html).slideDown(100);
                    
            } else {
                $('#divPublicityInfo').slideDown(100);
            }
        }
    });
    $('#divHowContainer').bind('click', function () {
        var isExpand = $(this).data('expand') == 'true';
        if (isExpand) {
            $(this).data('expand', 'false');
            $(this).children('.publicity_down').removeClass('publicity_up');
            $('#divPublicityHow').slideUp(100);
        } else {
            $(this).data('expand', 'true');
            $(this).children('.publicity_down').addClass('publicity_up');
            if ($.trim($('#divPublicityHow').html()) == '') {
                var html = '';
                html += '<ul class="publicity-expand">';
                html += '<li class="clearfix"><div class="publicity-right publicity-pic-1"><span class="publicity-num">1.</span>累集分享个数</div></li>';
                html += '<li class="clearfix"><div class="publicity-left publicity-pic-2"><span class="publicity-num">2.</span>选择奖品</div></li>';
                html += '<li class="clearfix"><div class="publicity-right publicity-pic-3"><span class="publicity-num">3.</span>获得兑奖码</div></li>';
                html += '</ul>';
                $('#divPublicityHow').html(html);
            }
            $('#divPublicityHow').slideDown(100);
        }
    });
};
//活动日期格式化
active.dateFormat = function (date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    var hour = date.getHours();
    if (hour < 10) {
        hour = '0' + hour;
    }
    var minute = date.getMinutes();
    if (minute < 10) {
        minute = '0' + minute;
    }
    return year + '.' + month + '.' + day + ' ' + hour + ':' + minute;
};
//活动微信接口加载完成
active.prototype.weixinReady = function () {
    var self = this;
    WeixinJSBridge.on('menu:share:timeline', function () {
        WeixinJSBridge.invoke('shareTimeline', {
            'link': self.baseUrl + '?v=' + self.visitor + '&parent=' + self.parent + '&l=' + (parseInt(self.level) + 1),
            'img_url': self.icon,
            'desc': self.title,
            'title': self.title
        }, function (res) {
            if (res.err_msg == 'share_timeline:ok') {
                $.ajax({
                    url: '/activev1/StartShare',
                    type: 'post',
                    success: function (data) {
                        if (data == 'False_Contribution') {
                            $('#divContribution').modal('show');
                        } else if (data == 'False_ShareLimit') {
                            $('#divMalicious').modal('show');                            
                        }
                        var cookevalue = getCookie("isFirst2");
                        if (cookevalue == "")
                        {
                        	setCookie("isFirst2", "true", 10000);
                            $('#divFirstMark').modal('show');
                        }
                    }
                });
            }
        });
    });
    WeixinJSBridge.on('menu:share:appmessage', function () {
        WeixinJSBridge.invoke('sendAppMessage', {
            'link': self.baseUrl + '?v=' + self.visitor + '&parent=' + self.parent + '&l=' + self.level,
            'img_url': self.icon,
            'desc': self.title,
            'title': self.title
        });
    });
};
//加载集分享信息
active.prototype.loadInfo = function () {
    var self = this;
    $.ajax({
        url:"http://ifx.hi-www.com/activity/promotion_get",
        type: "GET",
        cache: false,
        dataType: "json",
        success: function(data) {
            var content = data.content;
            var share_url = data.share_url;  
            var userinfo = data.userinfo;
            var prize_list = data.prize_list;

            var thishtml = function (str) {
                return str ? str.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (m) {
                    return {
                        '&lt;':'<',
                        '&amp;':'&',
                        '&quot;':'"',
                        '&gt;':'>',
                        '&#39;':"'",
                        '&nbsp;':' '
                    }[m]
                }) : '';
            };

            // 填充页面内容
            self.title = content.title;
            $("#js-title").html(content.title);
            $("#js-ActivityPicPath").attr("src",content.ActivityPicPath);
            document.getElementById("js-Content").innerHTML = thishtml(content.Content); 
            var end_datetime = active.dateFormat(content.end_datetime);

            // 您已分享的代码部分
            var html = '';
            html += self.createShareHtml(self.visitor == self.parent, userinfo.share_num_by_self);
            html += self.createLightHtml(userinfo.share_num_by_self, userinfo.remain_share_num);
            html += self.createSurplusHtml(content.start_datetime == self.ActivityStat.Over, end_datetime);
            //html += self.createPrizeHtml(self.visitor == self.parent, activityInfo, visitorInfo);
            $('#divVisitor').html(html);
            self.bindSelect();
            self.bindExchange();
            self.BindRemind();
            self.Publicity(content);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
};
//生成分享数的html代码
active.prototype.createShareHtml = function (isSelf, shareCount) {
    return '<div class="v-share">' + (isSelf ? '您' : '该用户') + '已集<span class="v-share-count">' + shareCount + '</span>个分享</div>';
};
//生成电灯效果的html代码
active.prototype.createLightHtml = function (childrenShareCount, nextPrizeCount) {
    var html = '<div class="v-share-icon"><div class="v-share-icon-container">';
    if (nextPrizeCount == 0) {
        for (var i = 0; i < childrenShareCount; i++) {
            html += '<span class="v-share-light-color"></span>';
        }
    } else {
        for (var j = 0; j < nextPrizeCount; j++) {
            if (childrenShareCount > j) {
                html += '<span class="v-share-light-color"></span>';
            } else {
                html += '<span class="v-share-light-gray"></span>';
            }
        }
    }
    html += '</div></div>';
    return html;
};
//生成活动剩余时间的html代码
active.prototype.createSurplusHtml = function (isOver, leaveTime) {
    var html = '<div class="v-share-surplus">活动剩余时间：';
    if (isOver) {
        html += '<span class="visitor_over_time">0</span>天<span class="visitor_over_time">0</span>小时<span class="visitor_over_time">0</span>分钟';
    } else {
        html += leaveTime;
    }
    html += '</div>';
    return html;
};
//生成工活动奖品信息的html代码
active.prototype.createPrizeHtml = function (isSelf, activityInfo, visitorInfo) {
    var html = '';
    var self = this;
    if (isSelf) {
        if (visitorInfo.Abnormal=="异常") {
            html += '<div class="v-prize-code">';
            html += '您涉嫌采用非正常方式集分享数量，本次兑奖资格被取消，如需申诉请致电我公司法务部门，直线电话：0512-69373652';
            html += '</div>';
            return html;
        }
        if (visitorInfo.IsGetPrize) {
            html += '<div class="v-prize-code">';
            html += '<p>您已获得</p>';
            html += '<p>' + visitorInfo.GetPrizeInfo.PrizeContent + '</p>';
            html += '<p>领奖密码：' + visitorInfo.PrizeCode + '</p>';
            html += '</div>';
            return html;
        }
        if (activityInfo.ActivityStat == self.ActivityStat.Over) {
            html += '<div>';
            html += '<p>活动已结束</p>';
            html += '</div>';
            return html;
        }
    }
    html = '<div class="v-prize-get clearfix"><span class="v-prize-get-tip">' + (isSelf ? '您' : '该用户') + '已获得：</span>' + (isSelf ? '<a href="javascript:void(0);" class="v-prize-get-remind" id="btnRemind" data-loading-text="正在加载...">获奖提醒</a>' : '') + '</div>';
    var prizeInfos = activityInfo.PrizeInfos;
    var hasSet = false;
    var prizeTemps = [];
    for (var i = prizeInfos.length - 1; i >= 0; i--) {
        var prizeTempHtml = '';
        var isCanGetPrize = visitorInfo.ChildrenShareCount >= prizeInfos[i].ShareCount;
        var surplusPrizeCount = (prizeInfos[i].IsLimitPrizeCount ? '剩余' + prizeInfos[i].SurplusPrizeCount + '份' : '');
        if (prizeInfos[i].IsLimitPrizeCount) {
            isCanGetPrize = isCanGetPrize && prizeInfos[i].SurplusPrizeCount;
        }
        if (isSelf) {
            if (isCanGetPrize) {
                if (!hasSet) {
                    hasSet = true;
                    prizeTempHtml = '<ul class="v-prize-item-selected clearfix" data-id="' + prizeInfos[i].Id + '" data-name="' + prizeInfos[i].PrizeContent + '">'
						+ '<li class="v-prize-select-iconcontainer"><span class="v-prize-select-icon"></span></li>'
						+ '<li class="v-prize-item-name">' + prizeInfos[i].PrizeContent + '</li>'
						+ '<li class="v-prize-item-surplus">' + surplusPrizeCount + '</li>'
						+ '</ul>';
                    $('#lblPrize').html(prizeInfos[i].PrizeContent);
                } else {
                    prizeTempHtml += '<ul class="v-prize-item-unselect clearfix" data-id="' + prizeInfos[i].Id + '" data-name="' + prizeInfos[i].PrizeContent + '">'
						+ '<li class="v-prize-select-iconcontainer"><span class="v-prize-select-icon"></span></li>'
						+ '<li class="v-prize-item-name">' + prizeInfos[i].PrizeContent + '</li>'
						+ '<li class="v-prize-item-surplus">' + surplusPrizeCount + '</li>'
						+ '</ul>';
                }
            } else {
                prizeTempHtml += '<ul class="v-prize-item-disabled clearfix">'
					+ '<li class="v-prize-select-iconcontainer"><span class="v-prize-select-icon"></span></li>'
					+ '<li class="v-prize-item-name">' + prizeInfos[i].PrizeContent + '</li>'
					+ '<li class="v-prize-item-surplus">' + surplusPrizeCount + '</li>'
					+ '</ul>';
            }
        } else {
            if (isCanGetPrize && !hasSet) {
                hasSet = true;
                prizeTempHtml += '<ul class="v-prize-item-selected-disabled clearfix">'
					+ '<li class="v-prize-select-iconcontainer"><span class="v-prize-select-icon"></span></li>'
					+ '<li class="v-prize-item-name">' + prizeInfos[i].PrizeContent + '</li>'
					+ '<li class="v-prize-item-surplus">' + surplusPrizeCount + '</li>'
					+ '</ul>';
            } else {
                prizeTempHtml += '<ul class="v-prize-item-disabled clearfix">'
					+ '<li class="v-prize-select-iconcontainer"><span class="v-prize-select-icon"></span></li>'
					+ '<li class="v-prize-item-name">' + prizeInfos[i].PrizeContent + '</li>'
					+ '<li class="v-prize-item-surplus">' + surplusPrizeCount + '</li>'
					+ '</ul>';
            }
        }
        prizeTemps.push(prizeTempHtml);
    }
    for (var i = prizeInfos.length - 1; i >= 0; i--) {
        html += prizeTemps[i];
    }
    if (isSelf) {
        if (hasSet) {
            html += '<div><button type="button" id="v-prize-get-enable" class="btn-block v-prize-get-enable" data-toggle="modal" >立即兑奖</button></div>';
        } else {
            html += '<div><button type="button" class="btn-block v-prize-get-disable">立即兑奖</button></div>';
        }
    }
    return html;
};
//绑定奖品选择事件
active.prototype.bindSelect = function () {
    $('#divVisitor').on('click', '.v-prize-item-unselect', function () {
        $('#divVisitor .v-prize-item-selected').removeClass('v-prize-item-selected').addClass('v-prize-item-unselect');
        $(this).removeClass('v-prize-item-unselect').addClass('v-prize-item-selected');
        $('#lblPrize').html($(this).data('name'));
    });
    //绑定立即兑奖事件
    $('#v-prize-get-enable').on('click', function () {
        $.ajax({
            url: '/activev1/isAbnormal',
            type: 'post',
            dataType: 'text',
            data: { 'pid': $('#divVisitor .v-prize-item-selected').data('id') },
            success: function (data) {
                if (data == 'True') {
                    $('#divAbnormal').modal('show');
                }
                else {
                    $('#divExchange').modal('show');
                }
            }, error: function () {
                alert('服务器繁忙，请稍后再试');
            }
        });
    });
};

//绑定兑奖事件
active.prototype.bindExchange = function () {
    var self = this;
    $('#btnExchangeSubmit').bind('click', function () {
        var $button = $(this);
        $button.button('loading');
        $.ajax({
            url: '/activev1/StartExchange',
            type: 'post',
            dataType: 'text',
            data: { 'pid': $('#divVisitor .v-prize-item-selected').data('id') },
            success: function (data) {
                $button.button('reset');
                if (data == 'True') {
                    $('#divExchange').modal('hide');
                    self.loadInfo();
                }
            }, error: function () {
                $button.button('reset');
                alert('服务器繁忙，请稍后再试');
            }
        });
    });
};
//绑定提醒事件
active.prototype.BindRemind = function () {
    $('#btnRemind').bind('click', function () {
        var $button = $(this);
        $button.button('loading');
        $.ajax({
            url: '/activev1/GetNoticePhone',
            type: 'get',
            cache: false,
            dataType: 'text',
            success: function (data) {
                $button.button('reset');
                $('#divPhoneValidate').html('');
                $('#divRemind').modal('show');
                if (data == null || data == '') {
                    $('#divPhoneInput').show();
                    $('#divPhoneShow').hide();
                    $('#btnRemindSubmit').unbind('click').bind('click', function () {
                        var phone = $.trim($('#txtRemindPhone').val());
                        if (phone == '') {
                            $('#divPhoneValidate').html('请输入手机号码。');
                        } else if (!/^(?:1\d|1\d)\d{6}(\d{3}|\*{3})$/.test(phone)) {
                            $('#divPhoneValidate').html('手机号码格式不正确。');
                        } else {
                            $.ajax({
                                url: '/activev1/SetNoticePhone',
                                type: 'post',
                                dataType: 'text',
                                data: { 'phone': phone },
                                success: function (data) {
                                    if (data == 'True') {
                                        alert('提醒设置成功！');
                                    } else {
                                        alert('服务器繁忙，请尝试刷新本页后重新再试！');
                                    }
                                    $('#divRemind').modal('hide');
                                }
                            });
                        }
                    });
                } else {
                    data = $.parseJSON(data);
                    $('#divPhoneInput').hide();
                    $('#divPhoneShow').show();
                    $('#txtPhone').val(data.Phone);
                    $('#spanDelPhone').unbind('click').bind('click', function () {
                        $.ajax({
                            url: '/activev1/DelNoticePhone',
                            type: 'post',
                            dataType: 'text',
                            data: { nid: data.Id },
                            success: function (data) {
                                if (data == 'True') {
                                    $('#txtRemindPhone').val('');
                                    $('#divPhoneInput').show();
                                    $('#divPhoneShow').hide();
                                    $('#divPhoneValidate').html('');
                                }
                            }
                        });
                    });
                }
            },
            error: function () {
                $button.button('reset');
                alert('服务器繁忙，请稍后再试！');
            }
        });
    });
};

//读取cookie
getCookie = function(cookiename) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(cookiename + "=");
		if (c_start != -1) {
			c_start = c_start + cookiename.length + 1;
			var c_end = document.cookie.indexOf(";", c_start);
			if (c_end != -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
		return "";
	}
	return "";
};

//写cookie
setCookie = function (cookiename, value, expiredays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cookiename +"="+ escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
        
}