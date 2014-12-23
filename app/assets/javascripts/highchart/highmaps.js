define(["base","jquery.highmaps"],function(Base){

    var setting_option={
        chart: {
            type: 'heatmap'
        },
        credits:{
            enabled:false
        },
        title: {
            text:""
        },
        xAxis: {
            lineColor:"rgba(0,0,0,0)",
            tickWidth: 0
        },
        yAxis: {
            title: null,
            gridLineColor:"rgba(0,0,0,0)"
        },
        colorAxis: {
            stops: [
                [0, 'rgb(244,109,67)'],
                [0.5, 'rgb(255,255,191)'],
                [1, 'rgb(102,189,99)']
            ],
            min: 0,
            max:100
        },
        tooltip: {
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                        this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                }
            }
        },
        plotOptions:{
            heatmap:{
                borderWidth: 1,
                borderColor:"rgba(0,0,0,0.3)",
                dataLabels: {
                    enabled: true,
                    color: '#222',
                    style: {
                        textShadow: 'none',
                        HcTextStroke: null
                    },
                    formatter:function(){
                        return "<span class='w'>"+this.point.name+"</span><br />"
                            +"<b>"+this.point.value+"</b>"
                    }
                }
            },

        },
        series: [{

        }]
    }
    return{
        //data is an array
        //config:{ row:integer , data:array , nameArray:array , special_option:same to official doc}
        heatmap:function(config,data){
            config.row=config.row==undefined?5:config.row;
            var my_setting_option=Base.deepCopy(setting_option,{}),
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
            if(config.special_option){
                change_attribute(my_setting_option,config.special_option);
            }
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
            $("#"+config.container).highcharts(my_setting_option);
            return $("#"+config.container).highcharts();
        }
    }
})