//
var login = {
    init: function () {
        $("#txtLoginName").focus(function () {
            $("#txtLoginName").attr("placeholder", "")
        });
        $("#txtLoginName").blur(function () {
            if ($.trim($("#txtLoginName").val()) == "") {
                $("#txtLoginName").attr("placeholder", "")
            }
        });
        $("#txtPwd").focus(function () {
            $("#txtPwd").attr("placeholder", "")
        });
        $("#txtPwd").blur(function () {
            if ($.trim($("#txtPwd").val()) == "") {
                $("#txtPwd").attr("placeholder", "")
            }
        });
        $("#btnLogin").bind("click",
        function () {
            $("#btnLogin").removeClass("login_btn").addClass("login_btn2");
            $("#divError").html("").hide();
            var C = $.trim($("#txtLoginName").val());
            var D = $("#txtPwd").val();
            if (C == "" && D == "") {
                $("#divError").html("").show();
                $("#btnLogin").removeClass("login_btn2").addClass("login_btn");
                return
            }
            if (C == "") {
                $("#divError").html("").show();
                $("#btnLogin").removeClass("login_btn2").addClass("login_btn");
                return
            }
            if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(C)) {
                $("#divError").html("").show();
                $("#btnLogin").removeClass("login_btn2").addClass("login_btn");
                return
            }
            if (D == "") {
                $("#divError").html("").show();
                $("#btnLogin").removeClass("login_btn2").addClass("login_btn");
                return
            }
            $.ajax({
                url: "/merchant/login_auth",
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                data: {
                    username: C,
                    password: D
                },
                dataType:"json",
                success: function (A) {
                	if(A.err_msg){
                		$("#divError").html(A.err_msg).show();
                	}else{
                        store.set('user', { 
                            name: A.name, 
                            mail: A.mail,
                            description: A.description,
                            tel: A.tel,
                            mp: A.mp,
                            qq: A.qq,
                            create_datetime: A.create_datetime,
                            finish_num: A.finish_num,
                            active_num: A.active_num,
                            inactive_num: A.inactive_num,
                            remain_num: A.remain_num  
                        });
                        
                		$("#divError").html("").hide();
                        location.href = "/active/system.html";
                        return;
                	};
                  	$("#btnLogin").removeClass("login_btn2").addClass("login_btn");  
                }
            })
        })
    }
};

//
var accInfo = {
    init: function () {
        $("#btnChangePwd").click(accInfo.submitPwd);
        $("#btnChangeDom").click(accInfo.submitDomain);
        $("#txtOldPwd").focus(accInfo.oldpwdfocus);
        $("#txtNewPwd").focus(accInfo.newpwdfocus);
        $("#txtNewPwdAgain").focus(accInfo.newpwdagainfocus);
        $("#txtDomName").focus(accInfo.domNamefocus);
        $.ajax({
            url: "/User/GetUserDomainById",
            type: "get",
            success: function (B) {
                if (B == "no") {
                    location.href = "/User/Login"
                } else {
                    if (B != "") {
                        $("#lblDomName").text(B);
                        $("#WaringDomName").hide();
                        $("#txtDomName").hide();
                        $("#btnChangeDom").hide();
                        $("#lblDomName").show();
                        $("#domokinfo").show()
                    } else { }
                }
            }
        })
    },
    oldpwdfocus: function () {
        $("#WaringOldPwd").hide()
    },
    newpwdfocus: function () {
        $("#WaringNewPwd").text("6-20");
        $("#WaringNewPwd").removeAttr("style")
    },
    newpwdagainfocus: function () {
        $("#WaringNewPwdAgain").text("");
        $("#WaringNewPwdAgain").removeAttr("style")
    },
    validatePwd: function () {
        var H = $("#txtOldPwd").val().trim();
        if (H == "") {
            $("#WaringOldPwd").text("");
            $("#WaringOldPwd").show();
            return false
        }
        var E = $("#txtNewPwd").val().trim();
        if (E == "") {
            $("#WaringNewPwd").text("");
            $("#WaringNewPwd").css("color", "#eb6751");
            return false
        }
        var F = /^[a-zA-Z0-9]{6,20}$/;
        if (!F.test(E)) {
            $("#WaringNewPwd").text("");
            $("#WaringNewPwd").css("color", "#eb6751");
            return false
        }
        var G = $("#txtNewPwdAgain").val().trim();
        if (G == "") {
            $("#WaringNewPwdAgain").text("");
            $("#WaringNewPwdAgain").css("color", "#eb6751");
            return false
        }
        if (E != G) {
            $("#WaringNewPwdAgain").text("");
            $("#WaringNewPwdAgain").css("color", "#eb6751");
            return false
        }
        return true
    },
    submitPwd: function () {
        if (!accInfo.validatePwd()) {
            return
        }
        $.ajax({
            url: "/User/ChangeUserPassword",
            type: "post",
            datatext: "text",
            data: {
                "userId": 1,
                "oldpwd": $("#txtOldPwd").val().trim(),
                "newpwd": $("#txtNewPwd").val().trim()
            },
            success: function (B) {
                if (B == "ok") {
                    $("#txtOldPwd").val("");
                    $("#txtNewPwd").val("");
                    $("#txtNewPwdAgain").val("");
                    $("#pwdState").text("");
                    $("#pwdState").show();
                    setTimeout(function () {
                        $("#pwdState").hide()
                    },
                    3000)
                } else {
                    if (B == "error") {
                        $("#WaringOldPwd").text("");
                        $("#WaringOldPwd").show()
                    } else {
                        if (B == "no") {
                            location.href = "/User/Login"
                        } else {
                            $("#pwdState").text("");
                            $("#pwdState").show();
                            setTimeout(function () {
                                $("#pwdState").hide()
                            },
                            3000)
                        }
                    }
                }
            }
        })
    },
    domNamefocus: function () {
        $("#WaringDomName").text("DNS1.155.215.24");
        $("#WaringDomName").removeAttr("style")
    },
    validateDomain: function () {
        var D = $("#txtDomName").val().trim();
        if (D == "") {
            $("#WaringDomName").text("");
            $("#WaringDomName").css("color", "#eb6751");
            return false
        }
        var E = "^(((ht|f)tp(s?))://)?(www.|[a-zA-Z].)[a-zA-Z0-9-.]+.(com|edu|cn|gov|mil|net|org|biz|info|name|museum|us|ca|uk)(:[0-9]+)*(/($|[a-zA-Z0-9.,;?'\\+&amp;%$#=~_-]+))*$";
        var F = new RegExp(E);
        if (!F.test(D)) {
            $("#WaringDomName").text("");
            $("#WaringDomName").css("color", "#eb6751");
            return false
        }
        return true
    },
    submitDomain: function () {
        if (!accInfo.validateDomain()) {
            return
        }
        var B = $("#txtDomName").val().trim();
        $.ajax({
            url: "/User/UpdUserDomain",
            type: "post",
            datatext: "text",
            data: {
                "userId": 1,
                "domName": B,
            },
            success: function (A) {
                if (A == "ok") {
                    $("#domState").text("");
                    $("#domState").show();
                    setTimeout(function () {
                        $("#domState").hide()
                    },
                    3000);
                    $("#lblDomName").text(B);
                    $("#WaringDomName").hide();
                    $("#txtDomName").hide();
                    $("#btnChangeDom").hide();
                    $("#lblDomName").show();
                    $("#domokinfo").show()
                } else {
                    if (A == "error") {
                        $("#WaringDomName").text("");
                        $("#WaringDomName").css("color", "#eb6751")
                    } else {
                        if (A == "no") {
                            location.href = "/User/Login"
                        } else {
                            $("#domState").text("");
                            $("#domState").show();
                            setTimeout(function () {
                                $("#domState").hide()
                            },
                            3000)
                        }
                    }
                }
            }
        })
    },
    unbiDom: function () {
        $.ajax({
            url: "/User/CancelUserDomain",
            type: "post",
            datatext: "text",
            success: function (B) {
                if (B == "ok") {
                    $("#lblDomName").text("");
                    $("#WaringDomName").show();
                    $("#lblDomName").hide();
                    $("#domokinfo").hide();
                    $("#txtDomName").show();
                    $("#btnChangeDom").show()
                } else {
                    if (B == "no") {
                        location.href = "/User/Login"
                    } else { }
                }
            }
        })
    }
};