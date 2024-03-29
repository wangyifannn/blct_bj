function loadCarList(pageInfo) {
    if (pageInfo == undefined) {
        var pageInfo = {
            pageNumber: 1,
            pageSize: 13
        };
    }
    $("#carListtable").bootstrapTable('destroy').bootstrapTable({
        url: allurl + '/car-management/car/pageQuery2.action',
        dataType: 'json',
        striped: true, //是否显示行间隔色
        toggle: "table",
        toolbar: "carListtable_toolbar",
        pagination: "true", //是否显示分页（*）
        sortOrder: "asc", //排序方式
        sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: pageInfo.pageNumber, //初始化加载第一页，默认第一页
        pageSize: pageInfo.pageSize, //每页的记录行数（*）
        paginationShowPageGo: true,
        pageList: [30, 50, 100, 150, 200, 300, 400, 500], //可供选择的每页的行数（*）
        search: false, //是否搜索查询
        showColumns: true, //是否显示所有的列
        showRefresh: false, //是否显示刷新按钮
        sortable: true, //是否启用排序
        minimumCountColumns: 2, //最少允许的列数
        clickToSelect: true, //是否启用点击选中行
        searchOnEnterKey: true, //设置为 true时，按回车触发搜索方法
        strictSearch: false, //设置为 true启用全匹配搜索， 否则为模糊搜索
        showToggle: true, //是否显示切换视图（table/card）按钮
        showExport: true,
        exportDataType: "selected",
        buttonsAlign: "right", //按钮位置  
        exportTypes: ['excel'], //导出文件类型 
        exportOptions: {
            ignoreColumn: [0, 15], //忽略某一列的索引  
            fileName: '测试车辆-车辆列表', //文件名称设置  
            worksheetName: 'sheet1', //表格工作区名称  
            tableName: '测试车辆-车辆列表',
            excelstyles: ['background-color', 'color', 'font-size', 'font-weight']
        },
        exportDataType: "selected",
        uniqueId: "vSn", // 每一行的唯一标识  
        //得到查询的参数
        queryParams: carlistqueryParams, //groupName
        onLoadSuccess: function(res) {
            if (window.islogin == undefined || window.islogin == null) {
                $('#plateTable').bootstrapTable('hideColumn', 'operate');
            } else if (window.islogin.data.roles.length > 0) {
                var userrole = [];
                for (var i = 0; i < window.islogin.data.roles.length; i++) {
                    userrole.push(window.islogin.data.roles[i].name);
                }
                var userroleString = userrole.toString();
                // 车辆查验人员
                if (userroleString.indexOf("超级管理员") != -1 || userroleString.indexOf("工程师") != -1 || userroleString.indexOf("车辆查验人员") != -1) {
                    $('#plateTable').bootstrapTable('showColumn', 'operate');
                    $("#Insurance_apply").show();
                } else {
                    $('#plateTable').bootstrapTable('hideColumn', 'operate');
                    $("#Insurance_apply").hide();
                }
            }
        },
        onLoadError: function() {
            //   console.log("数据加载失败！");
        },
        onPageChange: function(page, size) {
            var pageInfo = {
                pageNumber: page,
                pageSize: size
            };
            window.sessionStorage.pageInfo = JSON.stringify(pageInfo);
        },
        columns: [
            [{
                "title": "测试车辆-车辆列表",
                "halign": "center",
                "align": "center",
                "colspan": 15
            }],
            [{
                    field: "checkbox",
                    title: "全选",
                    checkbox: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'index',
                    title: "序号",
                    valign: "middle",
                    align: "center",
                    width: "5%",
                    formatter: function(value, row, index) {
                        var pageSize = $('#carListtable').bootstrapTable('getOptions').pageSize; //通过表的#id 可以得到每页多少条
                        var pageNumber = $('#carListtable').bootstrapTable('getOptions').pageNumber; //通过表的#id 可以得到当前第几页
                        return pageSize * (pageNumber - 1) + index + 1; //返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号 } }
                    }
                },
                {
                    field: "carName",
                    title: "车辆名称",
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: "vSn",
                    title: "车辆编号",
                    align: 'center',
                    valign: 'middle',
                    events: carVsnoperateEvents,
                    formatter: carVsnoperateFormatter
                },
                {
                    field: "vin",
                    title: "车架号",
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: "projectEngineer",
                    title: "项目工程师",
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: "groupName",
                    title: "所属分组",
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: "checks_status",
                    title: "检查进度",
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        var a = "";
                        if (value == null) {
                            var a = '';
                        } else if (value == "检查中") {
                            var a = '<span>检查中</span>';
                        } else if (value == "待审核") {
                            var a = '<span style="color:blue">待审核</span>';
                        } else if (value == "已审核") {
                            var a = '<span style="color:green">已审核</span>';
                        } else if (value == "未通过") {
                            var a = '<span style="color:red">未通过</span>';
                        } else {
                            var a = value;
                        }
                        return a;
                    }
                },
                {
                    field: "safeCheck",
                    title: "安全检查状态",
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        var a = "";
                        if (value == null) {
                            var a = '';
                        } else if (value == "待核对") {
                            var a = '<span style="color:blue">待核对</span>';
                        } else if (value == "通过") {
                            var a = '<span style="color:green">通过</span>';
                        } else if (value == "待确认") {
                            var a = '<span style="color:blue">待确认</span>';
                        } else {
                            var a = value;
                        }
                        return a;
                    }
                },
                {
                    field: "hiCheck",
                    title: "线束检查状态",
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        var a = "";
                        if (value == null) {
                            var a = '';
                        } else if (value == "待核对") {
                            var a = '<span style="color:blue">待核对</span>';
                        } else if (value == "通过") {
                            var a = '<span style="color:green">通过</span>';
                        } else {
                            var a = value;
                        }
                        return a;
                    }
                },

                {
                    field: "istatus",
                    title: "保险状态",
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        var a = "";
                        if (value == null) {
                            var a = '';
                        } else if (value == "未申请") {
                            var a = '<span>未申请</span>';
                        } else if (value == "已申请") {
                            var a = '<span style="color:green">已申请</span>';
                        } else if (value == "未续保") {
                            var a = '<span style="color:blue">未续保</span>';
                        } else if (value == "已续保") {
                            var a = '<span style="color:green">已续保</span>';
                        } else {
                            var a = value;
                        }
                        return a;
                    }
                },

                {
                    field: "endTime",
                    title: "保险终止日",
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        if (value == null || value == "1970-10-01") {
                            return '';
                        } else {
                            return '<span style="color:blue">' + value + '</span>';
                        }
                    }
                },
                {
                    field: "makeTime",
                    title: "创建时间",
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: "remark",
                    title: "备注",
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        if (value == null) {
                            return '';
                        } else {
                            return '<span style="width:60px;">' + value + '</span>';
                        }
                    }
                },

                /*  {
                     field: "iccard",
                     title: "车卡",
                     align: 'center',
                     valign: 'middle'
                 }, */
                {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    width: "100px",
                    events: caroperateEvents,
                    formatter: caroperateFormatter
                }
            ]
        ]
    });
}
// 车辆录入列表查询
$("#carlist_search").unbind('click').bind('click', function() {
    loadCarList();
})

function carlistqueryParams(params) { //配置参数  
    var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
        size: params.limit, //页面大小
        page: (params.offset / params.limit) + 1, //页码
        vSn: $(".carList_top .carlist_vSn").val(),
        project_sn: $(".carList_top .carlist_project_sn").val(),
        vin: $(".carList_top .carlist_vin").val(),
        projectEngineer: $(".carList_top .projectEngineer").val(), //项目工程师
        groupName: $(".carList_top .groupName").val(), //车辆分组
        istatus: $(".carList_top .istatus").val(), //保险状态
        checks_status: $(".carList_top .checks_status").val() //审核状态
    };
    return temp;
}

function carVsnoperateFormatter(value, row, index) {
    return ['<button id="row_vSn" class="my_btn btn btn-default btn-sm">' + value + '</button>'].join('');
}

window.carVsnoperateEvents = {
    'click #row_vSn': function(e, value, row, index) {
        console.log(row);
        $(".carList").removeClass("active");
        $(".insuranceTypeIn").removeClass("active");
        $(".plate").removeClass("active");
        $(".sumCarList").removeClass("active");
        window.sessionStorage.opterator = "detail";
        var rowarr = [];
        rowarr.push(row);
        deletAll(rowarr, "row_detail");
    }
}

function caroperateFormatter(value, row, index) {
    if (window.islogin == undefined || window.islogin == null) {
        carbtns =
            '<li><a href="#"><button type="button" id="rd_btn" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">研发安装</button></a></li>';
    } else if (window.islogin.data.roles.length > 0) {
        var userrole = [];
        for (var i = 0; i < window.islogin.data.roles.length; i++) {
            userrole.push(window.islogin.data.roles[i].name);
        }
        var userroleString = userrole.toString();
        if (userroleString.indexOf("车辆查验人员") != -1) {
            var carbtns =
                '<li><a href="#sCheck" data-toggle="tab"><button type="button" id="safe_btn" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">安全检查</button></a></li>' +
                '<li><a href="#wiringCheck" data-toggle="tab"><button type="button" id="warining_btn" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">线束检查</button></a></li>' +
                '<li><a href="#bomCheck" data-toggle="tab"><button type="button" id="bomCheck" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">BOM检查</button></a></li>' +
                '<li><a href="#"><button type="button" id="rd_btn" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">研发安装</button></a></li>' +
                '<li><a href="#"  data-toggle="tab"><button type="button" id="returncar_btn" class="my_btn btn btn-default btn-sm">还车</button></a></li>';
        } else if (userroleString.indexOf("超级管理员") != -1) {
            var carbtns =
                '<li><a href="#sCheck" data-toggle="tab"><button type="button" id="safe_btn" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">安全检查</button></a></li>' +
                '<li><a href="#wiringCheck" data-toggle="tab"><button type="button" id="warining_btn" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">线束检查</button></a></li>' +
                '<li><a href="#bomCheck" data-toggle="tab"><button type="button" id="bomCheck" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">BOM检查</button></a></li>' +
                '<li><a href="#"><button type="button" id="rd_btn" class="my_btn btn btn-default btn-sm" style="margin-right:15px;">研发安装</button></a></li>' +
                '<li><a href="#" data-toggle="tab"><button type="button" id="audit_btn" class="my_btn btn btn-default  btn-sm" style="margin-right:15px;">审核</button></a></li>' +
                '<li><a href="#"  data-toggle="tab"><button type="button" id="returncar_btn" class="my_btn btn btn-default btn-sm">还车</button></a></li>';
        } else if (userroleString.indexOf("工程师") != -1) {
            return '<button type="button" id="carTypeIn_btn" class="my_btn btn btn-default btn-sm">修改</button>'
        } else if (userroleString.indexOf("审核人员") != -1) {
            return '<button type="button" id="audit_btn" class="my_btn btn btn-default btn-sm">审核</button>'
        } else {
            return ''
        }
    }
    return ['<div class="btn-group">' +
        '<button type="button" class="btn btn-primary" id="carTypeIn_btn">修改</button>' +
        '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">' +
        '<span class="caret"></span>' +
        '<span class="sr-only">选中下拉菜单</span>' +
        '</button>' +
        '<ul class="dropdown-menu mydrop_menu" role="menu">' +
        carbtns +
        '</ul>' +
        '</div>'
    ].join('');
}


var carInfo = window.sessionStorage.getItem("carInfo");
carInfo = JSON.parse(carInfo);
window.caroperateEvents = {
    'click #safe_btn': function(e, value, row, index) { //安全
        window.sessionStorage.beforeHash = window.location.hash;
        window.location.hash = $(this).parent().attr("href");
        $(".carList").removeClass("active");
        window.sessionStorage.carInfo = JSON.stringify(row);
        initsafeCheck("#sCheck .pot_pressure", "#sCheck .check_itembox", "sCheck_btn", row.vSn);
    },
    'click #carTypeIn_btn': function(e, value, row, index) { //修改录入
        window.sessionStorage.beforeHash = window.location.hash;
        window.location.hash = "carupCheck";

        window.sessionStorage.carInfo = JSON.stringify(row);
        var carInfo = window.sessionStorage.getItem("carInfo");
        carInfo = JSON.parse(carInfo);
        $(".carList").removeClass("active");

        var sub_url = allurl + "/car-management/car/findUpcheck/" + row.vSn + ".action";
        subData(sub_url, "", "get", "findUpcheck", "#carupCheck .checkform");

        creatForm(addcarInfo, "#carTypeIn .cartypein_apply", "");

        showData("#carTypeIn .cartypein_apply", row); //将接车点检已有数据填入车辆录入表单
        $("#carTypeIn .cartypein_apply .vSn").attr("readOnly", true); //车辆编号不可更改

        ToolRecordApply("#carTypeIn .rd_apply", carInfo.vSn, "");
        bomApply("#carTypeIn .bom_apply", carInfo.vSn, "");
        gettypeInData(carInfo.vSn, "#carTypeIn .cartypein_apply");
        $("#carTypeIn .rd_apply .vSn").val(carInfo.vSn);
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
                $('#carTypeIn .cartypein_apply .project_sn').html(selectOption);
            }
        });
        $('#carTypeIn .cartypein_apply .project_sn').editableSelect({
            effects: 'slide',
            filter: true,
            duration: 200,
            onCreate: function() {
                // console.log("下拉框创建");
                $("#carTypeIn .cartypein_apply .project_sn").val();
            },
            onShow: function() {
                // console.log("下拉框显示");
                var a = $("#carTypeIn .cartypein_apply .project_sn").val();
            },
            onHide: function() {
                // console.log("下拉框隐藏");
            },
            onSelect: function() {
                // console.log("下拉框选项被选中");
                var a = $("#carTypeIn .cartypein_apply .project_sn").val();
                $.ajax({
                    url: allurl + "/car-management/project/loadNameBySn.action?sn=" + a,
                    success: function(res) {
                        console.log(res);
                        if (res) {
                            $('#carTypeIn .cartypein_apply .project_name').val(res);
                        }
                    }
                });
            }
        });
    },
    'click #warining_btn': function(e, value, row, index) { //线束
        var wurl = allurl + "/car-management/car/findHiCheckByvSn/" + row.vSn + ".action";
        wringcheck(wurl, "wiringChecktable", "");
        window.sessionStorage.beforeHash = window.location.hash;
        window.location.hash = $(this).parent().attr("href");
        $(".carList").removeClass("active");
        window.sessionStorage.carInfo = JSON.stringify(row);
    },
    'click #bomCheck': function(e, value, row, index) { //bom
        var getbomapply_url = allurl + "/car-management/car/findEmsAndBomCheckByvSn/" + row.vSn + ".action";
        getcnid(getbomapply_url, "#bomCheck .bomcheck_itembox", "sub_bchek_btn");
        window.sessionStorage.beforeHash = window.location.hash;
        window.location.hash = $(this).parent().attr("href");
        $(".carList").removeClass("active");
        window.sessionStorage.carInfo = JSON.stringify(row);
    },
    'click #rd_btn': function(e, value, row, index) { //研发
        $("#toolRecord_model").modal();
        initToolRecord("#toolRecord_model .toolForm", row.vSn, "");
        $("#toolRecord_model .vSn").val(row.vSn);
        window.sessionStorage.carInfo = JSON.stringify(row);
    },
    'click #audit_btn': function(e, value, row, index) {
        window.sessionStorage.carInfo = JSON.stringify(row);
        window.sessionStorage.opterator = "audit";
        var rowarr = [];
        rowarr.push(row);
        deletAll(rowarr, "row_detail");
    },
    'click #returncar_btn': function(e, value, row, index) {
        window.location.hash = "returncarCheck";
        $(".carList").removeClass("active");
        window.sessionStorage.carInfo = JSON.stringify(row);
        findBackcheck("#returncarCheck form", row.vSn);
        $("#returncarCheck form .vSn").val(row.vSn);
        $("#returncarCheck form .vSn").attr("readonly", true);
        $("#returncarCheck button.pull-right").click(function() {
            window.location.hash = "carList";
        })
    }
};
$("#Insurance_apply").unbind('click').bind('click', function() { //保险申请
    var Ins_Arr = $("#carListtable").bootstrapTable('getSelections');
    console.log(Ins_Arr);
    deletAll(Ins_Arr, "Ins_apply");
});

var InsApplyInfo = [{
    "name": "期限",
    "type": "text",
    "inputName": "insrange",
    "must": "年*"
}];
// 线束提交
$(".sub_wchek_btn").unbind('click').bind('click', function() {
    var carInfo = window.sessionStorage.getItem("carInfo");
    carInfo = JSON.parse(carInfo);
    var uuid = $("#wiringChecktable tbody tr");
    var item = $("#wiringChecktable tbody tr td:nth-child(1)");
    var status = $("#wiringChecktable tbody .my_radio:checked");
    var explain = $("#wiringChecktable tbody input.explain_input");
    var solve = $("#wiringChecktable tbody input.solve_input");

    var pitem = $("#wiringChecktable tbody input.pitem");
    // ------------------------------------------------------------------------

    var sucArr = [];
    var sub_url = allurl + "/car-management/car/addHiCheck/" + carInfo.vSn + ".action";
    for (var i = 0; i < item.length; i++) {
        if (status[i].value == 'N' && explain[i].value == '') {
            toastr.warning('提示', '请填写状态为 否 项目对应的问题原因，否则不能提交', messageOpts);
            return;
        }
        if (item[i].getAttribute("colspan") == "2") {
            sucArr.push({
                "pitem": pitem[i].value,
                "item": "",
                "status": status[i].value,
                "checkExplanation": explain[i].value,
                "checkingExplanation": solve[i].value,
                "vSn": carInfo.vSn,
                "uuid": uuid[i].getAttribute("uuid")
            })
        } else {
            sucArr.push({
                "pitem": pitem[i].value,
                "item": $(pitem[i]).parent().next().children()[0].value,
                "status": status[i].value,
                "checkExplanation": explain[i].value,
                "checkingExplanation": solve[i].value,
                "vSn": carInfo.vSn,
                "uuid": uuid[i].getAttribute("uuid")
            })
        }
    }

    var checkPerson = window.sessionStorage.getItem("checkPerson");
    console.log(checkPerson);
    var cp = $(".wringcheck_user .operator").text().slice(2);
    console.log(cp);
    if (checkPerson != 'null' && checkPerson != '' && $(this).hasClass("sub_wchek_btn")) {
        for (var j = 0; j < sucArr.length; j++) {
            if (sucArr[j].status == 'N' && sucArr[j].checkingExplanation == '') {
                toastr.warning('提示', '请填写状态为否项目对应的解决方法，否则不能提交', errormessageOpts);
                return;
            }
        }
        sub_url = allurl +
            "/car-management/car/updateHiCheckByvSn/" +
            carInfo.vSn + ".action"; // 核对接口
    }
    // 检查修改
    if (checkPerson != '' && $(this).hasClass("updatewCheck_btn")) {
        sub_url = allurl +
            "/car-management/car/addHiCheck/" +
            carInfo.vSn + ".action";
    }
    var sub_data = JSON.stringify(sucArr);
    console.log(sucArr);
    subData(sub_url, sub_data, "post", "sub_wcheck");
});
// 审核提交/car/doReview.action
$(".audit_btn").unbind('click').bind('click', function() {
    console.log($(":radio[name='ifauditsuccess']:checked").val() == "" && $(":radio[name='ifauditsuccess']:checked").val() == undefined)
        //    return;
    if ($(":radio[name='ifauditsuccess']:checked").val() == "" && $(":radio[name='ifauditsuccess']:checked").val() == undefined) {
        toastr.warning("请选择审核是否通过", "审核", messageOpts);
        return;
    }
    var carInfo = window.sessionStorage.getItem("carInfo");
    carInfo = JSON.parse(carInfo);

    var sub_url = allurl + "/car-management/car/doReview.action";
    var sub_data = {
        vSn: carInfo.vSn,
        status: $(":radio[name='ifauditsuccess']:checked").val(),
        explanation: $("#audit_remake").val()
    };
    console.log(sub_data)
    subData(sub_url, sub_data, "get", "sub_audit");
})

function changeNullToLine(res) {
    for (var key in res) {
        for (var keys in res[key]) { //两层对象嵌套
            if (res[key][keys] == null) {
                res[key][keys] = "___";
            }
        }
    }
    return res;
}

function findAudit(vSn, boxname) {
    // 修改审核视图信息
    $.ajax({
        url: allurl + "/car-management/car/getReviewInfo/" + vSn + ".action",
        success: function(res) {
            console.log(res);
            $("#auditForm .vSn").text(vSn);
            if (res.hiCheck == null) {
                var hiCheck_checkPerson = "___";
                var hiCheck_checkTime = "___";
                var hiCheck_checkingPerson = "___";
                var hiCheck_checkingTime = "___";
            } else {
                var hiCheck_checkPerson = res.hiCheck.checkPerson;
                var hiCheck_checkTime = res.hiCheck.checkTime;
                var hiCheck_checkingPerson = res.hiCheck.checkingPerson;
                var hiCheck_checkingTime = res.hiCheck.checkingTime;
            }
            if (res.safeCheck == null) {
                var safeCheck_checkPerson = "___";
                var safeCheck_checkTime = "___";
                var safeCheck_checkingPerson = "___";
                var safeCheck_checkingTime = "___";
            } else {
                var safeCheck_checkPerson = res.safeCheck.checkPerson;
                var safeCheck_checkTime = res.safeCheck.checkTime;
                var safeCheck_checkingPerson = res.safeCheck.checkingPerson;
                var safeCheck_checkingTime = res.safeCheck.checkingTime;
            }
            if (res.bCheck == null) {
                var bCheck_checkPerson = "___";
                var bCheck_checkTime = "___";
                var bCheck_checkingPerson = "___";
                var bCheck_checkingTime = "___";
            } else {
                var bCheck_checkPerson = res.bCheck.checkPerson;
                var bCheck_checkTime = res.bCheck.checkTime;
                var bCheck_checkingPerson = res.bCheck.checkingPerson;
                var bCheck_checkingTime = res.bCheck.checkingTime;
            }
            $("#auditForm .safeCheckPerson").html(safeCheck_checkPerson);
            $("#auditForm .safeCheckingPerson").html(safeCheck_checkingPerson);
            $("#auditForm .hiCheckPerson").html(hiCheck_checkPerson);
            $("#auditForm .hiCheckingPerson").html(hiCheck_checkingPerson);
            $("#auditForm .bomCheckPerson").html(bCheck_checkPerson);
            $("#auditForm .bomCheckingPerson").html(bCheck_checkingPerson);
            $("#auditForm .safeCheckData").html(safeCheck_checkTime);
            $("#auditForm .safeCheckingData").html(safeCheck_checkingTime);
            $("#auditForm .hiCheckData").html(hiCheck_checkTime);
            $("#auditForm .hiCheckingData").html(hiCheck_checkingTime);
            $("#auditForm .bomCheckData").html(bCheck_checkTime);
            $("#auditForm .bomCheckingData").html(bCheck_checkingTime);
            // $("#audit_submit input").customInput();
        }
    })
}

function findReview(vSn, boxname) {
    console.log(boxname)
    if (boxname == "audit") {
        $(".audit_footer").html('<div class="col-md-3">' +
            '<span>审核是否通过：</span>' +
            '<span id="audit_submit">' +
            '<span class="pretty p-default p-round">' +
            '<input type="radio" name="ifauditsuccess" value="是">' +
            '<div class="state p-success-o"><label>是</label> </div>' +
            '</span>' +
            '<span class="pretty p-default p-round">' +
            '<input type="radio" checked name="ifauditsuccess" value="否">' +
            '<div class="state p-success-o"><label>否</label></div>' +
            '</span>' +
            '</span>' +
            '</div>' +
            '<div class="col-md-9 audit_explain">' +
            '<span>审核说明：</span>' +
            '<textarea name="" id="audit_remake" cols="73" rows="2"></textarea>' +
            '</div>' +
            '<div class="audit_fot wringcheck_user">' +
            '<span class="auditpeople">审核人：__</span>' +
            '<span class="auditdata">审核日期：__</span>' +
            '</div>');
    }
    $.ajax({
        "url": "/car-management/car/findReview.action?vSn=" + vSn,
        "success": function(res) {
            if (res != null && res.status != null) {
                $("#audit_remake").val(res.explanation);
                $(":radio[name='ifauditsuccess'][value='" + res.status + "']").prop("checked", "checked");
                $(".auditpeople").html("审核人：" + res.reviewerPerson);
                $(".auditdata").html("审核日期：" + res.reviewerTime);

                // $("#audit_detail input").customInput();
            } else if (boxname == "detail") {
                $(".audit_footer").html("<p style='text-align:center;color:red;'>尚未审核</p>");
            } else {
                toastr.warning("审核数据获取失败", "审核", messageOpts);
                console.log("审核数据获取失败")
            }
        }
    })
}

// 修改检查项
function Modifier(boxname) {
    // 检查修改
    $(boxname + " .check_modifier").unbind('click').bind('click', function() {
            $(boxname + " .explain_input").attr("readonly", false);
            $(boxname + " .explain_input").removeClass("readonly");
            $(boxname + " .solve_input").attr("readonly", true);
            $(boxname + " .solve_input").addClass("readonly");
            $(boxname + " .confirm_input").attr("readonly", true);
            $(boxname + " .confirm_input").addClass("readonly");
            $(boxname + " input[type='radio']").attr("disabled", false);
            $(boxname + " button:first-child").text("保存");
            if (boxname == "#sCheck") {
                $(".pot_pressure input").attr("readonly", false);
                $(".pot_pressure input").removeClass("readonly");

                $(boxname + " button:first-child").addClass("updatesCheck_btn").removeClass("sCheck_btn").removeClass("confirmCheck_btn");
            } else if (boxname == "#wiringCheck") {
                $(boxname + " button:first-child").addClass("updatewCheck_btn").removeClass("sub_wchek_btn");
            } else if (boxname == "#bomCheck") {
                $(boxname + " button:first-child").addClass("updatebCheck_btn").removeClass("sub_bchek_btn");
            }
        })
        // 核对修改
    $(boxname + " .checking_modifier").unbind('click').bind('click', function() {
            $(boxname + " .explain_input").attr("readonly", true);
            $(boxname + " .explain_input").addClass("readonly");
            $(boxname + " .solve_input").attr("readonly", false);
            $(boxname + " .solve_input").removeClass("readonly");
            $(boxname + " .confirm_input").attr("readonly", true);
            $(boxname + " .confirm_input").addClass("readonly");
            $(boxname + " input[type='radio']").attr("disabled", true);
            $(boxname + " button:first-child").text("保存");
            if (boxname == "#sCheck") {
                $(boxname + " button:first-child").addClass("sCheck_btn").removeClass("updatesCheck_btn").removeClass("confirmCheck_btn");
            } else if (boxname == "#wiringCheck") {
                $(boxname + " button:first-child").addClass("sub_wchek_btn").removeClass("updatewCheck_btn");
            } else if (boxname == "#bomCheck") {
                $(boxname + " button:first-child").addClass("sub_bchek_btn").removeClass("updatebCheck_btn");
            }
        })
        // 确认修改
    $(boxname + " .confirm_modifier").unbind('click').bind('click', function() {
        $(boxname + " .explain_input").attr("readonly", true);
        $(boxname + " .explain_input").addClass("readonly");
        $(boxname + " .solve_input").attr("readonly", true);
        $(boxname + " .solve_input").addClass("readonly");
        $(boxname + " .confirm_input").attr("readonly", false);
        $(boxname + " .confirm_input").removeClass("readonly");
        $(boxname + " input[type='radio']").attr("disabled", true);
        $(boxname + " button:first-child").text("保存");
        if (boxname == "#sCheck") {
            $(boxname + " button:first-child").addClass("confirmCheck_btn").removeClass("sCheck_btn").removeClass("updatesCheck_btn");
        }
    })
}
Modifier("#sCheck");
Modifier("#wiringCheck");
Modifier("#bomCheck");