define(["jquery","./manage_share_control"],function($,MANAGE){
   function drag(url,drag_complete_post){
       this.url=url;
       this.drag_complete_post=drag_complete_post;
       this.drag_complete = function(id) {
           if($("#manage-sort-list").find("#" + id).find("input[type='checkbox']").prop("checked")) {
               MANAGE.totalChecked -= 1;
               MANAGE.total_check_listener();
               MANAGE.judge_kpi_count();
           }
           $("#manage-sort-list").find("#" + id).remove();
           $("#manage-sort-list").find(".sortable-placeholder").remove();
       }
   }
   return drag
})