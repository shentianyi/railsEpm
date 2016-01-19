var DashBoardExampleChart=function(option){
    this.target=option.target;
    this.assorted=function(targetArray,currentArray,ppm,targetLine){
        var newArray=[];
        if(targetLine){
            newArray[0]={name:'Target',data:targetArray,type:'line'};
        }
        else{
            newArray[0]={name:'Target',data:targetArray};
        }
        newArray[1]={name:"Current Normal",data:[]};
        var i,target,current;
        for(i=0;i<targetArray.length;i++){
            target=targetArray[i];
            current=parseFloat(currentArray[i]);
            if(current>=target){
                if(ppm===1){
                    newArray[1].data.push({y:current,color:"#fe7005"});
                }
                else{
                    newArray[1].data.push(current);
                }

            }
            else{
                if(ppm===1){
                    newArray[1].data.push(current);
                }
                else{
                    newArray[1].data.push({y:current,color:"#fe7005"});
                }
            }
        }
        var abNormalArray=new Array(targetArray.length);
        for(var i=0;i<abNormalArray.length;i++){
            abNormalArray[i]=0;
        }
        newArray[2]={name:"Current Abnormal",data:abNormalArray};
        return newArray;
    }
    this.init=function(){
        var $target=$("#"+this.target);
        this.basic.title.text=option.kpi;
        this.basic.chart.height=option.height;
        this.basic.subtitle.text=option.date;
        this.basic.xAxis.categories=option.departmentArray;
        this.basic.series=this.assorted(option.targetArray,option.currentArray,option.ppm,option.targetLine);
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
        "#fe7005",
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
            'fontSize':"24px",
            color:'#FFF'
        },
        margin:35,
        align:"left"
    },
    subtitle: {
        style:{
            'fontSize':"17px",
            color:'rgba(255,255,255,0.9)'
        },
        floating:true,
        y:36,
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
            var name=this.series.name==="Target"?"Target":"Current";
            return '<b>'+name+'</b>'
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
        labels: {
            style: {
                color:'#eaedec',
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
                color:'rgba(255,255,255,0.6)',
                fontWeight: 'bold'
            }
        },
        tickPixelInterval: 30,
        gridLineDashStyle: 'solid',
        gridLineWidth:1,
        gridLineColor: 'rgba(255,255,255,0.6)'
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