var grid = {};
grid.o = {};
grid.init = function () {
    chosen.init(
        ["deffect-model", "deffect-phase", "deffect-date"],
        [220, 220, 220]
    );
    mygrid = {}
    mygrid = new dhtmlXGridObject('gridbox');
    mygrid.setImagePath("/assets/dhtmlx/");
    mygrid.setHeader("VIN,Model,Station,Phase,Date,Is Serious");
    mygrid.attachHeader("#text_search,#select_filter,#select_filter,#select_filter,5,6");
    mygrid.setInitWidths("150,100,120,100,120,120");
    mygrid.enableAutoWidth(true);
    mygrid.setColAlign("right,left,left,right,center,left");
    mygrid.setColTypes("ro,ro,ro,ro,rotxt,ch");
    mygrid.getCombo(5).put(2, 2);
    mygrid.setColSorting("str,str,str,str,date,int");
    mygrid.setSkin("dhx_skyblue");
    mygrid.init();
    mygrid.enableSmartRendering(true);
    mygrid.parse(grideData, "json");
    mygrid.attachEvent("onFilterEnd",function(elements){
        grid.onfilter(elements);
    });
    grid.o = mygrid;
    var models = mygrid.collectValues(1);
    $("#deffect-model option").remove();
    for (i = 0; i < models.length; i++) {
        $("#deffect-model").append("<option>" + models[i] + "</option>");
    }
    chosen.single_update("deffect-model");

    var phases = mygrid.collectValues(3);
    $("#deffect-phase option").remove();
    for (i = 0; i < phases.length; i++) {

        $("#deffect-phase").append("<option>" + phases[i] + "</option>");
    }
    chosen.single_update("deffect-phase");

    var dates = mygrid.collectValues(4);
    $("#deffect-date option").remove();
    for (i = 0; i < dates.length; i++) {

        $("#deffect-date").append("<option>" + dates[i] + "</option>");
    }
    chosen.single_update("deffect-date");
}

grid.onfilter = function(els){
    
}

grid.filter = function(){
    grid.o.filterByAll();

    var models = [];
    var i = 0;
    $("#deffect-model option:selected").each(function(){
        models[i] = $(this).text();
        i++;
    });
    if(models.length > 0)
    {
        grid.o.filterBy(1,function(a){
            for(j = 0;j<models.length;j++){
                if(a == models[j]){
                    return true;
                }
            }
        })
    }

    var phases = [];
    i = 0;
    $("#deffect-phase option:selected").each(function(){
        phases[i] = $(this).text();
        i++;
    });
    if(phases.length > 0)
    {
        grid.o.filterBy(3,function(a){
            for(j = 0;j<phases.length;j++){
                if(a == phases[j]){
                    return true;
                }
            }
        })
    }


    var dates = [];
    i = 0;
    $("#deffect-date option:selected").each(function(){
        dates[i] = $(this).text();
        i++;
    });
    if(dates.length > 0)
    {
        grid.o.filterBy(4,function(a){
            for(j = 0;j<dates.length;j++){
                if(a == dates[j]){
                    return true;
                }
            }
        })
    }

}