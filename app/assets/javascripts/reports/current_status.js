var current_status={};
current_status.init=function(container_id,data){
    DV.init(container_id);
    DV.parse(data["Vehicle_1"]);
    $("#vechile-select").change(function () {
        DV.clear();
        var a = $("#vechile-select option:selected").text();
        DV.parse(vdata[a]);
    });
}
