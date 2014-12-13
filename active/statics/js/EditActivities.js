var awardsCount = 1;
var allowCount = 5;
var editactivitie = {
    preTitle_pyqdefault: "慕斯十周年首发积【攒】，满30个可获得免费慕斯抱枕。",
    pretitledefault: "微信观看imax《超凡蜘蛛侠2》仅要20元",
    preIcondefault: "/Images/pic_1.png",
    preActivityPicdefault: "/Images/pic_2.png",
    preContentdefault: "关注全城国际微信满一个月或将此条微信在朋友圈即日起一个月内集齐38个赞，即送价值580元贵宾卡一张，欢迎回复资讯！",
    prebgcolors: ["#FFFFFF", "#F7F7F7", "#DCDCDC", "#DCF2F8", "#F7F2CF", "#F8ECDC", "#F3D4D4"],
    actId: "",
    userid: "",
    title: "",
    shareIco: "",
    actImg: "",
    bgcolor: "#FFFFFF",
    bgImage: "",
    bgImageIsrepeat: "true",
    bgImage_temp: "",
    content: "",
    starttime: "",
    endtime: "",
    prizes: [],
    actsatte: "",
    exMethod: "",
    phone: "",
    allowsdmax: new Date(),
    allowedmax: new Date(),
    description: "",
    effectTime: "",
    purl: "",
    ise: "",
    titleblur: function() {
        var A = $.trim($("#activityTitle").val());
        if (A.length > 29) {
            A = A.substr(0, 29) + "..."
        }
        $(".right_cont #preTitle").text(A);
        $(".right_cont #preTitle_pyq").text(A)
    },
    titlefocus: function() {
        $("#titleWarning").hide()
    },
    AddAwards: function(H, C, F, E, B, A) {
        awardsCount++;
        if (awardsCount > allowCount) {
            awardsCount = allowCount;
            return
        }
        var I = editactivitie.UpCaseNum(awardsCount);
        var D = '<div id="award' + awardsCount + '" class="fl" style="margin-top:15px; margin-left:82px;"><div class="prize_setting f_w_n relative"><div class="h30 l30 fb mb5 clearfix"> <span id="awardTitle' + awardsCount + '" class="fl">奖项' + I + '：</span><a id="removeAward' + awardsCount + '" href="javascript:editactivitie.RemoveAwards(' + awardsCount + ')" class="off_icon fr"></a></div><div class="h30 l30 mb10">满&nbsp;<input id="pri_ShareCount' + awardsCount + '" style="ime-mode:disabled" onkeyup="editactivitie.pri_ShareCountkeyup(this)" onfocus="editactivitie.pri_infoFocus(' + awardsCount + ')" class="select_txt w45 mr5 border_style" type="text" maxlength="3" value="' + C + '" />个分享，获<input id="pri_Content' + awardsCount + '" onfocus="editactivitie.pri_infoFocus(' + awardsCount + ')" onblur="editactivitie.pri_infoblur(' + awardsCount + ')" class="select_txt w165 ml5 border_style" type="text" maxlength="20" value="' + F + '" /></div><div class="h30 l30 clearfix"><span class="fl">奖品数量&nbsp;</span><input id="pri_Count' + awardsCount + '" style="ime-mode:disabled" onfocus="editactivitie.pri_infoFocus(' + awardsCount + ')" onblur="editactivitie.pri_infoblur(' + awardsCount + ')" class="select_txt w70 fl ml5 border_style2" type="text" maxlength="3" value="' + B + '"/><input type="hidden" value="' + B + '" /><span class="fl">&nbsp;份</span><input id="pri_id' + awardsCount + '" type="hidden" value="' + H + '" /></div>'+'<div class="h30 l30 clearfix"><span class="fl">分享周期&nbsp;</span><input id="pri_zhouqi'+awardsCount+'" style="ime-mode: disabled" onfocus="addactivities.pri_infoFocus('+awardsCount+')" onblur="addactivities.pri_infoblur('+awardsCount+')" class="select_txt w70 fl ml5  border_style2" type="text" value="" maxlength="3" /><span class="fl">&nbsp;小时</span></div><div id="pri_Warning' + awardsCount + '" style="display:none;left: 345px;" class="warning">请设置奖项</div></div></div>';
        $("#Awards").append(D);
        editactivitie.numOnly("pri_ShareCount" + awardsCount);
        editactivitie.numOnly("pri_Count" + awardsCount);
        if (awardsCount >= allowCount) {
            $("#addMoreAwards").css("display", "none")
        }
        var G = '<p class="prize_radio_disabled mb10 clearfix" id="preprize' + awardsCount + '" style="display:none"><span class="unselect"></span><span class="prize_word">' + F + '</span><span class="prize_surplus">剩余' + B + "份</span></p>";
        $("#prepriInfo").before(G);
        if (A) {
            $("#pri_ShareCount" + awardsCount).focus();
            $("html, body").animate({
                scrollTop: $("#pri_ShareCount" + awardsCount).offset().top - 200
            }, 300)
        } else {
            editactivitie.pri_infoblur(awardsCount)
        }
    },
    RemoveAwards: function(A) {
        $("#award" + A).hide(200, function() {
            $("#award" + A).remove();
            for (var B = A + 1; B <= awardsCount; B++) {
                $("#award" + B).attr("id", "award" + (B - 1));
                var C = editactivitie.UpCaseNum(B - 1);
                $("#awardTitle" + B).text("奖项" + C + "：");
                $("#awardTitle" + B).attr("id", "awardTitle" + (B - 1));
                $("#removeAward" + B).attr("href", "javascript:editactivitie.RemoveAwards(" + (B - 1) + ")");
                $("#removeAward" + B).attr("id", "removeAward" + (B - 1));
                $("#pri_ShareCount" + B).attr("onfocus", "editactivitie.pri_infoFocus(" + (B - 1) + ")");
                $("#pri_Content" + B).attr("onfocus", "editactivitie.pri_infoFocus(" + (B - 1) + ")");
                $("#pri_Count" + B).attr("onfocus", "editactivitie.pri_infoFocus(" + (B - 1) + ")");
                $("#pri_Content" + B).attr("onblur", "editactivitie.pri_infoblur(" + (B - 1) + ")");
                $("#pri_Count" + B).attr("onblur", "editactivitie.pri_infoblur(" + (B - 1) + ")");
                $("#preprize" + B).attr("id", "preprize" + (B - 1));
                $("#pri_ShareCount" + B).attr("id", "pri_ShareCount" + (B - 1));
                $("#pri_Content" + B).attr("id", "pri_Content" + (B - 1));
                $("#pri_Warning" + B).attr("id", "pri_Warning" + (B - 1));
                $("#pri_Count" + B).attr("id", "pri_Count" + (B - 1));
                $("#pri_id" + B).attr("id", "pri_id" + (B - 1))
            }
            awardsCount--;
            if (awardsCount < allowCount) {
                $("#addMoreAwards").css("display", "block")
            }
            $("#preprize" + A).remove()
        })
    },
    UpCaseNum: function(B) {
        var A = "";
        switch (B) {
            case 1:
                A = "一";
                break;
            case 2:
                A = "二";
                break;
            case 3:
                A = "三";
                break;
            case 4:
                A = "四";
                break;
            case 5:
                A = "五";
                break;
            case 6:
                A = "六";
                break;
            case 7:
                A = "七";
                break;
            case 8:
                A = "八";
                break;
            case 9:
                A = "九";
                break;
            case 10:
                A = "十";
                break
        }
        return A
    },
    pri_infoFocus: function(A) {
        $("#pri_Warning" + A).hide()
    },
    pri_ShareCountblur: function(B) {
        if (B == "" || B == 0) {
            $(".right_cont .share_icon").hide();
            return
        }
        $(".right_cont .share_icon").html("");
        for (var A = 0; A < B; A++) {
            $(".right_cont .share_icon").append(' <img class="icon" src="/images/zan.png" alt="" /> ')
        }
        $(".right_cont .share_icon").show()
    },
    pri_ShareCountkeyup: function(A) {},
    pri_infoblur: function(B) {
        var A = $.trim($("#pri_Content" + B).val());
        var C = "限定";
        var D = $.trim($("#pri_Count" + B).val());
        if (A != "") {
            if (C == "限定" && D != "") {
                $("#preprize" + B + " span:eq(1)").text(A);
                $("#preprize" + B + " span:eq(2)").text("剩余" + D + "份");
                $("#preprize" + B).show()
            } else {
                if (C == "不限定") {
                    $("#preprize" + B + " span:eq(1)").text(A);
                    $("#preprize" + B + " span:eq(2)").text("");
                    $("#preprize" + B).show()
                } else {
                    $("#preprize" + B).hide()
                }
            }
        } else {
            $("#preprize" + B).hide()
        }
    },
    uploadshareIco: function(token) {
        $("#filePic").uploadify({
            fileObjName: 'file',
            formData: {
                'token': token //Token
            },
            uploader: 'http://up.qiniu.com/',
            method: 'POST',
            swf: "./uploadify/uploadify.swf",
            buttonClass: "shareupbtn",
            buttonCursor: "point",
            buttonText: "",
            hideButton: true,
            queueID: "shareupque",
            height: 30,
            width: 92,
            multi: false,
            fileSizeLimit: 5120,
            fileTypeExts: "*.jpg;*.jpeg;*.png;*.gif",
            onSelect: function(file) {
                filename = file.name;
                $('#filePic').uploadify('settings', 'formData', {
                        "key": filename
                    }) //上传文件的名称
            },
            onInit: function() {
                $("#filePic .swfupload").css("z-index", "1001")
            },
            onUploadSuccess: function(A, abB) {
                var bB = eval("(" + abB + ")");
                var B = "http://zf668.qiniudn.com/" + bB.key;
                if (B) {

                    if ($(".jcrop-holder").length > 0) {
                        $(".jcrop-holder").remove();
                        $.Jcrop("#imgPic").destroy();
                        $("#imgPic").hide()
                    }
                    $("#imgPic").attr("src", B);
                    $("#precutview70").attr("src", B);
                    $("#precutview40").attr("src", B);
                    $("#precutview70").show();
                    $("#precutview40").show();
                    $("#imgPic").Jcrop({
                        minSize: [40, 40],
                        setSelect: [0, 0, 70, 70],
                        aspectRatio: 1,
                        allowSelect: false,
                        keySupport: false,
                        onChange: editactivitie.updatePreview,
                        onSelect: editactivitie.updatePreview
                    }, function() {
                        var C = $(".jcrop-holder").height();
                        var F = $(".jcrop-holder").width();
                        var E = ((300 - C) > 0 ? (300 - C) : 0) / 2;
                        var D = ((300 - F) > 0 ? (300 - F) : 0) / 2;
                        $(".jcrop-holder").css({
                            "margin-top": E + "px",
                            "margin-left": D + "px"
                        })
                    })
                }
            },
            onSelectError: function(C, B, A) {
                switch (B) {
                    case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                        this.queueData.errorMsg = "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
                        break;
                    case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                        this.queueData.errorMsg = "图片大小不能超过5M";
                        break;
                    case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                        this.queueData.errorMsg = "文件大小为0";
                        break;
                    case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                        this.queueData.errorMsg = "文件格式不正确，仅限 " + this.settings.fileTypeExts;
                        break;
                    default:
                        this.queueData.errorMsg = "错误代码：" + B + "\n" + A
                }
            }
        })
    },
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    updatePreview: function(C) {
        editactivitie.updateCoords(C);
        if (parseInt(C.w, 10) > 0) {
            var A = 70 / C.w;
            var B = 70 / C.h;
            $("#precutview70").css({
                width: Math.round(A * $("#imgPic").width()) + "px",
                height: Math.round(B * $("#imgPic").height()) + "px",
                marginLeft: "-" + Math.round(A * C.x) + "px",
                marginTop: "-" + Math.round(B * C.y) + "px"
            })
        }
        var A = 40 / C.w;
        var B = 40 / C.h;
        $("#precutview40").css({
            width: Math.round(A * $("#imgPic").width()) + "px",
            height: Math.round(B * $("#imgPic").height()) + "px",
            marginLeft: "-" + Math.round(A * C.x) + "px",
            marginTop: "-" + Math.round(B * C.y) + "px"
        })
    },
    updateCoords: function(A) {
        editactivitie.x = A.x;
        editactivitie.y = A.y;
        editactivitie.w = A.w;
        editactivitie.h = A.h
    },
    shareIconcut: function() {
        if ($("#imgPic").attr("src") == "") {
            return
        }
        if (editactivitie.w <= 0 || editactivitie.h <= 0) {
            alert("请先选择裁剪区域");
            return
        }

        //配置七牛的裁剪图片地址
        //http://qiniuphotos.qiniudn.com/gogopher.jpg?imageMogr/v2/crop/!300x300a30a100
        var picurl = $("#imgPic").attr("src"),
            x = addactivities.x,
            y = addactivities.y,
            w = addactivities.w,
            h = addactivities.h;

        var icon_url = picurl + "?imageMogr/v2/crop/!" + w + "x" + h + "a" + x + "a" + y;
        //保存 “favicon_url”
        $("#shareIcon").hide();
        $("#uploadSuccShareIco").attr("src", icon_url);
        $(".right_cont #preShareIco").attr("src", icon_url);
        $("#uploadSuccShare").show();
        editactivitie.shareIco = icon_url;
        $("#shareModal").dialog("close");
        $("#ShareIcoWarning").hide();
    },
    DelShareIco: function() {
        $("#uploadSuccShareIco").removeAttr("src");
        $("#uploadSuccShare").hide();
        $("#delShareIco").hide();
        $("#shareIcon").show();
        $("#preShareIco").attr("src", editactivitie.preIcondefault);
        editactivitie.shareIco = ""
    },
    uploadActivityPic: function(token) {
        $("#upActivityPic").uploadify({
            fileObjName: 'file',
            formData: {
                'token': token //Token
            },
            uploader: 'http://up.qiniu.com/',
            method: 'POST',
            swf: "./uploadify/uploadify.swf",
            buttonClass: "active_btn",
            buttonCursor: "point",
            buttonText: "",
            hideButton: true,
            auto: true,
            queueID: "actimgupque",
            height: 152,
            width: 290,
            multi: false,
            fileSizeLimit: 5120,
            fileTypeExts: "*.jpg;*.jpeg;*.png;*.gif",
            onSelect: function(file) {
                filename = file.name;
                $('#upActivityPic').uploadify('settings', 'formData', {
                        "key": filename
                    }) //上传文件的名称
            },
            onUploadSuccess: function(A, abB) {
                var bB = eval("(" + abB + ")");
                var B = "http://zf668.qiniudn.com/" + bB.key;
                if (B) {
                    $("#uploadSuccShowPic").attr("src", B);
                    $("#preActivityPic").attr("src", B);
                    editactivitie.actImg = B;
                    $("#activityPicWarning").hide();
                    setTimeout(function() {
                        $("#upActivityPic").hide();
                        $("#uploadSuccShow").show()
                    }, 100)
                }
            },
            onSelectError: function(C, B, A) {
                switch (B) {
                    case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                        this.queueData.errorMsg = "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
                        break;
                    case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                        this.queueData.errorMsg = "图片大小不能超过5M";
                        break;
                    case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                        this.queueData.errorMsg = "文件大小为0";
                        break;
                    case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                        this.queueData.errorMsg = "文件格式不正确，仅限 " + this.settings.fileTypeExts;
                        break;
                    default:
                        this.queueData.errorMsg = "错误代码：" + B + "\n" + A
                }
            }
        })
    },
    DelActivityPic: function() {
        $("#uploadSuccShowPic").removeAttr("src");
        $("#uploadSuccShow").hide();
        $("#upActivityPic").show();
        $("#preActivityPic").attr("src", editactivitie.preActivityPicdefault);
        editactivitie.actImg = ""
    },
    uploadbgimagePic: function(token) {
        $("#upbgimg").uploadify({
            fileObjName: 'file',
            formData: {
                'token': token //Token
            },
            uploader: 'http://up.qiniu.com/',
            method: 'POST',
            swf: "./uploadify/uploadify.swf",
            buttonClass: "upload",
            buttonCursor: "point",
            buttonText: "",
            multi: false,
            auto: true,
            hideButton: true,
            queueID: "bgimgupque",
            width: 92,
            height: 30,
            fileSizeLimit: 5120,
            fileTypeExts: "*.jpg;*.jpeg;*.png;*.gif",
            onSelect: function(file) {
                filename = file.name;
                $('#upbgimg').uploadify('settings', 'formData', {
                        "key": filename
                    }) //上传文件的名称
            },
            onInit: function() {},
            onUploadSuccess: function(A, abB) {
                var bB = eval("(" + abB + ")");
                var B = "http://zf668.qiniudn.com/" + bB.key;
                if (B) {
                    $("#bgImageSuccName").children("span").text(bB.key);
                    $("#preActivityInfo").css("background", "url(" + B + ") 0 0 repeat");
                    $("#bgImageTile").removeClass("radio_select");
                    $("#bgImagePull").addClass("radio_select");
                    editactivitie.bgImageIsrepeat = true;
                    editactivitie.bgcolor = "";
                    editactivitie.bgImage = B;
                    editactivitie.bgImage_temp = B;
                    setTimeout(function() {
                        $("#bgimagecolor").hide();
                        $("#bgimagecolorSucc").show()
                    }, 100)
                }
            },
            onSelectError: function(C, B, A) {
                switch (B) {
                    case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                        this.queueData.errorMsg = "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
                        break;
                    case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                        this.queueData.errorMsg = "图片大小不能超过5M";
                        break;
                    case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                        this.queueData.errorMsg = "文件大小为0";
                        break;
                    case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                        this.queueData.errorMsg = "文件格式不正确，仅限 " + this.settings.fileTypeExts;
                        break;
                    default:
                        this.queueData.errorMsg = "错误代码：" + B + "\n" + A
                }
            }
        })
    },
    delbgimg: function() {
        $("#bgimagecolorSucc").hide();
        $("#bgimagecolor").show();
        editactivitie.bgImage = "";
        editactivitie.bgImage_temp = "";
        editactivitie.bgcolor = "#ffffff";
        $("#preActivityInfo").css({
            "background": editactivitie.bgcolor
        })
    },
    uploadbgimageAgain: function(token) {
        $("#upbgimgAgain").uploadify({
            fileObjName: 'file',
            formData: {
                'token': token //Token
            },
            uploader: 'http://up.qiniu.com/',
            method: 'POST',
            swf: "./uploadify/uploadify.swf",
            buttonClass: "re_upload",
            buttonCursor: "point",
            buttonText: "",
            multi: false,
            auto: true,
            hideButton: true,
            queueID: "bgimgreupque",
            width: 92,
            height: 30,
            fileSizeLimit: 5120,
            fileTypeExts: "*.jpg;*.jpeg;*.png;*.gif",
            onSelect: function(file) {
                filename = file.name;
                $('#upbgimgAgain').uploadify('settings', 'formData', {
                        "key": filename
                    }) //上传文件的名称
            },
            onInit: function() {},
            onUploadSuccess: function(A, abB) {
                var bB = eval("(" + abB + ")");
                var B = "http://zf668.qiniudn.com/" + bB.key;
                if (B) {
                    $("#bgImageSuccName").children("span").text(bB.key);
                    $("#preActivityInfo").css("background", "url(" + B + ") 0 0 repeat");
                    $("#bgImageTile").removeClass("radio_select");
                    $("#bgImagePull").addClass("radio_select");
                    editactivitie.bgImageIsrepeat = true;
                    editactivitie.bgImage = B;
                    editactivitie.bgImage_temp = B;
                    editactivitie.bgcolor = ""
                }
            },
            onSelectError: function(C, B, A) {
                switch (B) {
                    case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                        this.queueData.errorMsg = "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
                        break;
                    case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                        this.queueData.errorMsg = "图片大小不能超过5M";
                        break;
                    case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                        this.queueData.errorMsg = "文件大小为0";
                        break;
                    case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                        this.queueData.errorMsg = "文件格式不正确，仅限 " + this.settings.fileTypeExts;
                        break;
                    default:
                        this.queueData.errorMsg = "错误代码：" + B + "\n" + A
                }
            }
        })
    },
    bgdefault_click: function() {
        $("#bgdefault").attr("class", "first_btn_sed");
        $("#bgcustom").attr("class", "second_btn");
        $("#bgimage").attr("class", "last_btn");
        $("#bgcustomcolor").hide();
        $("#bgimagecolor").hide();
        $("#bgimagecolorSucc").hide();
        $("#bgdefaultcolor").show()
    },
    bgcustom_click: function() {
        $("#bgdefault").attr("class", "first_btn");
        $("#bgcustom").attr("class", "second_btn_sed");
        $("#bgimage").attr("class", "last_btn");
        $("#bgdefaultcolor").hide();
        $("#bgimagecolor").hide();
        $("#bgimagecolorSucc").hide();
        $("#bgcustomcolor").show()
    },
    bgimage_click: function() {
        $("#bgdefault").attr("class", "first_btn");
        $("#bgcustom").attr("class", "second_btn");
        $("#bgimage").attr("class", "last_btn_sed");
        if (editactivitie.bgImage_temp == "") {
            $("#bgdefaultcolor").hide();
            $("#bgcustomcolor").hide();
            $("#bgimagecolor").show()
        } else {
            $("#bgdefaultcolor").hide();
            $("#bgcustomcolor").hide();
            $("#bgimagecolor").hide();
            $("#bgimagecolorSucc").show()
        }
    },
    dfcolorChose: function(B) {
        for (var A = 1; A <= 7; A++) {
            if (A == B) {
                $("#dfcolor" + A).addClass("selected");
                editactivitie.bgcolor = $("#dfcolor" + A).children().first().css("background-color");
                $("#preActivityInfo").css("background", editactivitie.bgcolor);
                editactivitie.bgImage = ""
            } else {
                $("#dfcolor" + A).removeClass("selected")
            }
        }
    },
    WriteBackgroundColor: function() {
        var A = "#" + $("#color-bg1").val();
        editactivitie.bgImage = "";
        editactivitie.bgcolor = A;
        $("#preActivityInfo").css({
            "background": A
        });
        $("#colorsharing1").css({
            "background-color": A
        })
    },
    WriteBorderColor: function() {
        var A = "#" + $("#color-bg2").val();
        $("#preActivityInfo").css({
            "border": "1px solid " + A
        });
        $("#colorsharing2").css({
            "background-color": A
        })
    },
    WriteColor: function() {
        var A = "#" + $("#color-bg3").val();
        $("#preActivityInfo").css({
            "color": A
        });
        $("#colorsharing3").css({
            "background-color": A
        })
    },
    bgImageRepeat: function(A) {
        if (editactivitie.bgImage_temp == "") {
            return
        }
        if (A == "repeat") {
            $("#bgImageTile").removeClass("radio_select");
            $("#bgImagePull").addClass("radio_select");
            editactivitie.bgImageIsrepeat = true
        } else {
            if (A == "no-repeat") {
                $("#bgImagePull").removeClass("radio_select");
                $("#bgImageTile").addClass("radio_select");
                editactivitie.bgImageIsrepeat = false
            }
        }
        $("#preActivityInfo").css("background", "url(" + editactivitie.bgImage_temp + ") 0 0 " + A);
        if (editactivitie.bgImage == "") {
            editactivitie.bgImage = editactivitie.bgImage_temp;
            editactivitie.bgcolor = ""
        }
    },
    DateInfoClick: function() {
        $("#DateWarning").hide()
    },
    numOnly: function(A) {
        $("#" + A).keydown(function(C) {
            var D = C || e;
            var B = D.keycode || D.which;
            if ((B >= 48 && B <= 57) || (B >= 96 && B <= 105) || B == 8 || B == 9 || B == 46) {
                return true
            }
            return false
        })
    },
    emfocus: function() {
        $("#emWarning").css("color", "#dbdbdb");
        $("#emWarning").text("最多30个字")
    },
    telePhonefocus: function() {
        var A = $.trim($("#telePhone").val());
        if (A == "请输入11位手机号码或带区号的固话号码或400X-XXX-XXX") {
            $("#telePhone").val("");
            $("#telePhone").removeAttr("style")
        }
        $("#phoneWarning").hide()
    },
    telePhoneblur: function() {
        var A = $.trim($("#telePhone").val());
        if (A == "") {
            $("#telePhone").val("请输入11位手机号码或带区号的固话号码或400X-XXX-XXX");
            $("#telePhone").css("color", "#dbdbdb")
        }
    },
    validate: function(P) {
        var O = $.trim($("#activityTitle").val());
        if (O == "") {
            $("#titleWarning").show();
            $("html,body").animate({
                scrollTop: $("#activityTitle").offset().top - 100
            }, 300);
            return false
        }
        if (editactivitie.shareIco == "") {
            $("html,body").animate({
                scrollTop: $("#activityTitle").offset().top - 100
            }, 300);
            $("#ShareIcoWarning").show();
            return false
        }
        if (editactivitie.actImg == "") {
            $("html,body").animate({
                scrollTop: $("#activityTitle").offset().top - 100
            }, 300);
            $("#activityPicWarning").show();
            return false
        }
        var J = $.trim(UE.getEditor("myEditor").getPlainTxt());
        if (!UE.getEditor("myEditor").hasContents() || J == "") {
            $("#contentWarning").show();
            $("html,body").animate({
                scrollTop: $("#myEditor").offset().top - 200
            }, 300);
            return false
        }
        var N = new Date($("#startDate").val().substr(0, 4), parseInt($("#startDate").val().substr(5, 2), 10) - 1, $("#startDate").val().substr(8, 2), $("#startHour").val().substr(0, 2), 0, 0);
        var E = new Date($("#endDate").val().substr(0, 4), parseInt($("#endDate").val().substr(5, 2), 10) - 1, $("#endDate").val().substr(8, 2), $("#endHour").val().substr(0, 2), 0, 0);
        if (N >= E) {
            $("#DateWarning").show();
            $("html,body").animate({
                scrollTop: $("#endDate").offset().top - 200
            }, 300);
            return false
        }
        var G = [];
        for (var F = 1; F <= awardsCount; F++) {
            var A = {};
            var K = $.trim($("#pri_ShareCount" + F).val());
            var M = $.trim($("#pri_Content" + F).val());
            var C = "限定";
            var H = $.trim($("#pri_Count" + F).val());
            var I = $.trim($("#pri_Count" + F).next().val());
            if (K == "" || M == "" || (C == "限定" && H == "")) {
                $("#pri_Warning" + F).text("请设置奖项");
                $("#pri_Warning" + F).show();
                $("html,body").animate({
                    scrollTop: $("#pri_ShareCount" + F).offset().top - 200
                }, 300);
                return false
            }
            if (isNaN(K) || (C == "限定" && isNaN(H))) {
                $("#pri_Warning" + F).text("输入有误");
                $("#pri_Warning" + F).show();
                $("html,body").animate({
                    scrollTop: $("#pri_ShareCount" + F).offset().top - 200
                }, 300);
                return false
            }
            if (K < 1 || (C == "限定" && H < 1)) {
                $("#pri_Warning" + F).text("输入有误");
                $("#pri_Warning" + F).show();
                $("html,body").animate({
                    scrollTop: $("#pri_ShareCount" + F).offset().top - 200
                }, 300);
                return false
            }
            if (K > 150) {
                $("#pri_Warning" + F).text("分享量最大为150");
                $("#pri_Warning" + F).show();
                $("html,body").animate({
                    scrollTop: $("#pri_ShareCount" + F).offset().top - 200
                }, 300);
                return false
            }
            if (P && C == "限定") {
                if (parseInt(H, 10) < parseInt(I, 10)) {
                    $("#pri_Warning" + F).text("数量不能小于" + I);
                    $("#pri_Warning" + F).show();
                    $("html,body").animate({
                        scrollTop: $("#pri_ShareCount" + F).offset().top - 200
                    }, 300);
                    return false
                }
            }
            for (var D = 0; D < G.length; D++) {
                if (G[D].sharecount == K || G[D].prizecontent == M) {
                    $("#pri_Warning" + F).text("奖项条件不能相同");
                    $("#pri_Warning" + F).show();
                    $("html,body").animate({
                        scrollTop: $("#pri_ShareCount" + F).offset().top - 200
                    }, 300);
                    return false
                }
            }
            A.sharecount = K;
            A.prizecontent = M;
            A.limitprizecount = H;
            G.push(A)
        }
        var B = $.trim($("#ExchangeMethod").val());
        if (B == "") {
            $("#emWarning").css("color", "#eb6751");
            $("#emWarning").text("请输入兑奖方法");
            return false
        }
        var L = $.trim($("#telePhone").val());
        if (L == "" || L == "请输入11位手机号码或带区号的固话号码或400X-XXX-XXX") {
            $("#phoneWarning").text("请输入咨询电话");
            $("#phoneWarning").show();
            return false
        }
        var Q = /(^0[0-9]{2,3}\-?[2-9][0-9]{6,7}(\-[0-9]{1,4})?$)|(^(13[0-9]|14[5,7]|15[0-9]|17[0,6,7,8]|18[0-9])\d{8}$)|(^[4,8]00\d\-\d{3}\-\d{3}$)/;
        if (!Q.test(L)) {
            $("#phoneWarning").text("咨询电话格式有误");
            $("#phoneWarning").show();
            return false
        }
        return true
    },
    zancunValidate: function() {
        var C = new Date($("#startDate").val().substr(0, 4), parseInt($("#startDate").val().substr(5, 2), 10) - 1, $("#startDate").val().substr(8, 2), $("#startHour").val().substr(0, 2), 0, 0);
        var I = new Date($("#endDate").val().substr(0, 4), parseInt($("#endDate").val().substr(5, 2), 10) - 1, $("#endDate").val().substr(8, 2), $("#endHour").val().substr(0, 2), 0, 0);
        if (C >= I) {
            $("#DateWarning").show();
            $("html,body").animate({
                scrollTop: $("#endDate").offset().top - 200
            }, 300);
            return false
        }
        for (var E = 1; E <= awardsCount; E++) {
            var H = $.trim($("#pri_ShareCount" + E).val());
            var F = $.trim($("#pri_Content" + E).val());
            var B = "限定";
            var G = $.trim($("#pri_Count" + E).val());
            if (H != "" && isNaN(H) || (B == "限定" && G != "" && isNaN(G))) {
                $("#pri_Warning" + E).text("输入有误");
                $("#pri_Warning" + E).show();
                $("html,body").animate({
                    scrollTop: $("#pri_ShareCount" + E).offset().top - 200
                }, 300);
                return false
            }
            if (H != "" && H < 1 || (B == "限定" && G != "" && G < 1)) {
                $("#pri_Warning" + E).text("输入有误");
                $("#pri_Warning" + E).show();
                $("html,body").animate({
                    scrollTop: $("#pri_ShareCount" + E).offset().top - 200
                }, 300);
                return false
            }
            if (H != "" && H > 150) {
                $("#pri_Warning" + E).text("分享量最大为150");
                $("#pri_Warning" + E).show();
                $("html,body").animate({
                    scrollTop: $("#pri_ShareCount" + E).offset().top - 200
                }, 300);
                return false
            }
        }
        var D = $.trim($("#telePhone").val());
        if (D == "请输入11位手机号码或带区号的固话号码或400X-XXX-XXX") {
            D = ""
        }
        var A = /(^0[0-9]{2,3}\-?[2-9][0-9]{6,7}(\-[0-9]{1,4})?$)|(^(13[0-9]|14[5,7]|15[0-9]|17[0,6,7,8]|18[0-9])\d{8}$)|(^[4,8]00\d\-\d{3}\-\d{3}$)/;
        if (D != "" && !A.test(D)) {
            $("#phoneWarning").text("咨询电话格式有误");
            $("#phoneWarning").show();
            return false
        }
        return true
    },
    tijiao: function() {
        $(".zancun").attr("disabled", "disabled");
        $(".tijiao").attr("disabled", "disabled");
        if (!editactivitie.validate(false)) {
            $(".zancun").removeAttr("disabled");
            $(".tijiao").removeAttr("disabled");
            return
        }
        var B = {};
        B.Id = editactivitie.actId;
        B.title = editactivitie.converthtml($.trim($("#activityTitle").val()));
        B.description = "";
        B.UserId = 1;
        B.Description = "";
        B.CreateTime = new Date();
        B.EffectTime = new Date();
        B.favicon_url = editactivitie.shareIco;
        B.ActivityPicPath = editactivitie.actImg;
        B.BackGroundColor = editactivitie.bgcolor;
        B.BackGroundImage = editactivitie.bgImage;
        B.IsBT = editactivitie.bgImageIsrepeat;
        B.Content = UE.utils.unhtml(UE.getEditor("myEditor").getContent());
        B.LimitStartTime = $("#startDate").val() + " " + $("#startHour").val() + ":00";
        B.LimitEndTime = $("#endDate").val() + " " + $("#endHour").val() + ":00";
        B.SpreadLink = "";
        B.prize_policy_array = [];
        for (var A = 1; A <= awardsCount; A++) {
            var C = {
                ID: A,
                condition_min: $.trim($("#pri_ShareCount" + A).val()) == "" ? "0" : $.trim($("#pri_ShareCount" + A).val()),
                prize: editactivitie.converthtml($.trim($("#pri_Content" + A).val())),
                IsLimitPrizeCount: true,
                total_number: $.trim($("#pri_Count" + A).val()) == "" ? "0" : $.trim($("#pri_Count" + A).val()),
                LimitPrizeZq: $.trim($("#pri_zhouqi" + A).val()) == "" ? "0" : $.trim($("#pri_zhouqi" + A).val())
            };
            B.prize_policy_array.push(C)
        }
        B.ExchangeMethod = editactivitie.converthtml($.trim($("#ExchangeMethod").val()));
        B.Phone = $.trim($("#telePhone").val());
        $.ajax({
            url: "/merchant/promotion_edit_submit",
            type: "post",
            datatype: "text",
            data: JSON.stringify(B),
            success: function(D) {
                if (D.state == "ok") {
                    $("#tijiaoOKDialog").dialog("open")
                } else {
                    if (D.state == "fail") {
                        $(".zancun").removeAttr("disabled");
                        $(".tijiao").removeAttr("disabled");
                        alert("提交失败：" + D.msg)
                    } else {
                        $(".zancun").removeAttr("disabled");
                        $(".tijiao").removeAttr("disabled");
                        alert("发生错误：" + D.msg)
                    }
                }
            }
        })
    },
    zancun: function() {
        $(".zancun").attr("disabled", "disabled");
        $(".tijiao").attr("disabled", "disabled");
        if (!editactivitie.zancunValidate()) {
            $(".zancun").removeAttr("disabled");
            $(".tijiao").removeAttr("disabled");
            return
        }
        var A = $.trim($("#telePhone").val());
        if (A == "请输入11位手机号码或带区号的固话号码或400X-XXX-XXX") {
            A = ""
        }
        var C = {};
        C.Id = editactivitie.actId;
        C.title = editactivitie.converthtml($.trim($("#activityTitle").val()));
        C.description = "";
        C.UserId = 1;
        C.Description = "";
        C.CreateTime = new Date();
        C.EffectTime = new Date();
        C.favicon_url = editactivitie.shareIco;
        C.ActivityPicPath = editactivitie.actImg;
        C.BackGroundColor = editactivitie.bgcolor;
        C.BackGroundImage = editactivitie.bgImage;
        C.IsBT = editactivitie.bgImageIsrepeat;
        C.Content = UE.utils.unhtml(UE.getEditor("myEditor").getContent());
        C.LimitStartTime = $("#startDate").val() + " " + $("#startHour").val() + ":00";
        C.LimitEndTime = $("#endDate").val() + " " + $("#endHour").val() + ":00";
        C.SpreadLink = "";
        C.prize_policy_array = [];
        for (var B = 1; B <= awardsCount; B++) {
            var D = {
                ID: B,
                condition_min: $.trim($("#pri_ShareCount" + B).val()) == "" ? "0" : $.trim($("#pri_ShareCount" + B).val()),
                prize: editactivitie.converthtml($.trim($("#pri_Content" + B).val())),
                IsLimitPrizeCount: true,
                total_number: $.trim($("#pri_Count" + B).val()) == "" ? "0" : $.trim($("#pri_Count" + B).val()),
                LimitPrizeZq: $.trim($("#pri_zhouqi" + B).val()) == "" ? "0" : $.trim($("#pri_zhouqi" + B).val())
            };
            C.prize_policy_array.push(D)
        }
        C.ExchangeMethod = editactivitie.converthtml($.trim($("#ExchangeMethod").val()));
        C.Phone = A;
        $.ajax({
            url: "/merchant/promotion_edit_save",
            type: "post",
            datatype: "text",
            data: JSON.stringify(C),
            dataType: "json",
            success: function(E) {
                if (E.state == "ok") {
                    location.href = "/Activity/Manage?State=Save&new=new"
                } else {
                    $(".zancun").removeAttr("disabled");
                    $(".tijiao").removeAttr("disabled");
                    alert("修改失败：" + E.msg)
                }
            }
        })
    },
    bl: function(A) {
        if (A <= 0) {
            return "00"
        }
        return A < 10 ? "0" + A : A
    },
    converthtml: function(A) {
        return A ? A.replace(/[&<">']/g, function(B) {
            return {
                "<": "＜",
                "&": "＆",
                '"': "＂",
                ">": "＞",
                "'": "＇"
            }[B]
        }) : ""
    },
    preDateShow: function() {
        var H = $("#startDate").val();
        var F = $("#startHour").val();
        var B = $("#endDate").val();
        var A = $("#endHour").val();
        var D = new Date(H.replace("年", "/").replace("月", "/").replace("日", "") + " " + F + ":00");
        var I = new Date(B.replace("年", "/").replace("月", "/").replace("日", "") + " " + A + ":00");
        var C = I - D - 6000;
        $("#preremday").text(editactivitie.bl(Math.floor(C / (24 * 3600 * 1000))));
        var G = C % (24 * 3600 * 1000);
        $("#preremhour").text(editactivitie.bl(Math.floor(G / (3600 * 1000))));
        var E = G % (3600 * 1000);
        $("#preremmins").text(editactivitie.bl(Math.floor(E / (60 * 1000))))
    },
    xiandCli: function(A) {
        $("#pri_IsLimitDiv" + A).click(function() {
            $(this).parent().next().hide();
            $(this).children("ol").toggle();
            $(this).children("ol").children("li").click(function() {
                var D = $(this).text();
                if (D == "限定") {
                    $(this).parent().parent().next().removeAttr("disabled");
                    $(this).parent().parent().next().focus()
                } else {
                    if (D == "不限定") {
                        $(this).parent().parent().next().val("");
                        $(this).parent().parent().next().attr("disabled", "disabled");
                        var C = $(this).parent().parent().next().attr("id");
                        var B = C.substr(C.indexOf("pri_Count") + 9);
                        $("#preprize" + B + " span:eq(2)").text("");
                        if ($.trim($("#pri_Content" + B).val()) != "") {
                            $("#preprize" + B + " span:eq(1)").text($.trim($("#pri_Content" + B).val()));
                            $("#preprize" + B).show()
                        }
                    }
                }
                $(this).parent().prev().val(D)
            })
        });
        $(document).mousedown(function(B) {
            var C = (B.target || B.srcElement);
            if ($(C).attr("id") != "pri_IsLimitDiv" + A && $(C).parent().parent().attr("id") != "pri_IsLimitDiv" + A) {
                $("#pri_IsLimitDiv" + A).children("ol").hide()
            }
        })
    },
    Init: function() {
        var H = UE.getEditor("myEditor", {
            toolbars: [
                ["template", "|", "undo", "|", "bold", "italic", "underline", "|", "forecolor", "backcolor", "removeformat", "formatmatch", "|", "justifyleft", "justifycenter", "justifyright", "rowspacingtop", "rowspacingbottom", "lineheight", "fontsize", "|", "simpleupload", "|", "link", "drafts"]
            ],
            initialStyle: "p{font-size:14px;font-family:微软雅黑,Microsoft YaHei;color:#666}"
        });
        $("#activityTitle").val(editactivitie.title);
        if (editactivitie.shareIco != "") {
            $("#uploadSuccShareIco").attr("src", editactivitie.shareIco);
            $("#shareIcon").hide();
            $("#uploadSuccShare").show()
        }
        if (editactivitie.actImg != "") {
            $("#uploadSuccShowPic").attr("src", editactivitie.actImg);
            $("#upActivityPic").hide();
            $("#uploadSuccShow").show()
        }
        if (editactivitie.bgcolor != "") {
            var A = false;
            for (var D = 0; D < editactivitie.prebgcolors.length; D++) {
                if (editactivitie.prebgcolors[D] == editactivitie.bgcolor) {
                    $("#dfcolor" + (D + 1)).addClass("selected");
                    A = true;
                    break
                }
            }
            if (!A) {
                $("#colorsharing1").css("background", editactivitie.bgcolor);
                $("#color-bg1").val(editactivitie.bgcolor.substr(1))
            }
        } else {
            if (editactivitie.bgImage != "") {
                var C = editactivitie.bgImage.substr(editactivitie.bgImage.lastIndexOf("/") + 1);
                C = C.length > 19 ? C.substr(0, 18) + "..." : C;
                $("#bgImageSuccName").children("span").text(C);
                if (editactivitie.bgImageIsrepeat == "False") {
                    $("#bgImageTile").addClass("radio_select");
                    $("#bgImagePull").removeClass("radio_select")
                }
                editactivitie.bgImage_temp = editactivitie.bgImage
            }
        }
        var G = UE.utils.html(editactivitie.content);
        H.ready(function() {
            H.setContent(G, false)
        });
        $("#endHour").val(editactivitie.endtime.substr(12, 5));
        for (var D = 0; D < editactivitie.prizes.length; D++) {
            var E = editactivitie.prizes[D].isLimit == "True" ? "限定" : "不限定";
            editactivitie.AddAwards(editactivitie.prizes[D].id, editactivitie.prizes[D].shareCount == 0 ? "" : editactivitie.prizes[D].shareCount, editactivitie.prizes[D].prizeContent, E, editactivitie.prizes[D].LimitPrizeCount == 0 ? "" : editactivitie.prizes[D].LimitPrizeCount, false)
        }
        var B = editactivitie.title;
        if (B.length > 29) {
            B = B.substr(0, 29) + "..."
        }
        $("#preShareIco").attr("src", editactivitie.shareIco);
        $("#preTitle_pyq").text(B);
        $("#preTitle").text(B);
        $("#preActivityPic").attr("src", editactivitie.actImg);
        if (editactivitie.bgcolor != "") {
            $("#preActivityInfo").css({
                "background": editactivitie.bgcolor
            })
        } else {
            if (editactivitie.bgImage != "") {
                var F = "repeat";
                if (editactivitie.bgImageIsrepeat == "False") {
                    F = "no-repeat"
                }
                $("#preActivityInfo").css("background", 'url("' + editactivitie.bgImage + '") 0 0 ' + F)
            }
        }
        $("#preContet").html(G);
        $("#ExchangeMethod").val(editactivitie.exMethod);
        if (editactivitie.phone != "") {
            $("#telePhone").val(editactivitie.phone);
            $("#telePhone").removeAttr("style")
        }
        if (editactivitie.ise == "1") {
            if (editactivitie.actsatte == "6" || editactivitie.actsatte == "5") {
            	$.ajax({
		            url: "/active/token",
		            type: "post",
		            contentType: "application/x-www-form-urlencoded",
		            dataType:"json",
		            success: function (data) {
		            	editactivitie.saveInit(H,data.Token);
		            }
		        });
                
            } else {
                if (editactivitie.actsatte == "2") {
                    editactivitie.checkedInit(H)
                } else {
                    if (editactivitie.actsatte == "3") {
                    	$.ajax({
				            url: "/active/token",
				            type: "post",
				            contentType: "application/x-www-form-urlencoded",
				            dataType:"json",
				            success: function (data) {
				            	editactivitie.startedInit(H,data.Token);
				            }
				        });
                    } else {
                        editactivitie.unInit(H)
                    }
                }
            }
        } else {
            editactivitie.unInit(H)
        }
        editactivitie.preDateShow()
    },
    saveInit: function(D,token) {
        editactivitie.uploadshareIco(token);
        editactivitie.uploadActivityPic(token);
        editactivitie.uploadbgimagePic(token);
        if (editactivitie.actImg != "") {
            $("#upActivityPic").hide()
        }
        editactivitie.uploadbgimageAgain(token);
        $("#colorsharing1").spectrum({
            showInput: true,
            preferredFormat: "hex",
            change: function(F) {
                F.toHexString();
                var E = F.toHexString();
                editactivitie.bgImage = "";
                editactivitie.bgcolor = E;
                $("#preActivityInfo").css({
                    "background": E
                });
                $("#colorsharing1").css({
                    "background-color": E
                });
                $("#color-bg1").val(E.substr(1, E.length - 1))
            }
        });
        D.addListener("blur", function() {
            if (!D.hasContents()) {
                $(".right_cont #preContet").text("");
                $(".right_cont #preContet").css("height", "50px")
            } else {
                $(".right_cont #preContet").html(D.getContent());
                $(".right_cont #preContet").css("height", "")
            }
        });
        D.addListener("focus", function() {
            $("#contentWarning").hide();
            var E = D.getContent();
            if (E == "") {
                return
            }
            var F = E.substr(E.length - 4);
            if (F != "</p>") {
                D.setContent("<p><br/></p>", true)
            }
        });
        $("#startHourDiv").click(function() {
            $(this).children("ol").toggle();
            $("#ol1 li").click(function() {
                $("#startHour").val($(this).text());
                editactivitie.preDateShow()
            })
        });
        $("#endHourDiv").click(function() {
            $(this).children("ol").toggle();
            $("#ol2 li").click(function() {
                $("#endHour").val($(this).text());
                editactivitie.preDateShow()
            })
        });
        $(document).mousedown(function(E) {
            var F = (E.target || E.srcElement);
            if ($(F).attr("id") != "startHourDiv" && $(F).attr("id") != "startHour" && $(F).attr("id") != "ol1" && $(F).parent().attr("id") != "ol1") {
                $("#ol1").hide()
            }
            if ($(F).attr("id") != "endHourDiv" && $(F).attr("id") != "endHour" && $(F).attr("id") != "ol2" && $(F).parent().attr("id") != "ol2") {
                $("#ol2").hide()
            }
        });
        $("#tijiaoOKDialog").dialog({
            autoOpen: false,
            width: 600,
            height: 375,
            resizable: false,
            title: "提交审核",
            modal: true,
            dialogClass: "pop_container submit_tit",
            close: function() {
                var E = "Checking";
                if (editactivitie.actsatte == "2") {
                    E = "Active"
                }
                location.href = "/Activity/Manage?State=" + E + "&new=new"
            }
        });
        $("#tijiaoOKDialog [name='btnOK']").click(function() {
            $("#tijiaoOKDialog").dialog("close")
        });
        $("#shareModal").dialog({
            autoOpen: false,
            width: 600,
            height: 870,
            resizable: false,
            title: "上传分享图标",
            modal: true,
            dialogClass: "pop_container"
        });
        $("#shareIcon").click(function() {
            $("#shareModal").dialog("open")
        });
        var B = new Date((new Date().getTime() + 1 * 60 * 60 * 1000));
        if (B > editactivitie.allowsdmax) {
            alert("请注意，账户即将到期，已不能保存活动！")
        }
        $("#startDate").datepicker({
            dateFormat: "yy年mm月dd日",
            minDate: B,
            maxDate: editactivitie.allowsdmax,
            yearSuffix: "年",
            showMonthAfterYear: true,
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            beforeShow: function() {
                setTimeout(function() {
                    $("#ui-datepicker-div").css("z-index", 1000)
                }, 100)
            },
            onSelect: function(M, F) {
                B = new Date((new Date().getTime() + 1 * 60 * 60 * 1000));
                var J = new Date($("#endDate").val().replace("年", "/").replace("月", "/").replace("日", ""));
                var N = new Date(M.replace("年", "/").replace("月", "/").replace("日", ""));
                N.setMonth(N.getMonth() + 1);
                if (N > editactivitie.allowedmax) {
                    N = editactivitie.allowedmax
                }
                $("#endDate").datepicker("option", "minDate", M);
                $("#endDate").datepicker("option", "maxDate", N);
                if (new Date(M.replace("年", "/").replace("月", "/").replace("日", "")) >= J || J > N) {
                    var O = new Date(M.replace("年", "/").replace("月", "/").replace("日", ""));
                    O.setTime(O.getTime() + (15 * 24 * 60 * 60 * 1000));
                    if (O > editactivitie.allowedmax) {
                        O = editactivitie.allowedmax
                    }
                    $("#endDate").val(O.getFullYear() + "年" + (O.getMonth() + 1) + "月" + O.getDate() + "日");
                    $("#endDate").datepicker("option", "defaultDate", O)
                }
                var E = new Date(M.replace("年", "/").replace("月", "/").replace("日", ""));
                if (E.getYear() == B.getYear() && E.getMonth() == B.getMonth() && E.getDate() == B.getDate()) {
                    var L = B.getHours();
                    var G = $("#startHour").val().substr(0, 2);
                    if (parseInt(G, 10) < L) {
                        $("#startHour").val(editactivitie.bl(L) + ":00")
                    }
                    $("#ol1 li").each(function(P, Q) {
                        if (parseInt($(Q).attr("value"), 10) < L) {
                            $(Q).remove()
                        }
                    })
                } else {
                    var H = $("#ol1 li").first().val();
                    for (var K = H - 1; K >= 0; K--) {
                        var I = '<li value="' + K + '">' + editactivitie.bl(K) + ":00</li>";
                        $("#ol1 li").first().before(I)
                    }
                }
                editactivitie.preDateShow()
            }
        });
        var A = new Date((new Date().getTime() + 1 * 60 * 60 * 1000));
        A.setTime(A.getTime() + (15 * 24 * 60 * 60 * 1000));
        if (A > editactivitie.allowedmax) {
            A = editactivitie.allowedmax
        }
        var C = new Date((new Date().getTime() + 1 * 60 * 60 * 1000));
        C.setMonth(C.getMonth() + 1);
        if (C > editactivitie.allowedmax) {
            C = editactivitie.allowedmax
        }
        $("#endDate").datepicker({
            dateFormat: "yy年mm月dd日",
            minDate: B,
            maxDate: C,
            defaultDate: A,
            yearSuffix: "年",
            showMonthAfterYear: true,
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            beforeShow: function() {
                setTimeout(function() {
                    $("#ui-datepicker-div").css("z-index", 1000)
                }, 100)
            },
            onSelect: function(E, F) {
                editactivitie.preDateShow()
            }
        });
        $("#startDateDiv").click(function() {
            $("#startDate").datepicker("show")
        });
        $("#endDateDiv").click(function() {
            $("#endDate").datepicker("show")
        });
        editactivitie.numOnly("pri_ShareCount1");
        editactivitie.numOnly("pri_Count1")
    },
    startedInit: function(D,token) {
        editactivitie.uploadshareIco(token);
        editactivitie.uploadActivityPic(token);
        editactivitie.uploadbgimagePic(token);
        if (editactivitie.actImg != "") {
            $("#upActivityPic").hide()
        }
        editactivitie.uploadbgimageAgain(token);
        $("#colorsharing1").spectrum({
            showInput: true,
            preferredFormat: "hex",
            change: function(F) {
                F.toHexString();
                var E = F.toHexString();
                editactivitie.bgImage = "";
                editactivitie.bgcolor = E;
                $("#preActivityInfo").css({
                    "background": E
                });
                $("#colorsharing1").css({
                    "background-color": E
                });
                $("#color-bg1").val(E.substr(1, E.length - 1))
            }
        });
        D.addListener("blur", function() {
            if (!D.hasContents()) {
                $(".right_cont #preContet").text("");
                $(".right_cont #preContet").css("height", "50px")
            } else {
                $(".right_cont #preContet").html(D.getContent());
                $(".right_cont #preContet").css("height", "")
            }
        });
        D.addListener("focus", function() {
            $("#contentWarning").hide();
            var E = D.getContent();
            if (E == "") {
                return
            }
            var F = E.substr(E.length - 4);
            if (F != "</p>") {
                D.setContent("<p><br/></p>", true)
            }
        });
        $("#startDate").attr("disabled", "disabled");
        $("#startDate").css("width", "121px");
        $("#startHour").attr("disabled", "disabled");
        $("#endHourDiv").click(function() {
            $(this).children("ol").toggle();
            $("#ol2 li").click(function() {
                $("#endHour").val($(this).text());
                editactivitie.preDateShow()
            })
        });
        $(document).mousedown(function(E) {
            var F = (E.target || E.srcElement);
            if ($(F).attr("id") != "startHourDiv" && $(F).attr("id") != "startHour" && $(F).attr("id") != "ol1" && $(F).parent().attr("id") != "ol1") {
                $("#ol1").hide()
            }
            if ($(F).attr("id") != "endHourDiv" && $(F).attr("id") != "endHour" && $(F).attr("id") != "ol2" && $(F).parent().attr("id") != "ol2") {
                $("#ol2").hide()
            }
        });
        $("#tijiaoOKDialog").dialog({
            autoOpen: false,
            width: 600,
            height: 375,
            resizable: false,
            title: "提交审核",
            modal: true,
            dialogClass: "pop_container submit_tit",
            close: function() {
                location.href = "/Activity/Manage?State=Active&new=new"
            }
        });
        $("#tijiaoOKDialog [name='btnOK']").click(function() {
            $("#tijiaoOKDialog").dialog("close")
        });
        $("#shareModal").dialog({
            autoOpen: false,
            width: 600,
            height: 870,
            resizable: false,
            title: "上传分享图标",
            modal: true,
            dialogClass: "pop_container"
        });
        $("#shareIcon").click(function() {
            $("#shareModal").dialog("open")
        });
        var B = new Date(editactivitie.starttime.replace("年", "/").replace("月", "/").replace("日", ""));
        var C = new Date(editactivitie.endtime.replace("年", "/").replace("月", "/").replace("日", ""));
        B.setMonth(B.getMonth() + 1);
        if (B > editactivitie.allowedmax) {
            B = editactivitie.allowedmax
        }
        $("#endDate").datepicker({
            dateFormat: "yy年mm月dd日",
            minDate: C,
            maxDate: B,
            defaultDate: C,
            yearSuffix: "年",
            showMonthAfterYear: true,
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            beforeShow: function() {
                setTimeout(function() {
                    $("#ui-datepicker-div").css("z-index", 1000)
                }, 100)
            },
            onSelect: function(E, F) {
                editactivitie.preDateShow()
            }
        });
        $("#endDateDiv").click(function() {
            $("#endDate").datepicker("show")
        });
        $("#addMoreAwards").parent().parent().remove();
        for (var A = 1; A <= awardsCount; A++) {
            $("#removeAward" + A).remove();
            $("#pri_ShareCount" + A).attr("disabled", "disabled")
        }
        editactivitie.numOnly("pri_Count1");
        $(".zancun").remove();
        $(".tijiao").attr("onclick", "editactivitie.startingtijiao()")
    },
    checkedInit: function(C) {
        var B = new Date();
        var A = new Date(editactivitie.starttime.replace("年", "/").replace("月", "/").replace("日", ""));
        if (B.setHours(B.getHours() + 24) <= A) {
        	$.ajax({
	            url: "/active/token",
	            type: "post",
	            contentType: "application/x-www-form-urlencoded",
	            dataType:"json",
	            success: function (data) {
	            	editactivitie.saveInit(C,data.Token);
	            }
	        });
           
        } else {
        	$.ajax({
	            url: "/active/token",
	            type: "post",
	            contentType: "application/x-www-form-urlencoded",
	            dataType:"json",
	            success: function (data) {
	            	editactivitie.startedInit(C,data.Token);
	            }
	        });
            
        }
        $(".zancun").remove();
        $(".tijiao").attr("onclick", "editactivitie.checkedtijiao()")
    },
    unInit: function(B) {
        $("#activityTitle").attr("disabled", "disabled");
        $("#uploadSuccShare").removeAttr("onmouseover");
        $("#uploadSuccShow").removeAttr("onmouseover");
        $("#bgdefault").removeAttr("onclick");
        $("#bgcustom").removeAttr("onclick");
        $("#bgimage").removeAttr("onclick");
        for (var A = 1; A <= 7; A++) {
            $("#dfcolor" + A).removeAttr("onclick")
        }
        B.ready(function() {
            B.setDisabled()
        });
        $("#startDate").attr("disabled", "disabled");
        $("#startDate").css("width", "121px");
        $("#startHour").attr("disabled", "disabled");
        $("#endDate").attr("disabled", "disabled");
        $("#endDate").css("width", "121px");
        $("#endHour").attr("disabled", "disabled");
        $("#startDInfo").removeAttr("onclick");
        $("#endDInfo").removeAttr("onclick");
        for (var A = 1; A <= awardsCount; A++) {
            $("#pri_ShareCount" + A).attr("disabled", "disabled");
            $("#pri_Content" + A).attr("disabled", "disabled");
            $("#pri_Count" + A).attr("disabled", "disabled");
            $("#removeAward" + A).remove()
        }
        $("#addMoreAwards").parent().parent().remove();
        $("#ExchangeMethod").attr("disabled", "disabled");
        $("#telePhone").attr("disabled", "disabled");
        $(".zancun").css({
            "background": "url(../images/diszc.gif) 0 0 no-repeat",
            "cursor": "default"
        });
        $(".zancun").removeAttr("onclick");
        $(".tijiao").css({
            "background": "url(../images/distj.gif) 0 0 no-repeat",
            "cursor": "default"
        });
        $(".tijiao").removeAttr("onclick")
    },
    startingtijiao: function() {
        $(".tijiao").attr("disabled", "disabled");
        if (!editactivitie.validate(true)) {
            $(".tijiao").removeAttr("disabled");
            return false
        }
        var B = {};
        B.Id = editactivitie.actId;
        B.Title = editactivitie.converthtml($.trim($("#activityTitle").val()));
        B.UserId = editactivitie.userid;
        B.Description = editactivitie.description;
        B.CreateTime = new Date();
        B.EffectTime = editactivitie.effectTime;
        B.ShareIconPath = editactivitie.shareIco;
        B.ActivityPicPath = editactivitie.actImg;
        B.BackGroundColor = editactivitie.bgcolor;
        B.BackGroundImage = editactivitie.bgImage;
        B.IsBT = editactivitie.bgImageIsrepeat;
        B.Content = UE.utils.unhtml(UE.getEditor("myEditor").getContent());
        B.LimitStartTime = editactivitie.starttime;
        B.LimitEndTime = $("#endDate").val() + " " + $("#endHour").val() + ":00";
        B.SpreadLink = editactivitie.purl;
        B.PrizeInfos = [];
        for (var A = 1; A <= awardsCount; A++) {
            var C = {
                Id: $("#pri_id" + A).val(),
                UserId: editactivitie.userid,
                ShareCount: $.trim($("#pri_ShareCount" + A).val()) == "" ? "0" : $.trim($("#pri_ShareCount" + A).val()),
                PrizeContent: editactivitie.converthtml($.trim($("#pri_Content" + A).val())),
                IsLimitPrizeCount: true,
                LimitPrizeCount: $.trim($("#pri_Count" + A).val()) == "" ? "0" : $.trim($("#pri_Count" + A).val())
            };
            B.PrizeInfos.push(C)
        }
        B.ExchangeMethod = editactivitie.converthtml($.trim($("#ExchangeMethod").val()));
        B.Phone = $.trim($("#telePhone").val());
        $.ajax({
            url: "/Activity/StartingMdy",
            type: "post",
            datatype: "text",
            data: {
                "activity": JSON.stringify(B)
            },
            success: function(D) {
                if (D.state == "ok") {
                    $("#tijiaoOKDialog").dialog("open")
                } else {
                    $(".tijiao").removeAttr("disabled");
                    alert("修改失败：" + D.msg)
                }
            }
        })
    },
    checkedtijiao: function() {
        $(".tijiao").attr("disabled", "disabled");
        var E = new Date();
        var D = new Date(editactivitie.starttime.replace("年", "/").replace("月", "/").replace("日", ""));
        var F = true;
        if (E.setHours(E.getHours() + 24) <= D) {
            F = false
        }
        if (!editactivitie.validate(F)) {
            $(".tijiao").removeAttr("disabled");
            return false
        }
        var B = {};
        B.Id = editactivitie.actId;
        B.Title = editactivitie.converthtml($.trim($("#activityTitle").val()));
        B.UserId = editactivitie.userid;
        B.Description = editactivitie.description;
        B.CreateTime = new Date();
        B.EffectTime = editactivitie.effectTime;
        B.ShareIconPath = editactivitie.shareIco;
        B.ActivityPicPath = editactivitie.actImg;
        B.BackGroundColor = editactivitie.bgcolor;
        B.BackGroundImage = editactivitie.bgImage;
        B.IsBT = editactivitie.bgImageIsrepeat;
        B.Content = UE.utils.unhtml(UE.getEditor("myEditor").getContent());
        B.LimitStartTime = $("#startDate").val() + " " + $("#startHour").val() + ":00";
        B.LimitEndTime = $("#endDate").val() + " " + $("#endHour").val() + ":00";
        B.SpreadLink = editactivitie.purl;
        B.PrizeInfos = [];
        for (var A = 1; A <= awardsCount; A++) {
            var C = {
                Id: $("#pri_id" + A).val(),
                UserId: editactivitie.userid,
                ShareCount: $.trim($("#pri_ShareCount" + A).val()) == "" ? "0" : $.trim($("#pri_ShareCount" + A).val()),
                PrizeContent: editactivitie.converthtml($.trim($("#pri_Content" + A).val())),
                IsLimitPrizeCount: true,
                LimitPrizeCount: $.trim($("#pri_Count" + A).val()) == "" ? "0" : $.trim($("#pri_Count" + A).val())
            };
            B.PrizeInfos.push(C)
        }
        B.ExchangeMethod = editactivitie.converthtml($.trim($("#ExchangeMethod").val()));
        B.Phone = $.trim($("#telePhone").val());
        $.ajax({
            url: "/Activity/CheckedMdy",
            type: "post",
            datatype: "text",
            data: {
                "activity": JSON.stringify(B)
            },
            success: function(G) {
                if (G.state == "ok") {
                    $("#tijiaoOKDialog").dialog("open")
                } else {
                    $(".tijiao").removeAttr("disabled");
                    alert("修改失败：" + G.msg)
                }
            }
        })
    }
};
