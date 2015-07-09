var i_check={};
i_check.init=function(){
    $("input[type='checkbox']").iCheck({
        checkboxClass: 'icheckbox_minimal-aero'
    });
};
i_check.if_checked=function(target,callback){
    var $target=$(target);
    $target.on("ifChecked",function(event){
        var target=adapt_event(event).target;
        callback($(target));
    });
}
i_check.if_unchecked=function(target,callback){
    var $target=$(target);
    $target.on("ifUnchecked",function(event){
        var target=adapt_event(event).target;
        callback($(target));
    });
}
i_check.if_click=function(target,callback){
    var $target=$(target);
    $target.on("ifClicked",function(event){
        var target=adapt_event(event).target;
        callback($(target));
    });
}
i_check.if_changed=function(target,callback){
    var $target=$(target);
    $target.on("ifChanged",function(event){
        var target=adapt_event(event).target;
        callback($(target));
    });
}