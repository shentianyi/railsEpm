define(["jquery","jquery.chosen"],function($){
    $(".chosen-select").chosen({
        'disable_search_threshold': 7
    });
    $(".single-select").chosen(
        { allow_single_deselect: true }
    );
    return{
       init_with_width:function(target,width){
           if(Object.prototype.toString.apply(target)==="[object Array]"){
                 for(var i=0;i<target.length;i++){
                   $("#"+target[i]).chosen({
                       'disable_search_threshold': 7
                   });
                   $("#"+target[i].replace("-","_")+"_chosen").width(width[i]);
               }
           }
           else{
               $("#"+target).chosen({
                   'disable_search_threshold': 7
               });
               $("#"+target+"_chosen").width(width);
           }
       },
       single_update:function(id){
           var id=id.indexOf("#")===-1?"#"+id:id;
           $(id).val('').trigger('chosen:updated');
       },
       all_update:function(){
           $(".chosen-select").val('').trigger('chosen:updated');
       }
    }
})