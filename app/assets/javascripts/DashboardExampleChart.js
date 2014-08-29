var DashBoardExampleChart=function(option){
    this.target=option.target;
    this.assorted=function(targetArray,currentArray){
        var newArray=[];
        newArray[0]={name:'Target',data:targetArray};
        newArray[1]={name:"Current",data:[]};
        var i,target,current;
        for(i=0;i<targetArray.length;i++){
            target=targetArray[i];
            current=currentArray[i];
            if(current>=target){
                newArray[1].data.push(current);
            }
            else{
                newArray[1].data.push({y:current,color:"#fe7005"});
            }
        }
        return newArray;
    }
    this.init=function(){
        var $target=$("#"+this.target);
        this.basic.title.text=option.kpi;
        this.basic.subtitle.text=option.date;
        this.basic.xAxis.categories=option.departmentArray;
        this.basic.series=this.assorted(option.targetArray,option.currentArray);
        $target.highcharts(this.basic);
    }
}
DashBoardExampleChart.prototype.basic={
    chart: {
        type: 'column',
        borderRadius:0,
        animation: {
            duration: 800
        },
        backgroundColor:"rgba(255,255,255,0.0)"
    },
    colors:[
        "#00e3fe",
        "#9cdd00",

        "#f6d742",
        "#00e3fe",
        "#eb68fb",
        "#f86c80",
        "#5a6d8f",
        "#51d69f",
        "#dca96c",
        "#298eed",
        "#ac1010"
    ],
    title: {

        style:{
            'fontSize':"24px"
        },
        align:"left"
    },
    subtitle: {

        style:{
            'fontSize':"18px"
        },
        align:"left"
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
            return '<b>'+this.point.name+'</b>'
                +'<br />KPI: <span style="color:'+this.series.color+'">'+this.series.name
                +'</span>'
                +'<br />'+'chart.view'+': '+this.point.view
                +'<br />'+'chart.value'+' : '+this.y+" "+this.point.unit
                +"<br />"+'chart.target_range'+": "+this.point.target_min+"-"+this.point.high

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
            color: '#CCC'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#333'
        }
    },
    xAxis: {

    },
    yAxis: {
        min: 0,
        title: {
            text: 'Rainfall (mm)'
        },
        title: {
            enabled: false
        }
    },
    plotOptions: {
        series: {
            shadow: true
        },
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    }
}