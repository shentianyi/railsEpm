/*************
 * 与Chart，分析相关的工具性函数
 * @type {CHARTUTIL|*|{}}
 */
var CHARTUTIL = CHARTUTIL || {};
CHARTUTIL.time = {};

CHARTUTIL.time.time_string = function(start,end){
    var pattern=new RegExp("^[0-9)]");
    if(pattern.test(start)){
        return start + "|" + end;
    }else{
        return start;
    }
}

CHARTUTIL.calculate_type = function(cal){
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
}