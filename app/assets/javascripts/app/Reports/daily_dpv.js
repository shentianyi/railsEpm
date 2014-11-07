define(["jquery","dhtmlx.grid","highcharts","data_pipe/reports","chosen"],function($,Grid,Highcharts,Data){
    function generate_grid(data){
        var dpv_grid_template={
            container:"data_container",
            header:['FALSE','iQ1','iQ2','iQ IP','iQ DR','iQ3','iQ4','iQ5','iQ6','iQ7','iQ8','iQ9','iQ10','iQ11','iQ12','iQ13','iQ14','iQ15'],
            colTypes:"ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro"
        }
        Grid.render(data,dpv_grid_template);
    }
    return{
        init:function(){
            var data=Data.daily_dpv();
            generate_grid(data.grid);
        }
    }
})