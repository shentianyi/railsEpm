(function(){
    window.setInterval(function(){
        console.log("Refresh Vehicle Value");
        var models = ["CF11","CF14","CF16"];
        for(var j = 0;j<models.length;j++){
            var model = models[j];
            for(var i = 0;i<d_current_status[model].length;i++){
                d_current_status[model]["Defects"] = d_current_status[model]["Defects"]+RAND.rate(10,80,0);
                d_current_status[model]["Pass"] = d_current_status[model]["Pass"] + RAND.rate(5,80,0);
                var rate = Math.floor(Math.random()*2-1);
                d_current_status[model]["FTQ"] =   d_current_status[model]["FTQ"] + rate;
            }
        }
    },1000);
}())

var d_current_status = {
    CF11: [
        {
            "id": "1",
            "INQA": "iQ1",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85%"
        },
        {
            "id": "2",
            "INQA": "iQ2",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90%"
        },
        {
            "id": "3",
            "INQA": "iQ1",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85%"
        },
        {
            "id": "4",
            "INQA": "iQ2",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90%"
        },
        {
            "id": "5",
            "INQA": "iQ1",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85%"
        },
        {
            "id": "6",
            "INQA": "iQ2",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90%"
        },
        {
            "id": "7",
            "INQA": "iQ1",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85%"
        },
        {
            "id": "8",
            "INQA": "iQ2",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90%"
        },
        {
            "id": "9",
            "INQA": "iQ1",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85%"
        },
        {
            "id": "10",
            "INQA": "iQ2",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90%"
        }
    ],
    CF14: [
        {
            "id": "1",
            "INQA": "iQ1",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85%"
        },
        {
            "id": "2",
            "INQA": "iQ2",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90%"
        },
        {
            "id": "3",
            "INQA": "iQ1",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85%"
        },
        {
            "id": "4",
            "INQA": "iQ2",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90%"
        },
        {
            "id": "5",
            "INQA": "iQ1",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85%"
        },
        {
            "id": "6",
            "INQA": "iQ2",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90%"
        },
        {
            "id": "7",
            "INQA": "iQ1",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85%"
        },
        {
            "id": "8",
            "INQA": "iQ2",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90%"
        },
        {
            "id": "9",
            "INQA": "iQ1",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85%"
        },
        {
            "id": "10",
            "INQA": "iQ2",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90%"
        }
    ],
    CF16: [
        {
            "id": "1",
            "INQA": "iQ1",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85%"
        },
        {
            "id": "2",
            "INQA": "iQ2",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90%"
        },
        {
            "id": "3",
            "INQA": "iQ1",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85%"
        },
        {
            "id": "4",
            "INQA": "iQ2",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90%"
        },
        {
            "id": "5",
            "INQA": "iQ1",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85%"
        },
        {
            "id": "6",
            "INQA": "iQ2",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90%"
        },
        {
            "id": "7",
            "INQA": "iQ1",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85%"
        },
        {
            "id": "8",
            "INQA": "iQ2",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90%"
        },
        {
            "id": "9",
            "INQA": "iQ1",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85%"
        },
        {
            "id": "10",
            "INQA": "iQ2",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90%"
        }
    ]
}

