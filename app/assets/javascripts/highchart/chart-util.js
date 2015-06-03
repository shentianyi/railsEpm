/*************
 * 与Chart，分析相关的工具性函数
 * @type {CHARTUTIL|*|{}}
 */
define(["jquery"],function($){
    return{
        time:{
            time_string:function(start,end){
                var pattern=new RegExp("^[0-9)]");
                if(pattern.test(start)){
                    return start + "|" + end;
                }else{
                    return start;
                }
            }
        },
        calculate_type:function(cal){
            switch (cal){
                case "1":
                    return "ACCUNULATE";
                    break;
                case "0":
                    return "AVERAGE";
                    break;
                default :
                    return null
                    break;
            }
        },
        get_kpi_via_type:function(type_id,callback){
            $.ajax({
                url: '/kpis/categoried/' + type_id,
                dataType: "json",
                success: function (data) {
                    callback(data);
                }
            });
        },
        analytics:function(option,callback){
            //this function is used for chart in analytics-like
            //option format:{ kpi:string,view:string, }
//            $.post('/kpi_entries/analyse',{
//                kpi_id : option.kpi_id,
//                average: false,
//                entity_group_id: option.view,
//                start_time : new Date(bar_fix_from).toISOString() ,
//                end_time : new Date(bar_fix_to).toISOString(),
//                frequency:option.interval,
//                property:option.kpi_property,
//                report:ANALYTICS.qoros_demo_count===3?"ftq":(ANALYTICS.qoros_demo_count===2?"nok":ANALYTICS.qoros_demo_count===1?"ok":null)
//            },function(msg){
//
//            });
            var result={
                date:["2015-01-03","2015-01-04","2015-01-05"],
                data:{
                        name: 'SeriesName',
                        data: [
                            {name:"2015-01-03",y:Math.random()*100},
                            {name:"2015-01-04",y:Math.random()*100},
                            {name:"2015-01-05",y:Math.random()*100}
                        ]
                }
            }
            callback(result);
        },
        current_chart:null
    }
})