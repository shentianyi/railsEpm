var DASHBOARD=DASHBOARD||{};
DASHBOARD.special_type={};

DASHBOARD.special_type={
    top_hide:function(){
        $("#chart-container-top").css("display","none");
        $("#chart-container").css("top","0px");
        $(".chart-container-right").css("top","0px");
    },
    right_hide:function(){
        $(".chart-container-right").css("display","none");
        $("#chart-container").css("right","0px");
    },
    bottom_hide:function(){
        $("#chart-container-bottom").css("display","none");
        $("#chart-container").css("bottom","0px");
        $(".chart-container-right").css("bottom","0px");
    },
    top_show:function(){
        $("#chart-container-top").css("display","block");
        $("#chart-container").css("top","150px");
        $(".chart-container-right").css("top","150px");
    },
    right_show:function(){
        $(".chart-container-right").css("display","block");
        $("#chart-container").css("right","300px");
    },
    bottom_show:function(){
        $("#chart-container-bottom").css("display","block");
        $("#chart-container").css("bottom","100px");
        $(".chart-container-right").css("bottom","100px");
    },
    line:function(){
       this.top_hide();
       this.right_hide();
        this.bottom_show();
    },
    column:function(){
       this.right_hide();
       this.bottom_hide();
        this.top_show();
    },
    pie:function(){
       this.top_hide();
       this.bottom_hide();
       this.right_show();
       $("#chart-container-right-scatter").css("display","none");
    },
    scatter:function(){
       this.top_hide();
       this.bottom_hide();
       this.right_hide();

    }
}



