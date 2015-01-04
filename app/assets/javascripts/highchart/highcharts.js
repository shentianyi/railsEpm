define(["base","./highcharts_standard_option","jquery.highcharts"],function(Base,Standard){
    Highcharts.dateFormats = {
        W: function (timestamp) {
            var d = new Date(timestamp);
            d.setHours(0, 0, 0);
            d.setDate(d.getDate() + 4 - (d.getDay() || 7));
            var yearStart = new Date(d.getFullYear(), 0, 1);
            var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1) / 7);
            return  weekNo;
        },
        YW: function (timestamp) {
            var d = new Date(timestamp);
            d.setHours(0, 0, 0);
            d.setDate(d.getDate() + 4 - (d.getDay() || 7));
            return d.getFullYear();
        }
    };
    function procedure(config,data,my_setting_option){
        my_setting_option.title.text=config.title?config:null;
        my_setting_option.xAxis.categories=config.categories;
        my_setting_option.colors=config.colors?Standard.color_template[config.colors]:Standard.color_template["template1"];
        if(data!==undefined){
            //arguments[1] is the data
            my_setting_option.series=data;
        }
        else{
            my_setting_option.series=config.data?config.data:{};
        }
        if(config.twoYAxis){
            my_setting_option.yAxis[1].labels.enabled=true;
            for(var key in config.twoYAxis){
                my_setting_option.yAxis[1].labels[key]=config.twoYAxis[key];
            }
        }
        if(config.column_dataLabels){
            my_setting_option.plotOptions.column.dataLabels.enabled=true;
            for(var key in config.column_dataLabels){
                my_setting_option.plotOptions.column.dataLabels[key]=config.column_dataLabels[key];
            }
        }
        if(config.line_dataLabels){
            my_setting_option.plotOptions.line.dataLabels.enabled=true;
            for(var key in config.line_dataLabels){
                my_setting_option.plotOptions.line.dataLabels[key]=config.line_dataLabels[key];
            }
        }
        if(config.special_option){
            change_attribute(my_setting_option,config.special_option);
        }
        $("#"+config.container).highcharts(my_setting_option);
        return $("#"+config.container).highcharts();
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

    return{
        addSeries:function(highcharts,data,type,color,secondYaxis){
            if(type){
                if(Object.prototype.toString.apply(data)==="[object Array]"){
                    data={
                        data:data,
                        type:type
                    }
                }
                else{
                    data.type=type;
                }
            }
            if(color){
                if(Object.prototype.toString.apply(data)==="[object Array]"){
                    data={
                        data:data,
                        color:Standard.color_template[color][0]
                    }
                }
                else{
                    data.color=Standard.color_template[color][0];
                }
            }
            if(secondYaxis){
                if(Object.prototype.toString.apply(data)==="[object Array]"){
                    data={
                        data:data,
                        yAxis:1
                    }
                }
                else{
                    data.yAxis=1;
                }
            }
            highcharts.addSeries(data);
        },
        //for common type of chart , all parameters are optional except container and category
        Chart:function(config,data){
            var my_setting_option=Base.deepCopy(Standard.setting_option,{});
            my_setting_option.chart.type=config.type;
            var chart=procedure(config,data,my_setting_option);
            return chart;
        },
        line:function(config,data){
            var my_setting_option=Base.deepCopy(Standard.setting_option,{});
            my_setting_option.chart.type="line";
            var chart=procedure(config,data,my_setting_option);
            return chart;
        },
        column:function(config,data){
            var my_setting_option=Base.deepCopy(Standard.setting_option,{});
            my_setting_option.chart.type="column";
            if(config.stacking){
                my_setting_option.plotOptions.column.stacking='normal';
            }
            var chart=procedure(config,data,my_setting_option);
            return chart;
        }
    }
})