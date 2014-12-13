    var user = store.get('user');
    if(user == "undefined"){
        location.href = "/merchant/index.html";
    };
    $("#name1").text(user.mail);
    $("#merchant_name").text(user.name);
    $("#merchant_time").text(formatCSTDate(user.create_datetime,"yyyy.MM.dd"));

    $("#hd_num_0").text(user.active_num);
    $("#hd_num_1").text(user.inactive_num);
    $("#hd_num_2").text(user.inactive_num);
    $("#hd_num_3").text(user.active_num);
    $("#hd_num_4").text(user.remain_num);

    $("#quit").on({
        click: function() {
            store.clear();
            location.href = "/merchant/index.html";
        }
    });

    var go = function (){
        $.ajax({
            url: "/merchant/get_userinfo",
            type: "get",
            dataType:"json",
            success: function (A) {
                if(A.name){
                    
                }else{
                    store.clear();
                    location.href = "/merchant/index.html";
                };
            }
        })
        
        _timer=setTimeout(go,60000);
    };
    
    go();


    // var jrlxl = {
    //     init: function () {
    //         $.ajax({
    //             url: "/merchant/promotion_list",
    //             type: "get",
    //             dataType: "json",
    //             success: function(data) {
                   
    //             }
    //         });
    //     }
    // };
    // jrlxl.init();



























