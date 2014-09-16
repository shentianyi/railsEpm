var defects={};
defects.target = {};

defects.refresh_color = function(){
//    var data = Report.data;
//    var obj = this.target;
//    console.log(obj.getRowsNum());
//    var target_data = {
//        rows:[]
//    };
//    for(var i =0;i<data.length;i++){
//        target_data["rows"][i] = {
//            id:i+1,
//            data:[data[i]["INQA"],data[i]["FTQ"],data[i]["FTQ_Target"]]
//        }
//    }
//
//    obj.parse(target_data,'json');
//
//    obj.forEachRow(function(row_id){
//        var rinx = obj.getRowIndex(row_id);
//        obj.cells(row_id,1).setBgColor(data[rinx]["STYLE_COLOR"]);
//    })
//    obj.refresh();
};

defects.example_init=function(){
    var width = Math.floor(($("#report-content").width()-2)/19-0);
    var widthstring = "";
    var alienstring = "";
    var coltypestring = "";
    var colsortstring = "";
    var headers = "Model Group,VIN,NAME,Level 1,Level 2,Level3,Level4,Level5,Fault Description" +
        ",Station,Rank,Res.Dep,Inspector,repaired by,confirmed by,input date/time,Shift,Package code,Pilot";
    var length = headers.split(",").length;
    for(var i = 0;i<length;i++){
        if(i<18){
            alienstring = alienstring+"center,"
            widthstring = widthstring+width+",";
            coltypestring = coltypestring + "ro,";
            colsortstring = colsortstring + "str,";
        }else{
            alienstring = alienstring+"center";
            widthstring = widthstring+width;
            coltypestring = coltypestring + "ro";
            colsortstring = colsortstring + "str";
        }

    }

    var defectsgrid = new dhtmlXGridObject("all_defects");
    defectsgrid.setImagePath("/assets/dhtmlx/");
    defectsgrid.setHeader(headers);
    defectsgrid.setInitWidths(widthstring);
    defectsgrid.enableAutoWidth(false);
    defectsgrid.setColAlign(alienstring);
    defectsgrid.setColTypes(coltypestring);
    defectsgrid.setColSorting(coltypestring);
    defectsgrid.setSkin("dhx_skyblue");
    defectsgrid.setColumnColor("#d5f1ff");
    defectsgrid.enableSmartRendering(true);
    defectsgrid.init();
    var data = {
        rows:[{
            id:"1",
            data:[
            ]
        }]
    };
    var stations = ["BBO","PBO","DBO","IBO","MTR","INT","TBO","MCH","CBO","U/H","EXT","ELE","GBO","ROL","SHT","OKL","ROD","EOL"];
    for(var i = 0;i<100;i++){
        data["rows"][i] ={
            id: i+1,
            data: [
                RAND.enum(["CF11","CF14","CF16"]),
                'LXXXXXXXXXXXXX',
                'XXXX',
                RAND.enum(["仪表盘","内饰","制动系统","发动机仓"]),
                RAND.enum(["保险丝盒","发动机","左前轮","右前轮","侧饰版"]),
                RAND.enum(["支架","右出风口","左出风口","侧围","ABS传感器","制动硬管","ECM"]),
                RAND.enum(["螺母","风向调节器","右","左","线束","密封","支架"]),
                RAND.enum(["螺母","罩","螺钉","推紧销","卡子","卡筛"]),
                RAND.enum(["高扭矩","位置不当","过紧","错","损伤","松","焊接不良","短缺","装配不到位","装配错","角度错"]),
                RAND.enum(stations),
                RAND.enum(["A","B","C"]),
                RAND.enum(["GA","BS","D&C"," "]),
                RAND.enum(["Jack","John","Mike"]),
                RAND.enum(["Alan","Kobe","Josh"]),
                RAND.enum(["Joe","Brady","Chris"]),
                RAND.time("2014/9/1","2014/9/20"),
                RAND.enum(["E","L"]),
                "XXXXXXXXXXXXXXXX",
                RAND.enum(["N","Y"])
            ]
        };
    };
    defectsgrid.clearAll();
    defectsgrid.parse(data,'json');



    var key_defectsgrid = new dhtmlXGridObject("key_defects");
    key_defectsgrid.setImagePath("/assets/dhtmlx/");
    key_defectsgrid.setHeader(headers);
    key_defectsgrid.setInitWidths(widthstring);
    key_defectsgrid.enableAutoWidth(false);
    key_defectsgrid.setColAlign(alienstring);
    key_defectsgrid.setColTypes(coltypestring);
    key_defectsgrid.setColSorting(coltypestring);
    key_defectsgrid.setSkin("dhx_skyblue");
    key_defectsgrid.setColumnColor("#d5f1ff");
    key_defectsgrid.enableSmartRendering(true);
    key_defectsgrid.init();
    var keydata = {
        rows:[{
            id:"1",
            data:[
            ]
        }]
    };
    var key_stations = ["iQ1","iQ2","iQ11","EOL"];
    for(var i = 0;i<25;i++){
        keydata["rows"][i] ={
            id: i+1,
            data: [
                RAND.enum(["CF11","CF14","CF16"]),
                'LXXXXXXXXXXXXX',
                'XXXX',
                RAND.enum(["仪表盘","内饰","制动系统","发动机仓"]),
                RAND.enum(["保险丝盒","发动机","左前轮","右前轮","侧饰版"]),
                RAND.enum(["支架","右出风口","左出风口","侧围","ABS传感器","制动硬管","ECM"]),
                RAND.enum(["螺母","风向调节器","右","左","线束","密封","支架"]),
                RAND.enum(["螺母","罩","螺钉","推紧销","卡子","卡筛"]),
                RAND.enum(["高扭矩","位置不当","过紧","错","损伤","松","焊接不良","短缺","装配不到位","装配错","角度错"]),
                RAND.enum(key_stations),
                RAND.enum(["A","B","C"]),
                RAND.enum(["GA","BS","D&C"," "]),
                RAND.enum(["Jack","John","Mike"]),
                RAND.enum(["Alan","Kobe","Josh"]),
                RAND.enum(["Joe","Brady","Chris"]),
                RAND.time("2014/9/1","2014/9/20"),
                RAND.enum(["E","L"]),
                "XXXXXXXXXXXXXXXX",
                RAND.enum(["N","Y"])
            ]
        };
    };
    key_defectsgrid.clearAll();
    key_defectsgrid.parse(keydata,'json');

    //Target Settings
    var target_width = Math.floor(($("#report-content").width()-2)/3-0);
    var target_setting = new dhtmlXGridObject("target_setting");
    target_setting.setImagePath("/assets/dhtmlx/");
    target_setting.setHeader("Stations,FTQ Status,FTQ Target (double click to modify)",null,["text-align:center;","text-align:center;","text-align:center"]);
    target_setting.setInitWidths(target_width+","+target_width+","+target_width);
    target_setting.enableAutoWidth(false);
    target_setting.setColAlign('center,center,center');
    target_setting.setColTypes('ro,ro,ed');
    target_setting.setSkin("dhx_skyblue");
    target_setting.setColumnColor("#d5f1ff");
    target_setting.enableSmartRendering(true);
    target_setting.init();
    var target_data = {
        rows:[]
    };
    var current = Report.data;
    for(var i =0;i<current.length;i++){
        target_data["rows"][i] = {
            id:i+1,
            data:[current[i]["INQA"],current[i]["FTQ"],current[i]["FTQ_Target"]]
        }
    }
    target_setting.parse(target_data,'json');
    this.target = target_setting;

    //setting table size and layout
    defects.resize("all_defects");
    defects.resize("key_defects");
    defects.resize("target_setting");
    $(window).resize(function(){
        defects.resize("all_defects");
        defects.resize("key_defects");
        defects.resize("target_setting");
    });

}
defects.resize=function(target){
   var $target=target.indexOf("#")===-1?$("#"+target):$(target),
       total_height=$("#wrap-main").height()-$("header").height()- 1,
       table_height=total_height-$(".wrapper-header").height()-$target.find(".xhdr").height()-2,
       height=total_height-$(".wrapper-header").height() - 2,
       width=$("#report-content").width()-2;
   $target.find(".objbox").css("height",table_height).css("width",width);
   $target.css("width",width).css("height",height);
   $target.find(".xhdr").css("width",width);
}