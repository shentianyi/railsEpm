var ReportMenu = {};
ReportMenu.click = function(type,callback){
    $.ajax({
        url:"/reports/"+type+"/ajax",
        type:"GET",
        success:function(data){
            if(callback){
                callback(data);
            }
        }
    })
}