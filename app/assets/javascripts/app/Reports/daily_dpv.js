define(["jquery","dhtmlx.grid","highcharts","reportsData","chosen"],function($,Grid,Highcharts,Data,Chosen){
    function generate_grid(data){
        var dpv_grid_template={
            container:"data_container",
            header:['FALSE','iQ1','iQ2','iQ IP','iQ DR','iQ3','iQ4','iQ5','iQ6','iQ7','iQ8','iQ9','iQ10','iQ11','iQ12','iQ13','iQ14','iQ15'],
            colTypes:"ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro"
        }
        Grid.render(data,dpv_grid_template);
    }
    function generate_column(config){
        Highcharts.column(config);
    }

    return{
        init:function(){
            var data=Data.daily_dpv(),
                grid=generate_grid(data.grid);
                generate_column(data.dpv_chart);
                generate_column(data.sdpv_chart);

            Chosen.init_with_width(
                ["deffect-model", "deffect-phase", "deffect-date"],
                [180, 180, 180]
            );
            //var models = Report.r.collectValues(1);
            var models = ["CF11", "CF14", "CF16"];
            $("#deffect-model option").remove();
            for (i = 0; i < models.length; i++) {
                $("#deffect-model").append("<option>" + models[i] + "</option>");
            }
            Chosen.single_update("deffect-model");
            //var phases = Report.r.collectValues(3);
            var phases = ["MRD1", "MRD10", "MRD11", "MRD2", "MRD8", "MRD9"]
            $("#deffect-phase option").remove();
            for (i = 0; i < phases.length; i++) {

                $("#deffect-phase").append("<option>" + phases[i] + "</option>");
            }
            Chosen.single_update("deffect-phase");
            //var dates = Report.r.collectValues(4);
            var dates = [];
            var j = 0;
            for (var i = Date.parse('2014-09-01'); i < (new Date()).getTime(); i += 24 * 60 * 60 * 1000) {
                var d = new Date(i);
                dates[j] = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
                j++;
            }
            $("#deffect-date option").remove();
            for (i = 0; i < dates.length; i++) {
                $("#deffect-date").append("<option>" + dates[i] + "</option>");
            }
            Chosen.single_update("deffect-date");

            $("#to-excel").on("click",function(){

            });
            $("#retrieve-data").on('click', function () {

            });
        }
    }
})