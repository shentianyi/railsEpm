/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-11-8
 * Time: 上午11:48
 * To change this template use File | Settings | File Templates.
 */
MANAGE=MANAGE||{};
MANAGE.department=MANAGE.department||{};
MANAGE.department.count=0;
MANAGE.department.count_observe=function(){
    if(MANAGE.department.count==0){
        $("#dashboard-content").css("display","none");
    }
    else{
        $("#dashboard-content").css("display","block");
    }
}

MANAGE.department.init=function(){
    $("#add-department").on("click",function(){
        $("#content-right-nav-add-block").css("left","50px").find("input").focus();
    });
    MANAGE.department.add_department_init();
    MANAGE.department.count=$("#manage-sort-list").children.length;
}
MANAGE.department.add_department_init=function(){
    $("#content-right-nav-add-block input").on("click",function(event){
        stop_propagation(event);
    }).on("blur",function(){
            $(this).parent().css("left","-999em");
        }).on("keyup",function(event){
            var e=adapt_event(event).event,
                target=$(e.target);
            if(e.keyCode==13){
                var validate=false;
                var name=$("#content-right-nav-add-block input").val();
                if($.trim(name).length==0){
                    MessageBox("It can't be empty","top","warning");;
                }
                else{
                    $("#manage-sort-list li").each(function(){
                        if($("table",this).find("tr").eq(0).find("td").text()!=name){
                            validate=true;
                        }
                        else{
                            validate=false;
                            return false
                        }
                    });
                    if(validate){

//                        $("#manage-sort-list").prepend($("<li />").attr("id","21")
//                            .append($("<p />").addClass("sort-handle").text(":"))
//                            .append($("<input type='checkbox'/>"))
//                            .append($("<table />").addClass("group")
//                                .append($("<tr />")
//                                    .append($("<td />").text(name).attr("title",name))
//                                )
//                                .append($("<tr />")
//                                    .append($("<td />").text("Department Name"))
//                                )
//                            )
//                        );
//                        $("#content-right-nav-add-block input").val("").blur();
//                        MANAGE.department.count++;
//                        MANAGE.department.count_observe();
//                        $("#manage-sort-list input[type='checkbox']").iCheck({
//                            checkboxClass: 'icheckbox_minimal-aero'
//                        });
//                        $("#manage-sort-list input[type='checkbox']").on("ifChanged",function(){
//                            if(!$(this).parent().hasClass("checked")){
//                                MANAGE.totalChecked+=1;
//                                total_check_listener();
//                            }
//                            else{
//                                MANAGE.totalChecked-=1;
//                                total_check_listener();
//                            }
//                        });
//                        MANAGE.sort_init();
//                        MANAGE.resize_sort_table();
//                        $("#manage-sort-list li").on("resize",function(){
//                            MANAGE.resize_sort_table()
//                        });


                        $.post('../entities', {
                            data : {
                                name : name
                            }
                        }, function(data) {
                            if(data.result) {
                                $("#manage-sort-list").prepend($("<li />").attr("id",data.object)
                                    .append($("<p />").addClass("sort-handle").text(":"))
                                    .append($("<input type='checkbox'/>"))
                                    .append($("<table />").addClass("group")
                                        .append($("<tr />")
                                            .append($("<td />").text(name).attr("title",name))
                                        )
                                        .append($("<tr />")
                                            .append($("<td />").text("Department Name"))
                                        )
                                    )
                                );
                                $("#content-right-nav-add-block input").val("").blur();
                                MANAGE.department.count++;
                                MANAGE.department.count_observe();
                                $("#manage-sort-list input[type='checkbox']").iCheck({
                                    checkboxClass: 'icheckbox_minimal-aero'
                                });
                                $("#manage-sort-list input[type='checkbox']").on("ifChanged",function(){
                                    if(!$(this).parent().hasClass("checked")){
                                        MANAGE.totalChecked+=1;
                                        total_check_listener();
                                    }
                                    else{
                                        MANAGE.totalChecked-=1;
                                        total_check_listener();
                                    }
                                });
                                MANAGE.sort_init();
                                MANAGE.resize_sort_table();
                                $("#manage-sort-list li").on("resize",function(){
                                    MANAGE.resize_sort_table()
                                });
                            }
                            else {
                                MessageBox(data.content,"top","warning");
                            }
                        });



                    }
                    else{
                        MessageBox("Same name exist yet","top","warning");
                    }

                }
            }
            else if(e.keyCode==27){
                target.blur();
            }
    });
}