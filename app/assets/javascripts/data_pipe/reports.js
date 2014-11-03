define([],function(){
    var data_current_color={
        "red":"#eb4848",
        "green":"#19cf22"
    };
    return{
        current_status:function(){
            return {
                CF11: [
                    {
                        "id": "1",
                        "INQA": "iQ1 Body",
                        "Defects": "20",
                        "Pass": "25",
                        "FTQ":"85",
                        "STYLE_COLOR":data_current_color["red"]
                    }],
                CF14: [
                    {
                        "id": "1",
                        "INQA": "iQ1 Body",
                        "Defects": "20",
                        "Pass": "25",
                        "FTQ":"55",
                        "STYLE_COLOR":data_current_color["red"]
                    }
                ]
            }
        },
        current_status_target:function(){

        },
        current_status_all_defects:function(){

        },
        current_status_key_defects:function(){

        }
    }
})