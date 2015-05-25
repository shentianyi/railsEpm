define(["jquery.sparkline"],function(){
    return{
        bar:function(target,values){
            var length=values.length,
                colorMap=[],
                i;
            for(i=0;i<length;i++){
                colorMap.push("#5FA9DA");
            }
            colorMap[length-1]="#F5A133";
            target.sparkline(values, { type: 'bar',chartRangeMin:0,colorMap:colorMap,barWidth:"6px"});
        }
    }
})