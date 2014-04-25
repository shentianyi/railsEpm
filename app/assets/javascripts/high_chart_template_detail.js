/**
 * Created with JetBrains RubyMine.
 * User: wayne
 * Date: 14-4-23
 * Time: 上午11:41
 * To change this template use File | Settings | File Templates.
 */
var CHARTDETAIL=CHARTDETAIL || {};
CHARTDETAIL.factory=function(render){
    return {
        chart: {
            renderTo:render,
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
        tooltip:{
            formatter: function() {
                var returnString="";
                if(this.point.name){
                    returnString+="<span style='color:"+this.point.color+"'>"+this.point.name+"</span><br />"
                }
                returnString+="当前值："+this.point.y+"<br />"
                if(this.point.percentage){
                    returnString+="占比："+(this.point.percentage).toFixed(1)+"%<br />"
                }
                return returnString;
            }

        },
        exporting:{
            enabled:false
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
        plotOptions: {
            series: {
                animation: {
                    duration: 1000
                },
                cursor:'pointer',
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

            } ,
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                size:210,
                depth:28,
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
                showInLegend:true,
                dataLabels: {
                    enabled: false,
                    distance:-10,
                    format: '{point.name}'
                },
                point:{
                    events:{
                        click:function(){
                            ANALYTICS.DETAIL.pieClick(this);
                        }
                    }
                }
            }
        }
    };
}
