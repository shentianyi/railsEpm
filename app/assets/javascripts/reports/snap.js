function init_snap() {
    $("#snap-shot-button").bind('click', function () {
//        console.log(Report.serializeToJson());
        $.post('/report_snaps', {report_snap: {
            desc: $('#snap-shot-desc').val(),
            type: Report.option.type,
            data: Report.serializeToJSONString()
        }}, function (data) {
            if (data.result) {
                alert('success');
                // call back to init snap item
            }
        }, 'json');
    });
    $('body').on('click', '.snap-li', function () {
        $.get('/report_snaps/' + $(this).attr('snap'), function (snap) {
            Report.json_parse(snap.data);
            alert('snap loaded');
        }, 'json');
    });
}