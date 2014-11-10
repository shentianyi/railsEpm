define(["jquery","reportsData","dhtmlx.grid","highcharts"],function($,Data,Grid,Highcharts){
    function generate_grid(data){
        var template={
            container:"data_container",
            header:['FALSE','iQ1','iQ2','iQ IP','iQ DR','iQ3','iQ4','iQ5','iQ6','iQ7','iQ8','iQ9','iQ10','iQ11','iQ12','iQ13','iQ14','iQ15'],
            colTypes:"ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro"
        };
        Grid.render(data,template)
    }
    function generate_column(config){
        Highcharts.column(config);
    }
    return{
        init:function(){
            var data_for_grid=Data.daily_dpv().grid;
            generate_grid(data_for_grid);
            generate_column(Data.daily_ftq().chart);
        }
    }
})