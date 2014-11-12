define(["jquery","jquery.colorPicker"],function($){
    return{
        //direction includes this options:up,down
        colorPicker:function(target,direction){
            if(Object.prototype.toString.apply(target)==="[object Array]"){
                for(var i=0;i<target.length;i++){
                    $(target[i]).colorPicker();
                    $(target[i]).next().attr("direction",direction?direction[i]:"down");
                }
            }
            else{
                $(target).colorPicker();
                $(target).attr("direction",direction?direction:"down");
            }
        }
    }
})