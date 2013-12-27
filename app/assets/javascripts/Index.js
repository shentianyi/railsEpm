/**
 * Created with JetBrains RubyMine.
 * User: wayne
 * Date: 13-12-26
 * Time: 下午12:17
 * To change this template use File | Settings | File Templates.
 */
(function(){
    $(document).ready(function(){
        CHARTBOOT.pie.scores=[10,20,30,40];
        CHARTBOOT.column.scores=[30,20,30,40];
        CHARTBOOT.generatePie(CHARTBOOT.pie.scores,"chart-pie-wrap");
        CHARTBOOT.generateColumn(CHARTBOOT.column.scores,"chart-column-wrap");
        $("#count-general").text(CHARTBOOT.pie.scores[0]);
        $("#count-department-manager").text(CHARTBOOT.pie.scores[1]);
        $("#count-general-manager").text(CHARTBOOT.pie.scores[2]);
        $("#count-admin").text(CHARTBOOT.pie.scores[3]);
        //$("#user-email").text(" "+"superxiao21@sina.com");
        var login_time=new Date().toWayneString().minute;
        $("#login-time").text(" "+login_time);
    })
})()
