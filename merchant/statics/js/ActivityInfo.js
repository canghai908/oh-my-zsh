/// <reference path="../jquery-1.4.2.min.js" />
/// <reference path="../ZeroClipboard.js" />
/// <reference path="../jquery.pagination.js" />
/*
    添加活动相关脚本
    创建者：顾晓成
    创建时间：2014-06-28
*/
var Manage = {
    QRCode: "",            //二维码路径
    StateStr: "Active",        //活动状态
    IsNew: "",                          //是否是新活
    pageSize: 5,                    //每页5条
    pageIndex: 1,                    //起始页
    RecordCount: 0,                    //总条数
    htmlDiv: "",                //html拼接变量
    html: "",
    objAll: "",                            //标签对象   
    clip: null,
    LinkName: "",
    ajax_url:"",
    // var clip = null;
    //ZeroClipboard.setMoviePath("/swf/ZeroClipboard.swf"),
    init: function (StateStr, isnew) {
        var leftMenu = $(".left_menu a");//获取菜单
        leftMenu[0].className = "menu_1";//设置class
        leftMenu[1].className = "menu_2  ml10 cur_2";//设置class 
        leftMenu[2].className = "menu_3 ml10";//设置class

        if (StateStr != "") {
            Manage.IsNew = isnew;                 //是否是创建的新活动
            Manage.StateStr = StateStr;            //活动状态
            if (Manage.StateStr == "Checking")              //如果是审核中    
            {
                $(".frame_subnav a").eq(1).addClass("Acolor");    //给第2个元素加上样式
                $(".frame_subnav a").eq(1).css("color", " #00a3e7");        //给第2个元素加上颜色
            }
            else if (Manage.StateStr == "Checked" || Manage.StateStr == "Started" || Manage.StateStr == "Active")         //如果是已激活或进行中
            {
                $(".frame_subnav a").eq(0).addClass("Acolor");    //给第1个元素加上样式
                $(".frame_subnav a").eq(0).css("color", " #00a3e7");        //给第1个元素加上颜色
            }
            else if (Manage.StateStr == "Save") {                                   //如果是暂存
                $(".frame_subnav a").eq(3).addClass("Acolor");    //给第4个元素加上样式
                $(".frame_subnav a").eq(3).css("color", " #00a3e7");        //给第4个元素加上颜色
            }
            else if (Manage.StateStr == "Over") {                                   //如果是已结束
                $(".frame_subnav a").eq(2).addClass("Acolor");    //给第3个元素加上样式
                $(".frame_subnav a").eq(2).css("color", " #00a3e7");        //给第3个元素加上颜色
            }
            else if (Manage.StateStr == "All") {                                   //如果是已结束
                $(".frame_subnav a").eq(4).addClass("Acolor");    //给第5个元素加上样式
                $(".frame_subnav a").eq(4).css("color", " #00a3e7");        //给第5个元素加上颜色
            }
        }
        else {
            $(".frame_subnav a").first().addClass("Acolor");    //给第一个元素加上样式
            $(".frame_subnav a").first().css("color", " #00a3e7");        //给第一个元素加上颜色
        }

        //提交审核
        $("#SubmitCheck").dialog({
            autoOpen: false,
            width: 700,
            height: 470,
            modal: true,
            draggable: true,
            title: "提示",
            dialogClass: 'pop_container  submit_tit '
        });

        //删除活动
        $("#divDelete").dialog({
            autoOpen: false,
            width: 700,
            height: 470,
            modal: true,
            draggable: false,
            title: "提示",
            dialogClass: 'pop_container  Delete '
        });

        $("#divReturn").dialog({
            autoOpen: false,
            width: 700,
            height: 470,
            modal: true,
            draggable: false,
            title: "提示",
            dialogClass: 'pop_container  return '
        });

        Manage.ActivityList(1, Manage.StateStr,Manage.ajax_url);                                      //加载页面
    },
    /// <summary>
    /// 加载活动
    /// </summary>
    /// <param name="obj">A标签对象</param>
    /// <param name="str">活动状态</param>
    /// <author>
    /// 顾晓成
    /// </author>
    /// <remarks>
    /// Description：
    /// Added Date：2014/6/25
    /// Modified By：
    /// Modified Date：
    /// Modified Reason：
    /// </remarks>
    ActivitiesState: function (obj, str) {
        Manage.objAll = obj;                       //A标签对象
        Manage.StateStr = str;                     //活动状态
        $(Manage.objAll).siblings().removeAttr("style");           //删除样式
        $(Manage.objAll).siblings().removeClass("Acolor");      //删除类
        $(Manage.objAll).addClass("Acolor");                               //添加样式
        $(Manage.objAll).css("color", "#00a3e7");                      //添加颜色
        Manage.ActivityList(1, Manage.StateStr,Manage.ajax_url);                                      //加载活动
    },
    /// <summary>
    /// 加载活动
    /// </summary>
    /// <param name="obj">A标签对象</param>
    /// <param name="str">活动状态</param>
    /// <author>
    /// 顾晓成
    /// </author>
    /// <remarks>
    /// Description：
    /// Added Date：2014/6/25
    /// Modified By：
    /// Modified Date：
    /// Modified Reason：
    /// </remarks>
    ActivityList: function (pageIndex, StateStr, ajax_url) {
        Manage.htmlDiv = "";                        //html拼接字符串置空
        $("#AllList").html("");         //活动列表置空
        //ajax函数
        $.ajax({
            type: 'GET',
            url: ajax_url,
            //async: false,
            //contentType: "application/x-www-form-urlencoded",
            data: { "StateStr": StateStr, "pageIndex": pageIndex },
            //evalJSON: false,
            //evalJS: false,
            cache: false,
            dataType:"json",
            success: function (data) {
                if (data != "") {
                    var list = data.list;
                    // var ManageViews = data.activityManageViews;        //活动试图
                    // var recordCount = data.pagerInfo.RecordCount;    //活动的记录数
                    
                    Manage.show(list);

                    $("#AllList").html(Manage.htmlDiv);   //HTML拼接赋值
                    var $list = $("#AllList .coupons");
                    $list.each(function (i, n) {
                        var $n = $(n);
                        if (list[i].state == "4") {
                            $n.find("div #divText").addClass("guild  jiesu_color");
                        }
                        else if (list[i].state == "1") {
                            $n.find("div #divText").addClass("guild shenghe_color");
                        }
                        else if (list[i].state == "2" || list[i].state == "3") {
                            $n.find("div #divText").addClass("guild jinxing_color");
                        }
                        else if (list[i].state == "5" || list[i].state == "6") {
                            $n.find("div #divText").addClass("guild zancun_color");
                        }
                    });
                    if ($.cookie("ismark") != undefined && $.cookie("ismark") != "null")         //如果Cookie存在
                    {
                        $(".coupons").eq(0).css("border", "2px solid #00A1E7");                     //给活动第一行突出显示
                        $.cookie("ismark", null, { path: "/" });                                                        //清除Cookie
                    }
                }
                else {
                    if (StateStr == "All") {            //如果是全部的就可以创建活动
                        Manage.htmlDiv = '<div id="divCreate" class="coupons add_coupons clearfix mt15"><a id="Create" href="Add">创建新活动</a></div>';
                        $("#AllList").html(Manage.htmlDiv);     //HTML拼接赋值
                        $("#divCreate").hover(function () {
                            $("#Create").addClass("cur_a");
                        }, function () {
                            $("#Create").removeClass("cur_a");
                        });

                        $("#Create").hover(function () {
                            $("#Create").addClass("cur_a");
                        });
                    }
                    else {
                        //如果不是全部的不能创建活动
                        Manage.htmlDiv = '<div  class="coupons add_coupons1 clearfix mt15">' +
                            '<a id="ActivitiesNull" style="width:300px;">暂无' + Manage.ConvertStr(StateStr) + '活动</a></div>';
                        $("#AllList").html(Manage.htmlDiv);     //HTML拼接赋值

                        $("#ActivitiesNull").hover(function () {
                            $(this).css("cursor", "default");
                        });
                    }
                };
                //如果是第一页
                // if (pageIndex == 1)
                //     //分页
                //     Manage.createPage(recordCount);
            }
        });
    },

    //已结束图片灰置
    imgLoaded: function (obj) {
        if ($(obj).data('isload') == '1') {
            return;
        }
        var activitystat = $(obj).data("activitystat");
        if (activitystat == "4") {
            $(obj).data('isload', '1');
            grayscale($(obj));
        }
    },


    LoadTitle: function (title) {
        if (title.length >= 40) {
            return title.substring(0, 39) + "..";   //截取0到39位
        }
        return title;
    },
    /// <summary>
    /// 立即撤回
    /// </summary>
    /// <param name="id">活动ID</param>
    /// <author>
    /// 顾晓成
    /// </author>
    /// <remarks>
    /// Description：
    /// Added Date：2014/6/25
    /// Modified By：
    /// Modified Date：
    /// Modified Reason：
    /// </remarks>
    ApplyReturn: function (id, userid) {
        html = '<div class="pop_bd pt80 mb80 bc">' +
                             '<div class="submit_cont clearfix">' +
                              '<img class="fl" src="./statics/images/system/tips.gif"/>' +
                             '<div class="fl txt_c">' +
                             ' <div>' +
                             '确定要撤回审核？<br />' +
                             '撤回审核后活动信息将移至“暂存”页中，您可以重新提交审核。' +
                             '</div>' +
                             '<div class="clearfix mt30">' +
                             '<input type="button" class="confirm mr10 fl" id="BtnApplyReturnOk">' +
                             '<input type="button" class="cancel fl" id="BtnApplyReturnNo">' +
                             '</div>' +
                             '</div>' +
                             '</div>' +
                             '</div>';
        //撤销弹出框
        $("#divReturn").html(html).dialog("open");
        //确定撤销
        $("#BtnApplyReturnOk").click(function () {
            //撤销弹出框关闭   
            $("#divReturn").dialog("close");
            $.ajax({
                url: "../Activity/ActivitiesApplyReturn",
                type: 'GET',
                async: false,
                contentType: "application/x-www-form-urlencoded",
                data: { "userid": userid, "ActivitieId": id, "State": "Checking" },
                evalJSON: false,
                evalJS: false,
                success: function (data) {
                    if (data == "True") {
                        alert("撤回成功");
                        if (Manage.StateStr == "All") {         //如果当前状态时所有活动
                            Manage.ActivityList(1, 'All', Manage.ajax_url);        //刷新所有活动方法
                        }
                        else {
                            Manage.ActivityList(1, 'Checking', Manage.ajax_url);        //刷新审核方法
                        }
                    }
                    else {
                        alert("撤回失败！请稍后再试！");
                    }
                }
            });
        });
        //立即撤回取消按钮
        $("#BtnApplyReturnNo").click(function () {
            //撤销弹出框关闭
            $("#divReturn").dialog("close");
        });
    },
    /// <summary>
    /// 提交审核
    /// </summary>
    /// <param name="id">活动ID</param>
    /// <author>
    /// 顾晓成
    /// </author>
    /// <remarks>
    /// Description：
    /// Added Date：2014/6/25
    /// Modified By：
    /// Modified Date：
    /// Modified Reason：
    /// </remarks>
    SubmitCheck: function (id, userid) {
        //ajax方法
        $.ajax({
            url: "../Activity/SubmitCheck",
            type: 'GET',
            async: false,
            contentType: "application/x-www-form-urlencoded",
            data: { "userid": userid, "ActivitieId": id },
            evalJSON: false,
            evalJS: false,
            success: function (data) {
                if (data == "True") {
                    html = '<div class="pop_bd pt80 mb80 bc">' +
                                        '<div class="submit_cont clearfix">' +
                                        '<img class="fl" src="../Images/wenj.png" />' +
                                        '<div class="fl txt_c">' +
                                        '<div class="pt20">您的活动申请已提交，我们会在24小时内完成审核，请注意查看邮箱通知。</div>' +
                                        '<input type="button" class="confirm mt40 ml220" />' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>';
                    //提交审核提示框弹出
                    $("#SubmitCheck").html(html).dialog("open");
                    //提交审核确定
                    $(".confirm").click(function () {
                        //关闭提交审核提示框
                        $("#SubmitCheck").dialog("close");
                    });
                    if (Manage.StateStr == "All") {
                        Manage.ActivityList(1, 'All',Manage.ajax_url);        //刷新所有活动
                    }
                    else {
                        Manage.ActivityList(1, 'Save',Manage.ajax_url);            //刷新暂存
                    }
                }
                else {
                    alert("提交失败！请稍后再试！");
                }
            }
        });
    },
    /// <summary>
    /// 状态转换成字符串
    /// </summary>
    /// <param name="id">活动ID</param>
    /// <author>
    /// 顾晓成
    /// </author>
    /// <remarks>
    /// Description：
    /// Added Date：2014/6/25
    /// Modified By：
    /// Modified Date：
    /// Modified Reason：
    /// </remarks>
    ConvertStr: function (state) {
        if (state == "1" || state == "Checking")
            return "审核中";
        else if (state == "2" || state == "Checked")
            return "进行中";
        else if (state == "3" || state == "Active")
            return "进行中"
        else if (state == "4" || state == "Over")
            return "已结束"
        else if (state == "6" || state == "Save")
            return "暂存"
        else if (state == "5" || state == "Return")
            return "驳回"
        else
            return "未知状态";
    },


    /// <summary>
    /// 标题图标大小转换
    /// </summary>
    /// <param name="path">图标路径</param>
    /// <author>
    /// 顾晓成
    /// </author>
    /// <remarks>
    /// Description：
    /// Added Date：2014/8/5
    /// Modified By：
    /// Modified Date：
    /// Modified Reason：
    /// </remarks>
    ShareIconPathStr: function (Path) {
        if (Path != "" && Path != null) {
            var start = Path.substr(0, Path.length - 4);
            return start + "_70" + Path.substr(Path.length - 4, 4);
        }
        else {
            return "";
        }
    },
    /// <summary>
    /// 编辑活动
    /// </summary>
    /// <param name="ActivitieId">活动ID</param>
    /// <param name="userid">用户ID</param>
    /// <author>
    /// 顾晓成
    /// </author>
    /// <remarks>
    /// Description：
    /// Added Date：2014/6/25
    /// Modified By：
    /// Modified Date：
    /// Modified Reason：
    /// </remarks>
    Detailed: function (merchant_id, id) {
        store.set('activitis', { 
            merchant_id: merchant_id, 
            id: id  
        });
        location.href = "/merchant/edit.html";           //跳转编辑活动页面
    },
    /// <summary>
    /// 删除暂存记录
    /// </summary>
    /// <param name="ActivitieId">活动ID</param>
    /// <author>
    /// 顾晓成
    /// </author>
    /// <remarks>
    /// Description：
    /// Added Date：2014/6/25
    /// Modified By：
    /// Modified Date：
    /// Modified Reason：
    /// </remarks>
    DeleteSave: function (ActivitieId, title) {
        html = '<div class="pop_bd mb80" style="padding-left:130px;padding-top:80px;">' +
                        '<div class="submit_cont clearfix">' +
                        '<img class="fl" src="./statics/images/system/delete_l.gif"/>' +
                        '<div class="fl txt_c">' +
                        '<div>' +
                        '确定要删除活动"' + title + '"？<br />' +
                        '删除后活动信息不可恢复。' +
                        '</div>' +
                        '<div class="clearfix mt30">' +
                         '<input type="button" class="confirm mr10 fl" id="BtnOk">' +
                         '<input type="button" class="cancel fl" id="BtnNo">' +
                            '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
        //删除对话框弹出
        $("#divDelete").html(html).dialog("open");

        //确定删除
        $("#BtnOk").click(function () {                    //删除对话框关闭
            $("#divDelete").dialog("close");
            $.ajax({
                url: "/merchant/promotion_delete?promotion_id="+ActivitieId,
                type: 'post',
                async: false,
                contentType: "application/x-www-form-urlencoded",
                dataType:"json",
                success: function (data) {
                    if (typeof(data) == "object") {
                        html = '<div class="pop_bd mb80 bc" style="padding-top:130px;">' +
                    '<div class="submit_cont clearfix">' +
                    '<img class="fl" src="./statics/images/system/wenj.png" />' +
                    '<div class="fl txt_c">' +
                    '<div class="pt20">删除成功！</div>' +
                    '<input type="button" class="confirm mt30" />' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                        $("#SubmitCheck").html(html).dialog("open");
                        $(".confirm").click(function () {
                            $("#SubmitCheck").dialog("close");
                        });
                        if (Manage.StateStr == "All") {
                            Manage.ActivityList(1, 'All',Manage.ajax_url);        //刷新所有活动
                        }
                        else {
                            Manage.ActivityList(1, 'Save',Manage.ajax_url);            //刷新暂存
                        }
                    }
                    else {
                        alert("删除成功！请稍后再试！");
                    }
                }
            });
        });
        // 关闭删除对话框弹出
        $("#BtnNo").click(function () {
            $("#divDelete").dialog("close");
        });
    },
    /// <summary>
    /// 获取推广链接
    /// </summary>
    /// <param name="ActivitieId">活动ID</param>
    /// <author>
    /// 顾晓成
    /// </author>
    /// <remarks>
    /// Description：
    /// Added Date：2014/6/25
    /// Modified By：
    /// Modified Date：
    /// Modified Reason：
    /// </remarks>
    GetLink: function (ActivitieId, Qrtype) {
        if (Qrtype == "Save") {
            //推广链接
            $("#popUp").dialog({
                autoOpen: false,
                width: 700,
                height: 480,
                modal: true,
                draggable: false,
                title: "活动链接",
                dialogClass: 'pop_container  link_tit ',
                close: function () {
                    Manage.clip.destroy();
                    //if (Manage.StateStr != "Active") {
                    //    $("a").siblings().removeAttr("style");           //删除样式
                    //    $("a").siblings().removeClass("Acolor");      //删除类
                    //    Manage.init("Active", "");
                    //}
                }
            });
        }
        else {
            //推广链接
            $("#popUp").dialog({
                autoOpen: false,
                width: 700,
                height: 480,
                modal: true,
                draggable: false,
                title: "推广链接",
                dialogClass: 'pop_container  link_tit ',
                close: function () {
                    Manage.clip.destroy();
                    //if (Manage.StateStr != "Active") {
                    //    $("a").siblings().removeAttr("style");           //删除样式
                    //    $("a").siblings().removeClass("Acolor");      //删除类
                    //    Manage.init("Active", "");
                    //}
                }
            });
        }

        html = '<div class="mainlist">' +
                          '<div class="pop_infor">' +
                          '<div class="clearfix">' +
                          ' <div class="fl ft_l l38">活动页网址</div>' +
                          ' <div class="fl">' +
                           '<input class="input" id="txtaddress" type="text" disabled="disabled"  readonly="readonly"/>' +
                          '<input class="pop_btn" id="btnCopy" type="button" onFocus="this.blur()"; />' +
                          '  <div class="l42 color_b7">可以将本网址嵌入微站，或直接发送给好友，进行传播</div>' +
                          ' </div>' +
                          ' </div>' +
                          ' <div class="clearfix">' +
                          '<div class="fl ft_l ">活动页二维码</div>' +
                          '<div class="fl">' +
                          '<div class="mb10"><img id="imgQr" src="./statics/images/system/code_erwei.png" /></div>' +
                          '<div><input   class="down_btn" type="button" onclick="Manage.Download();" /></div>';
                        if (Qrtype == "Save") {
                            html += '<div class="l30 color_b7">以上链接仅供集分享活动测试使用，活动未审核通过前，请勿传播</div>';
                        }
                        else {
                            html += '<div class="l30 color_b7">可将本二维码印到户外广告，嵌入网页等处，供网友浏览分享</div>';
                        }
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
        //推广链接弹出
                        $("#popUp").html(html).dialog("open");
        //ajax函数
        $.ajax({
            url: "./data/QrCode/QrCodeIcon/success.json",
            type: 'GET',
            async: false,
            contentType: "application/x-www-form-urlencoded",
            data: { "url": "www.baidu.com", "ActivitiesId": ActivitieId, "QrCodeTypeStr": Qrtype },
            evalJSON: false,
            evalJS: false,
            cache: false,
            success: function (data) {
                if (data != "0") {
                    var strs = new Array();     //创建数组
                    strs = data.split("|");         //分隔域名与二维码路径
                    QRCode = strs[0];               //二维码路径
                    $("#imgQr").attr("src", QRCode + '?v=' + Math.random());        //设置图片二维码
                    $("#txtaddress").val(strs[1]);              //域名赋值
                    Manage.clip = new ZeroClipboard.Client();
                    Manage.clip.setHandCursor(true);
                    Manage.clip.setText($("#txtaddress").val());           //域名复制
                    Manage.clip.glue("btnCopy");                                   //域名复制
                    Manage.clip.addEventListener("complete", function () {
                        alert("网址已复制到剪贴板！");
                    });
                }
                else {
                    alert("出现错误！请稍后再试！");
                }
            }
        });
        $("#btnCopy").blur();
        $("#divhover").hover(function () {
            $("#btnCopy").css("backgroundImage", "url(./statics/images/system/fuzhi_h.png)");

        }, function () {
            $("#btnCopy").css("backgroundImage", "url(./statics/images/system/fuzhi.png)");
        });
    },
    //效果分析
    EffectAnalysis: function (ActivityId) {
        location.href = "EffectAnalysis?activityId=" + ActivityId + "&state=" + Manage.StateStr + "";         //跳转效果分析页面
    },
    /// <summary>
    /// 下载二维码
    /// </summary>
    /// <author>
    /// 顾晓成
    /// </author>
    /// <remarks>
    /// Description：
    /// Added Date：2014/6/25
    /// Modified By：
    /// Modified Date：
    /// Modified Reason：
    /// </remarks>
    Download: function () {
        //跳转到控制器方法
        location.href = "/ActivitiesTools/GetFile?qrCodeName=" + QRCode + "";
    },
    /// <summary>
    /// 活动列表分页
    /// </summary>
    /// <param name="count">活动数</param>
    /// <author>
    /// 顾晓成
    /// </author>
    /// <remarks>
    /// Description：
    /// Added Date：2014/6/25
    /// Modified By：
    /// Modified Date：
    /// Modified Reason：
    /// </remarks>
    createPage: function (count) {
        if (count > Manage.pageSize) {
            $(".pagination").pagination(count, {
                callback: function (index) {
                    pageIndex = index + 1;
                    Manage.ActivityList(pageIndex, Manage.StateStr,Manage.ajax_url);
                },
                //prev_text: '上一页',       //上一页按钮里text
                //next_text: '下一页',       //下一页按钮里text
                items_per_page: Manage.pageSize,  //显示条数
                num_display_entries: 6,    //连续分页主体部分分页条目数
                current_page: 0,   //当前页索引
                num_edge_entries: 1,        //两侧首尾分页条目数
                prev_show_always: true,
                next_show_always: true
            });
        }
        else {
            $(".pagination").html("");          //清空分页
        }
    }
}