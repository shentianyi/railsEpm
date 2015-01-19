define(["jquery","../../manage/manage_left_menu","../../manage/manage_right_list","./create","./edit","./assign","../../manage/manage_three_column","jquery.tipsy"],
    function($,Leftmenu,Rightlist,Create,Edit,Assign){
        var option_add={
                name:I18n.t('manage.department.desc.dep'),
                href:"/users/index/",
                postHref:'/entities'
            },
            option_edit={
                url:"/entity_groups"
            },
            option_delete={
                url:"/entities/",
                local:"/users",
                name:"group"
            },
            option_right_edit={
                target : "",
                url : '',
                complete : function() {

                },
                edit_check : function() {

                }
            },
            option_right_remove={
                url : '/users/'
            },
            option_right_drag={
                url : '/users',
                drag_complete_post : function(id, belong,callback) {
                    console.log(id, belong)
                    var option = {
                        id : id,
                        belong : belong
                    }
                    $.ajax({
                        url : this.url,
                        type : 'PUT',
                        data : {
                            id : option.id,
                            user : {
                                role_id : option.belong
                            }
                        },
                        success : function(data) {
                            callback(option.id);
                        }
                    });
                }
            }
        ;
        function init_assign_user(){
            $("#assign-kpi-user option").remove();
            var target = $("#assign-kpi-user");
            target.append("<option></option>");
            var users = $("#manage-sort-list>li");
            users.each(function () {
                var user_id = $(this).attr("id");
                var email = $(this).attr("email");
                target.append("<option value="+user_id+">"+email+"</option>");
            })
        }

        return {
            init:function( ){
                Leftmenu.init(option_add,option_edit,option_delete,"users");
                Rightlist.init(option_right_edit,option_right_remove,option_right_drag,"users");

                $("#manage-left-menu").on("click", "li", function() {
                    var li = $(this);
                    var id = li.attr('number');
                    if(id) {
                        $("#manage-left-menu>li").removeClass('active');
                        li.addClass('active');
                        $.get('/users/list/' + id, function(data) {
                            $("#manage-edit-target").text(li.attr('title'));
                            $('#user-item-container').html(data);
                            window.history.pushState(id, null, "/users/c/" + id);
                            Rightlist.refresh();
                            Create.refresh();
                            Edit.refresh();
                            init_assign_user();
                        });
                    }
                });
            }
        }
    }
)