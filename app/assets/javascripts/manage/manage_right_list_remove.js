define(["jquery","./manage_share_control","base"],function($,MANAGE,Base){
    function remove(url){
        this.url=url;
        this.remove_complete = function(id) {
            $.ajax({
                url : this.url + id,
                type : 'DELETE',
                success : function(data) {
                    if(data.result) {
                        $("#manage-sort-list").find("#" + id).remove();
                        MANAGE.totalChecked -= 1;
                        MANAGE.total_check_listener();
                        MANAGE.judge_kpi_count();
                    } else {
                        Base.MessageBox(data.content, "top", "warning");
                    }
                }
            })
        }
    }
    return remove
})