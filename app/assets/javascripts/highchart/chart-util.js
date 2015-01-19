/*************
 * 与Chart，分析相关的工具性函数
 * @type {CHARTUTIL|*|{}}
 */
define([],function(){
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
        analytics:function(option){
            //this function is used for chart in analytics-like
            //option format:{ kpi:string,view:string, }
            var kpi=option.kpi,
                view=option.view;
            var result={
                date:["2015-01-01","2015-01-02","2015-01-03","2015-01-04","2015-01-05","2015-01-06","2015-01-07","2015-01-08","2015-01-09","2015-01-10"],
                data:[100,200,100,200,30,20,330,10,203,401]
            }
            return result;
        }
    }
})