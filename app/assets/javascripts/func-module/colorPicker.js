define(["jquery","jquery.colorPicker"],function($){
    return{
        //direction includes this options:up,down
        //callback template function(id,newValue){}
        colorPicker:function(target,direction,callback,pickerDefault){
            if(Object.prototype.toString.apply(target)==="[object Array]"){
                if(Object.prototype.toString.apply(direction)==="[object String]"){
                    var only_element=direction;
                    direction=new Array(target.length);
                    direction[0]=only_element;
                }
                for(var i=0;i<target.length;i++){
                    $(target[i]).colorPicker({
                        pickerDefault:pickerDefault?(pickerDefault[i]?pickerDefault[i]:"fff"):"fff",
                        onColorChange:callback
                    });
                    $(target[i]).next().attr("direction",direction?(direction[i]?direction[i]:direction[0]):"down");
                }
            }
            else{
                $(target).colorPicker({
                    pickerDefault:pickerDefault?pickerDefault:"fff",
                    onColorChange:callback
                });
                $(target).attr("direction",direction?direction:"down");
            }
        }
    }
})