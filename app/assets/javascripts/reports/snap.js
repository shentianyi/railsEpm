function init_snap() {
    $('body').on('click', '.snap-li', function () {
        $.get('/report_snaps/' + $(this).attr('snap'), function (snap) {
            Report.json_parse(snap.data);
            alert('snap loaded');
        }, 'json');
    });
}