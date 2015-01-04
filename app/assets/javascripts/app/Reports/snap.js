define(["jquery","base","jquery.scroll"],function($,Base){
    return{
        init:function(){
             $(document).ready(function(){
                 $('body')
                     .on('click', '.snap-li', function () {
                        $.get('/report_snaps/' + $(this).attr('snap'), function (snap) {
                            console.log(snap)
                            var time=snap.created_at.substring(0,10),
                                json_data=JSON.parse(snap.data);
                            Base.MessageBox(time+"Snap <br /> load success","top","success");
                        }, 'json');
                    })
                 ;

             })
        }
    }
})