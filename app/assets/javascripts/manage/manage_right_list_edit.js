define(["jquery","./manage_share_control"],function($,MANAGE){
    function edit(target,url,complete_callback,edit_check_callback){
        this.target=target;
        this.url=url;
        this.complete=complete_callback;
        this.edit_check=edit_check_callback;
        this.edit_show = function() {
            var text;
            var target = this.target;
            MANAGE.edit_array=[];
            $("#manage-sort-list :checked").each(
                function() {
                    var length=$(this).parent().next().find("." + target).length,i;
                    for(i=0;i<length;i++){
                        text = $(this).parent().next().find("." + target).eq(i).find(".can-change").text();
                        $(this).parent().next().find("input[type='text']").eq(i).css("left", "0px").val(text);
                    }
             });

        }
    }
    return edit
})