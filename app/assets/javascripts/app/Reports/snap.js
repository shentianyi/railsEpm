define(["jquery","base","./share"],function($,Base,Share){
    return{
        init:function(){
             $(document).ready(function(){
                 $('body')
                     .on('click', '.snap-li', function () {
                         var $that=$(this);
                        $.get('/report_snaps/' + $(this).attr('snap'), function (snap) {
                            $("#snap-groups").find(".snap-li").removeClass("active");
                            $that.addClass("active");
                            Share.getSnap(snap);
                            Base.MessageBox("load success","top","success");
                        }, 'json');
                    })
                 ;

             })
        }
    }
})