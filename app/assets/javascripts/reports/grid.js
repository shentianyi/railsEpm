var grid={};
grid.init=function(){
        chosen.init(
            ["deffect-model","deffect-phase","deffect-date"],
            [120,120,120]
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
        mygrid.getCombo(5).put(2,2);
        mygrid.setColSorting("str,str,str,str,date,int");
        mygrid.setSkin("dhx_skyblue");
        mygrid.init();
        mygrid.enableSmartRendering(true);
        mygrid.parse(grideData,"json");

        var models = mygrid.collectValues(1);
        for(i=0;i<models.length;i++){
            $("#deffect-model option").remove();
            $("#deffect-model").append("<option>"+models[i]+"</option>");
        }
        chosen.single_update("deffect-model");
        //var phases = mygrid.collectValues(3);
        //var dates = mygrid.collectValues(4);

}