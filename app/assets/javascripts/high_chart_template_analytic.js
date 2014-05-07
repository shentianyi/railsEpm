var ANALYTICS=ANALYTICS||{};
ANALYTICS.base_option=null;
ANALYTICS.loading_data=false;
ANALYTICS.url='http://42.121.111.38:9002/HighChartsFileService/';
ANALYTICS.high_chart={
    chart: {
        spacingLeft: 5,
        spacingRight: 5,
        marginTop: 30,
        animation: {
            duration: 800
        },
        events : {

        }
    },
    title: {
        text: null
    },
    credits: {
        enabled: false
    },
    rangeSelector:{
        enabled:false
    },
    scrollbar : {
        liveRedraw : false
    },
    navigator : {
        enabled : true,
        series : {
            id : 'navigator'
        },
        baseSeries:0,
        adaptToUpdatedData:false
    },
    tooltip:{
            formatter: function() {
                var targetString="",
                    target,new_target,name,view;
                if(this.points){
                    for(var i=0;i<this.points.length;i++){
                        target=this.points[i];
                        new_target=target.series.name.replace("(","#").replace(")","#").split("#");
                        name=new_target[0];
                        view=new_target[1];
                        if(target.point.unit){
                            targetString+='<span style="color:'+target.series.color+'">'+name+'</span>'+'['+view+']:'+target.y+" "+target.point.unit+'<br />';
                        }
                        else{
                            targetString+='<span style="color:'+target.series.color+'">'+name+'</span>'+'['+view+']:'+target.y+'<br />';
                        }
                    }
                    if(target.series.type=="column"){
                        return '<b>'+target.key+'</b>'
                            +'<br />'
                            +targetString;
//                            +'<br />KPI: <span style="color:'+target.series.color+'">'+name
//                            +'</span>'
//                            +'<br />'+I18n.t('chart.view')+': '+view
//                            +'<br />'+I18n.t('chart.value')+': '+target.y+" "+target.point.unit
//                            +"<br />"+I18n.t('chart.target_range')+": "+target.point.target_min+"-"+target.point.high
                    }
                    else{
                        return '<b>'+target.key+'</b>'
                            +'<br />'
                            +targetString;
//                            +'<br />KPI: <span style="color:'+target.series.color+'">'+name
//                            +'</span>'
//                            +'<br />'+I18n.t('chart.view')+': '+view
//                            +'<br />'+I18n.t('chart.value')+': '+target.y+" "+target.point.unit
//                            +"<br />"+I18n.t('chart.target_range')+": "+target.point.low+"-"+target.point.high
                    }
                }
                else if(this.point){
                    target=this.point;
                    targetString+='<span>'+target.kpi+'</span>'+'['+target.view+']:'+target.y+" "+target.unit+'<br />';
                    return '<b>'+target.name+'</b>'
                        +'<br />'
                        +targetString;
                }

            }

    },
    legend: {
        enabled: false,
        borderRadius: 2,
        borderColor: "rgba(0,0,0,0)",
        itemStyle: {
            color: 'rgba(0,0,0,0.8)'
        },
        animation: true,
        maxHeight: 40,
        itemMarginBottom: -2
    },
//    exporting : {
//        buttons:{
//            contextButton:{
////               symbol:'ANALYTICS.url(images/down.png)'
//                symbol:'ANALYTICS.url(/assets/down.png)'
//            }
//        },
//        url : ANALYTICS.url,
//        filename : 'MyChart',
//        width : 700, // chart width
//        exportTypes : ['chart', 'png', 'jpeg', 'pdf', 'svg', 'doc', 'docx', 'pptx', 'xls', 'xlsx'] // set download file type
//    },
    plotOptions: {
        series: {
            animation: {
                duration: 1000
            },
            cursor:'pointer',
            point:{
                events:{
                    click:function(){
                        chart_point_click(this);
                    }
                }
            },
            marker: {
                enabled: true,
                fillColor: null,
                lineColor: "white",
                states: {
                    select: {
                        fillColor: null,
                        lineColor: "white"
                    }
                }
            },
            turboThreshold:10000,
            states: {
                select: {
                    color: null,
                    borderColor: null
                }
            },
            events:{

            }
        },
        arearange:{
            fillOpacity:0.1,
            fillColor:"rgba(177,211,221,0.2)",
            lineColor:"rgba(177,211,221,0.2)",
            color:"rgba(177,211,221,0.2)",
            stickyTracking:false,
            trackByArea:false,
            zIndex:-1,
            tooltip:{
                tooltip:function(){
                    return false
                }
            },
            showInLegend: false
        },
        line: {
            lineWidth:3,
            marker: {
                lineWidth: 2,
                radius: 4,
                symbol: "diamond"
            },
            events: {
                mouseOver: function () {
                    if(this.data.length>1){
                        this.graph.attr('zIndex', 99);
                    }
                },
                mouseOut: function () {
                    if(this.data.length>1){
                        this.graph.attr('zIndex', this.index);
                    }
                }
            }

        },
        scatter: {
            marker: {
                radius: 4,
                symbol: "circle"
            }
        },
        area:{
            fillColor : {
                linearGradient : {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops : [[0, "rgba(70,174,240,1)"], [1,  "rgba(70,174,240,0.55)"]]
            },
            lineColor:"rgba(70,174,240,1)",
            marker: {
                lineWidth: 0,
                radius: 0
            }
        }
    },
    xAxis: {
        lineWidth: 0,
        tickWidth: 0,
        offset: 5,
        ordinal: true,
        labels: {
            style: {
                color: "rgba(0,0,0,0.4)"
            }
        },
        minPadding: 0.02,
        maxPadding: 0.02,
        minRange: 36e5,
        type: 'datetime',
        dateTimeLabelFormats: {
            hour: '%H:%M' + "<br />" + '%e/%b',
            day: '%e' + "<br />" + "%b",
            week: "Week" + '<br />' + "%W",
            month: '%b' + '<br />' + '%Y',
            year: '%Y'
        },
        events : {
            setExtremes : function(e) {
                if(e.trigger == 'navigator' || e.trigger=='pan') {
                    bar_fix_from = e.min;
                    bar_fix_to = e.max;
                }
            }
        }
    },
    yAxis: {
        gridLineColor: '#ddd',
        gridLineDashStyle: 'Dot',
        offset: -25,
        showFirstLabel: false,
        min:0,
        title: {
            enabled: false
        },
        labels: {
            style: {
                color: "rgba(0,0,0,0.25)"
            },
            y: -2
        }
    }
};


ANALYTICS.form_chart=function(option){
    //ANALYTICS.loading_data 表示正在加载数据
    ANALYTICS.loading_data=true;
    var begin_time_utc=standardParse(option.begin_time).date,
        end_time_utc=standardParse(option.end_time).date,
        bar_fix_from,
        bar_fix_to,
        length=24,
        data_too_long=ANALYTICS.add_observe[option.interval](begin_time_utc,length) < end_time_utc?true:false;
    bar_fix_from=Date.parse(begin_time_utc);
    bar_fix_to = ANALYTICS.add_observe[option.interval](begin_time_utc,(length-1)) <= end_time_utc ?
                           Date.parse(ANALYTICS.add_observe[option.interval](begin_time_utc,(length-1))) : Date.parse(end_time_utc) ;

    var top = parseInt($("#analytics-condition").height()) + parseInt($("#analytics-condition").css("top"));
//    console.log(new Date(bar_fix_from).toISOString() );
//    console.log(new Date(bar_fix_to).toISOString());
    show_loading(top,0,0,0);

    ANALYTICS.base_option={
        kpi_id : option.kpi_id,
        average: option.method=="0",
        entity_group_id: option.view,
        start_time : new Date(bar_fix_from).toISOString() ,
        end_time : new Date(bar_fix_to).toISOString(),
        frequency: option.interval,
        kpi_property: option.kpi_property
    };


    $.post('/kpi_entries/analyse',{
        kpi_id : option.kpi_id,
        average: option.method=="0",
        entity_group_id: option.view,
        start_time : new Date(bar_fix_from).toISOString() ,
        end_time : new Date(bar_fix_to).toISOString(),
        frequency:option.interval,
        property:option.kpi_property
    },function(msg){
          if(option.show_loading==null || option.show_loading)
         remove_loading()
        if(msg.result){
            var data_length=msg.object.current.length;
            var data_array=[];
            for(var i=0;i<data_length;i++){
                data_array[i]={};
                data_array[i].y=msg.object.current[i];
                data_array[i].high=msg.object.target_max[i];
                data_array[i].low=msg.object.target_min[i];
                data_array[i].unit=msg.object.unit[i];
                data_array[i].id=option.id;
                data_array[i].method=option.method;
            }
            option.data=data_array;
            var c={},p=option.data;
            ANALYTICS.chartSeries.series[option.id][option.interval]=deepCopy(c,p);
            if(option.chart_body_close_validate){
                ANALYTICS.render_to(option);
                new Highcharts.StockChart(ANALYTICS.high_chart);
            }
            ANALYTICS.add_series(option);
            ANALYTICS.proper_type_for_chart(option);
            if(data_too_long){
                option.begin_time_utc=begin_time_utc;
                option.end_time_utc=end_time_utc;
                option.bar_fix_from=bar_fix_from;
                option.bar_fix_to=bar_fix_to;
                option.add_length=24;
                ANALYTICS.add_data(option);
            }
            else{
                ANALYTICS.loading_data=false;
                ANALYTICS.currentThreadLoading=false;
                console.log("loading over");
            }
        }
        else{
            MessageBox("sorry , something wrong" , "top", "warning") ;
        }
    });

}


ANALYTICS.form_chart_without_ajax=function(option,data){

        ANALYTICS.loading_data=true;
        var begin_time_utc=standardParse(option.begin_time).date,
            end_time_utc=standardParse(option.end_time).date,
            bar_fix_from,
            bar_fix_to,
            length=24,
            data_too_long=ANALYTICS.add_observe[option.interval](begin_time_utc,length) < end_time_utc?true:false;
        bar_fix_from=Date.parse(begin_time_utc);
        bar_fix_to = ANALYTICS.add_observe[option.interval](begin_time_utc,length) <= end_time_utc ?
            Date.parse(ANALYTICS.add_observe[option.interval](begin_time_utc,length)) : Date.parse(end_time_utc) ;


                var data_length=data.current.length;
                var data_array=[];
                for(var i=0;i<data_length;i++){
                    data_array[i]={};
                    data_array[i].y=data.current[i];
                    data_array[i].high=data.target_max[i];
                    data_array[i].low=data.target_min[i];
                    data_array[i].unit=data.unit[i];
                    data_array[i].id=option.id
                    data_array[i].method=option.method;
                }
                option.data=data_array;
                var c={},p=option.data;
                ANALYTICS.chartSeries.series[option.id][option.interval]=deepCopy(c,p);
                if(option.chart_body_close_validate){
                    ANALYTICS.render_to(option);
                    new Highcharts.StockChart(ANALYTICS.high_chart);
                }
                ANALYTICS.add_series(option);
                ANALYTICS.proper_type_for_chart(option);

                if(data_too_long){
                    option.begin_time_utc=begin_time_utc;
                    option.end_time_utc=end_time_utc;
                    option.bar_fix_from=bar_fix_from;
                    option.bar_fix_to=bar_fix_to;
                    option.add_length=100;
                    ANALYTICS.add_data(option);
                }
                else{
                    ANALYTICS.loading_data=false;
                    ANALYTICS.currentThreadLoading=false;
                    console.log("loading over");
                }


}


ANALYTICS.add_data=function(option){

    var begin_time_utc = ANALYTICS.add_observe[option.interval](option.begin_time_utc,option.add_length),
        length=option.add_length;

    var next_date =  ANALYTICS.add_observe[option.interval](begin_time_utc,(length-1)) > option.end_time_utc ?
                     option.end_time_utc :  ANALYTICS.add_observe[option.interval](begin_time_utc,(length-1));
    option.data_too_long=ANALYTICS.add_observe[option.interval](begin_time_utc,length) < option.end_time_utc?true:false;

//    console.log(new Date(begin_time_utc).toISOString() );
//    console.log(new Date(next_date).toISOString() );

    $.post('/kpi_entries/analyse',{
        kpi_id : option.kpi_id,
        average:option.method=="0",
        entity_group_id: option.view,
        start_time : begin_time_utc.toISOString() ,
        end_time : next_date.toISOString(),
        frequency:option.interval
    },function(msg){
        if(msg.result){
            var data_length=msg.object.current.length;
            var data_array=[];
            for(var i=0;i<data_length;i++){
                data_array[i]={};
                data_array[i].y=msg.object.current[i];
                data_array[i].high=msg.object.target_max[i];
                data_array[i].low=msg.object.target_min[i];
                data_array[i].unit=msg.object.unit[i];
                data_array[i].id=option.id
                data_array[i].method=option.method;
            }
            option.data=data_array;
            var c={},p=option.data;
            ANALYTICS.chartSeries.series[option.id][option.interval]=ANALYTICS.chartSeries.series[option.id][option.interval].concat(deepCopy(c,p));
            var chart=$("#"+option.target).highcharts();

            var point = chart.series[option.id+1].options.data;
            point = point.concat(data_array);
            option.data=point;
            var new_data=ANALYTICS.deal_data(option);
//            console.log(new_data  )

            chart.series[option.id+1].setData(new_data, false);
            chart.series[0].setData(new_data, false);

//            console.log(option.id)

            chart.redraw();
//            chart.xAxis[0].setExtremes(option.bar_fix_from, option.bar_fix_to);
            if(option.data_too_long) {
                option.begin_time_utc=begin_time_utc;
                ANALYTICS.add_data(option);
            }
            else{
                ANALYTICS.loading_data=false;
                ANALYTICS.currentThreadLoading=false;
                console.log("loading over");
            }
        }
        else{
            MessageBox("sorry , something wrong" , "top", "warning") ;
        }
    });

};

ANALYTICS.series_colors=[
    '#97cbe4',
    '#f99c92',
    '#81dfcd',
    '#ffdb6d',
    '#82d9e7',
    '#dabeea',
    '#6485a7',
    '#f9b360',
    '#94cd7b',
    '#69b0bd'
];
ANALYTICS.set_data=function(option) {
    this.date = option.begin_time ? standardParse(option.begin_time).date : null;
    this.template = option.begin_time ? standardParse(option.begin_time).template : null;
    this.data = option.data ? option.data:null;
    this.chart_container = option.target ? option.target:null;
    this.chart = option.target ? $("#" + option.target).highcharts() : null;
    this.series_id = option.id!==null ? option.id:null;
    this.type = option.type ? option.type:null;
    this.interval = option.interval ? option.interval:null;
    this.id=option.id!==null ? option.id : null;
    this.count=option.count ? option.count:null;
    this.view=option.view ? option.view:null;
    this.view_text=option.view_text ? option.view_text:null;
    this.kpi_name=option.kpi ? option.kpi:null;
    this.changeType=option.changeType ? option.changeType:null;
    this.visible=option.visible ? option.visible:null;
};
ANALYTICS.render_to=function(option) {
    ANALYTICS.high_chart.chart.renderTo = option.target;
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
};
ANALYTICS.add_series=function(option) {

    var series_name = option.kpi;
    var series_id = option.id;
    var chart_container = option.target;
    var data = ANALYTICS.deal_data(option);
    var color=option.color?option.color:ANALYTICS.series_colors[series_id % ANALYTICS.series_colors.length];
    $("#" + chart_container).highcharts().addSeries({
        name: series_name,
        id: series_id,
        color:color,
        data: data
    })


};
ANALYTICS.deal_data=function() {
    ANALYTICS.set_data.apply(this, arguments);
    var i;
    var data = this.data;
    switch (this.interval) {
        case "90":
            for (i = 0; i < data.length; i++) {
                data[i].x = Date.UTC(this.template[0], this.template[1], this.template[2], parseInt(this.template[3]) + i);
                data[i].UTCDate=Date.UTC(this.template[0], this.template[1], this.template[2], parseInt(this.template[3]) + i)-8*60*60*1000;
                data[i].name = new Date(this.template[0], this.template[1], this.template[2], parseInt(this.template[3]) + i).toWayneString().hour;
                data[i].kpi=this.kpi_name;
                data[i].view=this.view_text;
            }
            return data;
            break;
        case "100":
            for (i = 0; i < this.data.length; i++) {
                this.data[i].x = Date.UTC(this.template[0], this.template[1], parseInt(this.template[2]) + i);
                data[i].UTCDate=Date.UTC(this.template[0], this.template[1], parseInt(this.template[2]) + i)-8*60*60*1000;
                this.data[i].name = new Date(this.template[0], this.template[1], parseInt(this.template[2]) + i).toWayneString().day;
                data[i].kpi=this.kpi_name;
                data[i].view=this.view_text;
            }
            return data;
            break;
        case "200":
            for (i = 0; i < this.data.length; i++) {
                var week_template=standardParse(first_date_of_week(Date.UTC(this.template[0], this.template[1], parseInt(this.template[2]) + 7 * i)).date.toWayneString().day).template;
                this.data[i].x = Date.UTC(week_template[0], week_template[1], week_template[2]);
                data[i].UTCDate=Date.UTC(week_template[0], week_template[1], week_template[2])-8*60*60*1000;
                this.data[i].name = new Date(week_template[0], week_template[1],week_template[2]).toWayneString().day
                    + " week" + new Date(this.template[0], this.template[1], parseInt(this.template[2]) + 7 * i).toWeekNumber();
                data[i].kpi=this.kpi_name;
                data[i].view=this.view_text;
            }
            return data;
            break;
        case "300":
            for (i = 0; i < this.data.length; i++) {
                this.data[i].x = Date.UTC(this.template[0], parseInt(this.template[1]) + i);
                data[i].UTCDate=Date.UTC(this.template[0], parseInt(this.template[1]) + i)-8*60*60*1000;
                this.data[i].name = new Date(this.template[0], parseInt(this.template[1]) + i).toWayneString().month;
                data[i].kpi=this.kpi_name;
                data[i].view=this.view_text;
            }
            return data;
            break;
        case "400":
            for (i = 0; i < this.data.length; i++) {
                var first_month_of_quarter=Math.floor(parseInt(this.template[1])/3)*3
                this.data[i].x = Date.UTC(this.template[0], first_month_of_quarter + 3 * i);
                data[i].UTCDate=Date.UTC(this.template[0], first_month_of_quarter + 3 * i)-8*60*60*1000;
                this.data[i].name = new Date(this.template[0], parseInt(this.template[1]) + 3 * i).getFullYear()+" quarter " + new Date(this.template[0], parseInt(this.template[1]) + 3 * i).monthToQuarter();
                data[i].kpi=this.kpi_name;
                data[i].view=this.view_text;
            }
            return data;
            break;
        case "500":
            for (i = 0; i < this.data.length; i++) {
                this.data[i].x = Date.UTC(parseInt(this.template[0]) + i, 0);
                data[i].UTCDate=Date.UTC(parseInt(this.template[0]) + i, 0)-8*60*60*1000;
                this.data[i].name = new Date(parseInt(this.template[0]) + i, 0).toWayneString().year;
                data[i].kpi=this.kpi_name;
                data[i].view=this.view_text;
            }
            return data;
            break;
    }
};
ANALYTICS.proper_type_for_chart=function(){
    ANALYTICS.set_data.apply(this,arguments);

    var obj=this;
    var name=obj.kpi_name===null?this.chart.get(this.id).options.name:obj.kpi_name+"("+obj.view_text+")";
    var p={
        name:name ,
        id: obj.id,
        color:this.chart.get(this.id).color,
        data: this.chart.get(this.id).options.data
    },c;
    if(obj.changeType){
        p.data=ANALYTICS.chartSeries.series[p.id][obj.interval];
    }
//    console.log(p.id)
//    console.log(p.data.length)

    var new_series=deepCopy(p,c);
    if(this.type=="column"){
        for(var i=0;i<new_series.data.length;i++){
            new_series.data[i].target_min=new_series.data[i].low;
            new_series.data[i].low=0
        }
    }
    else{
        if(new_series.data[0].target_min!==undefined){
            for(var i=0;i<new_series.data.length;i++){
                new_series.data[i].low=new_series.data[i].target_min;
            }
        }
    }

    new_series.type=this.type;
    var visible=true;
    if(!this.chart.get(this.id).visible || this.visible=="disable"){
        visible=false;
    }
    this.chart.get(this.id).remove(false);
    this.chart.addSeries(new_series,false);
    this.chart.redraw();
    if(!visible){
        this.chart.get(this.id).hide();
    }
};




//利用chart.get id可以准确找到线
ANALYTICS.chartSeries = {
    count: 0,
    id_count:0,
    id:0,
    series: [],
    id_array:[],
    id_give:function(){
        if(this.count>this.id_array.length){
            this.id=this.id_count;
            this.id_array.push(this.id_count);
            this.id_count++;
        }
        else{
            var array=this.id_array, i,index;
            for(i=0;i<array.length;i++){
                if(array[i]===undefined){
                    array[i]=i;
                    index=i;
                    break
                }
            }
            this.id=index;
        }
    },
    getCount: function () {
        return this.count
    },
    addCount: function () {
        this.count += 1
    },
    minusCount: function () {
        this.count -= 1
    },
    getSeries: function () {
        return this.series
    },
    addSeries: function (series) {
        if(this.count>this.series.length){
            this.series.push(series)
        }
        else{
            var series_array=this.series,i;
            for(i=0;i<series_array.length;i++){
                if(series_array[i]===undefined){
                    series_array[i]=series;
                    break;
                }
            }
        }
    },
    deleteSeries:function(id){
        --this.count;
        delete this.series[id];
        delete this.id_array[id];
        $("#chart-container").highcharts().get(id).remove();
    }
};
ANALYTICS.add_observe={
    "90":function(UTCTime,addTime){
        var parse_date=Date.parse(UTCTime);
        var old_date=new Date(parse_date);
        var date=old_date.setHours(old_date.getHours() +  parseInt(addTime));
        return new Date(date);
    },
    "100":function(UTCTime,addTime){

        var parse_date=Date.parse(UTCTime);
        var old_date=new Date(parse_date);
        var date=old_date.setDate(old_date.getDate() +  parseInt(addTime));
        return new Date(date);
    },
    "200":function(UTCTime,addTime){
        var parse_date=Date.parse(UTCTime);
        var old_date=new Date(parse_date);
        var date=old_date.setDate(old_date.getDate() + parseInt(addTime)*7);
        return new Date(date);
    },
    "300":function(UTCTime,addTime){
        var parse_date=Date.parse(UTCTime);
        var old_date=new Date(parse_date);
        var date=old_date.setMonth(old_date.getMonth() +  parseInt(addTime));
        return new Date(date);
    },
    "400":function(UTCTime,addTime){
        var parse_date=Date.parse(UTCTime);
        var old_date=new Date(parse_date);
        var date=old_date.setMonth(old_date.getMonth() + parseInt(addTime)*3);
        return new Date(date);
    },
    "500":function(UTCTime,addTime){
        var parse_date=Date.parse(UTCTime);
        var old_date=new Date(parse_date);
        var date=old_date.setFullYear(old_date.getFullYear() +  parseInt(addTime));
        return new Date(date);
    }
}
