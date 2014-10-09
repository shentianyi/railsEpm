/**
 * Created with JetBrains RubyMine.
 * User: wayne
 * Date: 13-12-26
 * Time: 下午12:17
 * To change this template use File | Settings | File Templates.
 */
define(["jquery","../simple_chart/chart_generate","base"],function($,chart,Base){
   return{
       init:function(){
           Base.expand_date_prototype();
           chart.init();
           $.get("/welcome/users",{},function(data){
               if(data.result){
                   chart.pie.scores=[data.content.user,data.content.director,data.content.admin];
                   chart.generatePie(chart.pie.scores,"chart-pie-wrap");
                   $("#count-general").text(chart.pie.scores[0]);
                   $("#count-general-manager").text(chart.pie.scores[1]);
                   $("#count-admin").text(chart.pie.scores[2]);
               }
           });
           $.get("/welcome/statistics",{},function(data){
               if(data.result){
                   chart.column.scores=[data.content.kpi,data.content.entity,data.content.user,data.content.view];
                   chart.generateColumn(chart.column.scores,"chart-column-wrap");
               }
           });
           var login_time=new Date().toWayneString().minute;
           $("#login-time").text(" "+login_time);
       }
   }
});
