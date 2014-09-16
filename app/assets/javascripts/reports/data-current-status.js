(function(){
    window.setInterval(function(){
        var models = ["CF11","CF14","CF16"];
        for(var j = 0;j<models.length;j++){
            var model = models[j];
            for(var i = 0;i<d_current_status[model].length;i++){
                var old = parseInt(d_current_status[model][i]["Defects"]);
                d_current_status[model][i]["Defects"] = (old+RAND.rate(1,20,0)).toString();

                old = parseInt(d_current_status[model][i]["Pass"])
                d_current_status[model][i]["Pass"] = (old + RAND.rate(1,80,0)).toString();

                var rate = Math.floor(Math.random()*3-1);
                old = parseInt(d_current_status[model][i]["FTQ"]);
                var target = parseInt(d_current_status[model][i]["FTQ_Target"]);
                if(old+rate<100){
                    d_current_status[model][i]["FTQ"] = (old+rate).toString();
                }

                if(old > target){
                    d_current_status[model][i]["STYLE_COLOR"] = Report.color.ftq["higher"];
                }else if(old==target){
                    d_current_status[model][i]["STYLE_COLOR"] = Report.color.ftq["equal"];
                }else{
                    d_current_status[model][i]["STYLE_COLOR"] = Report.color.ftq["lower"];
                }
            }
        }
        Report.refresh();
    },5000);
}());

var data_current_color={
    "red":"#eb4848",
    "green":"#19cf22"
};
var d_current_status = {};
$(document).ready(function(){
    d_current_status = SampleData.init_current_status();
});


