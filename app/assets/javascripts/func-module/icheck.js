define(["base","jquery.icheck"],function(Base){
    $("input[type='checkbox']").iCheck({
        checkboxClass: 'icheckbox_minimal-aero'
    });
    $("input[type='radio']").iCheck({
        radioClass: 'iradio_minimal-aero'
    });
    return {
        init:function(){
            $("input[type='checkbox']").iCheck({
                checkboxClass: 'icheckbox_minimal-aero'
            });
            $("input[type='radio']").iCheck({
                radioClass: 'iradio_minimal-aero'
            });
        },
        init_inside:function(id){
            var target=id.indexOf("#")===-1?"#"+id:id;
            $(target).find("input[type='checkbox']").iCheck({
                checkboxClass: 'icheckbox_minimal-aero'
            });
            $(target).find("input[type='radio']").iCheck({
                radioClass: 'iradio_minimal-aero'
            });
        },
        if_checked:function(target,callback){
            var $target=$(target);
            $target.on("ifChecked",function(event){
                var target=Base.adapt_event(event).target;
                callback($(target));
            });
        },
        if_unchecked:function(target,callback){
            var $target=$(target);
            $target.on("ifUnchecked",function(event){
                var target=Base.adapt_event(event).target;
                callback($(target));
            });
        },
        if_click:function(target,callback){
            var $target=$(target);
            $target.on("ifClicked",function(event){
                var target=Base.adapt_event(event).target;
                callback($(target));
            });
        },
        if_changed:function(target,callback){
            var $target=$(target);
            $target.on("ifChanged",function(event){
                var target=Base.adapt_event(event).target;
                callback($(target));
            });
        }
    }
})

