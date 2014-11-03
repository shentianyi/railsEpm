(function(){
    window.setInterval(function(){
        var models = ["CF11","CF14","CF16"];
        for(var j = 0;j<models.length;j++){
            var model = models[j];
            for(var i = 0;i<d_current_status[model].length;i++){
                //var old = parseInt(d_current_status[model][i]["Defects"]);
                //d_current_status[model][i]["Defects"] = (old+RAND.rate(1,20,0)).toString();

                var pass = parseInt(d_current_status[model][i]["Pass"])
                d_current_status[model][i]["Pass"] = (pass + RAND.rate(1,80,0)).toString();

                var rate = Math.floor(Math.random()*3-1);
                var ftq = parseInt(d_current_status[model][i]["FTQ"]);
                var target = parseInt(d_current_status[model][i]["FTQ_Target"]);
                if(ftq+rate<100){
                    d_current_status[model][i]["FTQ"] = (ftq+rate).toString();
                }

                if(ftq > target){
                    d_current_status[model][i]["STYLE_COLOR"] = Report.color.ftq["higher"];
                }else if(ftq==target){
                    d_current_status[model][i]["STYLE_COLOR"] = Report.color.ftq["equal"];
                }else{
                    d_current_status[model][i]["STYLE_COLOR"] = Report.color.ftq["lower"];
                }

                var defects = (pass * ftq/100).toFixed(0);
                d_current_status[model][i]["Defects"] = defects.toString();
            }
        }
        Report.refresh();
    },5000);
}());


var d_current_status = {};
$(document).ready(function(){
    d_current_status = SampleData.init_current_status();
});


