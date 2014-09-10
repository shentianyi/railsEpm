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
                old = parseInt(d_current_status[model][i]["FTQ"])
                if(old+rate<100){
                    d_current_status[model][i]["FTQ"] = (old+rate).toString();
                }
            }
        }
    },5000);
}())

var d_current_status = {
    CF11: [
        {
            "id": "1",
            "INQA": "iQ1 Body",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "2",
            "INQA": "iQ2 Paint",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "3",
            "INQA": "Trim Total",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "4",
            "INQA": "GA Total",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "5",
            "INQA": "EOL",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "6",
            "INQA": "iQ3 Mid-trim",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "7",
            "INQA": "iQ IP Cockpit Check",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "8",
            "INQA": "iQ DrDoor Check",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "9",
            "INQA": "iQ4 Interior",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "10",
            "INQA": "iQ5 Trim Buy-off",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },{
            "id": "11",
            "INQA": "iQ6 Mid-Chassis",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "12",
            "INQA": "iQ7 Chassis Buy-off",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "13",
            "INQA": "iQ8 U/Hood",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "14",
            "INQA": "iQ9 Electrical",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "15",
            "INQA": "Exterior",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "16",
            "INQA": "iQ12 Roller Test",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "17",
            "INQA": "iQ13 Shower Test",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "18",
            "INQA": "iQ14 OK Line",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "19",
            "INQA": "iQ15 Road Test",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "20",
            "INQA": "iQ11 GA Buy-off",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id":"21",
            "INQA":"Plant",
            "Defects":"20",
            "Pass":"25",
            "FTQ":"90"
        }
    ],
    CF14: [
        {
            "id": "1",
            "INQA": "iQ1 Body",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "2",
            "INQA": "iQ2 Paint",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "3",
            "INQA": "Trim Total",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "4",
            "INQA": "GA Total",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "5",
            "INQA": "EOL",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "6",
            "INQA": "iQ3 Mid-trim",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "7",
            "INQA": "iQ IP Cockpit Check",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "8",
            "INQA": "iQ DrDoor Check",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "9",
            "INQA": "iQ4 Interior",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "10",
            "INQA": "iQ5 Trim Buy-off",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },{
            "id": "11",
            "INQA": "iQ6 Mid-Chassis",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "12",
            "INQA": "iQ7 Chassis Buy-off",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "13",
            "INQA": "iQ8 U/Hood",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "14",
            "INQA": "iQ9 Electrical",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "15",
            "INQA": "Exterior",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "16",
            "INQA": "iQ12 Roller Test",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "17",
            "INQA": "iQ13 Shower Test",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "18",
            "INQA": "iQ14 OK Line",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "19",
            "INQA": "iQ15 Road Test",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "20",
            "INQA": "iQ11 GA Buy-off",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id":"21",
            "INQA":"Plant",
            "Defects":"20",
            "Pass":"25",
            "FTQ":"90"
        }
    ],
    CF16: [
        {
            "id": "1",
            "INQA": "iQ1 Body",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "2",
            "INQA": "iQ2 Paint",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "3",
            "INQA": "Trim Total",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "4",
            "INQA": "GA Total",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "5",
            "INQA": "EOL",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "6",
            "INQA": "iQ3 Mid-trim",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "7",
            "INQA": "iQ IP Cockpit Check",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "8",
            "INQA": "iQ DrDoor Check",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "9",
            "INQA": "iQ4 Interior",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "10",
            "INQA": "iQ5 Trim Buy-off",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },{
            "id": "11",
            "INQA": "iQ6 Mid-Chassis",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "12",
            "INQA": "iQ7 Chassis Buy-off",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "13",
            "INQA": "iQ8 U/Hood",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "14",
            "INQA": "iQ9 Electrical",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "15",
            "INQA": "Exterior",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "16",
            "INQA": "iQ12 Roller Test",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "17",
            "INQA": "iQ13 Shower Test",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "18",
            "INQA": "iQ14 OK Line",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "19",
            "INQA": "iQ15 Road Test",
            "Defects": "20",
            "Pass": "25",
            "FTQ":"85"
        },
        {
            "id": "20",
            "INQA": "iQ11 GA Buy-off",
            "Defects": "20",
            "Pass": "23",
            "FTQ":"90"
        },
        {
            "id": "21",
            "INQA": "Plant",
            "Defects": "20",
            "Pass": "25",
            "FTQ": "90"
        }
    ]
}

