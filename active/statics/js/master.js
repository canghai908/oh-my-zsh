//是否允许创建新的活动,用于“创建活动”按钮的点击事件
var master = {
    addact: function() {
        $(".activities").attr("disabled", "disabled");
        $.ajax({
            url: "./data/Activity/isAllowAdd/success.json",
            type: "get",
            success: function(A) {
                if (A.result == "true") { //允许创建
                    $(".activities").removeAttr("disabled");
                    location.href = "/active/add.html"; //转到创建活动页面
                } else { //不允许创建
                    $("#addwaring").show();
                    setTimeout(function() {
                        $("#addwaring").hide();
                        $(".activities").removeAttr("disabled")
                    }, 3000);
                };
            }
        });
    },
    editact: function() {
        $(".activities").attr("disabled", "disabled");
        $.ajax({
            url: "./data/Activity/isAllowAdd/success.json",
            type: "get",
            success: function(A) {
                if (A.result == "true") { //允许创建
                    $(".activities").removeAttr("disabled");
                    location.href = "/active/edit.html"; //转到创建活动页面
                } else { //不允许创建
                    $("#addwaring").show();
                    setTimeout(function() {
                        $("#addwaring").hide();
                        $(".activities").removeAttr("disabled")
                    }, 3000);
                };
            }
        });
    }
};

//格式化CST日期的字串
function formatCSTDate(strDate, format) {
    return formatDate(new Date(strDate), format);
}

//格式化日期,
function formatDate(date, format) {
    var paddNum = function(num) {
            num += "";
            return num.replace(/^(\d)$/, "0$1");
        }
        //指定格式字符
    var cfg = {
        yyyy: date.getFullYear() //年 : 4位
            ,
        yy: date.getFullYear().toString().substring(2) //年 : 2位
            ,
        M: date.getMonth() + 1 //月 : 如果1位的时候不补0
            ,
        MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
            ,
        d: date.getDate() //日 : 如果1位的时候不补0
            ,
        dd: paddNum(date.getDate()) //日 : 如果1位的时候补0
            ,
        hh: date.getHours() //时
            ,
        mm: date.getMinutes() //分
            ,
        ss: date.getSeconds() //秒
    }
    format || (format = "yyyy-MM-dd hh:mm:ss");
    return format.replace(/([a-z])(\1)*/ig, function(m) {
        return cfg[m];
    });
}

//格式化CST日期的字串
function formatCSTDate2(strDate, format) {
    return formatDate2(new Date(strDate), format);
}

//格式化日期,
function formatDate2(date, format) {
    var paddNum = function(num) {
            num += "";
            return num.replace(/^(\d)$/, "0$1");
        }
        //指定格式字符
    var cfg = {
        yyyy: date.getFullYear() //年 : 4位
            ,
        yy: date.getFullYear().toString().substring(2) //年 : 2位
            ,
        M: date.getMonth() + 1 //月 : 如果1位的时候不补0
            ,
        MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
            ,
        d: date.getDate() //日 : 如果1位的时候不补0
            ,
        dd: paddNum(date.getDate()) //日 : 如果1位的时候补0
            ,
        hh: date.getHours() //时
            ,
        mm: date.getMinutes() //分
            ,
        ss: date.getSeconds() //秒
    }
    format || (format = "yyyy-MM-ddThh:mm:ss");
    return format.replace(/([a-z])(\1)*/ig, function(m) {
        return cfg[m];
    });
}

var user = store.get('user');











