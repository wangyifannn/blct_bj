    toastr.options = messageOpts;
    var messageOpts = {
        "closeButton": true, //是否显示关闭按钮
        "debug": false, //是否使用debug模式
        "positionClass": "toast-top-center", //弹出窗的位置
        "onclick": null,
        "showDuration": "300", //显示的动画时间
        "hideDuration": "800", //消失的动画时间
        "timeOut": "500", //展现时间
        "showEasing": "swing", //显示时的动画缓冲方式
        "hideEasing": "linear", //消失时的动画缓冲方式
        "showMethod": "fadeIn", //显示时的动画方式
        "hideMethod": "fadeOut" //消失时的动画方式
    };

    var pass = document.getElementsByClassName("pass_input")[0];
    var users = {};
    var successUser = {};
    $(document).ready(function() {
        var local_user = window.localStorage.getItem("userinfo");
        local_user = JSON.parse(local_user);
        if (local_user != null) {
            $(".pass_input").val(local_user.pass);
            $(".user_input").val(local_user.name);
        }
        // 密码是否可见
        var flag = false;
        var motionLogin = document.getElementsByName("autologin")[0];
        //        var allurl = window.allurl = "http://36.110.56.189:8848";
        var allurl = window.allurl = "";

        function LoginAjax(url, data, type) {
            // 登录
            $.ajax({
                url: url,
                type: type,
                data: data,
                dataType: "jsonp", //数据类型为jsonp  
                jsonp: "jsonpCallback", //服务端用于接收callback调用的function名的参数  
                beforeSend: function() {},
                success: function(res) {
                    console.log(res);
                    if (res.ret == false) {
                        toastr.warning(res.msg, "提示", messageOpts);
                        $(".logininfo_group").html(res.msg);
                        successUser.flag = false;
                    } else {
                        toastr.success(res.msg, "提示", messageOpts);
                        $(".logininfo_group").html(res.msg);
                        successUser.flag = true;
                        window.localStorage.userinfo = JSON.stringify(data);
                        window.localStorage.successUser = JSON.stringify(res);

                        var isRat = false
                        res.data.roles.forEach(item => {
                            // alert(item.keyWord)
                            if (item.keyWord == 'rta') {
                                isRat = true
                            }
                        });
                        setTimeout(function() {
                            if (isRat) {
                                window.location.href = "/car-management/index.html#carmap";
                            } else {
                                window.location.href = "/car-management/index.html#carCheck";
                            }
                        }, 50)

                    }
                }
            })
        }
        // 切换登录方式
        $(".change_logintype").unbind('click').bind('click', function() {
            if ($(this).hasClass("employcard")) {
                $(".box_title").html("用户NET ID登录");
                $(this).html("员工卡号登录");
                $(this).removeClass("employcard");
            } else {
                $(".box_title").html("员工卡号登录");
                $(this).html("用户NET ID登录");
                $(this).addClass("employcard");
            }
        });
        // 点击登录按钮进行判断
        $(".login_btn").unbind('click').bind('click', function() {
            var motionLogin = document.getElementsByName("autologin")[0];
            var url = allurl + "/car-management/user/login.action";
            var auto = true;
            if (!motionLogin.checked) {
                auto = false;
            }
            var data = {
                NETID: $(".user_input").val(),
                password: $(".pass_input").val(),
                autologin: auto
            }
            if ($(".change_logintype").hasClass("employcard")) {
                url = allurl + "/car-management/user/logintwo.action";
                data = {
                    employeeCard: $(".user_input").val(),
                    password: $(".pass_input").val(),
                    autologin: auto
                }
            }
            LoginAjax(url, data, "post");
        });
        //回车提交事件
        $("body").keydown(function() {
            if (event.keyCode == "13") { //keyCode=13是回车键
                var motionLogin = document.getElementsByName("autologin")[0];
                var url = allurl + "/car-management/user/login.action";
                var auto = true;
                if (!motionLogin.checked) {
                    auto = false;
                }
                var data = {
                    NETID: $(".user_input").val(),
                    password: $(".pass_input").val(),
                    autologin: auto
                }
                if ($(".change_logintype").hasClass("employcard")) {
                    url = allurl + "/car-management/user/logintwo.action";
                    data = {
                        employeeCard: $(".user_input").val(),
                        password: $(".pass_input").val(),
                        autologin: auto
                    }
                }
                LoginAjax(url, data, "post");
            }
        });
        $("#rember").prop("checked") == true;
        // 选择下次自动登陆。存入localStorage;
        motionLogin.onclick = function() {
            if (motionLogin.checked) {
                console.log(true);
                users.name = $(".user_input").val();
                users.pass = $(".pass_input").val();
                console.log(users);
                // localStorage只支持string类型的存储。
                window.localStorage.userinfo = JSON.stringify(users);
            } else {
                console.log(false);
                window.localStorage.removeItem("userinfo");
            }
        }
    })