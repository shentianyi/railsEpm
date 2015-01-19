define(["jquery","base","./manage_share_control"],function($,Base,MANAGE){
    function del(url,local,name,type){
        this.url=url;
        this.local=local;
        this.name=name;
        this.delete_complete=function(e){
            var number = $(e.target).parent().attr("number");
            var local=this.local;
            $.ajax({
                url : this.url+number,
                type : 'DELETE',
                success : function(data) {
                    if(data.result){
                        if(type==="kpis"){
                            $("#new-kpi-category option").each(function(){
                                if($(this).attr('value')==number){
                                    $(this).remove();
                                    return false;
                                }
                            })
                            $("#new-kpi-category").val('').trigger('chosen:updated');
                        }
                        window.location.href = local;
                        MANAGE.left_count--;
                    }
                    else{
                        Base.MessageBox(data.content,"top","warning");
                    }
                }
            });
        }
    }
    return del
})