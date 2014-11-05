define(["jquery","jquery.chosen"],function($){
    $(".chosen-select").chosen({
        'disable_search_threshold': 7
    });
    $(".single-select").chosen(
        { allow_single_deselect: true }
    );
    return{
       single_update:function(id){
           var id=id.indexOf("#")===-1?"#"+id:id;
           $(id).val('').trigger('chosen:updated');
       },
        all_update:function(){
           $(".chosen-select").val('').trigger('chosen:updated');
        }
    }
})