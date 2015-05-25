define(["base","./highchart/highmaps_standard_option","jquery.highmaps"],function(Base,Standard){
    function change_attribute(original,change){
        for(var key in change){
            if(Object.prototype.toString.apply(change[key])==="[object Object]"){
                change_attribute(original[key],change[key]);
            }
            else{
                original[key]=change[key];
            }
        }
    }
    return{
        //data is an array
        //config:{ row:integer , data:array , nameArray:array , special_option:same to official doc}
        heatmap:function(config,data){
            //to construct row and line
            config.row=config.row==undefined?5:config.row;
            var my_setting_option=Base.deepCopy(Standard.setting_option,{}),
                myData=[],
                myDataItem={},
                column=Math.ceil(data.length/config.row),
                lastCount=data.length % config.row,
                dataCount= 0,
                xCategrioesArray=[],
                yCategrioesArray=[];
            for(var i=config.row-1;i>=0;i--){
                myDataItem.y=i;
                yCategrioesArray.push("");
                if(i===0){
                    column=lastCount===0?column:lastCount;
                }
                for(var j=0;j<column;j++){
                    dataCount++;
                    myDataItem.x=j;
                    myDataItem.value=data[dataCount];
                    myDataItem.name=config.nameArray?(config.nameArray[dataCount]?config.nameArray[dataCount]:""):"";
                    var dataItem=Base.deepCopy(myDataItem,{});
                    myData.push(dataItem);
                }
            }
            var columnLength=Math.ceil(data.length/config.row);
            for(var i=0;i<columnLength;i++){
                xCategrioesArray.push("");
            }
            my_setting_option.series[0].data=myData;
            my_setting_option.xAxis.categories=xCategrioesArray;
            my_setting_option.yAxis.categories=yCategrioesArray;
            my_setting_option.chart.type="heatmap";
            if(config.special_option){
                change_attribute(my_setting_option,config.special_option);
            }
            $("#"+config.container).highcharts(my_setting_option);
            return $("#"+config.container).highcharts();
        }
    }
})