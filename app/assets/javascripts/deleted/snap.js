//function init_snap() {
//    $('body').on('click', '.snap-li', function () {
//        $.get('/report_snaps/' + $(this).attr('snap'), function (snap) {
//            Report.json_parse(snap.data);
//            MessageBox("Snap load success","top","success");
//        }, 'json');
//    });
//    report_snap.indicate();
//}
//var report_snap={};
//report_snap.indicate=function(){
//      if($("#snap-groups").children().length>0){
//          $("#snap-groups").removeClass("snap-content");
//      }
//      else{
//          $("#snap-groups").addClass("snap-content");
//      }
//}