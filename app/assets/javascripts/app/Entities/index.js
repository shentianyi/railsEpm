define(["jquery","../../manage/manage_right_list","./share","./create","./edit","../../manage/manage_two_column"],
    function($,Rightlist,Share){
        var option_right_edit={
                target : "",
                url : '',
                complete : function() {
                },
                edit_check : function() {
                }
            },
            option_right_remove={
                url : ''
            },
            option_right_drag={
                url : '',
                drag_complete_post : function() {
                }
            }

        return {
            init:function( ){
                Rightlist.init(option_right_edit,option_right_remove,option_right_drag,"entities");
                Share.icheck_init();
            }
        }
    })