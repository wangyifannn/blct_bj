﻿// #checkpoint_cartype
if (window.islogin == undefined || window.islogin == null) {
  $("#checkpoint_cartype").hide();
} else if (window.islogin.data.roles.length > 0) {
  var userrole = [];
  for (var i = 0; i < window.islogin.data.roles.length; i++) {
    userrole.push(window.islogin.data.roles[i].name);
  }
  var userroleString = userrole.toString();
  if (userroleString.indexOf("超级管理员") != -1 || userroleString.indexOf("试验车牌办理人员") != -1) {
    $("#checkpoint_cartype").show();
  } else {
    $("#checkpoint_cartype").hide();
  }
  // project_status
  if (userroleString.indexOf("超级管理员") != -1 || userroleString.indexOf("项目管理") != -1) {
    $("#project_status").show();
  } else {
    $("#project_status").hide();
  }
}
var index = "";

function loadsumCarList(args, order, pageInfo) {

  var url = allurl + "/car-management/car/pageQuery.action";
  if (args == "orderQuery") {
    url = allurl + "/car-management/car/orderQuery.action";
  }
  if (pageInfo == undefined) {
    var pageInfo = {
      pageNumber: 1,
      pageSize: 10
    };
  }
  $("#sumcarTable").bootstrapTable('destroy').bootstrapTable({
    url: url,
    dataType: 'json',
    striped: true, //是否显示行间隔色
    toggle: "table",
    toolbar: "sumcarTable_toolbar",
    pagination: "true", //是否显示分页（*）
    sortOrder: "asc", //排序方式
    sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
    pageNumber: pageInfo.pageNumber, //初始化加载第一页，默认第一页
    pageSize: pageInfo.pageSize, //每页的记录行数（*）
    paginationShowPageGo: true,
    pageList: [10, 25, 50, 100, 150, 200, 300, 400, 500], //可供选择的每页的行数（*）
    search: false, //是否搜索查询
    showColumns: true, //是否显示所有的列
    showRefresh: false, //是否显示刷新按钮
    sortable: true, //是否启用排序
    minimumCountColumns: 2, //最少允许的列数
    clickToSelect: true, //是否启用点击选中行
    searchOnEnterKey: true, //设置为 true时，按回车触发搜索方法
    strictSearch: false, //设置为 true启用全匹配搜索， 否则为模糊搜索
    showToggle: true, //是否显示切换视图（table/card）按钮
    searchAlign: "right",
    showFullscreen: true, //是否显示全屏按钮
    showExport: true,
    buttonsAlign: "right", //按钮位置  
    exportDataType: "selected",
    exportTypes: ['excel'], //导出文件类型  
    exportOptions: {
      ignoreColumn: [0], //忽略某一列的索引  
      fileName: '测试车辆-车辆总表', //文件名称设置  
      worksheetName: 'sheet1', //表格工作区名称  
      tableName: '测试车辆-车辆总表',
      excelstyles: ['background-color', 'color', 'font-size', 'font-weight']
      // onMsoNumberFormat: DoOnMsoNumberFormat
    },
    uniqueId: "vSn", // 每一行的唯一标识
    queryParams: function (params) {
      var temp = {
        size: params.limit, //页面大小
        page: (params.offset / params.limit) + 1, //页码
        sort: "vSn", //排序列名  
        sortOrder: "asc", //排位命令（desc，asc） 
        vSn: $("#sumCarList .sumcar_top .vSn").val(),
        customer: $("#sumCarList .sumcar_top .customer").val(),
        project_sn: $("#sumCarList .sumcar_top .project_sn").val(),
        adminName: $("#sumCarList .sumcar_top .adminName").val(),
        vin: $("#sumCarList .sumcar_top .vin").val(),
        engineNumber: $("#sumCarList .sumcar_top .engineNumber").val(),
        projectEngineer: $("#sumCarList .sumcar_top .projectEngineer").val(),
        brandModeltwo: $("#filter_model .brandModeltwo").val(),
        groupName: $("#sumCarList .sumcar_top .groupName").val(), //车辆分组

        istatus: $("#sumCarList .sumcar_top .istatus").val(), // 保险状态
        vehicleInspection: $("#sumCarList .sumcar_top .vehicleInspection").val(), // 验车状态
        carStatus: $("#sumCarList .sumcar_top .carStatus").val(), // 车辆状态

        insNo: $("#filter_model .insNo").val(),
        bstart: $("#filter_model .bstart").val(), //保险起始日
        bend: $("#filter_model .bend").val(), //保险终止日
        pstart: $("#filter_model .pstart").val(), //牌照起始日
        pend: $("#filter_model .pend").val(), //牌照结束日
        ustart: $("#filter_model .ustart").val(), //ustart接车起始日
        uend: $("#filter_model .uend").val(), //接车结束日
        backstart: $("#filter_model .backstart").val(), //还车起始日
        backend: $("#filter_model .backend").val(), //还车结束日

        ing: "", //在用
        all: "", //全部
        beforup: "", //先前接车
        haveLi: "", //有牌照无保险
        HaveIn: "", //有保险无牌照
        thismonthback: "", //当月归还
        thismonnew: "", //当月新车
        beforBack: "", // 之前归还
        stop: "" //// 停用车辆
      };
      // temp.order = order;
      // console.log(order);
      if (args == "orderQuery") {
        for (var key in temp) {
          if (key == order) {
            temp[key] = true;
          }
        }
      }
      console.log(temp);
      return temp;
    },
    onLoadSuccess: function (res) {
      console.log(res);
      $("#filter_model .brandModeltwo").val('')
      $("#filter_model .insNo").val('')
      $("#filter_model .bstart").val('') //保险起始日
      $("#filter_model .bend").val('') //保险终止日
      $("#filter_model .pstart").val('') //牌照起始日
      $("#filter_model .pend").val('') //牌照结束日
      $("#filter_model .ustart").val('') //ustart接车起始日
      $("#filter_model .uend").val('') //接车结束日
      $("#filter_model .backstart").val('') //还车起始日
      $("#filter_model .backend").val('') //还车结束日
    },
    onLoadError: function () {
      console.log("数据加载失败！");
    },
    //单击行时
    onClickRow: function (row, $element) {
      index = $element.data('index');
    },
    //点击每列前的checkbox时
    onCheck: function (row, $element) {
      index = $element.data('index');
    },
    columns: [
      [{
        "title": "测试车辆-车辆总表",
        "halign": "center",
        "align": "center",
        "colspan": 32
      }],
      [{
          field: "checkbox",
          title: "全选",
          checkbox: true,
          align: 'center',
          valign: "middle",
          width: 100
        },
        {
          field: 'index',
          title: "序号",
          width: 100,
          valign: "middle",
          align: "center",
          formatter: function (value, row, index) {
            var pageSize = $('#sumcarTable').bootstrapTable('getOptions').pageSize; //通过表的#id 可以得到每页多少条
            var pageNumber = $('#sumcarTable').bootstrapTable('getOptions').pageNumber; //通过表的#id 可以得到当前第几页
            return pageSize * (pageNumber - 1) + index + 1; //返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号
          }
        },
        {
          field: "vSn",
          title: '<span>车辆编号</span>',
          width: 100,
          align: 'center',
          valign: "middle",
          events: carVsnoperateEvents,
          formatter: carVsnoperateFormatter
        },
        {
          field: "project",
          title: "项目编号",
          align: 'center',
          valign: "middle",
          width: 100,
          formatter: function (value, row, index) {
            if (value != null) {
              return value.project_sn
            }
          }
        },
        {
          field: "project",
          title: "项目状态",
          align: 'center',
          valign: "middle",
          width: 100,
          formatter: function (value, row, index) {
            if (value != null) {
              return value.project_status
            }
          }
        },
        {
          field: "customer",
          title: "客户",
          align: 'center',
          valign: "middle",
          formatter: function (value, row, index) {
            if (value == null) {
              return '';
            } else {
              return '<span style="width:85px;">' + value + '</span>';
            }
          }
        },
        {
          field: "projectEngineer",
          title: "项目工程师",
          align: 'center',
          valign: "middle",
          width: 80
        },
        {
          field: "adminName",
          title: "车管",
          align: 'center',
          valign: "middle",
          width: 80,
          formatter: function (value, row, index) {
            if (value == null) {
              return '';
            } else {
              return '<span style="color:green">' + value + '</span>';
            }
          }
        },
        {
          field: "car_status",
          title: "车辆状态",
          align: 'center',
          valign: "middle",
          width: 100,
          formatter: function (value, row, index) {
            if (value == '已还') {
              return '<span style="color:#999">' + value + '</span>';
            } else {
              return '<span style="color:#333">' + value + '</span>'
            }
          }
        },
        {
          field: "engineNumber",
          title: "发动机号",
          align: 'center',
          valign: "middle",
          formatter: function (value, row, index) {
            if (value == null) {
              return '';
            } else {
              return '<span style="width:50px;word-break:break-all; word-wrap:break-all;">' + value + '</span>';
            }
          }
        },
        {
          field: "vin",
          title: "车架号",
          align: 'center',
          valign: "middle",
          formatter: function (value, row, index) {
            if (value == null) {
              return '';
            } else {
              return '<span style="width:50px;word-break:break-all; word-wrap:break-all;">' + value + '</span>';
            }
          }
        },
        {
          field: "vehicleQuality",
          title: "吨位",
          align: 'center',
          valign: "middle",
          width: 70
        },
        {
          field: "color",
          title: "颜色",
          align: 'center',
          valign: "middle",
          width: 70
        },
        {
          field: "upcheckTime",
          title: "接车日期",
          align: 'center',
          valign: "middle",
          formatter: function (value, row, index) {
            if (value == null || value == "1970-10-01") {
              return '';
            } else {
              return '<span style="width:40px;word-break:break-all; word-wrap:break-all;">' + value + '</span>';
            }
          }
        },
        {
          field: "upcheckSubmitTime",
          title: "接车提交日期",
          align: 'center',
          valign: "middle",
          formatter: function (value, row, index) {
            if (value == null || value == "1970-10-01") {
              return '';
            } else {
              return '<span style="width:40px;word-break:break-all; word-wrap:break-all;">' + value + '</span>';
            }
          }
        },
        {
          field: "backchecktime",
          title: "还车日期",
          align: 'center',
          valign: "middle",
          formatter: function (value, row, index) {
            if (value == null || value == "1970-10-01") {
              return '';
            } else {
              return '<span style="width:40px;word-break:break-all; word-wrap:break-all;">' + value + '</span>';
            }
          }
        },
        {
          field: "backcheckSubmitTime",
          title: "还车提交日期",
          align: 'center',
          valign: "middle",
          formatter: function (value, row, index) {
            if (value == null || value == "1970-10-01") {
              return '';
            } else {
              return '<span style="width:40px;word-break:break-all; word-wrap:break-all;">' + value + '</span>';
            }
          }
        },
        {
          field: "vCarType",
          title: "车辆类型",
          align: 'center',
          valign: "middle",
          width: 70
        },
        {
          field: "engineCapacity",
          title: "排量",
          align: 'center',
          valign: "middle",
          width: 70
        },
        {
          field: "checkStaionType",
          title: "检测站车型",
          align: 'center',
          valign: "middle",
          formatter: function (value, row, index) {
            if (value == null) {
              return '';
            } else {
              return '<span style="width:60px;word-break:break-all; word-wrap:break-all;">' + value + '</span>';
            }
          }
        },
        {
          field: "brandModelone",
          title: "车辆型号",
          align: 'center',
          valign: "middle",
          formatter: function (value, row, index) {
            if (value == null) {
              return '';
            } else {
              return '<span style="min-width:40px;word-break:break-all; word-wrap:break-all;">' + value + '</span>';
            }
          }
        },
        {
          field: "seats",
          title: "座纳",
          align: 'center',
          valign: "middle"
        },
        {
          field: "brandModeltwo",
          title: "厂牌型号（保）",
          align: 'center',
          valign: "middle",
          formatter: function (value, row, index) {
            if (value == null) {
              return '';
            } else {
              return '<span style="width:50px;word-break:break-all; word-wrap:break-all;">' + value + '</span>';
            }
          }
        },
        {
          field: "insNo",
          title: "保单号",
          align: 'center',
          valign: "middle",
          formatter: function (value, row, index) {
            if (value == null) {
              return '';
            } else {
              return '<span style="width:50px;word-break:break-all; word-wrap:break-all;">' + value + '</span>';
            }
          }
        },
        {
          field: "istatus",
          title: "保险状态",
          align: 'center',
          valign: "middle",
          formatter: function (value, row, index) {
            var a = "";
            if (value == null) {
              var a = '';
            } else if (value == "未申请") {
              var a = '<span style="color:red">未申请</span>';
            } else if (value == "已申请") {
              var a = '<span style="color:green">已申请</span>';
            } else if (value == "未续保") {
              var a = '<span style="color:red">未续保</span>';
            } else if (value == "已续保") {
              var a = '<span style="color:green">已续保</span>';
            } else {
              var a = value;
            }
            return a;
          }
        }, {
          field: "vehicleInspection",
          title: "验车状态",
          align: 'center',
          valign: "middle",
          formatter: function (value, row, index) {
            var a = "";
            if (value == null) {
              var a = '';
            } else if (value == "未申请") {
              var a = '<span style="color:red">未申请</span>';
            } else if (value == "已申请") {
              var a = '<span style="color:green">已申请</span>';
            } else {
              var a = value;
            }
            return a;
          }
        },
        {
          field: "insremark",
          title: "保险备注",
          align: 'center',
          valign: "middle",
          formatter: function (value, row, index) {
            if (value == null) {
              return '';
            } else {
              return '<span style="width:40px;word-break:break-all; word-wrap:break-all;">' + value + '</span>';
            }
          }
        },
        {
          field: "startTime",
          title: "保险起始日",
          align: 'center',
          valign: "middle",
          formatter: function (value, row, index) {
            if (value == null || value == "1970-10-01") {
              return '';
            } else {
              return '<span style="width:40px;word-break:break-all; word-wrap:break-all;">' + value + '</span>';
            }
          }
        },
        {
          field: "endTime",
          title: "保险终止日",
          align: 'center',
          valign: "middle",
          width: 70,
          formatter: function (value, row, index) {
            if (value == null || value == "1970-10-01") {
              return '';
            } else {
              return '<span style="color:green">' + value + '</span>';
            }
          }
        },
        {
          field: "licenseEndTime",
          title: "车牌到期日",
          align: 'center',
          valign: "middle",
          width: 70,
          formatter: function (value, row, index) {
            if (value == null || value == "1970-10-01") {
              return '';
            } else {
              return '<span style="color:blue">' + value + '</span>';
            }
          }
        },
        {
          field: "licenseNo",
          title: "车牌",
          width: 70,
          align: 'center',
          valign: "middle"
        },
        {
          field: "licremark",
          title: "车牌备注",
          width: 70,
          align: 'center',
          valign: "middle"
        }
      ]
    ]
  });
}

$("#project_status").unbind('click').bind('click', function () {
  $("#add_model").modal();
  $("#add_model #myModalLabel").html("项目状态更新");
  creatForm(projectStatus, "#add_model .modal-body form", "porjectstatus_btn");
  var projectsn = "";
  $.ajax({
    url: allurl + "/car-management/project/likeProjectSn.action?projectsn=" + projectsn,
    async: false,
    success: function (res) {
      console.log(res);
      var selectOption = "";
      if (res.length > 0) {
        for (var i = 0; i < res.length; i++) {
          selectOption += '<option>' + res[i] + '</option>';
        }
      } else {
        selectOption = '<option>' + "请填写" + '</option>';
      }
      $('#add_model .modal-body form .projectSn').html(selectOption);
    }
  });
  $('#add_model .modal-body form .projectSn').editableSelect({
    effects: 'slide',
    filter: true,
    duration: 200,
    onCreate: function () {
      $("#add_model .modal-body form .projectSn").val();
    },
    onShow: function () {
      console.log("下拉框显示");
    },
    onSelect: function () {
      // console.log("下拉框选项被选中");
      var a = $("#add_model .modal-body form .projectSn").val();
      $.ajax({
        url: allurl + "/car-management/project/loadStatusBySn.action?sn=" + a,
        success: function (res) {
          console.log(res);
          if (res) {
            $('#add_model .modal-body form .currentstatus').val(res);
          }
        }
      });
    }
  });

  // $("#add_model .currentstatus").val($("#add_model select.projectSn option:selected").attr("status"));
  // 实时监测项目号的值
  // $('#add_model select.projectSn').change(function() {
  //     $("#add_model .currentstatus").val($("#add_model select.projectSn option:selected").attr("status"));
  // });
  $(".porjectstatus_btn").unbind('click').bind('click', function () {
    var sub_url = allurl + "/car-management/project/updateStatus.action";
    var sub_data = {
      "projectSn": $("#add_model .projectSn").val(),
      status: $("#add_model .status option:selected").attr("value")
    };
    $(this).attr({
      "data-dismiss": "modal",
      "aria-label": "Close"
    });
    subData(sub_url, sub_data, "get", "projectstatus");
  });
});
$("#sumcar_filter").unbind('click').bind('click', function () {
  $("#filter_model").modal();
  $("#filter_model #myModalLabel").html("车辆筛选");
  $(".sumcar_filter_btn").unbind('click').bind('click', function () {
    loadsumCarList();
    // var sub_data = $("#filter_model .modal-body form").serialize();
    //var sub_url = allurl + "/car-management/vehicle/add.json";
    //  $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
    // subData(sub_url, sub_data, "post", "sub_sumcar_filter");
  });
});
$("#checkpoint_cartype").unbind('click').bind('click', function () { //检测站车型更新
  var checkpoint_cartype_Arr = $("#sumcarTable").bootstrapTable('getSelections');
  deletAll(checkpoint_cartype_Arr, "checkpoint_cartype_update");
});

var cartypeInfo = [{
    "name": "车辆编号",
    "type": "text",
    "inputName": "vSn",
    "must": "*"
  },
  {
    "name": "检测站车型",
    "type": "text",
    "inputName": "type",
    "must": "*"
  },
];
// 车辆总表查询
var sumcar_row_filter = [{
    "name": "项目号",
    "type": "text",
    "inputName": "project_sn",
    "must": ""
  },
  {
    "name": "车辆编号",
    "type": "text",
    "inputName": "vSn",
    "must": ""
  },
  {
    "name": "车架号",
    "type": "text",
    "inputName": "vin",
    "must": ""
  },
  {
    "name": "发动机号",
    "type": "text",
    "inputName": "engineNumber",
    "must": ""
  },
  {
    "name": "车管",
    "type": "text",
    "inputName": "adminName",
    "must": ""
  },
  {
    "name": "客户",
    "type": "text",
    "inputName": "customer",
    "must": ""
  },
  {
    "name": "车辆分组",
    "type": "text",
    "inputName": "groupName",
    "must": ""
  },
  {
    "name": "保险状态",
    "type": "text",
    "inputName": "istatus",
    "must": ""
  },
  {
    "name": "验车状态",
    "type": "text",
    "inputName": "vehicleInspection",
    "must": ""
  },
  {
    "name": "项目工程师",
    "type": "text",
    "inputName": "projectEngineer",
    "must": ""
  },
  {
    "name": "车辆状态",
    "type": "text",
    "inputName": "carStatus",
    "must": ""
  }
];
var projectStatus = [{
    "name": "项目号",
    "type": "select",
    "inputName": "projectSn",
    "must": "*",
    "option": [{
      "name": "请填写",
      "val": "请填写"
    }]
  },
  {
    "name": "当前状态",
    "type": "text",
    "inputName": "currentstatus",
    "must": "*"
  },
  {
    "name": "更新后状态",
    "type": "select",
    "inputName": "status",
    "must": "*",
    "option": [{
        "name": "Active",
        "val": "Active"
      }, {
        "name": "Closed",
        "val": "Closed"
      }, {
        "name": "pending",
        "val": "pending"
      },
      {
        "name": "Cancelled",
        "val": "Cancelled"
      }, {
        "name": "To do",
        "val": "To do"
      },
      {
        "name": "Lost",
        "val": "Lost"
      }, {
        "name": "ADP",
        "val": "ADP"
      },
      {
        "name": "C-cal",
        "val": "C-cal"
      }, {
        "name": "BN-cal",
        "val": "BN-cal"
      },
    ]
  },
];


$(".btn_filter button").unbind('click').bind('click', function () {
  $(this).addClass('filter_choice_btn').siblings().removeClass('filter_choice_btn');
});

// 更新项目状态/project/updateStatus.action
//查询 /car/orderQuery.action
// 车辆录入列表查询
creatSelect(sumcar_row_filter, "#sumCarList .sumcar_top .form-inline", "sumcar_filter_btn");
$(".sumcar_filter_btn").unbind('click').bind('click', function () {
  loadsumCarList();
})

$("#sumCarList .sumcar_top input").change(function () {
  loadsumCarList();
});
// 模态框条件查询
// btn btn-default pull-left btn-primary
$("#filter_model .pull-left").unbind('click').bind('click', function () {
  if ($(".btn_filter button").hasClass("filter_choice_btn")) {
    var val = $(".filter_choice_btn").attr("value");
    loadsumCarList("orderQuery", $(".filter_choice_btn").attr("value"));
    console.log(val);
  } else {
    loadsumCarList();
  }
})
$("#sumcar_filter_allcar").unbind('click').bind('click', function () { //所有车辆
  loadsumCarList("orderQuery", "all");
})
$("#sumcar_filter_usecar").unbind('click').bind('click', function () { //在用车辆
  loadsumCarList("orderQuery", "ing");
});
// 通过车辆编号升序或者降序
$(".vSn_sort").unbind('click').bind('click', function () {
  sumcarqueryParams("orderQuery");
  loadsumCarList("orderQuery");
})

// 撤销还车
$("#cancle_back").unbind('click').bind('click', function () { 
  var cancle_back_Arr = $("#sumcarTable").bootstrapTable('getSelections');
  var ids = []
  console.log(cancle_back_Arr)
  cancle_back_Arr.forEach(item => {
    if (item.car_status == '已还') {
      ids.push(item.id)
    }
  });
  if (ids.length == 0) {
    toastr.warning('请至少选择一个已还车辆', '提示', errormessageOpts);
    return;
  }
  $.ajax({
    url: allurl + "/car-management/car/cancleBackCar.action",
    type: "get",
    data: {
      ids: ids.join()
    },
    contentType: 'application/json;charset=UTF-8', // contentType很重要
    crossDomain: true,
    success: function (res) {
      if (res.ret) {
        toastr.success(res.msg, '提示', messageOpts);
        loadsumCarList();
      } else {
        toastr.warning(res.msg, '提示', errormessageOpts);
      }
    },
    error: function (err) {
      console.log(err)
    }
  })
});