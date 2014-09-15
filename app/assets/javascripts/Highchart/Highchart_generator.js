var Highchart_generator=function(option){
    this.target=option.target;
    this.color_system={
        "blue":"#97cbe4",
      "purple":"#9b65de"
    };
    this.init=function(){
        var $target=this.target.indexOf("#")===-1?$("#"+this.target):$(this.target);
        this.basic.title.text=option.kpi?option.kpi:null;
        this.basic.subtitle.text=option.date?option.date:null;
        this.basic.xAxis.categories=option.xArray;
        this.basic.chart.type=option.chart_type?option.chart_type:"line";
        if(option.height){
            this.basic.chart.height=option.height
        }
        $target.highcharts(this.basic);
    };
    this.basic={
        chart: {
            borderRadius:0,
            animation: {
                duration: 800
            }
        },
        colors:[
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
        ],
        title: {
            style:{
                'fontSize':"24px",
                color:'#555'
            },
            margin:35,
            align:"center"
        },
        subtitle: {
            style:{
                'fontSize':"17px",
                color:'#666'
            },
            floating:true,
            y:36,
            align:"center"
        },
        credits: {
            enabled: false
        },
        exporting:{
            enabled:false
        },
        tooltip:{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, 'rgba(96, 96, 96, .8)'],
                    [1, 'rgba(16, 16, 16, .8)']
                ]
            },
            borderWidth: 0,
            style: {
                color: '#FFF'
            },
            formatter: function() {
                return '<b>'+this.x+'</b>'
                    +'<br />Value: <span style="color:'+this.series.color+'">'+this.point.y
                    +'</span>'

            }
        },
        legend: {
            enabled: true,
            borderRadius: 2,
            borderColor: "rgba(0,0,0,0)",
            animation: true,
            maxHeight: 40,
            margin:0,
            itemMarginBottom: -2,
            itemStyle: {
                color: '#777'
            },
            itemHoverStyle: {
                color: '#bbb'
            },
            itemHiddenStyle: {
                color: '#ccc'
            }
        },
        xAxis: {
            lineWidth: 0,
            tickWidth: 1,
            offset: 0,
            labels: {
                style: {
                    color:'rgba(0,0,0,0.4)',
                    fontWeight:"bold"
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                enabled: false
            },
            labels: {
                style: {
                    color:'rgba(0,0,0,0.4)',
                    fontWeight: 'bold'
                }
            },
            tickPixelInterval: 30,
            gridLineDashStyle: 'solid',
            gridLineWidth:1,
            gridLineColor: 'rgba(0,0,0,0.3)'
        },
        plotOptions: {
            series: {
                shadow: true
            },
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
            line:{
                marker:{
                    radius:3,
                    lineWidth:1
                }
            }
        }
    };
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> daily_dpv
    this.init_daily_dpv=function(){
        var $target=this.target.indexOf("#")===-1?$("#"+this.target):$(this.target);
        this.basic.title.text=option.title?option.title:null;
        this.basic.subtitle.text=option.subtitle?option.subtitle:null;
        this.basic.chart.type="column";
        this.basic.plotOptions.column.dataLabels={
            enabled: true,
            color: "rgba(0,0,0,0.6)",
            style: {
                fontWeight: 'bold',
                fontSize:'11px'
            },
            formatter: function() {
                if(this.y>0){
                    return this.y ;
                }
                else{
                    return "" ;
                }

            }
        }
        this.basic.subtitle.enabled=false;
        this.basic.xAxis.categories=option.xArray;
        this.basic.title.margin=5;
        this.basic.series=option.data;
        if(option.height){
            this.basic.chart.height=option.height
        }
        if(option.color){
            this.basic.colors[0]=this.color_system[option.color]?this.color_system[option.color]:this.color_system["blue"];
        }
        $target.highcharts(this.basic);
    };
    this.reload_daily_dpv=function(option){
        var $target=this.target.indexOf("#")===-1?$("#"+this.target):$(this.target);
        $target.highcharts().destroy();
        if(option.xArray){
            this.basic.xAxis.categories=option.xArray;
        }
        this.basic.series=option.data;
        $target.highcharts(this.basic);
    };
    this.daily_resize=function(width,height,type){
        var $target=this.target.indexOf("#")===-1?$("#"+this.target):$(this.target),
            chart=$target.highcharts();
        daily_dpv_resize_count[type]++;
            chart.setSize(
                width,
                height,
                true
            );

            var basic=this.basic,
                target_chart=this.target;
            setTimeout(function(){
                daily_dpv_resize_count[type]--;
                if(daily_dpv_resize_count[type]===0){
                    var $target=target_chart.indexOf("#")===-1?$("#"+target_chart):$(target_chart);
                    $target.highcharts().destroy();
                    $target.highcharts(basic);
                }
            },500);
    };
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> daily_ftq
    this.init_daily_ftq=function(){
        var $target=this.target.indexOf("#")===-1?$("#"+this.target):$(this.target);
        this.basic.title.text=option.title?option.title:null;
        this.basic.subtitle.text=option.subtitle?option.subtitle:null;
        this.basic.title.margin=5;
        this.basic.plotOptions.column.stacking='normal';
        this.basic.subtitle.enabled=false;
        this.basic.xAxis.categories=option.xArray;
        this.basic.tooltip.backgroundColor={
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, 'rgba(255, 255, 255, .8)'],
                    [1, 'rgba(255, 255, 255, .8)']
                ]
        };
        this.basic.tooltip.style={
            color: '#222'
        };
        this.basic.plotOptions.column.dataLabels={
                enabled: true,
                color: "rgba(0,0,0,0.8)",
                inside:false,
                style: {
                    fontWeight: 'bold',
                    fontSize:'11px'
                },
                formatter: function() {
                    if(this.series.index===0){
                        if(this.total>0){
                            return this.total ;
                        }
                        else{
                            return "" ;
                        }
                    }
                }
        };
        this.basic.plotOptions.line.dataLabels={
            enabled: true,
            color: "rgba(60,111,204,0.6)",
            style: {
                fontWeight: 'bold',
                fontSize:'11px'
            },
            align:"left",
            formatter: function() {
                    if(this.y>0){
                        return this.y+"%" ;
                    }
                    else{
                        return "" ;
                    }
            }
        };
        this.basic.yAxis=[
            { // Primary yAxis
                labels: { format: '{value}',
                    style: { color: 'rgba(0,0,0,0.6)' }
                },
                title:{
                    enabled:false
                }

            },
            {  //Secondary yAxis
                labels: {
                    format: '{value} %',
                    style: {
                        color: 'rgba(0,0,0,0.6)' }
                },
                title:{
                    enabled:false
                },
                min:0,
                max:100,
                tickInterval:20,
                opposite: true }
        ];
        this.basic.series=[
            {
                name: option.data.nok.name,
                color: '#fd0e0e',
                type: 'column',
                data: option.data.nok.data
            },
            {
                name: option.data.ok.name,
                color: '#25ad38',
                type: 'column',
                data: option.data.ok.data
            },
            {
                name: option.data.ftq.name,
                color: '#3c6fcc',
                type: 'line',
                yAxis: 1,
                data: option.data.ftq.data
            }
        ];
        if(option.height){
            this.basic.chart.height=option.height
        }
        if(option.color){
            this.basic.colors[0]=this.color_system[option.color]?this.color_system[option.color]:this.color_system["blue"];
        }
        $target.highcharts(this.basic);
    };
    this.reload_daily_ftq=function(option){
        var $target=this.target.indexOf("#")===-1?$("#"+this.target):$(this.target);
        $target.highcharts().destroy();
        if(option.xArray){
            this.basic.xAxis.categories=option.xArray;
        }
        this.basic.series=[
            {
                name: option.data.nok.name?option.data.nok.name:this.basic.series[0].name,
                color: '#fd0e0e',
                type: 'column',
                data: option.data.nok.data?option.data.nok.data:this.basic.series[0].data
            },
            {
                name: option.data.ok.name?option.data.ok.name:this.basic.series[1].name,
                color: '#25ad38',
                type: 'column',
                data: option.data.ok.data?option.data.ok.data:this.basic.series[1].data
            },
            {
                name: option.data.ftq.name?option.data.ftq.name:this.basic.series[2].name,
                color: '#3c6fcc',
                type: 'line',
                yAxis: 1,
                data: option.data.ftq.data?option.data.ftq.data:this.basic.series[2].data
            }
        ];
        $target.highcharts(this.basic);
    };
    this.ftq_resize=function(width,height,type){
        var $target=this.target.indexOf("#")===-1?$("#"+this.target):$(this.target),
            chart=$target.highcharts();
        daily_ftq_resize_count++;
        chart.setSize(
            width,
            height,
            true
        );
        var basic=this.basic,
            target_chart=this.target;
        setTimeout(function(){
            daily_ftq_resize_count--;
            if(daily_ftq_resize_count===0){
                var $target=target_chart.indexOf("#")===-1?$("#"+target_chart):$(target_chart);
                $target.highcharts().destroy();
                $target.highcharts(basic);
            }
        },500);
    };
};
daily_dpv_resize_count={
    "dpv":0,
    "sdpv":0
};
daily_ftq_resize_count=0;