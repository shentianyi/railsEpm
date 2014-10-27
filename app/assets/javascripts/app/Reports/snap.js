define(["jquery","base"],function($,Base){
    $('body').on('click', '.snap-li', function () {
        $.get('/report_snaps/' + $(this).attr('snap'), function (snap) {
            Report.json_parse(snap.data);
            Base.MessageBox("Snap load success","top","success");
        }, 'json');
    });
    if($("#snap-groups").children().length>0){
        $("#snap-groups").removeClass("snap-content");
    }
    else{
        $("#snap-groups").addClass("snap-content");
    }
})