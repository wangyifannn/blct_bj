loadCarGroup();
loadDriverGroup();

function changeTabs() {
    var htmlHas = window.location.hash;
    var htmlli = htmlHas.split("#")[1];
    htmlli = "." + htmlli;
    $(htmlli).parent().siblings().slideUp(250); // 左侧菜单 显示隐藏切换
    $(htmlli).siblings().removeClass("active");
    $(htmlli).siblings().removeClass("active");
    $(htmlli).parent().parent().parent().siblings().removeClass("active");
    $(htmlli).parent().parent().slideDown(250);
    $(htmlli).addClass("active");
    $(htmlli).parent().addClass("active");
    $(htmlli).parent().parent().parent().addClass("active");
    // 右侧tabs 显示隐藏切换
    $(htmlHas).siblings().removeClass("active");
    $(htmlHas).addClass("active");
    var a_href = htmlHas;
    a_href = a_href.split(" ");
    a_href = a_href[0];
    window.sessionStorage.ahref = a_href;
    $('a[href="' + a_href + '"]').tab('show');

    // if (a_href == "" || a_href == null) {
    //     a_href = "#carCheck";
    // }

    switch (a_href) {
        case "#driverList":
            $("#toolbar_DriverTable input").not(':button,:radio,:submit') // 去除不需要重置的input类型
                .val('');
            var pageInfo = window.sessionStorage.getItem("pageInfo");
            pageInfo = JSON.parse(pageInfo);
            loadDriverGroup(pageInfo);
            setTimeout(function() {
                loadDriverList();
            }, 100)
            break;
        case "#carCheck":
            loadCarGroup();
            findProject();
            $("#carCheck input").val("");
            setTimeout(function() {
                creatForm(addcarInfo, "#newcarTypeIn .cartypein_apply", "");
                $("#newcarTypeIn .cartypein_apply .project_name").attr("readOnly", true);

                // getVsn("#carCheck .checkform .vSn"); // 数据库生成车辆编号

                $(".shownewCarFileName").html("");
                $(".shownewcircuitryName").html("");
                $(".shownewcrdName").html("");
                //  检测车辆编号的变化
                var projectsn = "";
                $.ajax({
                    url: allurl + "/car-management/project/likeProjectSn.action?projectsn=" + projectsn,
                    async: false,
                    success: function(res) {
                        console.log(res);
                        var selectOption = "";
                        if (res.length > 0) {
                            for (var i = 0; i < res.length; i++) {
                                selectOption += '<option>' + res[i] + '</option>';
                            }
                        } else {
                            selectOption = '<option>' + "请填写" + '</option>';
                        }
                        $('#newcarTypeIn .cartypein_apply .project_sn').html(selectOption);
                    }
                });
                $('#newcarTypeIn .cartypein_apply .project_sn').editableSelect({
                    effects: 'slide',
                    filter: true,
                    duration: 200,
                    onCreate: function() {
                        $("#newcarTypeIn .cartypein_apply .project_sn").val();
                    },
                    onShow: function() {
                        var a = $("#newcarTypeIn .cartypein_apply .project_sn").val();
                    },
                    onHide: function() {},
                    onSelect: function() {
                        var a = $("#newcarTypeIn .cartypein_apply .project_sn").val();
                        $.ajax({
                            url: allurl + "/car-management/project/loadNameBySn.action?sn=" + a,
                            success: function(res) {
                                console.log(res);
                                if (res) {
                                    $('#newcarTypeIn .cartypein_apply .project_name').val(res);
                                }
                            }
                        });
                    }
                });
            }, 100);
            break;
        case "#carList":
            $("#carListtable_toolbar input").not(':button,:radio,:submit') // 去除不需要重置的input类型
                .val('');
            findProject();
            var pageInfo = window.sessionStorage.getItem("pageInfo");
            pageInfo = JSON.parse(pageInfo);

            loadCarList(pageInfo);
            break;
        case "#insuranceTypeIn":
            $(".insuranceTypeIn_top input").not(':button,:radio,:submit') // 去除不需要重置的input类型
                .val('');
            var pageInfo = window.sessionStorage.getItem("pageInfo");
            pageInfo = JSON.parse(pageInfo);
            loadInsuranceList(pageInfo);
            break;
        case "#plate":
            $(".plate_top input").not(':button,:radio,:submit') // 去除不需要重置的input类型
                .val('');
            var pageInfo = window.sessionStorage.getItem("pageInfo");
            pageInfo = JSON.parse(pageInfo);
            loadPlateList(pageInfo);
            break;
        case "#sumCarList":
            $("#sumCarList .sumcar_top form input").not(':button,:radio,:submit') // 去除不需要重置的input类型
                .val('');
            var pageInfo = window.sessionStorage.getItem("pageInfo");
            pageInfo = JSON.parse(pageInfo);
            findProject();
            loadsumCarList(pageInfo);
            break;
        case "#oilCard":
            $("#toolbar_OilTable input").not(':button,:radio,:submit') // 去除不需要重置的input类型
                .val('');
            loadoilList();
            break;
        case "#add_maintain_apply":
            $("#add_maintain_apply .form-horizontal input").not(':button,:radio,:submit') // 去除不需要重置的input类型
                .val('');
            break;
        case "#maintainList":
            $("#toolbar_maintainTable .mainList_vSn").val("");
            $("#toolbar_maintainTable .applytime").val("");
            $("#toolbar_maintainTable .applyPeople").val("");
            $("#mainList_status").find("option[value = '']").attr("selected", "selected");
            findEmployee();
            loadMaintainList();
            break;
        case "#user":
            $("#userlist_toolbar input").not(':button,:radio,:submit') // 去除不需要重置的input类型
                .val('');
            $("#userlist_toolbar #user_role").find("option[value = '']").attr(
                "selected", "selected");
            loadRoleList();
            loadCarGroup();
            loadUserList();
            break;
        case "#role":
            loadRoleList();
            loadmenuChoice(".role_menuList");
            loadrightsList(".role_check_box", "rolepid");
            $("#role_list").show();
            $("#role .form-horizontal").hide();
            break;
        case "#rights":
            loadRightsList();
            $("#rights_list").show();
            $("#add_rights_form").hide();
            break;
        case "#menu":
            $("#menu .form-horizontal").hide();
            loadMenuList();
            break;
        case "#group":
            loadCarGroup();
            loadDriverGroup();
            break;
        case "#iccard":
            findIccard();
            break;
        case "#projectManage":
            findProject();
            break;
        case "#customerManage":
            findCustomer();
            break;
        case "#maintainLog":
            createLogTable("#maintainLogTable", "toolbar_maintainLogTable", allurl +
                "/car-management/log/findCarMaintainLog.action",
                maintainlogOperateEvents, maintainlogOperateFormatter);
            break;
        case "#dataLog": // 系统
            createLogTable("#sysLogTable", "toolbar_sysLogTable", allurl +
                "/car-management/log/findCarSystemLog.action",
                syslogOperateEvents, syslogOperateFormatter);
            break;
        case "#approveLog": // 驾驶员
            createLogTable("#driverLogTable", "toolbar_driverLogTable", allurl +
                "/car-management/log/findCarDriverLog.action",
                driverlogOperateEvents, driverlogOperateFormatter);
            break;
        case "#manageLog": // 车辆
            createLogTable("#carLogTable", "toolbar_carLogTable", allurl +
                "/car-management/log/findCarLog.action", carlogOperateEvents,
                carlogOperateFormatter);
            break;
        case "#carvin": // 车辆
            loadVinList();
            break;
        default:
            break;
    }
}

// $(window).on("hashchange", function() { // 兼容ie8+和手机端
//     if (window.location.hash != "") {
//         changeTabs();
//     }
// });
window.addEventListener('hashchange', function() {
    changeTabs();
}, false);