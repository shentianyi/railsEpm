var current_status = {};

var IsLoading = false;

current_status.init = function () {
    $('.download-panel').hide();

    /*时间刷新*/
    window.setInterval(function () {
        var NowDateAndTime = LoadFormatDate("dateandtime");
        $('#current-clock').html(NowDateAndTime);
    }, 500);

    /*设置整体背景颜色*/
    var ClientHeight = $(document).height();

    $('#report-content').css({
        height: (ClientHeight - 70) + 'px',
        overflow: 'auto'
    });

    if (localStorage.box_msg) {
        var box_msg = localStorage.box_msg;
        var productLine = box_msg.split('_')[1];
        var datatype = box_msg.split('_')[3];
        $('#vehicle-select option').each(function () {
            if (($(this).attr('value')) == productLine) {
                $(this).attr('selected', 'true');
            }
        });
        loadData(productLine, datatype);
    } else {
        var productLine = $('#vehicle-select').val();
        var datatype = 100;
        loadData(productLine, datatype);
    }

    window.setInterval("timerLoadData()", 120000);
};

function initDownload() {
    var pre_time = new Date().format('yyyy-MM-dd').toString() + ' ' + '00:00:00';
    var current_time = new Date().format('yyyy-MM-dd hh:mm:ss');
    $('#start_time').attr('value', pre_time);
    $('#end_time').attr('value', current_time);
}

function hideDownload() {
    $('.download-panel').hide();
    initDownload();
}

function timerLoadData() {
    if (!IsLoading) {
        loadData();
    }
}

function IntervalGroup(cls) {
    $(cls + ' li').each(function (index) {
        $(this).click(function () {
            $(cls + ' li').css({color: 'black', opacity: '0.3'});
            $(cls + ' li').attr('datatype', 'false');
            var ReportMenuStatus = document.getElementById('report-menu').style.display;
            if (ReportMenuStatus == 'none') {
                show_loading(70, 0, 0, 10);
            } else {
                show_loading(70, 0, 0, 230);
            }
            $(this).css({opacity: '1'});
            $(this).attr('datatype', 'true');
            var Choose_Interval_Code = $(this).attr('interval');
            var ProductLine = $('#vehicle-select').val();
            if (ProductLine == null || Choose_Interval_Code == null)
                return;

            $.ajax({
                url: '/departments/entity_groups',
                type: 'get',
                data: {
                    interval: Choose_Interval_Code,
                    product_line: ProductLine
                },
                success: function (data) {
                    //Here can do something
                    remove_loading();
                },
                error: function () {
                    console.log("Error");
                }
            });
        });
    });
}

function loadData(productLine, datatype) {
    if (productLine == null || datatype == null)
        return;

    IsLoading = true;

    $('.control-chart-interval-group li').each(function (index) {
        if ($(this).attr('datatype') == 'true') {
            datatype = $(this).attr('interval');
        }
    });

    $("#product_line_id").val(productLine);

    var ReportMenuStatus = document.getElementById('report-menu').style.display;

    if (ReportMenuStatus == 'none') {
        show_loading(70, 0, 0, 10);
    } else {
        show_loading(70, 0, 0, 230);
    }

    hideDownload();

    $.ajax({
        url: '/departments/entity_groups',
        type: 'get',
        data: {
            product_line: productLine,
            interval: datatype
        },
        success: function (data) {
            $('.workstation').remove();
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var box_title_id = "Line_" + productLine + "_interval_" + datatype + "_box_" + data[i].id;
                    if (data[i].value > data[i].target_max || data[i].value < data[i].target_min) {
                        $('<div class="col-md-3 workstation"><div class="box">' +
                            '<div class="box-title" title=' + data[i].name + ' id=' + box_title_id + ' onmouseover="box_title_mouseover(' + box_title_id + ');" onmouseout="box_title_mouseout(' + box_title_id + ');"><span>' + data[i].name + '</span><i class="icon-list mark pull-right"></i></div><div style="display:inline-flex;width: 100%;" title="double click go to analytics" ondblclick="double_click(' + box_title_id + ');">' +
                            '<div class="box-content"><div class="left-number" style="color: #ff0000;">' + data[i].value + '</div>' +
                            '<div class="right-content"><div class="content"><strong>' + data[i].target_max + '</strong><p>Max Target</p></div>' +
                            '<div class="content"><strong>' + data[i].target_min + '</strong><p>Min Target</p></div></div></div></div></div></div>').appendTo('#data_container').ready(function () {
//                loading_hide();
                        });
                    } else {
                        $('<div class="col-md-3 workstation"><div class="box">' +
                            '<div class="box-title" title=' + data[i].name + ' id=' + box_title_id + ' onmouseover="box_title_mouseover(' + box_title_id + ');" onmouseout="box_title_mouseout(' + box_title_id + ');"><span>' + data[i].name + '</span><i class="icon-list mark pull-right"></i></div><div style="display:inline-flex;width: 100%;" title="double click go to analytics" ondblclick="double_click(' + box_title_id + ');">' +
                            '<div class="box-content"><div class="left-number"style="color: #3ed436;">' + data[i].value + '</div>' +
                            '<div class="right-content"><div class="content"><strong>' + data[i].target_max + '</strong><p>Max Target</p></div>' +
                            '<div class="content"><strong>' + data[i].target_min + '</strong><p>Min Target</p></div></div></div></div></div></div>').appendTo('#data_container').ready(function () {
//                loading_hide();
                        });
                    }
                    $('.download-panel').hide();
                }
            }
            remove_loading();
            IsLoading = false;
        },
        error: function (data) {
            alert("Network Error!");
        }
    });
}

/*双击事件*/
function double_click(ele) {
    var double_click_id = $(ele).attr('id');
    var ProductLine = double_click_id.split('_')[1];
    var Interval = double_click_id.split('_')[3];
    var BoxID = double_click_id.split('_')[5];
    /* console.log(ProductLine);
     console.log(Interval);
     console.log(BoxID);
     */
    var double_click_content = $(ele).html();
    var double_click_name = double_click_content.split('<i')[0];
    window.location.href = 'kpi_entries/analyse?view=';
}
/*查看历史记录数据*/
function box_title_mouseover(ele) {
    var over_id = $(ele).attr('id');
    var ProductLine = over_id.split('_')[1];
    var Interval = over_id.split('_')[3];
    var BoxID = over_id.split('_')[5];
    var over_id_content = $(ele).html();
    var over_id_name = over_id_content.split('<i')[0].split('<span>')[1].split('<')[0];
    $('#' + over_id).children('i').fadeIn(400);
    $('#' + over_id).click(function () {
        if (window.localStorage) {
            localStorage.box_msg = over_id;
            localStorage.box_name = over_id_name;
            localStorage.pre_url = window.location.host + '/reports#current_status';
            window.location.href = 'reports#defects';
            location.reload();
        } else {
            alert('This browser does NOT support localStorage,please change browser.');
        }
    });
}

function box_title_mouseout(ele) {
    var over_id = $(ele).attr('id');
    $('#' + over_id).children('i').fadeOut(400);
}