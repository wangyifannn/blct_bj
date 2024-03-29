// 设置消息提示框的配置xinxi
toastr.options = messageOpts;
// //设置显示配置
var messageOpts = {
    "closeButton": true, // 是否显示关闭按钮
    "debug": false, // 是否使用debug模式
    "positionClass": "toast-top-center", // 弹出窗的位置
    "onclick": null,
    "showDuration": "300", // 显示的动画时间
    "hideDuration": "1000", // 消失的动画时间
    "timeOut": "1000", // 展现时间
    "extendedTimeOut": "3000", // 加长展示时间
    "showEasing": "swing", // 显示时的动画缓冲方式
    "hideEasing": "linear", // 消失时的动画缓冲方式
    "showMethod": "fadeIn", // 显示时的动画方式
    "hideMethod": "fadeOut" // 消失时的动画方式
};
var errormessageOpts = {
    "closeButton": true, // 是否显示关闭按钮
    "debug": false, // 是否使用debug模式
    "positionClass": "toast-top-center", // 弹出窗的位置
    "onclick": null,
    "showDuration": "300", // 显示的动画时间
    "hideDuration": "1000", // 消失的动画时间
    "timeOut": "1000", // 展现时间
    "extendedTimeOut": "5000", // 加长展示时间
    "showEasing": "swing", // 显示时的动画缓冲方式
    "hideEasing": "linear", // 消失时的动画缓冲方式
    "showMethod": "fadeIn", // 显示时的动画方式
    "hideMethod": "fadeOut" // 消失时的动画方式
};
var allurl = window.allurl = "";
// var allurl = window.allurl = "http://47.98.182.165";
// var allurl = window.allurl = "http://36.110.56.189:8848";
var islogin = window.islogin = localStorage.getItem("successUser");
islogin = window.islogin = JSON.parse(islogin);
if (islogin != null && islogin.ret == true) {
    $(".user-name").html(islogin.data.nickname);
    if (islogin.data.roles.length > 0) {
        $(".user-role").html(islogin.data.roles[0].name);
    } else {
        $(".user-role").text("");
    }
} else {
    // console.log("没有登录");
}

$(".loginout").unbind('click').bind('click', function() {
    var sub_url = "/car-management/user/loginOut.action";
    window.location.href = sub_url;
});
// 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
function changdate(date) {
    var date = new Date(date);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date
            .getMonth() + 1) +
        '-';
    D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) +
        ':';
    m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) +
        ':';
    s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    return Y + M + D + h + m + s;
}

var todayDate = new Date();
var dateend = new Date(todayDate);
var date3month = new Date(todayDate);
dateend.setDate(todayDate.getDate() + 365); // 授权，默认一年
var date3end = todayDate.getTime() + 4 * 1000 * 60 * 60; // 4小时后，预计完成

var userchange = [{
    "name": "用户名",
    "type": "text",
    "inputName": "nickname",
    "must": "*"
}, {
    "name": "旧密码",
    "type": "text",
    "inputName": "oldPass",
    "must": "*"
}, {
    "name": "新密码",
    "type": "text",
    "inputName": "newPass",
    "must": "*"
}];
$(".changepass").unbind('click').bind('click', function() {
    $("#add_model").modal();
    $("#add_model #myModalLabel").html("修改密码");
    creatForm(userchange, "#add_model .modal-body form",
        "changepass");
    $("#add_model .modal-body form .nickname").val(
        islogin.data.nickname);
    $(".changepass")
        .unbind('click')
        .bind(
            'click',
            function() {
                var sub_data = $(
                        "#add_model .modal-body form")
                    .serializeObject();
                sub_data.uid = islogin.data.uid;
                var sub_url = allurl +
                    "/car-management/user/changeUserPassWord.action";
                $(this).attr({
                    "data-dismiss": "modal",
                    "aria-label": "Close"
                });
                sub_data = JSON.stringify(sub_data);
                subData(sub_url, sub_data, "post",
                    "changepass");
            })
});

var developerInfo = [{
    "name": "开发者电话",
    "type": "text",
    "inputName": "tel",
    "must": ""
}, {
    "name": "开发者邮箱",
    "type": "text",
    "inputName": "mail",
    "must": ""
}]

$(".developerInfo").unbind("click").bind("click", function() {
    $("#add_model").modal();
    $("#add_model #myModalLabel").html("开发人员信息");
    creatForm(developerInfo, "#add_model .modal-body form", "developerInfo");
    $("#add_model .modal-body form label").css({
        margin: 0
    })
    $("#add_model .modal-body form .form_btngroup").css({
        width: '50px'
    }).find('.developerInfo').hide().next().html('关闭')
    $("#add_model .modal-body form .tel").val('15691812098').attr('readonly', true).css({
        width: '210px'
    });
    $("#add_model .modal-body form .mail").val('wang.chunsen@hardcan.com').attr('readonly', true).css({
        width: '210px'
    });
})

date3month.setDate(todayDate.getDate() + 100); // 最大值日期，3个月后
lay('.much-date').each(function() {
    laydate.render({
        elem: this,
        trigger: 'click',
        format: 'yyyy-MM-dd',
        value: null,
        theme: '#041473'
    });
});
lay('.today-date').each(function() {
    laydate.render({
        elem: this,
        trigger: 'click',
        format: 'yyyy-MM-dd',
        value: todayDate,
        theme: '#041473'
    });
});
lay('.end-date').each(function() {
    laydate.render({
        elem: this,
        trigger: 'click',
        format: 'yyyy-MM-dd',
        value: dateend,
        theme: '#041473'
    });
});
lay('.end-3date').each(function() {
    laydate.render({
        elem: this,
        trigger: 'click',
        format: 'yyyy-MM-dd',
        value: changdate(date3end),
        theme: '#041473'
    });
});

/**
 * 获取hash参数
 */
function getHashParameter(key) {
    var params = getHashParameters();
    return params[key];
}

function getHashParameters() {
    var arr = (location.hash || "").replace(/^\#/, '').split("&");
    var params = {};
    for (var i = 0; i < arr.length; i++) {
        var data = arr[i].split("=");
        if (data.length == 2) {
            params[data[0]] = data[1];
        }
    }
    return params;
}
// 表单重置
function myformReset(boxname) {
    $(boxname + ':input', 'form').not(':button,:radio,:submit') // 去除不需要重置的input类型
        .val('').removeAttr('checked').removeAttr('selected');
};
// s 页面懒加载
document.onreadystatechange = loadingChange; // 当页面加载状态改变的时候执行这个方法.
function loadingChange() {
    if (document.readyState == "complete") { // 当页面加载状态为完全结束时进入
        $(".loading").hide(); // 当页面加载完成后将loading页隐藏
        $(".fixed-table-loading").hide(); // 当页面加载完成后将loading页隐藏
    } else {
        setTimeout(function() {
            $(".loading").hide(); // 当页面加载完成后将loading页隐藏
            $(".fixed-table-loading").hide(); // 当页面加载完成后将loading页隐藏
        }, 3000)
    }
}
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
            o[this.name] = o[this.name].join(",");
        } else {
            o[this.name] = this.value || '';
        }
    });
    var $radio = $('input[type=radio],input[type=checkbox]', this);
    $.each($radio, function() {
        if (!o.hasOwnProperty(this.name)) {
            o[this.name] = '[]';
        }
    });
    return o;
};
// 表单正则判断函数
function inputVal(inputid, but) {
    var reg = /^\d{1,}$/; // 必须为int型
    var originhtml = $(inputid).siblings().html();
    $(inputid).bind(
        'input porpertychange',
        function() {
            var val = $(inputid).val();
            if (val == "") {
                return;
            }
            var regg = reg.test(val);
            if (regg == false) {
                $(inputid).siblings().html("格式不正确");
                $(inputid).siblings().removeClass("col-sm-2").addClass(
                    "col-sm-5 vSn_tips");
                $(but).attr("disabled", true);
            } else {
                $(inputid).siblings().html(originhtml);
                $(inputid).siblings().removeClass("col-sm-5 vSn_tips")
                    .addClass("col-sm-2");
                $(but).attr("disabled", false);
            }
        });
}
// checkbox 反选
function Invert(btn, name) {
    $(btn).unbind('click').bind('click', function() {
        $(name + ' input[name="checkbox"]').prop("checked", this.checked);
    });
    var $subBox = $(name + " input[name='checkbox']");
    $subBox
        .unbind('click')
        .bind(
            'click',
            function() {
                $(btn)
                    .attr(
                        "checked",
                        $subBox.length == $(name +
                            " input[name='checkbox']:checked").length ? true :
                        false);
            });
}

// 删除所有接口
function deletAll(a, name) {
    var delArr = [];
    var nameArr = [];
    var vSnArr = [];
    var delUserArr = [];
    var nicknameArr = [];
    var delString = "";
    var delata = {};
    if (a.length >= 1) {
        for (var i = 0; i < a.length; i++) {
            delArr.push(a[i].id);
            nameArr.push(a[i].name);
            nicknameArr.push(a[i].nickname);
            vSnArr.push(a[i].vSn);
            delUserArr.push(a[i].uid);
        }
        delString = delArr.join(",");
        nameString = nameArr.join(",");
        vSnString = vSnArr.join(",");
        delUserString = delUserArr.join(",");
        nicknameString = nicknameArr.join(",");
        delata = {
            "ids": delString
        };
        if (name == "editcarInfo") { // 编辑更新车辆信息
            $("#add_model").modal();
            $("#add_model #myModalLabel").html("编辑车辆信息");
            creatForm(addcarInfo, "#add_model .modal-body .form-horizontal",
                "subcar_btn");
        } else if (name == "checkpoint_cartype_update") { // 检测站车型更新
            if (a.length > 1) {
                toastr.warning('只能选中一行', '提示', errormessageOpts);
                return;
            }
            $("#add_model").modal();
            $("#add_model #myModalLabel").html("检测站车型更新");
            creatForm(cartypeInfo, "#add_model .modal-body .form-horizontal",
                "checkpointtype");
            showData("#add_model .modal-body .form-horizontal", a[0]);
            $(".checkpointtype")
                .unbind('click')
                .bind(
                    'click',
                    function() {
                        var url = allurl +
                            "/car-management/car/updateVehicleTestingStationType.action";
                        var sub_data = $("#add_model .modal-body form")
                            .serializeObject();
                        subData(url, sub_data, "get",
                            "checkpoint_cartype_update", "");
                        $(this).attr({
                            "data-dismiss": "modal",
                            "aria-label": "Close"
                        });
                    })
        } else if (name == "Ins_apply" || name == "Ins_applyAgain") { // 保险申请
            var approveInsArr = [];
            var istatusArr = []; // 保险状态
            for (var i = 0; i < a.length; i++) {
                approveInsArr.push(a[i].id);
                istatusArr.push(a[i].istatus);
            }
            approveInsString = approveInsArr.join(","); // b="0-1-2-3-4-5"
            istatusString = istatusArr.toString();
            if (istatusString.indexOf("已申请") != -1 ||
                istatusString.indexOf("已续保") != -1) {
                toastr.warning('车辆保险已申请，正在办理中', '提示', messageOpts);
                return;
            } else if (istatusString.indexOf("未续保") != -1 && name == "Ins_apply") {
                toastr.warning('请联系管理员进行续保', '提示', messageOpts);
                return;
            }
            $("#apply_model").modal();
            $("#apply_model #myModalLabel").html("保险申请");
            if (name == "Ins_applyAgain") {
                $("#apply_model #myModalLabel").html("续保申请");
            }
            creatForm(InsApplyInfo, "#apply_model .modal-body form",
                "approve_btn");
            var confirmInfo = '<div class="confirm_group">' +
                '<span class="confirm_name">请确认您申请的车辆编号是：</span><span class="confirm_val" style="color:green;weight:bolder;">' +
                a[0].vSn + '</span>' + '</div>';
            $("#apply_model .modal-body form").html(
                confirmInfo + $("#apply_model .modal-body").html());
            $("#apply_model .modal-body .confirm_val").html(vSnString);
            $("#apply_model .modal-body .insrange").val(1);
            $(".approve_btn")
                .unbind('click')
                .bind(
                    'click',
                    function() { // 点击确认
                        $(this).attr({
                            "data-dismiss": "modal",
                            "aria-label": "Close"
                        });
                        var approveInsobj = {
                            numtime: $(
                                    "#apply_model .modal-body .insrange")
                                .val(),
                            vSns: vSnString
                        };
                        if ($("#apply_model .modal-body .insrange")
                            .val() != 1) {
                            $("#del_model").modal();
                            $("#del_model .text-center").html(
                                "您申请的保险期限不为1年，确认继续申请？")
                            $(".modal_del")
                                .unbind('click')
                                .bind(
                                    'click',
                                    function() {
                                        $(this)
                                            .attr({
                                                "data-dismiss": "modal",
                                                "aria-label": "Close"
                                            });
                                        delPort(
                                            allurl +
                                            "/car-management/insurance/apply.action",
                                            approveInsobj,
                                            "post", name,
                                            "申请保险",
                                            "申请保险失败",
                                            "申请保险成功");
                                    })
                        } else {
                            delPort(
                                allurl +
                                "/car-management/insurance/apply.action",
                                approveInsobj, "post", name,
                                "申请保险", "申请保险失败", "申请保险成功");
                        }

                    })
        } else if (name == "driverdel") { // 删除驾驶员
            $("#del_model").modal();
            $(".modal_del")
                .unbind('click')
                .bind(
                    'click',
                    function() {
                        $(this).attr({
                            "data-dismiss": "modal",
                            "aria-label": "Close"
                        });
                        // console.log(delata)
                        delPort(
                            allurl +
                            "/car-management/driver/delete.action",
                            delata, "get", name, "驾驶员删除",
                            "驾驶员删除失败", "驾驶员删除成功");
                    })
        } else if (name == "userdel") { // 删除用户
            $("#del_model").modal();
            $("#del_model .text-center").html("确定删除用户？");
            $(".modal_del").unbind('click').bind('click', function() {
                $(this).attr({
                    "data-dismiss": "modal",
                    "aria-label": "Close"
                });
                var sub_url = allurl + "/car-management/user/delete.action";
                var sub_data = {
                    "ids[]": delUserArr
                };
                subData(sub_url, sub_data, "get", "userdel");
                return;
            })
        } else if (name == "maintainList_del") { // 批量删除维修车辆
            $("#del_model").modal();
            $("#del_model .text-center").html("确定删除维修车辆记录？");
            $(".modal_del").unbind('click').bind('click', function() {
                $(this).attr({
                    "data-dismiss": "modal",
                    "aria-label": "Close"
                });
                console.log(delUserArr);
                var sub_url = allurl + "/car-management/carmaintain/delete.action";

                subData(sub_url, delata, "get", "maintainList_del");
                return;
            })
        } else if (name == "mushUserRelateRole") { // 用户批量关联角色
            $("#apply_model").modal();
            $("#apply_model #myModalLabel").html("用户分配角色");
            creatForm(user_roleInfo, "#apply_model .modal-body form",
                "mushUserRelateRole");
            var confirmInfo = '<div class="confirm_group">' +
                '<span class="confirm_name">请确认您分配角色的用户是：</span><span class="confirm_val" style="color:green;weight:bolder;">' +
                nicknameString + '</span>' + '</div>';
            $("#apply_model .confirm_group").remove();
            $("#apply_model .modal-body .form").prepend(confirmInfo);
            $(".mushUserRelateRole")
                .unbind('click')
                .bind(
                    'click',
                    function() {
                        // 用户关联角色
                        var sub_data = $(
                                "#apply_model .modal-body form")
                            .serialize();
                        sub_data = sub_data + "&uid=" + delUserString;
                        var sub_url = allurl +
                            "/car-management/user/bacthUserRelatedRole.action";
                        subData(sub_url, sub_data, "get",
                            "mushUserRelateRole");
                        $(this).attr({
                            "data-dismiss": "modal",
                            "aria-label": "Close"
                        });
                    })
        } else if (name == "cancelimpower") { // 取消驾驶员授权
            $("#del_model").modal();
            $(this).attr({
                "data-dismiss": "modal",
                "aria-label": "Close"
            });
            $("#del_model .text-center")
                .html(
                    '<i class="glyphicon glyphicon-remove"></i>&nbsp;&nbsp;<span>确认要取消授权吗？</span>');
            $(".modal_del")
                .unbind('click')
                .bind(
                    'click',
                    function() {
                        $(this).attr({
                            "data-dismiss": "modal",
                            "aria-label": "Close"
                        });
                        delPort(
                            allurl +
                            "/car-management/driver/cancelAuthorized.action",
                            delata, "get", name, "驾驶员取消授权",
                            "驾驶员取消授权失败", "驾驶员取消授权成功");

                    })
        } else if (name == "approve_all") { // 驾驶员授权
            loadDriverGroup();
            var approveArr = [];
            for (var i = 0; i < a.length; i++) {
                approveArr.push(a[i].id);
            }
            approveString = approveArr.join(","); // b="0-1-2-3-4-5"
            $("#add_model").modal();
            $("#add_model #myModalLabel").html("驾驶员授权");
            var confirmInfo = '<div class="confirm_group">' +
                '<span class="confirm_name">请确认您授权的驾驶员是：</span><span class="confirm_val" style="color:green;weight:bolder;">' +
                nameString + '</span></div>';
            setTimeout(function() {
                creatForm(approveInfo, "#add_model .modal-body form",
                    "approve_btn");
                $(".approve_btn").unbind('click').bind(
                    'click',
                    function() { // 点击确认
                        var sub_data = $("#add_model .modal-body form")
                            .serializeObject();
                        if (sub_data.gid == "[]") {
                            sub_data.gid = "";
                        }
                        sub_data.ids = approveString;
                        var sub_url = allurl +
                            "/car-management/driver/authorized.action";
                        subData(sub_url, sub_data, "get", "approve_btn", "");
                        $(this).attr({
                            "data-dismiss": "modal",
                            "aria-label": "Close"
                        });
                    })
            }, 100);
            // $("#add_model .modal-body form").html(confirmInfo + $("#add_model
            // .modal-body").html());

        } else if (name == "drivergroupdel") { // 删除驾驶员分组
            $("#del_model").modal();
            $(".modal_del")
                .unbind('click')
                .bind(
                    'click',
                    function() {
                        $(this).attr({
                            "data-dismiss": "modal",
                            "aria-label": "Close"
                        });
                        delata.gids = delata.ids
                        delPort(
                            allurl +
                            "/car-management/driver/group/deleteGroup.action",
                            delata, "get", name, "驾驶员分组删除",
                            "驾驶员分组删除失败", "驾驶员分组删除成功");
                    })
        } else if (name == "cargroupdel") { // 删除车辆分组
            $("#del_model").modal();
            $(".modal_del").unbind('click').bind(
                'click',
                function() {
                    $(this).attr({
                        "data-dismiss": "modal",
                        "aria-label": "Close"
                    });
                    delata.gids = delata.ids
                    delPort(allurl + "/car-management/group/delete.action",
                        delata, "get", name, "车辆分组删除", "车辆分组删除失败",
                        "车辆分组删除成功");
                })
        } else if (name == "del_project") { // 删除项目
            $("#del_model").modal();
            $("#del_model .text-center").html("确定删除此项目？");
            $(".modal_del").unbind('click').bind('click', function() {
                $(this).attr({
                    "data-dismiss": "modal",
                    "aria-label": "Close"
                });
                var sub_url = allurl + "/car-management/project/delete.action";
                subData(sub_url, delata, "get", "del_project");
                return;
            })
        } else if (name == "del_customer") { // 删除客户
            $("#del_model").modal();
            $("#del_model .text-center").html("确定删除此客户？");
            $(".modal_del").unbind('click').bind('click', function() {
                $(this).attr({
                    "data-dismiss": "modal",
                    "aria-label": "Close"
                });
                var sub_url = allurl + "/car-management/customer/delete.action";
                subData(sub_url, delata, "get", "del_customer");
                return;
            })
        } else if (name == "row_detail") { // 车辆录入页查看详情
            if (a.length > 1) {
                toastr.warning('只能选中一行', '提示', messageOpts);
                return;
            } else {
                var opt = window.sessionStorage.getItem("opterator");
                window.sessionStorage.carInfo = JSON.stringify(a[0]);
                window.location.hash = "carDetail";
                $("#carlist_detil").parent().attr("href", "#carDetail");
                $("#ins_detail").parent().attr("href", "#carDetail");
                $("#plate_detail").parent().attr("href", "#carDetail");
                $(".carList").removeClass("active");
                $(".plate").removeClass("active");
                $(".insuranceTypeIn ").removeClass("active");
                if (opt == "audit") {
                    $("#returncarForm").hide();
                    $("#InsForm").hide();
                    $("#plateForm").hide();
                    $("#loutinav .audit_hide").hide();
                    $(".audit_btn_group").show();
                } else {
                    $("#returncarForm").show();
                    $("#InsForm").show();
                    $("#plateForm").show();
                    $("#loutinav .audit_hide").show();
                    $(".audit_btn_group").hide();
                }
                // 详情页预加载 接车点检信息和车辆录入信息
                var sub_url = allurl + "/car-management/car/findUpcheck/" +
                    a[0].vSn + ".action";
                subData(sub_url, "", "get", "findUpcheck", "#carDetail #carCheckForm form");
                findProject();
                // 车辆录入信息
                creatForm(addcarInfo, "#carTypeInForm .cartypein_apply_detail", "sub_cartypein");
                var projectsn = "";
                $.ajax({
                    url: allurl + "/car-management/project/likeProjectSn.action?projectsn=" + projectsn,
                    async: false,
                    success: function(res) {
                        var selectOption = "";
                        if (res.length > 0) {
                            for (var i = 0; i < res.length; i++) {
                                selectOption += '<option>' + res[i] + '</option>';
                            }
                        } else {
                            selectOption = '<option>' + "请填写" + '</option>';
                        }
                        $('#carTypeInForm .cartypein_apply_detail .project_sn').html(selectOption);
                    }
                });
                $('#carTypeInForm .cartypein_apply_detail .project_sn').editableSelect({
                    effects: 'slide',
                    filter: true,
                    duration: 200
                });

                $('#carTypeInForm .cartypein_apply_detail .project_sn').editableSelect({
                    effects: 'slide',
                    filter: true,
                    duration: 200,
                    onCreate: function() {},
                });
                gettypeInData(a[0].vSn, "#carTypeInForm .cartypein_apply_detail");
                setTimeout(
                    function() {
                        initsafeCheck("#sCheckForm .pot_Form",
                            "#sCheckForm .safe_Form", "up_sCheck_btn",
                            a[0].vSn);
                        var wurl = allurl +
                            "/car-management/car/findHiCheckByvSn/" +
                            a[0].vSn + ".action";
                        wringcheck(wurl, "wiringCheckDetailtable", "");
                        var getbomapply_url = allurl +
                            "/car-management/car/findEmsAndBomCheckByvSn/" +
                            a[0].vSn + ".action";
                        getcnid(getbomapply_url,
                            "#bomCheckForm .bomcheck_itembox",
                            "sub_bchek_btn");
                        initToolRecord("#toolForm .toolForm", a[0].vSn, "");
                    }, 2000);
                setTimeout(function() {
                    console.log(opt)
                    if (opt == "audit") {
                        findAudit(a[0].vSn, "audit");
                        findReview(a[0].vSn, "audit");
                    } else {
                        findAudit(a[0].vSn, "detail");
                        findReview(a[0].vSn, "detail");
                    }
                    findBackcheck("#returncarForm form", a[0].vSn);
                    $("#returncarForm form input").attr("readonly", true);
                    findinsuranceByvSn(".InsFormDetail", a[0].vSn);
                    historyLicenseByvSn(".plateDetail", a[0].vSn);
                    $("#wiringCheckForm input").attr("disabled", true);
                    $("#bomCheckForm input").attr("disabled", true);
                    $("#main input").attr("readonly", true);
                    $("#main input").addClass("readonly");
                }, 2000);
                $("#main input").attr("readonly", true);
            }
        } else if (name == "yanche_apply") { // 验车申请
            if (a.length > 1) {
                toastr.warning('只能选中一行', '提示', messageOpts);
            } else {
                var sub_url = allurl +
                    "/car-management/license/vehicleInspectionCheck.action?vSn=" +
                    a[0].vSn;
                window.sessionStorage.carInfo = JSON.stringify(a[0]);
                subData(sub_url, "", "get", "yanche", "");
            }
        } else if (name == "cancel_yanche") { // 取消验车，将验车状态改为未申请
            if (a.length > 1) {
                toastr.warning('只能选中一行', '提示', messageOpts);
            } else {
                var sub_url = allurl +
                    "/car-management/license/cancle.action?vSn=" +
                    a[0].vSn;
                subData(sub_url, "", "get", "cancel_yanche", "");
            }
        } else if (name == "upkeepRecord") { // 保养记录
            if (a.length > 1) {
                toastr.warning('只能选中一行', '提示', messageOpts);
                return;
            } else {
                window.sessionStorage.carInfo = JSON.stringify(a[0]);
                window.location.hash = "upkeepRecord";
                $(".maintainList").removeClass("active");
                findUpkeep("#upkeepRecords", a[0].vSn);
            }
        } else if (name == "maintainRecord") { // 保养记录
            if (a.length > 1) {
                toastr.warning('只能选中一行', '提示', messageOpts);
                return;
            } else {
                window.sessionStorage.carInfo = JSON.stringify(a[0]);
                window.location.hash = "maintainRecord";
                $(".maintainList").removeClass("active");
            }
        }
    } else {
        toastr.warning('最少选中一行', '提示', messageOpts);
    }
}
// 删除接口
function delPort(url, dat, type, name, tit, filToa, sucToa) {
    $.ajax({
        url: url,
        type: type,
        data: dat,
        "dataType": "jsonp", // 数据类型为jsonp
        "jsonp": "jsonpCallback", // 服务端用于接收callback调用的function名的参数
        success: function(res) {
            if (res.ret == true) {
                toastr.success(sucToa, tit, messageOpts);
                if (name == "Ins_apply" || name == "Ins_applyAgain") {
                    var pageInfo = window.sessionStorage.getItem("pageInfo");
                    pageInfo = JSON.parse(pageInfo);
                    loadCarList(pageInfo);
                    loadInsuranceList(pageInfo);
                } else if (name == "del_allcar") {} else if (name == "cancel_bind" || name == "cancel_bind_row") { // 解除绑定
                } else if (name == "driverdel" || name == "cancelimpower" ||
                    name == "approve_all") { // 删除驾驶员
                    var pageInfo = window.sessionStorage.getItem("pageInfo");
                    pageInfo = JSON.parse(pageInfo);
                    loadDriverList(pageInfo);
                } else if (name == "sumCarList") {
                    loadsumCarList("");
                } else if (name == "drivergroupdel") {
                    loadDriverGroup();
                } else if (name == "cargroupdel") {
                    loadCarGroup();
                }
            } else {
                toastr.warning(res.msg, tit + "——失败", errormessageOpts);
            }
        },
        "error": function(res) {
            toastr.error('程序内部错误', tit, errormessageOpts);
        }
    })
}
// 车辆录入数据回显
function gettypeInData(vSn, boxname) {
    var sub_url = allurl + "/car-management/car/findAddCar.action?vSn=" + vSn;
    subData(sub_url, "", "get", "getTypeinData", boxname); // 车辆录入提交
}
// 通用数据提交接口
function subData(url, data, type, name, boxname) {
    $.ajax({
        url: url,
        type: type,
        data: data,
        contentType: 'application/json;charset=UTF-8', // contentType很重要
        crossDomain: true,
        success: function(res) {
            var carInfo = window.sessionStorage.getItem("carInfo");
            carInfo = JSON.parse(carInfo);
            if (name != "getTypeinData" && res.ret == true && name != "yanche") {
                toastr.success(res.msg, "提示", messageOpts);
                if (name == "subDriver_btn" || name == "editDriver_btn" || name == "approve_btn") {
                    var pageInfo = window.sessionStorage
                        .getItem("pageInfo");
                    pageInfo = JSON.parse(pageInfo);
                    loadDriverList(pageInfo);
                } else if (name == "addiccard") {
                    var pageInfo = window.sessionStorage
                        .getItem("pageInfo");
                    pageInfo = JSON.parse(pageInfo);
                    findIccard(pageInfo);
                } else if (name == "newcar_typein_sub") { // 车辆录入提交成功
                    gettypeInData($(
                            "#newcarTypeIn .cartypein_apply .vSn")
                        .val(), "#newcarTypeIn .cartypein_apply");
                } else if (name == "typein_sub") { // 车辆录入修改提交成功
                    gettypeInData($("#carTypeIn .cartypein_apply .vSn")
                        .val(), "#carTypeIn .cartypein_apply");
                } else if (name == "role_menus" ||
                    name == "role_rights" ||
                    name == "roleCancleMenu") {
                    loadRoleList();
                } else if (name == "yanche_confirm") {
                    window.location.hash = "plate";
                } else if (name == "addproject") {
                    findProject();
                } else if (name == "update_project" || name == "del_project") {
                    var pageInfo = window.sessionStorage
                        .getItem("pageInfo");
                    pageInfo = JSON.parse(pageInfo);
                    findProject(pageInfo);
                } else if (name == "subcar_btn" || name == "editcar_btn" || name == "carCheck_btn") { // 接车点检和车辆录入

                } else if (name == "carupCheck_btn") {
                    $("#carupCheck .checkform input").attr("readonly", true);
                } else if (name == "returncarCheck_btn") {
                    $(".returncarCheck").removeClass("active");
                    $(".carList").addClass("active");
                    window.location.hash = "carList";
                } else if (name == "maintaintop" || name == "subdivided_btn" || name == "finish_btn") {
                    var pageInfo = window.sessionStorage
                        .getItem("pageInfo");
                    pageInfo = JSON.parse(pageInfo);
                    loadMaintainList(pageInfo);
                } else if (name == "addcargroup" || name == "editcarGroup_btn") {
                    loadCarGroup();
                } else if (name == "adddrivergroup" || name == "editDrivergroup_btn") {
                    loadDriverGroup();
                } else if (name == "addemployee" || name == "update_employ") {
                    findEmployee(); // 维修工添加、更新（已删除，保留代码）
                } else if (name == "sub_cld" || name == "sub_sCheck" || name == "sub_updatesCheck") { // 缸压和安全检查项目
                    initsafeCheck("#sCheck .pot_pressure",
                        "#sCheck .check_itembox", "sCheck_btn",
                        carInfo.vSn);
                    setTimeout(() => {
                        window.location.hash = "carList";
                        $(".carList").addClass("active");
                    }, 500);

                } else if (name == "toolapply") { // 研发申请
                    ToolRecordApply("#carTypeIn .rd_apply", $("#newcarTypeIn .cartypein_apply .vSn").val(), "");
                    if (res.ret == true) {
                        $(".carCheck").removeClass("active");
                        $(".carList").addClass("active");
                        window.location.hash = "carList";
                    }
                } else if (name == "tooldata") { // 研发装备安装
                    initToolRecord("#toolRecord_model .toolForm",
                        carInfo.vSn, "");
                } else if (name == "bomapply") {
                    bomApply(".bom_apply", $(
                            ".cartypein_apply .vSn")
                        .val(), "bomapply_btn");
                } else if (name == "bomapply_update") {
                    bomApply("#carTypeIn .bom_apply", $(
                            "#carTypeIn .cartypein_apply .vSn").val(),
                        "bomapply_btn");

                } else if (name == "sub_bchek") { // bom检查、核对、更新提交成功
                    var getbomapply_url = allurl +
                        "/car-management/car/findEmsAndBomCheckByvSn/" +
                        carInfo.vSn + ".action";
                    getcnid(getbomapply_url,
                        "#bomCheck .bomcheck_itembox",
                        "sub_bchek_btn");
                    setTimeout(() => {
                        window.location.hash = "carList";
                        $(".carList").addClass("active");
                    }, 500);
                } else if (name == "sub_wcheck") { // 线束
                    var wurl = allurl +
                        "/car-management/car/findHiCheckByvSn/" +
                        carInfo.vSn + ".action";
                    wringcheck(wurl, "wiringChecktable", "");

                    window.location.hash = "carList";
                    $(".carList").addClass("active");
                } else if (name == "sub_audit") {
                    $(".carDetail").removeClass("active");
                    $(".carList").addClass("active");
                    window.location.hash = "carList";
                } else if (name == "addInsurance" ||
                    name == "updateInsurance") { // 保险录入
                    loadInsuranceList();
                } else if (name == "upkeep_btn") {} else if (name == "subMaintainApply_btn") {
                    $(".add_maintain_apply").removeClass("active");
                    window.location.hash = "maintainList";
                } else if (name == "editApply") {
                    loadMaintainList();
                } else if (name == "adduser" ||
                    name == "UserReoveRelateRole" ||
                    name == "userdel" || name == "edituser_btn" ||
                    name == "mushUserRelateRole" ||
                    name == "userRelatedRole") { //
                    var pageInfo = window.sessionStorage
                        .getItem("pageInfo");
                    pageInfo = JSON.parse(pageInfo);
                    loadUserList(pageInfo);
                } else if (name == "maintainList_del") {
                    findEmployee();
                    loadMaintainList();
                } else if (name == "checkpoint_cartype_update") { // 监测站车型更新
                    $("#sumcarTable").bootstrapTable('updateCell', {
                        index: index,
                        field: "checkStaionType", // 字段名称
                        value: $("#add_model .type").val()
                    });
                } else if (name == "btn_oilup") { // 油卡录入
                    var oilrow = sessionStorage.getItem("oilrow");
                    oilrow = JSON.parse(oilrow);
                    $("#oilTable").bootstrapTable('updateCell', {
                        index: index,
                        field: "projectSn", // 字段名称
                        value: $("#add_model .projectSn").val()
                            // 新的值
                    });
                    $("#oilTable").bootstrapTable('updateCell', {
                        index: index,
                        field: "vSn", // 字段名称
                        value: $("#add_model .vSn").val()
                    });
                    $("#oilTable").bootstrapTable('updateCell', {
                        index: index,
                        field: "mm", // 字段名称
                        value: $("#add_model .mm").val() // 新的值
                    });
                } else if (name == "projectstatus") {
                    loadsumCarList();
                } else if (name == "bindCarGps") {
                    loadVinList();
                } else if (name == "sub_plate" ||
                    name == "cancel_yanche") { // 车牌录入和修改/取消验车

                    var pageInfo = window.sessionStorage
                        .getItem("pageInfo");
                    pageInfo = JSON.parse(pageInfo);
                    loadPlateList(pageInfo);
                }
            } else if (name == "getTypeinData") {
                $(".car_img").attr("src", "");
                showData(boxname, res);
                $(boxname + " .project_sn").val(res.project_sn);
                $(boxname + " .project_sn").val(res.project_sn);
                $(boxname + " input").attr("readonly", true);
                $(boxname + " input").addClass("readonly");
                if (res == null || res.length == 0 || res == "") {
                    $("#carTypeIn .cartypein_apply .vSn").attr(
                        "readOnly", true);
                    $(".car_img_detail").attr("src", "");
                    $(".car_img_ifupload").html("未上传车辆图片");
                    $(".car_cir_ifupload").html("未上传电路图");
                    $(".car_crd_ifupload").html("未上传CRD文件");
                    $(".car_img").attr("src", "");
                    $(".showCarFileName").html('未上传，请选择');
                    $(".showcircuitryName").html('未上传，请选择');
                    $(".showcrdName").html('未上传，请选择');
                } else {
                    $(boxname + " .vSn").attr("id", res.id);
                    $(boxname + " .vSn").attr("picurl", res.picurl);
                    $(boxname + " .vSn").attr("circuiturl", res.circuiturl);
                    $(boxname + " .vSn").attr("circuitName", res.circuitName);
                    $(boxname + " .vSn").attr("wordurl", res.wordurl);
                    $(boxname + " .vSn").attr("wordName", res.wordName);
                    $(boxname + " input").attr("readonly", true);
                    if (res.picurl != null && res.picurl != "") {
                        $("#picForm .car_img").attr("src", res.picurl);
                        $("#picForm .car_img_ifupload").html("");
                        $(".showCarFileName").html('<img style="width:100px;height:100px;" src = ' + res.picurl + '>');
                    } else {
                        $("#picForm .car_img").attr("src", "");
                        $("#picForm .car_img_ifupload").html("未上传车辆图片");
                        $(".showCarFileName").html('未上传，请选择');
                    }
                    if (res.bomurl != null && res.bomurl != "") {
                        var actionurl = "/car-management/file/download.action?filePath=" + res.bomurl + "&fileName=" + res.circuitName;
                        var download_cir = '<form method="POST" action=' + actionurl + '>' +
                            '<input type="submit" value="下载BOM文件" class="btn btn-default btn-primary down_btn"></form>';
                        $("#picForm .bom_box").html(res.circuitName);
                    } else {
                        $("#picForm .car_bom_ifupload").html("未上传bom文件");
                    }
                    if (res.circuiturl != null && res.circuitName != "") {
                        var actionurl = "/car-management/file/download.action?filePath=" + res.circuiturl + "&fileName=" + res.circuitName;
                        var download_cir = '<form method="POST" action=' + actionurl + '>' +
                            '<input type="submit" value="下载电路图" class="btn btn-default btn-primary down_btn"></form>';
                        $("#picForm .circuitry_box").html(download_cir);
                        $(".showcircuitryName").html(res.circuitName);
                    } else {
                        $("#picForm .car_cir_ifupload").html("未上传电路图");
                        $(".showcircuitryName").html('未上传，请选择');
                    }
                    if (res.wordurl != null && res.wordName != null) {
                        var actionurl = "/car-management/file/download.action?filePath=" + res.wordurl + "&fileName=" + res.wordName;
                        var download_crd = '<form method="POST" action=' + actionurl + '>' +
                            '<input type="submit" value="下载crd文件" class="btn btn-default btn-primary down_btn"></form>';
                        $("#picForm .crd_box").html(download_crd);
                        $(".showcrdName").html(res.wordName);
                    } else {
                        $("#picForm .car_crd_ifupload").html("未上传CRD文件");
                        $(".showcrdName").html('未上传，请选择');
                    }
                }
            } else if (name == "findUpcheck") { // 查看接车点检信息
                if (res != null) {
                    showData(boxname, res);
                    $(boxname + " input").attr("readonly", true);
                    $(boxname + " input").addClass("readonly");
                    // 根据后台传入的值， 显示多选按钮的选中状态：
                }
            } else if (name == "yanche") {
                $("#del_model").modal();
                $("#del_model .text-center")
                    .html(
                        res.msg +
                        "<span style='color:#000;'>是否继续进行验车？</span>");
                $(".modal_del")
                    .unbind('click')
                    .bind(
                        'click',
                        function() {
                            $(this).attr({
                                "data-dismiss": "modal",
                                "aria-label": "Close"
                            });
                            var sub_url = allurl +
                                "/car-management/license/generateVehicleInspection.action?vSn=" +
                                carInfo.vSn;
                            subData(sub_url, "", "post",
                                "yanche_confirm", "");
                        });
            } else {
                toastr.warning(res.msg, "提示", errormessageOpts);
                return;
            }
        },
        "error": function(res) {
            console.log(res)
            toastr.error('程序内部错误', "提示", errormessageOpts);
        }
    })
}

// 表单查询选项封装 inline型
function creatSelect(filArr, name, btnname) {
    var ss = "";
    var optstyle = "";
    for (var i = 0; i < filArr.length; i++) {
        if (filArr[i].type == "data") {
            var ifdata = "today-date";
            optstyle = '<input type="text" class="' + ifdata +
                '" lay-key="1"> '
        } else if (filArr[i].type == "select") {
            var ifdata = "";
            var options = "";
            for (var j = 0; j < filArr[i].option.length; j++) {
                options += '<option value="' + filArr[i].option[j].name +
                    '" name="' + filArr[i].option[j].name + '">' +
                    filArr[i].option[j].name + '</option>';
            }
            optstyle = '<select class="">' + options + '</select>'
        } else if (filArr[i].type == "text") {
            var ifdata = "";
            optstyle = '<input type="text" name="' + filArr[i].inputName +
                '" class="' + filArr[i].inputName + ' form-control ' +
                ifdata + '" > '
        }
        ss += '<div class="form-group">' + '<label for="exampleInputName2">' +
            filArr[i].name + '：</label>' + '<span>' + optstyle +
            '</span>' + '</div>'
    }
    ss += '<button type="button" style="margin-left:20px;" class="btn btn-default my_btn ' +
        btnname + '">查询</button>';
    $(name).html(ss);
};
// 表单查询选项封装 even_style型
function creatForm(filArr, name, btnname) {
    var ss = "";
    var optstyle = ""
    for (var i = 0; i < filArr.length; i++) {
        if (filArr[i].type == "data") {
            var ifdata = "much-date";
            optstyle = '<input type="" name="' + filArr[i].inputName +
                '" class="' + filArr[i].inputName +
                ' form-control col-sm-7 ' + ifdata +
                '"> <label class="col-sm-5 tip_style ">' + filArr[i].must +
                '</label>'
        } else if (filArr[i].type == "today-date") {
            optstyle = '<input type="" name="' +
                filArr[i].inputName +
                '" class="' +
                filArr[i].inputName +
                ' form-control col-sm-7 today-date"> <label class="col-sm-5 tip_style ">' +
                filArr[i].must + '</label>'
        } else if (filArr[i].type == "end-date") {
            optstyle = '<input type="" name="' +
                filArr[i].inputName +
                '" class="' +
                filArr[i].inputName +
                ' form-control col-sm-7 end-date"> <label class="col-sm-5 tip_style ">' +
                filArr[i].must + '</label>'
        } else if (filArr[i].type == "end-3date") {
            optstyle = '<input type="" name="' +
                filArr[i].inputName +
                '" class="' +
                filArr[i].inputName +
                ' form-control col-sm-7 end-3date"> <label class="col-sm-5 tip_style ">' +
                filArr[i].must + '</label>'
        } else if (filArr[i].type == "endyear-date") {
            optstyle = '<input type="" name="' +
                filArr[i].inputName +
                '" class="' +
                filArr[i].inputName +
                ' form-control col-sm-7 endyear-date"> <label class="col-sm-5 tip_style ">' +
                filArr[i].must + '</label>'
        } else if (filArr[i].type == "end-platedate") {
            optstyle = '<input type="" id="licenseEndTime" name="' +
                filArr[i].inputName +
                '" class="' +
                filArr[i].inputName +
                ' form-control col-sm-7"> <label class="col-sm-5 tip_style ">' +
                filArr[i].must + '</label>'
        } else if (filArr[i].type == "select") {
            var ifdata = "";
            var options = "";
            for (var j = 0; j < filArr[i].option.length; j++) {
                options += '<option projectName="' +
                    filArr[i].option[j].projectName + '" status="' +
                    filArr[i].option[j].status + '"  value="' +
                    filArr[i].option[j].name + '" name="' +
                    filArr[i].option[j].name + '" class="' +
                    filArr[i].option[j].val + '">' +
                    filArr[i].option[j].name + '</option>';
            }
            optstyle = '<select class="form-control col-sm-7 ' +
                filArr[i].inputName + '">' + options +
                '</select> <label class="col-sm-5 tip_style ">' +
                filArr[i].must + '</label>'
        } else if (filArr[i].type == "checkbox") {
            var optstyle = "";
            for (var j = 0; j < filArr[i].option.length; j++) {
                optstyle += '<input type="checkbox" value="' +
                    filArr[i].option[j].val + '" name="' +
                    filArr[i].inputName + '" class="' +
                    filArr[i].inputName +
                    '"><span style="margin-right:10px;">' +
                    filArr[i].option[j].name + '</span>';
            }
            optstyle = '<div class="checkbox_group">' + optstyle + '</div>';
        } else if (filArr[i].type == "radio") {
            var optstyle = "";
            for (var j = 0; j < filArr[i].option.length; j++) {
                if (filArr[i].inputName == "cardType") {
                    optstyle += '<input type="radio" value="' +
                        filArr[i].option[j].val + '" name="' +
                        filArr[i].inputName +
                        '"><span style="margin-right:10px;">' +
                        filArr[i].option[j].name + '</span>';
                } else {
                    optstyle += '<input type="radio" value="' +
                        filArr[i].option[j].name + '" name="' +
                        filArr[i].inputName +
                        '"><span style="margin-right:10px;">' +
                        filArr[i].option[j].name + '</span>';
                }
            }
            optstyle = '<div class="radio_group">' + optstyle + '</div>';
        } else if (filArr[i].type == "text") {
            if (filArr[i].must == "*" || filArr[i].must == "套" || filArr[i].must == "把" || filArr[i].must == "只" || filArr[i].must == "km*") {
                optstyle = '<input type="text" autocomplete="on" name="' + filArr[i].inputName +
                    '" class="form-control col-sm-7 required ' +
                    filArr[i].inputName +
                    '" required> <label class="col-sm-5 tip_style ">' +
                    filArr[i].must + '</label>'
            } else {
                optstyle = '<input type="text" name="' + filArr[i].inputName +
                    '" class="form-control col-sm-7 ' +
                    filArr[i].inputName +
                    '"> <label class="col-sm-5 tip_style ">' +
                    filArr[i].must + '</label>'
            }
        } else if (filArr[i].type == "file") {
            optstyle = '<input type="file" name="' + filArr[i].inputName +
                '" class="form-control col-sm-7 ' + filArr[i].inputName +
                '"> <label class="col-sm-5 tip_style ">' + filArr[i].must +
                '</label>'
        }
        ss += '<div class="form-group">' +
            '<label class="col-sm-4 control-label">' + filArr[i].name +
            '：</label>' + '<div class="col-sm-6">' + optstyle + '</div>' +
            '</div>'
    }
    ss += '<div class="form-group">' +
        '<div class="form_btngroup clearfix">' +
        '<button type="button" data-dismiss="" aria-label="" class="btn btn-default pull-left btn-primary ' +
        btnname +
        '">提交</button>' +
        '<button type="button" class="btn btn-default btn-primary pull-right" data-dismiss="modal">取消</button>' +
        '</div>' + '</div>';
    $(name).html(ss);
    lay('.today-date').each(function() {
        laydate.render({
            elem: this,
            trigger: 'click',
            format: 'yyyy-MM-dd',
            value: todayDate,
            theme: '#041473'
        });
    });
    laydate.render({
        elem: '#licenseEndTime',
        min: -20,
        max: 100
    });
    lay('.much-date').each(function() {
        laydate.render({
            elem: this,
            trigger: 'click',
            format: 'yyyy-MM-dd',
            value: null,
            theme: '#041473'
        });
    });
    lay('.end-date').each(function() {
        laydate.render({
            elem: this,
            trigger: 'click',
            format: 'yyyy-MM-dd',
            value: dateend,
            theme: '#041473'
        });
    });
    var endyear = new Date().getFullYear() + "-12-31";
    lay('.endyear-date').each(function() {
        laydate.render({
            elem: this,
            trigger: 'click',
            format: 'yyyy-MM-dd',
            value: endyear,
            theme: '#041473'
        });
    });
    lay('.end-3date').each(function() {
        laydate.render({
            elem: this,
            trigger: 'click',
            type: 'datetime', // 精确到 时分秒
            value: changdate(date3end),
            theme: '#041473'
        });
    });

    var carInfo = window.sessionStorage.getItem("carInfo");
    carInfo = JSON.parse(carInfo);
    if (btnname == "sub_cartypein") {
        $("#carTypeIn .cartypein_apply .vSn").attr("readOnly", true); // 车辆编号不可更改
        showData("#carTypeIn .cartypein_apply", carInfo); // 将接车点检已有数据填入车辆录入表单
    }
};
// form表单数据回显函数
function showData(boxname, obj) {
    if (obj == null) {
        $(boxname + " input").not(':button,:radio,:submit') // 去除不需要重置的input类型
            .val('');
        return;
    } else {
        for (var k in obj) {
            if (k != "facade") {
                $(boxname + ' input[name="' + k + '"]').val(obj[k]);
                $(boxname).find("option[value = '" + obj[k] + "']").attr(
                    "selected", "selected");
            }
        }
    }
    if (boxname == "#carDetail #carCheckForm form" && obj.facade) {
        var str = obj.facade;
        $(str.split(",")).each(
            function(i, e) {
                $("#carCheckForm input[name='facade'][value='" + e + "']")
                    .prop("checked", true);
            });
    } else if (boxname == "#carCheck form" && obj.facade) {
        var str = obj.facade;
        $(str.split(",")).each(
            function(i, e) {
                $("#carCheck input[name='facade'][value='" + e + "']")
                    .prop("checked", true);
            });
    }
}

// 面包屑导航/路径导航
function changBread(bread1, bread2) {
    breadHtml = "<ol class='breadcrumb'> <li><span>当前位置:&nbsp;&nbsp;&nbsp;测试车辆管理系统&nbsp;&nbsp;&nbsp;</span>" +
        bread1 + " </li><li>" + bread2 + "</li> </ol>";
    $(".bread_left").html(breadHtml);
}
changBread("GPS", "车辆地图");

function MergeCell(tableId, startRow, endRow, col) { // 合并第几列 相同的行数据
    var tb = document.getElementById(tableId);
    console.log(col); //0
    console.log(tb.rows[0].cells.length); //4
    if (col >= tb.rows[0].cells.length) {
        return;
    }
    // 当检查第0列时检查所有行
    if (col == 0 || endRow == 0) {
        endRow = tb.rows.length - 1;
    }
    for (var i = startRow; i < endRow; i++) {
        // 程序是自左向右合并
        if (tb.rows[startRow].cells[col].innerHTML == tb.rows[i + 1].cells[col].innerHTML) {
            // 如果相同则删除下一行的第0列单元格
            tb.rows[i + 1].cells[col].style.display = 'none';
            // 更新rowSpan属性
            tb.rows[startRow].cells[col].rowSpan = (tb.rows[startRow].cells[col].rowSpan | 0) + 1;
            // 当循环到终止行前一行并且起始行和终止行不相同时递归(因为上面的代码已经检查了i+1行，所以此处只到endRow-1)
            if (i == endRow - 1 && startRow != endRow) {
                MergeCell(tableId, startRow, endRow, col + 1);
            }
        } else {
            // 起始行，终止行不变，检查下一列
            // MergeCell(tableId, startRow, i, col + 1);
            // 增加起始行
            startRow = i + 1;
        }
    }
}

function wringcheck(url, boxname, btnname) {
    $.ajax({
        url: url,
        success: function(res) {
            if (res.checkResults.length <= 0) {
                toastr.warning("尚未检查，请检查", "线束检查", messageOpts)
                res = wCheckArr;
            }
            var tableRow = "";
            var myradio = "";
            var realidnameString = boxname;
            var checkboxs = '<THEAD><TR><TD colspan="2">检查项目</TD><TD>状态</TD><TD>说明问题原因</TD><TD>注明解决方法</TD></TR></THEAD>';
            for (var i = 0; i < res.checkResults.length; i++) {
                if (res.checkResults[i].status == "N") {
                    myradio = '<input type="radio"  class="statusy my_radio" value="Y" id="' + realidnameString + 'ystatus' + i + '" name="status' +
                        i +
                        '"><label for="' + realidnameString + 'ystatus' + i + '">是</label>' +
                        '&nbsp;&nbsp;&nbsp;<input type="radio" checked class="statusno my_radio" id="' + realidnameString + 'nstatus' + i + '" value="N" name="status' +
                        i +
                        '"><label for="' + realidnameString + 'nstatus' + i + '">否</label>' +
                        '&nbsp;&nbsp;&nbsp;<input type="radio"  class="my_radio" value="NA"  id="' + realidnameString + 'nastatus' + i + '"  name="status' +
                        i + '"><label for="' + realidnameString + 'nastatus' + i + '">NA</label>';
                } else if (res.checkResults[i].status == "NA") {
                    myradio = '<input type="radio" class="statusy my_radio" value="Y" id="' + realidnameString + 'ystatus' + i + '" name="status' +
                        i +
                        '"><label for="' + realidnameString + 'ystatus' + i + '">是</label>' +
                        '&nbsp;&nbsp;&nbsp;<input type="radio" class="statusno my_radio" value="N" id="' + realidnameString + 'nstatus' + i + '" name="status' +
                        i +
                        '"><label for="' + realidnameString + 'nstatus' + i + '">否</label>' +
                        '&nbsp;&nbsp;&nbsp;<input type="radio" checked class="my_radio" value="NA"  id="' + realidnameString + 'nastatus' + i + '"  name="status' +
                        i + '"><label for="' + realidnameString + 'nastatus' + i + '">NA</label>';
                } else {
                    myradio = '<input type="radio" checked class="statusy my_radio" value="Y" id="' + realidnameString + 'ystatus' + i + '" name="status' +
                        i +
                        '"><label for="' + realidnameString + 'ystatus' + i + '">是</label>' +
                        '&nbsp;&nbsp;&nbsp;<input type="radio" class="statusno my_radio" value="N" id="' + realidnameString + 'nstatus' + i + '" name="status' +
                        i +
                        '"><label for="' + realidnameString + 'nstatus' + i + '">否</label>' +
                        '&nbsp;&nbsp;&nbsp;<input type="radio"  class="my_radio" value="NA"  id="' + realidnameString + 'nastatus' + i + '"  name="status' +
                        i + '"><label for="' + realidnameString + 'nastatus' + i + '">NA</label>';
                }
                if (res.checkResults[i].item == "") {
                    tableRow += '<TR class="tr' + i + '" uuid="' +
                        res.checkResults[i].uuid +
                        '"><TD colspan="2">' +
                        '<input type="text" class="pitem" value="' +
                        res.checkResults[i].pitem +
                        '"></TD><TD class="status">' +
                        myradio +
                        '</TD><TD class="explain">' +
                        '<input type="text" class="explain_input" value="' +
                        res.checkResults[i].checkExplanation +
                        '"></TD>' +
                        '<TD class="solve"><input  type="text" class="solve_input" value="' +
                        res.checkResults[i].checkingExplanation +
                        '"></TD></TR>';
                } else {
                    tableRow += '<TR class="tr' + i + '" uuid="' +
                        res.checkResults[i].uuid +
                        '"><TD><input class="pitem" type="text" value="' +
                        res.checkResults[i].pitem +
                        '">' +
                        '</TD><TD><input class="item" type="text" value="' +
                        res.checkResults[i].item +
                        '">' +
                        '</TD><TD class="status">' +
                        myradio +
                        '</TD><TD class="explain"><input class="explain_input" type="text" value="' +
                        res.checkResults[i].checkExplanation +
                        '"></TD>' +
                        '<TD class="solve"><input class="solve_input"  type="text" value="' +
                        res.checkResults[i].checkingExplanation +
                        '"></TD></TR>';
                }
            }
            checkboxs += '<tbody>' + tableRow + '</tbody>';
            $("#" + boxname).html(checkboxs);
            $("#" + boxname + ' input').customInput();

            MergeCell(boxname, 0, 0, 0);
            // 新增线束检查
            var addindex = res.checkResults.length;
            $("#addwring_btn").unbind('click').bind('click', function() { //新增检查项目
                var trIndex = addindex - 1;
                console.log(addindex);
                var addmyradio = '<input type="radio" checked="" class="statusy my_radio" id="' + realidnameString + 'ystatus' + addindex + '" value="Y" name="bcheckstatus' +
                    addindex +
                    '"><label for="' + realidnameString + 'ystatus' + addindex + '">是</label>' +
                    '&nbsp;&nbsp;&nbsp;<input type="radio" class="statusno my_radio" id="' + realidnameString + 'nstatus' + addindex + '" value="N" name="bcheckstatus' +
                    addindex +
                    '"><label for="' + realidnameString + 'nstatus' + addindex + '">否</label>' +
                    '&nbsp;&nbsp;&nbsp;<input type="radio"  class="my_radio" id="' + realidnameString + 'nastatus' + addindex + '" value="NA" name="bcheckstatus' +
                    addindex + '"><label for="' + realidnameString + 'nastatus' + addindex + '">NA</label>';
                var addcheckboxs = '<TR uuid="" class="tr' + addindex + '"><TD colspan="2">' +
                    '<input type="text" class="pitem" value="">' +
                    '</TD><TD class="status">' +
                    addmyradio +
                    '</TD><TD class="explain">' +
                    '<input type="text" class="explain_input" value=""></TD>' +
                    '<TD class="solve"><input  type="text" class="solve_input" value=""></TD></TR>';
                console.log(boxname);
                console.log($("#" + boxname + " tbody .tr" + trIndex));
                $("#" + boxname + " tbody .tr" + trIndex).after(addcheckboxs);
                $("#" + boxname + ' input').customInput();
                $("#" + boxname + " input.solve_input").attr(
                    "readonly", true);
                $("#" + boxname + " input.solve_input").addClass(
                    "readonly");
                addindex++;
            });
            if (res.check.checkingPerson != null &&
                res.check.checkingPerson != "") { // 已核对
                $(".wringcheck_user .operator").html(
                    "检查人：" + res.check.checkPerson);
                $(".wringcheck_user .date").html(
                    "检查日期：" + res.check.checkTime);
                $(".wringoperator_user .operator").html(
                    "核对人：" + res.check.checkingPerson);
                $(".wringoperator_user .date").html(
                    "核对日期：" + res.check.checkingTime);
                $("#" + boxname + " input").addClass("readonly");
                $("#" + boxname + " input").attr("readonly", true);
                $("#" + boxname + " input[type='radio']").attr(
                    "disabled", true);
            } else if (res.check.checkPerson != null &&
                res.check.checkPerson != "") { // 已检查
                $(".wringcheck_user .operator").html(
                    "检查人：" + res.check.checkPerson);
                $(".wringcheck_user .date").html(
                    "检查日期：" + res.check.checkTime);
                $("#" + boxname + " input[type='radio']").attr(
                    "disabled", true);
                $("#" + boxname + " input.explain_input").attr(
                    "readonly", true);
                $("#" + boxname + " input.explain_input").addClass(
                    "readonly");
                $("#" + boxname + " input.solve_input").attr(
                    "readonly", false);
                $("#" + boxname + " input.solve_input").removeClass(
                    "readonly");
            } else {
                $(".wringcheck_user .operator").html("检查人：___");
                $(".wringcheck_user .date").html("检查日期：___");
                $(".wringoperator_user .operator").html("核对人：___");
                $(".wringoperator_user .date").html("核对日期：___");
                $("#" + boxname + " input").attr("readonly", false);
                $("#" + boxname + " input[type='radio']").attr(
                    "disabled", false);
                $("#" + boxname + " input.solve_input").attr(
                    "readonly", true);
                $("#" + boxname + " input.solve_input").addClass(
                    "readonly");
            }
            if (res.check == null) {
                window.sessionStorage.checkPerson = null;
                window.sessionStorage.solvePerson = null;
            } else {
                window.sessionStorage.checkPerson = res.check.checkPerson;
                window.sessionStorage.solvePerson = res.check.checkingPerson;
            }
            if (boxname == "wiringCheckDetailtable") {
                $("#" + boxname + " input[type='radio']").attr(
                    "disabled", true);
                $("#" + boxname + " input").attr("readonly", true);
            }
        }
    });
}

function getcnid(url, boxname, btnname) {
    $.ajax({
        url: url,
        "type": "get",
        "success": function(res) {
            console.log(res)
            if (res.check == null) {
                window.sessionStorage.checkPerson = '';
                window.sessionStorage.solvePerson = '';
                window.sessionStorage.confirmPerson = '';
                var checkPerson = "___";
                var solvePerson = "___";
                var confirmPerson = "___";
                var checkdata = "___";
                var solvedata = "___";
                var confirmdata = "___";
            } else {
                // 检查人
                window.sessionStorage.checkPerson = res.check.checkPerson ? res.check.checkPerson : '';
                // 核对人
                window.sessionStorage.solvePerson = res.check.checkingPerson ? res.check.checkingPerson : '';
                // 确认人
                window.sessionStorage.confirmPerson = res.check.confirmPerson ? res.check.confirmPerson : '';
                var checkPerson = res.check.checkPerson;
                var solvePerson = res.check.checkingPerson;
                var confirmPerson = res.check.confirmPerson;
                var checkdata = res.check.checkTime;
                var solvedata = res.check.checkingTime;
                var confirmdata = res.check.confirmTime;
                if (checkPerson == "" || checkPerson == null) {
                    checkPerson = "___";
                }
                if (solvePerson == "" || solvePerson == null) {
                    solvePerson = "___";
                }
                if (confirmPerson == "" || confirmPerson == null) {
                    confirmPerson = "___";
                }
                if (checkdata == "" || checkdata == null) {
                    checkdata = "___";
                }
                if (solvedata == "" || solvedata == null) {
                    solvedata = "___";
                }
                if (confirmdata == "" || confirmdata == null) {
                    confirmdata = "___";
                }
            }
            // window.sessionStorage.applypeople = res.check.applyPerson;

            var idname = '';
            var realidname = [];
            var realidnameString = '';
            idname = boxname.slice(1);
            var idnameArr = idname.split(' ');
            var idnameArr0 = idname.split(' ')[0];
            var idnameArr1 = idname.split(' ')[1].slice(1);
            realidname.push(idnameArr0);
            realidname.push(idnameArr1);
            realidnameString = realidname.join('');

            if (boxname == "#sCheck .check_itembox" || boxname == "#sCheckForm .safe_Form") {
                var addindex = 0;
                var checkboxs = '<div class="checktitle"><span>检查项目</span><span>要求</span><span>状态</span><span>说明问题原因</span><span>注明解决方法</span><span>检查人确认</span></div>';
                if (res.checkResults.length <= 0) {
                    toastr.warning('尚未进行安全检查，请检查', '测试车辆安全检查表', messageOpts);
                    addindex = sCheckArr.length;
                    for (var i = 0; i < sCheckArr.length; i++) {
                        checkboxs += '<div class="checkitem" uuid="">' +
                            '<span><input type="text" class="item_input item_input"' + i + ' value="' + sCheckArr[i].checkResults.item + '">' + '</span>' +
                            '<span><input type="text" class="request_input request_input"' + i + ' value="' + sCheckArr[i].checkResults.request + '">' + '</span>' +
                            '<span class="my_radio">' +
                            '<input type="radio" checked class="statusy" id="' + realidnameString + 'ystatus' + i + '" value="Y" name="scheckstatus' + i + '">' +
                            '<label for="' + realidnameString + 'ystatus' + i + '">是</label>&nbsp;&nbsp;&nbsp;' +
                            '<input type="radio" class="statusno" id="' + realidnameString + 'nstatus' + i + '" value="N" name="scheckstatus' + i + '">' +
                            '<label for="' + realidnameString + 'nstatus' + i + '">否</label>&nbsp;&nbsp;&nbsp;' +
                            '<input type="radio" class="" value="NA" id="' + realidnameString + 'nastatus' + i + '" name="scheckstatus' + i + '">' +
                            '<label for="' + realidnameString + 'nastatus' + i + '">NA</label></span>' +
                            '<span><input type="text" class="item' + i + 'explain explain_input" value="" name="explain' + i + '"></span>' +
                            '<span><input type="text" class="solve' + i + ' solve_input" value="" name="solve' + i + '"></span>' +
                            '<span><input type="text" class="confirm' + i + ' confirm_input" value="" name="confirm' + i + '"></span>' +
                            '</div>';
                    }
                    checkboxs += '<div class="form-group">' +
                        '<div class="form_btngroup clearfix">' +
                        '<button type="button" data-dismiss="" aria-label="" class="btn btn-default btn-primary pull-left ' + btnname + '">提交</button>' +
                        '<button type="button" class="btn btn-default btn-primary pull-right" id="addsafe_btn" style="margin-left:12px;">新增项目</button>' +
                        '<button type="button" class="btn btn-default btn-primary pull-right cancal_btn">返回</button>' +
                        '</div>' +
                        '</div>';
                    $(boxname).html(checkboxs);
                    $(boxname + ' input').customInput();
                    $(boxname + " input").removeClass("readonly");
                    $(boxname + " input").attr("readonly", false);
                    $(boxname + " input[type='radio']").attr("disabled", false);
                    $(boxname + " input.solve_input").attr("readonly", true);
                    $(boxname + " input.solve_input").addClass("readonly");
                    $(boxname + " input.confirm_input").attr("readonly", true);
                    $(boxname + " input.confirm_input").addClass("readonly");
                    if (boxname == "#sCheckForm .safe_Form") {
                        $(boxname + " input").attr("readonly", true);
                        $(boxname + " input[type='radio']").attr("disabled", true);
                    }
                    // 新增安全检查

                } else { // 进行数据回显
                    addindex = res.checkResults.length;
                    var myradio = "";
                    for (var i = 0; i < res.checkResults.length; i++) {
                        // 状态三剑客 数据显示
                        if (res.checkResults[i].status == "N") {
                            myradio = '<input type="radio" class="statusy" value="Y" id="' + realidnameString + 'ystatus' + i + '" name="scheckstatus' + i + '">' +
                                '<label for="' + realidnameString + 'ystatus' + i + '">是</label>&nbsp;&nbsp;&nbsp;' +
                                '<input type="radio" checked class="statusno" value="N" id="' + realidnameString + 'nstatus' + i + '" name="scheckstatus' + i + '">' +
                                '<label for="' + realidnameString + 'nstatus' + i + '">否</label>&nbsp;&nbsp;&nbsp;' +
                                '<input type="radio" class="" value="NA" id="' + realidnameString + 'nastatus' + i + '" name="scheckstatus' + i + '">' +
                                '<label for="' + realidnameString + 'nastatus' + i + '">NA</label>'
                        } else if (res.checkResults[i].status == "NA") {
                            myradio = '<input type="radio" class="statusy" value="Y" id="' + realidnameString + 'ystatus' + i + '" name="scheckstatus' + i + '">' +
                                '<label for="' + realidnameString + 'ystatus' + i + '">是</label>&nbsp;&nbsp;&nbsp;' +
                                '<input type="radio" class="statusno" id="' + realidnameString + 'nstatus' + i + '" value="N" name="scheckstatus' + i + '">' +
                                '<label for="' + realidnameString + 'nstatus' + i + '">否</label>&nbsp;&nbsp;&nbsp;' +
                                '<input type="radio" checked class="" value="NA" id="' + realidnameString + 'nastatus' + i + '" name="scheckstatus' + i + '">' +
                                '<label for="' + realidnameString + 'nastatus' + i + '">NA</label>'
                        } else {
                            myradio = '<input type="radio" class="statusy" checked value="Y" id="' + realidnameString + 'ystatus' + i + '" name="scheckstatus' + i + '">' +
                                '<label for="' + realidnameString + 'ystatus' + i + '">是</label>&nbsp;&nbsp;&nbsp;' +
                                '<input type="radio" class="statusno" value="N" id="' + realidnameString + 'nstatus' + i + '" name="scheckstatus' + i + '">' +
                                '<label for="' + realidnameString + 'nstatus' + i + '">否</label>&nbsp;&nbsp;&nbsp;' +
                                '<input type="radio" class="" value="NA" id="' + realidnameString + 'nastatus' + i + '" name="scheckstatus' + i + '">' +
                                '<label for="' + realidnameString + 'nastatus' + i + '">NA</label>'
                        }
                        // 数据格式化
                        if (res.checkResults[i].checkExplanation == null) {
                            res.checkResults[i].checkExplanation = "";
                        }
                        if (res.checkResults[i].checkingExplanation == null) {
                            res.checkResults[i].checkingExplanation = "";
                        }
                        if (res.checkResults[i].confirmExplanation == null) {
                            res.checkResults[i].confirmExplanation = "";
                        }
                        checkboxs += '<div class="checkitem" uuid="' + res.checkResults[i].uuid + '">' +
                            '<span><input type="text" class="item_input item_input"' + i + ' value="' + res.checkResults[i].item + '">' + '</span>' +
                            '<span><input type="text" class="request_input request_input"' + i + ' value="' + res.checkResults[i].request + '"></span>' +
                            '<span class="my_radio">' + myradio + '</span>' +
                            '<span><input type="text" class="item' + i + 'explain explain_input" value="' + res.checkResults[i].checkExplanation + '" name="explain' + i + '"></span>' +
                            '<span><input type="text" class="solve' + i + ' solve_input" value="' + res.checkResults[i].checkingExplanation + '" name="solve' + i + '"></span>' +
                            '<span><input type="text" class="confirm' + i + ' confirm_input" value="' + res.checkResults[i].confirmExplanation + '" name="confirm' + i + '"></span>' +
                            '</div>';
                    }
                    checkboxs += "<div class='audit_fot check_user'>" +
                        "<span class='operator'>检查人：" + checkPerson + "</span>" +
                        "<span class='date'>检查日期：" + checkdata + "</span>" +
                        "</div>";
                    checkboxs += "<div class='audit_fot operator_user'>" +
                        "<span class='operator'>核对人：" + solvePerson + "</span>" +
                        "<span class='date'>核对日期：" + solvedata + "</span>" +
                        "</div>";
                    checkboxs += "<div class='audit_fot operator_user'>" +
                        "<span class='operator'>确认人：" + confirmPerson + "</span>" +
                        "<span class='date'>确认日期：" + confirmdata + "</span>" +
                        "</div>";
                    checkboxs += '<div class="form-group">' +
                        '<div class="form_btngroup clearfix">' +
                        '<button type="button" data-dismiss="" aria-label="" class="btn btn-default btn-primary pull-left ' + btnname + '">提交</button>' +
                        '<button type="button" class="btn btn-default btn-primary pull-right" id="addsafe_btn" style="margin-left:12px;">新增项目</button>' +
                        '<button type="button" class="btn btn-default btn-primary pull-right cancal_btn">返回</button>' +
                        '</div>' +
                        '</div>';
                    $(boxname).html(checkboxs);
                    $(boxname + ' input').customInput();
                    if (res.check == null || res.check == "") {
                        $(boxname + " input").attr("readOnly", false);
                        $(boxname + " input").removeClass("readonly");
                        $(boxname + " input[type='radio']").attr("disabled", false);
                        $(boxname + " input.solve_input").attr("readonly", true);
                        $(boxname + " input.solve_input").addClass("readonly");
                        $(boxname + " input.confirm_input").attr("readonly", true);
                        $(boxname + " input.confirm_input").addClass("readonly");
                    } else if (res.check.checkTime != null && res.check.checkingTime == null) {
                        $(boxname + " input[type='radio']").attr("disabled", true);
                        $(boxname + " input.explain_input").attr("readOnly", true);
                        $(boxname + " input.explain_input").addClass("readonly");
                        $(boxname + " input.solve_input").attr("readOnly", false);
                        $(boxname + " input.solve_input").removeClass("readonly");
                        $(boxname + " input.confirm_input").attr("readonly", true);
                        $(boxname + " input.confirm_input").addClass("readonly");
                    } else if (res.check.checkingTime != null && res.check.confirmTime == null) {
                        $(boxname + " input.explain_input").attr("readOnly", true);
                        $(boxname + " input.explain_input").addClass("readonly");
                        $(boxname + " input.solve_input").attr("readOnly", true);
                        $(boxname + " input.solve_input").addClass("readonly");
                        $(boxname + " input.confirm_input").attr("readonly", false);
                        $(boxname + " input.confirm_input").removeClass("readonly");
                        $(boxname + " input[type='radio']").attr("disabled", true);
                    } else if (res.check.confirmTime != null) {
                        $(boxname + " input").attr("readOnly", true);
                        $(boxname + " input").addClass("readonly");
                        $(boxname + " input[type='radio']").attr("disabled", true);
                    }
                    if (boxname == "#sCheckForm .safe_Form") {
                        $(boxname + " input").attr("readonly", true);
                        $(boxname + " input[type='radio']").attr("disabled", true);
                    }
                }
                $("#addsafe_btn").unbind('click').bind('click', function() { //新增检查项目
                    addindex++;
                    console.log(addindex);
                    // 状态三剑客
                    var addmyradio = '<input type="radio" checked="" class="statusy my_radio" id="' + realidnameString + 'ystatus' + addindex + '" value="Y" name="bcheckstatus' + addindex + '">' +
                        '<label for="' + realidnameString + 'ystatus' + addindex + '">是</label>&nbsp;&nbsp;&nbsp;' +
                        '<input type="radio" class="statusno my_radio" id="' + realidnameString + 'nstatus' + addindex + '" value="N" name="bcheckstatus' + addindex + '">' +
                        '<label for="' + realidnameString + 'nstatus' + addindex + '">否</label>&nbsp;&nbsp;&nbsp;' +
                        '<input type="radio"  class="my_radio" id="' + realidnameString + 'nastatus' + addindex + '" value="NA" name="bcheckstatus' + addindex + '">' +
                        '<label for="' + realidnameString + 'nastatus' + addindex + '">NA</label>';
                    // 输入三剑客
                    var addcheckboxs = '<div class="checkitem" uuid="">' +
                        '<span><input type="text" class="item_input" value=""></span>' +
                        '<span><input type="text" class="request_input" value=""></span>' +
                        '<span class="style1_radio">' + addmyradio + '</span>' +
                        '<span><input type="text" class="item' + addindex + 'explain explain_input" value="" name="explain' + addindex + '"></span>' +
                        '<span><input type="text" class="solve' + addindex + ' solve_input" value="" name="solve' + addindex + '"></span>' +
                        '</div>';
                    console.log(boxname);
                    // 输入框状态调整
                    $(boxname + " .form-group").prepend(addcheckboxs);
                    $(boxname + ' input').customInput();
                    $(boxname + " input.solve_input").attr("readonly", true);
                    $(boxname + " input.confirm_input").attr("readonly", true);
                    $(boxname + " input.solve_input").addClass("readonly");
                });
            } else if (boxname == "#bomCheck .bomcheck_itembox" || boxname == "#bomCheckForm .bomcheck_itembox") {
                var checkboxs = '<div class="checktitle"><span>零部件名称</span><span>零部件号</span><span>状态</span><span>说明问题原因</span><span>注明解决方法</span></div>';
                if (res.checkResults.length <= 0) {
                    toastr.warning('尚未申请bom', 'bom零部件检查', messageOpts);
                    var link = '<button type="button" class="btn btn-default btn-primary link_bomapply">尚未申请bom,去申请</button>';
                    $(boxname).html(link);
                    $(".link_bomapply").unbind('click').bind(
                        'click',
                        function() {
                            window.location.hash = "carTypeIn";
                            $(".carList").removeClass("active");
                            var carInfo = window.sessionStorage
                                .getItem("carInfo");
                            carInfo = JSON.parse(carInfo);
                            ToolRecordApply("#carTypeIn .rd_apply",
                                carInfo.vSn, "");
                            bomApply("#carTypeIn .bom_apply",
                                carInfo.vSn, "");
                            gettypeInData(carInfo.vSn,
                                "#carTypeIn .cartypein_apply");
                        })
                    return;
                } else {
                    var addindex = res.checkResults.length;
                    for (var i = 0; i < res.checkResults.length; i++) {
                        if (res.checkResults[i].status == "N") {
                            var myradio = '<input type="radio"  class="statusy my_radio" value="Y" id="' + realidnameString + 'ystatus' + i + '" name="bcheckstatus' +
                                i +
                                '"><label for="' + realidnameString + 'ystatus' + i + '">是</label>' +
                                '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="statusno my_radio" value="N" id="' + realidnameString + 'nstatus' + i + '" name="bcheckstatus' +
                                i +
                                '"><label for="' + realidnameString + 'nstatus' + i + '">否</label>' +
                                '&nbsp;&nbsp;&nbsp;<input type="radio"  class="my_radio" value="NA" id="' + realidnameString + 'nastatus' + i + '" name="bcheckstatus' +
                                i + '"><label for="' + realidnameString + 'nastatus' + i + '">NA</label>';
                        } else if (res.checkResults[i].status == "NA") {
                            var myradio = '<input type="radio" class="statusy my_radio" value="Y" id="' + realidnameString + 'ystatus' + i + '" name="bcheckstatus' +
                                i +
                                '"><label for="' + realidnameString + 'ystatus' + i + '">是</label>' +
                                '&nbsp;&nbsp;&nbsp;<input type="radio" class="statusno my_radio" id="' + realidnameString + 'nstatus' + i + '" value="N" name="bcheckstatus' +
                                i +
                                '"><label for="' + realidnameString + 'nstatus' + i + '">否</label>' +
                                '&nbsp;&nbsp;&nbsp;<input type="radio" checked="" class="my_radio" value="NA" id="' + realidnameString + 'nastatus' + i + '" name="bcheckstatus' +
                                i + '"><label for="' + realidnameString + 'nastatus' + i + '">NA</label>';
                        } else {
                            var myradio = '<input type="radio" checked="" class="statusy my_radio" id="' + realidnameString + 'ystatus' + i + '" value="Y" name="bcheckstatus' +
                                i +
                                '"><label for="' + realidnameString + 'ystatus' + i + '">是</label>' +
                                '&nbsp;&nbsp;&nbsp;<input type="radio" class="statusno my_radio" id="' + realidnameString + 'nstatus' + i + '" value="N" name="bcheckstatus' +
                                i +
                                '"><label for="' + realidnameString + 'nstatus' + i + '">否</label>' +
                                '&nbsp;&nbsp;&nbsp;<input type="radio"  class="my_radio" id="' + realidnameString + 'nastatus' + i + '" value="NA" name="bcheckstatus' +
                                i + '"><label for="' + realidnameString + 'nastatus' + i + '">NA</label>';
                        }
                        if (res.checkResults[i].checkExplanation == null) {
                            res.checkResults[i].checkExplanation = "";
                        }
                        if (res.checkResults[i].checkingExplanation == null) {
                            res.checkResults[i].checkingExplanation = "";
                        }
                        checkboxs += '<div class="checkitem" uuid="' +
                            res.checkResults[i].uuid +
                            '"><span><input type="text" class="bom_name" value="' +
                            res.checkResults[i].bomName +
                            '">' +
                            '</span><span><input type="text" class="bom_num" value="' +
                            res.checkResults[i].bomNum +
                            '">' +
                            '</span><span class="style1_radio">' +
                            myradio +
                            '</span><span> <input type="text" class="item' +
                            i +
                            'explain explain_input" value="' +
                            res.checkResults[i].checkExplanation +
                            '" name="explain' +
                            i +
                            '"></span>' +
                            '<span><input type="text" class="solve' +
                            i +
                            ' solve_input" value="' +
                            res.checkResults[i].checkingExplanation +
                            '" name="solve' + i +
                            '"></span></div>';
                    }
                    checkboxs += "<div class='audit_fot check_user bom_applybox'><span class='operator'>申请人：" +
                        res.check.applyPerson +
                        "</span><span class='date'>申请日期：" +
                        res.check.applyTime + "</span></div>";
                    checkboxs += "<div class='audit_fot check_user'><span class='operator'>检查人：" +
                        checkPerson +
                        "</span><span class='date'>检查日期：" +
                        checkdata + "</span></div>";
                    checkboxs += "<div class='audit_fot operator_user'><span class='operator'>核对人：" +
                        solvePerson +
                        "</span><span class='date'>核对日期：" +
                        solvedata + "</span></div>";
                    checkboxs += '<div class="form-group">' +
                        '<div class="form_btngroup clearfix">' +
                        '<button type="button" data-dismiss="" aria-label="" class="btn btn-default btn-primary pull-left ' +
                        btnname +
                        '">提交</button>' +
                        '<button type="button" class="btn btn-default btn-primary pull-right" id="addbom_btn" style="margin-left:12px;">新增项目</button>' +
                        '<button type="button" class="btn btn-default btn-primary pull-right cancal_btn">返回</button>' +
                        '</div>' + '</div>';
                    $(boxname).html(checkboxs);
                    $(boxname + ' input').customInput();
                    if (res.check.checkPerson == null) {
                        $(boxname + " input").attr("readOnly", false);
                        $(boxname + " input").removeClass("readonly");
                        $(boxname + " input[type='radio']").attr(
                            "disabled", false);
                        $(boxname + " input.solve_input").attr(
                            "readonly", true);
                        $(boxname + " input.solve_input").addClass(
                            "readonly");
                    } else if (res.check.checkTime != null &&
                        res.check.checkingTime == null) {
                        $(boxname + " input.explain_input").attr(
                            "readOnly", true);
                        $(boxname + " input.solve_input").attr(
                            "readOnly", false);
                        $(boxname + " input.explain_input").addClass(
                            "readonly");
                        $(boxname + " input.solve_input").removeClass(
                            "readonly");
                        $(boxname + " input[type='radio']").attr(
                            "disabled", true);
                    } else if (res.check.checkingTime != null) {
                        $(boxname + " input").attr("readOnly", true);
                        $(boxname + " input").addClass("readonly");
                        $(boxname + " input[type='radio']").attr(
                            "disabled", true);
                    }
                    $(boxname + " input.bom_name").attr("readOnly",
                        true);
                    $(boxname + " input.bom_num")
                        .attr("readOnly", true);
                    if (boxname == "#bomCheckForm .bomcheck_itembox") {
                        $(boxname + " input").attr("readonly", true);
                        $(boxname + " input[type='radio']").attr(
                            "disabled", true);
                    }
                }
                $("#addbom_btn").unbind('click').bind('click', function() { //新增bom检查项目
                    addindex++;
                    console.log(addindex);
                    var addmyradio = '<input type="radio" checked="" class="statusy my_radio" id="' + realidnameString + 'ystatus' + addindex + '" value="Y" name="bcheckstatus' +
                        addindex +
                        '"><label for="' + realidnameString + 'ystatus' + addindex + '">是</label>' +
                        '&nbsp;&nbsp;&nbsp;<input type="radio" class="statusno my_radio" id="' + realidnameString + 'nstatus' + addindex + '" value="N" name="bcheckstatus' +
                        addindex +
                        '"><label for="' + realidnameString + 'nstatus' + addindex + '">否</label>' +
                        '&nbsp;&nbsp;&nbsp;<input type="radio"  class="my_radio" id="' + realidnameString + 'nastatus' + addindex + '" value="NA" name="bcheckstatus' +
                        addindex + '"><label for="' + realidnameString + 'nastatus' + addindex + '">NA</label>';
                    var addcheckboxs = '<div class="checkitem" uuid=""><span><input type="text" class="bom_name" value="">' +
                        '</span><span><input type="text" class="bom_num" value="">' +
                        '</span><span class="style1_radio">' +
                        addmyradio +
                        '</span><span> <input type="text" class="item' +
                        addindex +
                        'explain explain_input" value="" name="explain' +
                        addindex +
                        '"></span>' +
                        '<span><input type="text" class="solve' +
                        addindex +
                        ' solve_input" value="" name="solve' + addindex +
                        '"></span></div>';
                    console.log(boxname);
                    $(boxname + " .bom_applybox").before(addcheckboxs);
                    $(boxname + ' input').customInput();
                    $(boxname + " input.solve_input").attr("readonly", true);
                    $(boxname + " input.solve_input").addClass("readonly");
                });
            }
            $(".cancal_btn").unbind('click').bind('click', function() {
                $(this).parent().attr("href", "#carList");
                $('#myTab a[href="#carList"]').tab('show');
            });

            // 安全提交
            // 缸压提交/car-management/car/saveClacyLindersss.action
            // 缸压修改/car-management/car/updateCldCheckByvSn.action
            // 安全检查提交/car-management/car/addSafeCheck/" + carInfo.vSn +".action
            // 安全检查修改 是不是应该是 ：/car-management/car/addSafeCheck/" + carInfo.vSn +".action
            // 安全核对提交/car-management/car/updateSafeCheckByvSn/" +carInfo.vSn + ".action
            // 安全核对修改updateSafeCheckByvSn
            $("#sCheck .sCheck_btn").unbind('click').bind('click', function() {
                console.log(24234)
                    // 缸压提交
                var cld_url = allurl + "/car-management/car/saveClacyLindersss.action";
                var cld_data = $("#sCheck .pot_pressure").serializeObject();
                var carInfo = window.sessionStorage.getItem("carInfo");
                carInfo = JSON.parse(carInfo);
                cld_data.vSn = carInfo.vSn;
                cld_data.id = $(".pot_pressure .cly_row").attr("uuid");
                if (cld_data.id != null && cld_data.id != "") {
                    cld_url = allurl + "/car-management/car/updateCldCheckByvSn.action";
                }
                cld_data = JSON.stringify(cld_data);
                var sub_url = allurl + "/car-management/car/addSafeCheck/" + carInfo.vSn + ".action";
                var cCheckuuid = $("#sCheck .checkitem");
                var item1 = $("#sCheck .checkitem input.item_input");
                var item2 = $("#sCheck .checkitem input.request_input");
                // var item1 = $("#sCheck .checkitem span:nth-child(1)");
                // var item2 = $("#sCheck .checkitem span:nth-child(2)");
                var item3 = $("#sCheck .checkitem span:nth-child(3) input:checked");
                var item4 = $("#sCheck .checkitem input.explain_input");
                var item5 = $("#sCheck .checkitem input.solve_input");
                var item6 = $("#sCheck .checkitem input.confirm_input");
                var sucArr = [];
                for (var i = 0; i < item1.length; i++) {
                    // 如果检查项有问题，核对没有填写则无法提交。
                    if (item3[i].value == 'N' && item4[i].value == '' || item3[i].value == 'Y' && item4[i].value != '') {
                        toastr.warning('提示', '请填写状态为 否 项目对应的问题原因，否则不能提交', errormessageOpts);
                        return;
                    }
                    sucArr.push({
                        "item": item1[i].value,
                        "request": item2[i].value,
                        "status": item3[i].value,
                        "checkExplanation": item4[i].value,
                        "checkingExplanation": item5[i].value,
                        "confirmExplanation": item6[i].value,
                        "vSn": carInfo.vSn,
                        "uuid": cCheckuuid[i].getAttribute("uuid")
                    })
                }
                // 检查提交 sCheck_btn，核对提交sCheck_btn，检查修改updatesCheck_btn，核对修改sCheck_btn
                // 初次核对提交，避免不填值
                var checkPerson = window.sessionStorage.getItem("checkPerson");
                var checkingPerson = window.sessionStorage.getItem("solvePerson");
                var confirmPerson = window.sessionStorage.getItem("confirmPerson");
                // console.log(checkPerson)
                // console.log(checkingPerson)
                // console.log(confirmPerson)
                // 没有检查时
                //   checkPerson,checkingPerson,confirmPerson都为空
                // 检查修改
                //   $(this).hasClass('updatesCheck_btn')==true
                // console.log(checkPerson != '' && checkingPerson != '' && confirmPerson == '' || $(this).hasClass('confirmCheck_btn'))
                if (checkPerson == '' && checkingPerson == '' && confirmPerson == '' || $(this).hasClass('updatesCheck_btn')) {
                    for (var j = 0; j < item1.length; j++) {
                        // console.log(item3[j].value,item4[j].value)
                        if (item3[j].value == 'N' && item4[j].value == '' || item3[j].value == 'Y' && item4[j].value != '') {
                            toastr.warning('提示', '请填写状态为 否 项目对应的问题原因，否则不能提交', errormessageOpts);
                            return;
                        }
                    }
                    sub_url = allurl + "/car-management/car/addSafeCheck/" + carInfo.vSn + ".action";
                }

                // 没有确认时
                //   checkPerson,checkingPerson都不为空,confirmPerson为空
                // 确认修改
                //   $(this).hasClass('confirmCheck_btn')==true
                else if (checkPerson != '' && checkingPerson != '' && confirmPerson == '' || $(this).hasClass('confirmCheck_btn')) {
                    for (var j = 0; j < item1.length; j++) {
                        if (item3[j].value == 'N' && item6[j].value == '' || item3[j].value == 'Y' && item6[j].value != '') {
                            toastr.warning('提示', '请填写状态为 否 项目对应的检查确认，否则不能提交', errormessageOpts);
                            return;
                        }
                    }
                    sub_url = allurl + "/car-management/car/confirmSafeCheckByvSn/" + carInfo.vSn + ".action";
                }
                // 没有核对时
                //   checkPerson不为空,checkingPerson,confirmPerson都为空
                // 核对修改
                //   $(this).hasClass('sCheck_btn')==true
                else if (checkPerson != '' && checkingPerson == '' && confirmPerson == '' || $(this).hasClass('sCheck_btn')) {
                    for (var j = 0; j < item1.length; j++) {
                        if (item3[j].value == 'N' && item5[j].value == '' || item3[j].value == 'Y' && item5[j].value != '') {
                            toastr.warning('提示', '请填写状态为 否 项目对应的解决方法，否则不能提交', errormessageOpts);
                            return;
                        }
                    }
                    sub_url = allurl + "/car-management/car/updateSafeCheckByvSn/" + carInfo.vSn + ".action"; // 核对接口
                }
                // console.log(sub_url)
                //缸压
                subData(cld_url, cld_data, "post", "sub_cld");

                var sub_data = JSON.stringify(sucArr);
                subData(sub_url, sub_data, "post", "sub_sCheck", "");
            });
            // bom提交
            $(".sub_bchek_btn").unbind('click')
                .bind('click', function() {
                    var carInfo = window.sessionStorage
                        .getItem("carInfo");
                    carInfo = JSON.parse(carInfo);
                    var sub_url = allurl +
                        "/car-management/car/addEmsAndBomCheck/" +
                        carInfo.vSn + ".action"; // 检查接口
                    var cCheckuuid = $("#bomCheck .checkitem");
                    var item = $("#bomCheck .bom_name");
                    var item2 = $("#bomCheck .bom_num");
                    var item3 = $("#bomCheck .checkitem  span:nth-child(3) input:checked");
                    var item4 = $("#bomCheck .explain_input");
                    var item5 = $("#bomCheck .solve_input");
                    var sucArr = [];
                    for (var i = 0; i < item.length; i++) {
                        if (item3[i].value == 'N' && item4[i].value == '') {
                            toastr.warning('提示', '请填写状态为否项目对应的问题原因，否则不能提交', errormessageOpts);
                            return;
                        }
                        sucArr
                            .push({
                                "bomName": item[i].value,
                                "bomNum": item2[i].value,
                                "status": item3[i].value,
                                "checkExplanation": item4[i].value,
                                "checkingExplanation": item5[i].value,
                                "vSn": carInfo.vSn,
                                "uuid": cCheckuuid[i]
                                    .getAttribute("uuid")
                            })
                    }
                    // 检查提交 sub_bchek_btn，核对提交sCheck_btn，检查修改updatesCheck_btn，核对修改sCheck_btn
                    var checkPerson = window.sessionStorage.getItem("checkPerson");
                    if (checkPerson != 'null' && checkPerson != '' && $(this).hasClass("sub_bchek_btn")) {
                        console.log(checkPerson); //null
                        console.log(checkPerson != '' && checkPerson != null)
                        console.log($(this).hasClass("sub_bchek_btn"));
                        for (var j = 0; j < item.length; j++) {
                            if (item3[j].value == 'N' && item5[j].value == '') {
                                toastr.warning('提示', '请填写状态为否项目对应的解决方法，否则不能提交', errormessageOpts);
                                return;
                            }
                        }
                        sub_url = allurl +
                            "/car-management/car/updateEmsAndBomCheckByCar/" +
                            carInfo.vSn + ".action"; // 核对接口
                    }
                    // 检查修改
                    if (checkPerson != '' && $(this).hasClass("updatebCheck_btn")) {
                        sub_url = allurl +
                            "/car-management/car/addEmsAndBomCheck/" +
                            carInfo.vSn + ".action";
                    }
                    var sub_data = JSON.stringify(sucArr);
                    subData(sub_url, sub_data, "post",
                        "sub_bchek", "");
                });

        }
    });
}
var cylinderArr = ["缸压（Bar）:", "1缸", "2缸", "3缸", "4缸", "燃油压力(Bar)", "实测"];
var cylinderName = ["cylinder", "one", "two", "three", "four", "fuel",
    "actual"
];
// 初始化缸压内容
function initcylinder(box1, vSn) {
    var boxs = "";
    for (var j = 0; j < cylinderArr.length; j++) {
        boxs += '<div class="cly_row" uuid=""><label>' + cylinderArr[j] +
            '</label><input name="' + cylinderName[j] +
            '_p" type="text" value=""></div>'
    }
    $(box1).html(boxs);
    $.ajax({ // 数据回显
        url: allurl + "/car-management/car/findCldCheckByvSn/" + vSn +
            ".action",
        success: function(res) {
            if (res != null) {
                showData(box1, res);
                $(box1 + " .cly_row").attr("uuid", res.id);
                $(".cly_row input").attr("readonly", true);
                $(".cly_row input").addClass("readonly");
            } else {
                $(".cly_row input").attr("readonly", false);
                $(".cly_row input").removeClass("readonly");
            }
        }
    })
    $("input[name='fuel_p']").val("4.0");
    $("input[name='fuel_p']").attr("readOnly", true);
    $("input[name='cylinder_p']").css("display", "none");
}

function initsafeCheck(box1, box2, btn, vSn) {
    initcylinder(box1, vSn); // 缸压
    var safeurl = allurl + "/car-management/car/findSafeCheckByvSn/" + vSn +
        ".action"; // 初始化安全检查时，页面先进行数据回显
    // var safeurl = "http://localhost/car/defcar/json/safenull.json";
    getcnid(safeurl, box2, btn); // 初始化检查项目表
}
// 安全检查
var carInfo = window.sessionStorage.getItem("carInfo");
carInfo = JSON.parse(carInfo);

function initToolRecord(name, vSn, page) {
    // 查询装备记录详情，如果有，加载列表页面，没有进入选择页面
    $.ajax({
        url: allurl + "/car-management/car/develop/find/" + vSn +
            ".action",
        success: function(res) {
            if (res == null || res.length == 0 ||
                toolnameArr.length == 0) {
                toastr.warning('尚未申请研发工具等', '研发工具装备记录详情', messageOpts);
                var link = '<button type="button" data-dismiss aria-label class="btn btn-default btn-primary link_bomapply">尚未申请研发工具,前去申请</button>';
                $(name).html(link);
                $(".link_bomapply").unbind('click').bind(
                    'click',
                    function() {
                        $(this).attr({
                            "data-dismiss": "modal",
                            "aria-label": "Close"
                        });
                        window.location.hash = "carTypeIn";
                        $(".carList").removeClass("active");
                        var carInfo = window.sessionStorage
                            .getItem("carInfo");
                        carInfo = JSON.parse(carInfo);
                        ToolRecordApply("#carTypeIn .rd_apply",
                            carInfo.vSn, "");
                        bomApply("#carTypeIn .bom_apply",
                            carInfo.vSn, "");
                        gettypeInData(carInfo.vSn,
                            "#carTypeIn .cartypein_apply");
                    })
            } else {
                var datecontent = "";
                var operator = "";
                var toolItem = '<div class="checktitle"><span style="width:37%;">研发工具申请信息</span><span style="width:63%;">研发工具装备信息</span></div>';
                toolItem += '<div class="checktitle"><span>工具或设备名称</span><span>申请人</span><span>装备日期</span><span>装备备注（未装备原因）</span><span>操作人</span></div>';
                for (var i = 0; i < res.length; i++) {
                    if (res[i].equippedDate == "" ||
                        res[i].equippedDate == null) {
                        datecontent = '<input placeholder="请选择日期"  id="installtoolTime' +
                            i +
                            '" class="form-control col-sm-7 layer-date">';
                    } else {
                        datecontent = res[i].equippedDate;
                    }
                    if (res[i].remark == null) {
                        res[i].remark = "";
                    }
                    if (res[i].operator == "" ||
                        res[i].operator == null) {
                        var remark = '<input type="text" class="remark" value="' +
                            res[i].remark + '">';
                        operator = '<button type="button" class="tool_btn btn my_btn" value="">提交</button>';
                    } else {
                        var remark = '<input type="text" readonly="true" class="remark" value="' +
                            res[i].remark + '">';
                        operator = res[i].operator;
                    }
                    if (name == "#toolForm .toolForm") {
                        if (!(res[i].operator == "" || res[i].operator == null)) {
                            toolItem += '<div class="checkitem" id="' +
                                res[i].id +
                                '"><span><input type="text" readOnly="readOnly" class="bom_name" value="' +
                                res[i].toolName +
                                '">' +
                                '</span><span><input type="text" readOnly="readOnly" class="bom_num" value="' +
                                res[i].applicant + '">' + '</span><span>' +
                                datecontent + '</span><span>' + remark +
                                '</span><span>' + operator +
                                '</span></div>';
                        }
                    } else {
                        toolItem += '<div class="checkitem" id="' +
                            res[i].id +
                            '"><span><input type="text" readOnly="readOnly" class="bom_name" value="' +
                            res[i].toolName +
                            '">' +
                            '</span><span><input type="text" readOnly="readOnly" class="bom_num" value="' +
                            res[i].applicant + '">' + '</span><span>' +
                            datecontent + '</span><span>' + remark +
                            '</span><span>' + operator +
                            '</span></div>';
                    }
                }
                if (name == "#toolForm .toolForm") {
                    $(name + " input").attr("disabled", true);
                } else {
                    $(name + " input").attr("disabled", false);
                }
                $(name).html(toolItem);
                setTimeout(function() {
                    for (var i = 0; i < res.length; i++) {
                        laydate.render({
                            elem: name + ' #installtoolTime' + i, // 装备日期
                            type: 'datetime', // 精确到 时分秒
                            theme: '#041473'
                        });
                    }
                }, 100)

                // 装备提交
                $(".tool_btn")
                    .unbind('click')
                    .bind('click', function() {
                        if ($(this).parent().siblings()
                            .children(".remark").val() == "" &&
                            $(this)
                            .parent()
                            .siblings()
                            .children(
                                ".layer-date")
                            .val() == "") {
                            toastr.warning(
                                '请选择装备日期或注明未装备原因',
                                '研发工具装备-提交失败',
                                messageOpts);
                            return;
                        }
                        var toolDataArr = {
                            "did": $(this).parent()
                                .parent().attr("id"),
                            "vSn": vSn,
                            "remark": $(this).parent()
                                .siblings().children(
                                    ".remark")
                                .val(),
                            "equippedDate": $(this)
                                .parent()
                                .siblings()
                                .children(".layer-date")
                                .val()
                        };
                        var sub_url = allurl +
                            "/car-management/car/develop/developEquipment.action";
                        subData(sub_url, toolDataArr,
                            "get", "tooldata", ""); // 申请研发
                    })
            }
        },
        "error": function(res) {
            toastr.error('提交失败', '研发工具装备日期提交', messageOpts);
        }
    })
}

function createTable(boxname, toolbarid, res, row1, row2, row3, row4, row5,
    row6, ifpage, ifrefresh, row1name, row2name, row3name, row4name,
    row5name, row6name, ifoperate, userOperateEventsDel,
    userOperateFormatterDel, pagetype) {
    $(boxname).css({
        "position": "relative"
    });
    $(boxname).bootstrapTable({
        data: res,
        toggle: "table",
        striped: true, // 是否显示行间隔色
        toolbar: toolbarid,
        pagination: ifpage,
        sortable: false,
        sortOrder: "asc",
        sidePagination: pagetype,
        pageNumber: 1,
        pageSize: 15,
        pageList: [15, 30, 50, 80, 100, 150],
        search: true,
        showColumns: true,
        showRefresh: ifrefresh,
        minimumCountColumns: 2,
        clickToSelect: true,
        searchOnEnterKey: true,
        strictSearch: false,
        showToggle: true,
        searchAlign: "right",
        showExport: "true",
        exportDataType: "selected",
        exportTypes: ['excel'], // 导出文件类型
        Icons: 'glyphicon-export',
        exportOptions: {
            ignoreColumn: [0, 11],
            fileName: "",
            worksheetName: 'sheet1',
            tableName: "",
            excelstyles: ['background-color', 'color', 'font-size',
                'font-weight'
            ]
        },
        columns: [{
            field: "checkbox",
            title: "全选",
            checkbox: true,
            valign: "middle",
            align: 'center'
        }, {
            field: 'ids',
            title: "序号",
            valign: "middle",
            align: "center",
            width: "4%",
            formatter: function(value, row, index) {
                return index + 1;
            }
        }, {
            field: row1,
            title: row1name,
            align: 'center',
            sortable: true
        }, {
            field: row2,
            title: row2name,
            align: 'center',
            sortable: true
        }, {
            field: row3,
            title: row3name,
            align: 'center',
            sortable: true
        }, {
            field: row4,
            title: row4name,
            align: 'center',
            sortable: true
        }, {
            field: row5,
            title: row5name,
            align: 'center',
            sortable: true
        }, {
            field: row6,
            title: row6name,
            align: 'center',
            sortable: true,
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            events: userOperateEventsDel,
            formatter: userOperateFormatterDel
        }]
    });
    if (!ifoperate) {
        $(boxname).bootstrapTable('hideColumn', 'operate');
    }
}

/*
 * 楼层导航
 */
$(window).on('scroll', function() {
    var $scroll = $(this).scrollTop();
    if ($scroll >= 700) {
        $('#loutinav').show();
    } else {
        $('#loutinav').hide();
    }
    $('.louti').each(function() {
        var $loutitop = $('.louti').eq($(this).index()).offset().top + 400;
        if ($loutitop > $scroll) { // 楼层的top大于滚动条的距离
            $('#loutinav li').removeClass('active');
            $('#loutinav li').eq($(this).index()).addClass('active');
            return false; // 中断循环
        }
    });
});
// 2.获取每个楼梯的offset().top,点击楼梯让对应的内容模块移动到对应的位置 offset().left
var $loutili = $('#loutinav li').not('.last').not('.backpage');
$loutili.on('click', function() {
    $(this).addClass('active').siblings('li').removeClass('active');
    var $loutitop = $('.louti').eq($(this).index()).offset().top;
    // 获取每个楼梯的offsetTop值
    $('html,body').animate({ // $('html,body')兼容问题body属于chrome
        scrollTop: $loutitop
    })
});
$('.last').on('click', function() {
    $('html,body').animate({ // $('html,body')兼容问题body属于chrome
        scrollTop: 0
    })
});
//返回页面
$("li.backpage").unbind('click').bind('click', function() {
    // console.log("返回");
    window.history.back(-1);
});

// 控制交管局账号是否显示个人中心
showCenter()

function showCenter() {
    var roles = JSON.parse(window.localStorage.successUser).data.roles;
    var isRat = false
    roles.forEach(item => {
        if (item.keyWord == 'rta') {
            isRat = true
        }
    });
    if (isRat) {
        $('#header_dropdown').hide()
    } else {
        $('#header_dropdown').show()
    }
}