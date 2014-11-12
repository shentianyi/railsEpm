define(["jquery","dhtmlx.grid","datepicker","reportsData","./share","colorPicker"],function($,Grid,Datepicker,Data,Share,ColorPicker){
    function generate_grid(data){
        var dpv_grid_template={
            container:"data_container",
            header:['FALSE','iQ1','iQ2','iQ IP','iQ DR','iQ3','iQ4','iQ5','iQ6','iQ7','iQ8','iQ9','iQ10','iQ11','iQ12','iQ13','iQ14','iQ15'],
            colTypes:"ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro"
        }
        return Grid.render(data,dpv_grid_template);
    }
    return{
        init:function(){
            var data=Data.daily_dpv(),
                grid=generate_grid(data.grid);
            Datepicker.datepicker(["#date-begin","#date-end"]);
            $("export_tp_excel").on("click",function(){
                grid.toChartExcel(Share.export_bt_chart_excel_url);
            });
            ColorPicker.colorPicker(["#color1","#color2","#color3","#color4","#color5","#color6"]);
        }
    }
})