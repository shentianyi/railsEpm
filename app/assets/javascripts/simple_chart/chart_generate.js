/**
 * Created with JetBrains RubyMine.
 * User: wayne
 * Date: 13-12-26
 * Time: 下午12:06
 * To change this template use File | Settings | File Templates.
 */
define(["jquery","chart"],function($){
    var lowchart=function(){
        this.check=0;
        this.pie={
            scores:""
        };
        this.generatePie=function(scores,target_wrap){
            if(scores.length==0){
                return
            }
            else{
                if($("#"+target_wrap).find("[name='pie_chart']").length==0){
                    $("#"+target_wrap).append($("<canvas />").attr("name","pie_chart"))
                }
                var width= arguments[2]=="small" ? $("#"+target_wrap).width()-80: $("#"+target_wrap).width()-10;
                var height= arguments[2]=="small" ? $("#"+target_wrap).height()-80: $("#"+target_wrap).height()-20;
                $("#"+target_wrap).find("canvas").attr("height",height).attr("width",width);
                var canvas = $("#"+target_wrap).find("canvas")[0];
                canvas.width=canvas.width;
                canvas.height=canvas.height;
                var data = [
                    {value:scores[0],color : "rgba(151,187,205,0.5)"},
                    {value:scores[1],color : "#F38630"},
                    {value:scores[2],color : "#E0E4CC"}
                ]
                var ctx = $("#"+target_wrap).find("canvas").get(0).getContext("2d");
                new Chart(ctx).Pie(data);
            }
        };
        this.column={
            scores:""
        };
        this.generateColumn=function(scores,target_wrap){
            if(scores.length==0){
                return
            }
            else{
                if($("#"+target_wrap).find("[name='column_chart']").length==0){
                    $("#"+target_wrap).append($("<canvas />").attr("name","column_chart"))
                }
                var width= $("#"+target_wrap).width()-10;
                var height= $("#"+target_wrap).height()-20;
                $("#"+target_wrap).find("canvas").attr("height",height).attr("width",width);
                var canvas = $("#"+target_wrap).find("canvas")[0];
                canvas.width=canvas.width;
                canvas.height=canvas.height;
                var data = {
                    labels : [I18n.t('welcome.statistics.item.kpi'),
                        I18n.t('welcome.statistics.item.entity'),
                        I18n.t('welcome.statistics.item.user'),
                        I18n.t('welcome.statistics.item.view')],
                    datasets : [
                        {
                            fillColor : "rgba(151,187,205,0.5)",
                            strokeColor : "rgba(151,187,205,1)",
                            data : scores
                        }
                    ]
                };
                var ctx = $("#"+target_wrap).find("canvas").get(0).getContext("2d");
                new Chart(ctx).Bar(data);
            }
        }
    };
    return lowchart
//   lowchart_check=0;
//   return {
//       init:function(){
//           $(window).resize(function(){
//               lowchart_check++;
//               window.setTimeout(function(){
//                   if(lowchart_check==1){
//                       CHARTBOOT.generatePie(CHARTBOOT.pie.scores,"chart-pie-wrap");
//                       lowchart_check--;
//                   }
//                   else{
//                       lowchart_check--;
//                   }
//               },300);
//           });
//       },
//       pie:{
//           scores:""
//       },
//       generatePie:function(scores,target_wrap){
//           if(scores.length==0){
//               return
//           }
//           else{
//               if($("#"+target_wrap).find("[name='pie_chart']").length==0){
//                   $("#"+target_wrap).append($("<canvas />").attr("name","pie_chart"))
//               }
//               var width= arguments[2]=="small" ? $("#"+target_wrap).width()-80: $("#"+target_wrap).width()-10;
//               var height= arguments[2]=="small" ? $("#"+target_wrap).height()-80: $("#"+target_wrap).height()-20;
//               $("#"+target_wrap).find("canvas").attr("height",height).attr("width",width);
//               var canvas = $("#"+target_wrap).find("canvas")[0];
//               canvas.width=canvas.width;
//               canvas.height=canvas.height;
//               var data = [
//                   {value:scores[0],color : "rgba(151,187,205,0.5)"},
//                   {value:scores[1],color : "#F38630"},
//                   {value:scores[2],color : "#E0E4CC"}
//               ]
//               var ctx = $("#"+target_wrap).find("canvas").get(0).getContext("2d");
//               new Chart(ctx).Pie(data);
//           }
//       },
//       column:{
//           scores:""
//       },
//       generateColumn:function(scores,target_wrap){
//           if(scores.length==0){
//               return
//           }
//           else{
//               if($("#"+target_wrap).find("[name='column_chart']").length==0){
//                   $("#"+target_wrap).append($("<canvas />").attr("name","column_chart"))
//               }
//               var width= $("#"+target_wrap).width()-10;
//               var height= $("#"+target_wrap).height()-20;
//               $("#"+target_wrap).find("canvas").attr("height",height).attr("width",width);
//               var canvas = $("#"+target_wrap).find("canvas")[0];
//               canvas.width=canvas.width;
//               canvas.height=canvas.height;
//               var data = {
//                   labels : [I18n.t('welcome.statistics.item.kpi'),
//                       I18n.t('welcome.statistics.item.entity'),
//                       I18n.t('welcome.statistics.item.user'),
//                       I18n.t('welcome.statistics.item.view')],
//                   datasets : [
//                       {
//                           fillColor : "rgba(151,187,205,0.5)",
//                           strokeColor : "rgba(151,187,205,1)",
//                           data : scores
//                       }
//                   ]
//               };
//               var ctx = $("#"+target_wrap).find("canvas").get(0).getContext("2d");
//               new Chart(ctx).Bar(data);
//           }
//       }
//    }
})
//////////////////////////////////////////////////////////////  针对直线图的一些设置
//CHARTBOOT.generateLine=function(labels,scores,target_wrap){
//    if(scores.length==0){
//        return
//    }
//    else{
//        if(scores.length==1){
//            scores.unshift(0);
//            labels.unshift("");
//        }
//        if($("#"+target_wrap).find("[name='line_chart']").length==0){
//            $("#"+target_wrap).append($("<canvas />").attr("name","line_chart"))
//        }
//        var width=$("#"+target_wrap).width()-10;
//        var height=$("#"+target_wrap).height()-40;
//        $("#"+target_wrap).find("canvas").attr("height",height).attr("width",width);
//        var canvas = $("#"+target_wrap).find("canvas")[0];
//        canvas.width=canvas.width;
//        canvas.height=canvas.height;
//        var data = {
//            labels : labels,
//            datasets : [{
//                fillColor : "rgba(151,187,205,0.5)",
//                strokeColor : "rgba(151,187,205,1)",
//                pointColor : "rgba(151,187,205,1)",
//                pointStrokeColor : "#fff",
//                data :scores
//            }]
//        }
//        var ctx = $("#"+target_wrap).find("canvas").get(0).getContext("2d");
//        var myNewChart = new Chart(ctx);
//        CHARTBOOT.generate_line_option(scores);
//        new Chart(ctx).Line(data,CHARTBOOT.line_option);
//    }
//};
//CHARTBOOT.line_option={
//    scaleOverride : true,
//    scaleSteps : 8,
//    scaleStartValue :0,
//    bezierCurve:false
//}
//CHARTBOOT.generate_line_option=function(data){
//    var c=[];
//    var p=data;
//    c=deepCopy(p,c);
//    c.sort(sortNumber);
//    CHARTBOOT.line_option.scaleStepWidth=Math.ceil(c[0]/CHARTBOOT.line_option.scaleSteps);
//}
//function sortNumber(a, b)
//{
//    return b-a
//}
