/**
 * Created with JetBrains RubyMine.
 * User: wayne
 * Date: 13-12-26
 * Time: 下午12:17
 * To change this template use File | Settings | File Templates.
 */
(function(){
    $(document).ready(function(){
        $.get("/welcome/users",{},function(data){
            if(data.result){
                CHARTBOOT.pie.scores=[data.content.user,data.content.manager,data.content.directors,data.content.admin];
                CHARTBOOT.generatePie(CHARTBOOT.pie.scores,"chart-pie-wrap");
                $("#count-general").text(CHARTBOOT.pie.scores[0]);
                $("#count-department-manager").text(CHARTBOOT.pie.scores[1]);
                $("#count-general-manager").text(CHARTBOOT.pie.scores[2]);
                $("#count-admin").text(CHARTBOOT.pie.scores[3]);
            }
        });
        $.get("/welcome/statistics",{},function(data){
            if(data.result){
                CHARTBOOT.column.scores=[data.content.kpi,data.content.entity,data.content.user,data.content.view];
                CHARTBOOT.generateColumn(CHARTBOOT.column.scores,"chart-column-wrap");
            }
        });

//        CHARTBOOT.pie.scores=[10,20,30,40];
//        CHARTBOOT.column.scores=[30,20,30,40];
//        CHARTBOOT.generatePie(CHARTBOOT.pie.scores,"chart-pie-wrap");
//        $("#count-general").text(CHARTBOOT.pie.scores[0]);
//        $("#count-department-manager").text(CHARTBOOT.pie.scores[1]);
//        $("#count-general-manager").text(CHARTBOOT.pie.scores[2]);
//        $("#count-admin").text(CHARTBOOT.pie.scores[3]);
//        CHARTBOOT.generateColumn(CHARTBOOT.column.scores,"chart-column-wrap");
//
        var login_time=new Date().toWayneString().minute;
        $("#login-time").text(" "+login_time);
    })
})()
