var SampleData = {};

SampleData.init_current_status = function(){
    var d_current_status = {
        CF11: [
            {
                "id": "1",
                "INQA": "iQ1 Body",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "2",
                "INQA": "iQ2 Paint",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "3",
                "INQA": "Trim Total",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "4",
                "INQA": "GA Total",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "5",
                "INQA": "EOL",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "6",
                "INQA": "iQ3 Mid-trim",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "7",
                "INQA": "iQ IP Cockpit Check",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "8",
                "INQA": "iQ DrDoor Check",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "9",
                "INQA": "iQ4 Interior",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "10",
                "INQA": "iQ5 Trim Buy-off",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },{
                "id": "11",
                "INQA": "iQ6 Mid-Chassis",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "12",
                "INQA": "iQ7 Chassis Buy-off",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "13",
                "INQA": "iQ8 U/Hood",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "14",
                "INQA": "iQ9 Electrical",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "15",
                "INQA": "Exterior",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "16",
                "INQA": "iQ12 Roller Test",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "17",
                "INQA": "iQ13 Shower Test",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "18",
                "INQA": "iQ14 OK Line",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "19",
                "INQA": "iQ15 Road Test",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "20",
                "INQA": "iQ11 GA Buy-off",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id":"21",
                "INQA":"Plant",
                "Defects":"20",
                "Pass":"25",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            }
        ],
        CF14: [
            {
                "id": "1",
                "INQA": "iQ1 Body",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "2",
                "INQA": "iQ2 Paint",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "3",
                "INQA": "Trim Total",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "4",
                "INQA": "GA Total",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "5",
                "INQA": "EOL",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "6",
                "INQA": "iQ3 Mid-trim",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "7",
                "INQA": "iQ IP Cockpit Check",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "8",
                "INQA": "iQ DrDoor Check",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "9",
                "INQA": "iQ4 Interior",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "10",
                "INQA": "iQ5 Trim Buy-off",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },{
                "id": "11",
                "INQA": "iQ6 Mid-Chassis",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "12",
                "INQA": "iQ7 Chassis Buy-off",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "13",
                "INQA": "iQ8 U/Hood",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "14",
                "INQA": "iQ9 Electrical",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "15",
                "INQA": "Exterior",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "16",
                "INQA": "iQ12 Roller Test",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "17",
                "INQA": "iQ13 Shower Test",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "18",
                "INQA": "iQ14 OK Line",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "19",
                "INQA": "iQ15 Road Test",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "20",
                "INQA": "iQ11 GA Buy-off",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id":"21",
                "INQA":"Plant",
                "Defects":"20",
                "Pass":"25",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            }
        ],
        CF16: [
            {
                "id": "1",
                "INQA": "iQ1 Body",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "2",
                "INQA": "iQ2 Paint",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "3",
                "INQA": "Trim Total",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "4",
                "INQA": "GA Total",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "5",
                "INQA": "EOL",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "6",
                "INQA": "iQ3 Mid-trim",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "7",
                "INQA": "iQ IP Cockpit Check",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "8",
                "INQA": "iQ DrDoor Check",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "9",
                "INQA": "iQ4 Interior",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "10",
                "INQA": "iQ5 Trim Buy-off",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },{
                "id": "11",
                "INQA": "iQ6 Mid-Chassis",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "12",
                "INQA": "iQ7 Chassis Buy-off",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "13",
                "INQA": "iQ8 U/Hood",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "14",
                "INQA": "iQ9 Electrical",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "15",
                "INQA": "Exterior",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "16",
                "INQA": "iQ12 Roller Test",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "17",
                "INQA": "iQ13 Shower Test",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "18",
                "INQA": "iQ14 OK Line",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "19",
                "INQA": "iQ15 Road Test",
                "Defects": "20",
                "Pass": "25",
                "FTQ":"85",
                "STYLE_COLOR":data_current_color["red"]
            },
            {
                "id": "20",
                "INQA": "iQ11 GA Buy-off",
                "Defects": "20",
                "Pass": "23",
                "FTQ":"90",
                "STYLE_COLOR":data_current_color["green"]
            },
            {
                "id": "21",
                "INQA": "Plant",
                "Defects": "20",
                "Pass": "25",
                "FTQ": "90",
                "STYLE_COLOR":data_current_color["green"]
            }
        ]
    };

    var models = ["CF11","CF14","CF16"];
    for(var j = 0;j<models.length;j++){
        var model = models[j];
        for(var i = 0;i<d_current_status[model].length;i++){
            //var old = parseInt(d_current_status[model][i]["Defects"]);
            //d_current_status[model][i]["Defects"] = RAND.range_int(10,25).toString();//(old+RAND.rate(1,20,0)).toString();

            //old = parseInt(d_current_status[model][i]["Pass"])
            var pass = RAND.range_int(20,35)
            d_current_status[model][i]["Pass"] = pass.toString();//(old + RAND.rate(1,80,0)).toString();

            var ftq = RAND.range_int(70,100);
            var ftq_target = RAND.range_int(70,98);
            d_current_status[model][i]["FTQ"] = ftq.toString();//(old+rate).toString();
            d_current_status[model][i]["FTQ_Target"] = ftq_target.toString();
            d_current_status[model][i]["Defects"] = (pass * ftq/100).toFixed(0);
            if(ftq > ftq_target){
                d_current_status[model][i]["STYLE_COLOR"] = Report.color.ftq["higher"];
            }else if(ftq==ftq_target){
                d_current_status[model][i]["STYLE_COLOR"] = Report.color.ftq["equal"];
            }else{
                d_current_status[model][i]["STYLE_COLOR"] = Report.color.ftq["lower"];
            }
        }
    }
    return d_current_status;
}

SampleData.init_daily_dpv = function () {
    var new_data = {
        rows: [
            { id: 1,
                data: [
                    "Volumne",
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50),
                    RAND.range_int(0, 50)
                ] },
            {
                id: 2,
                data: [
                    "Defect",
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250),
                    RAND.range_int(0, 250)
                ]
            },
            {
                id: 3,
                data: [
                    "DPV",
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30),
                    RAND.range_float(0, 30)
                ]
            },
            {
                id: 4,
                data: [
                    "SDPV",
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                    RAND.range_float(0, 100),
                ]
            }
        ]
    };
    return  new_data;
}

SampleData.init_station_data = function () {
    return {
        rows: [
            {
                id: 1001,
                data: ["Body Buy-off", "BBO", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1002,
                data: ["Paint Buy-off", "PBO", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1003,
                data: ["Door Buy-off", "DBO", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1004,
                data: ["IP Buy-off", "IBO", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1005,
                data: ["Mid-Trim", "MTR", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1006,
                data: ["Interiot", "INT", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1007,
                data: ["Mid-Chassis", "MCH", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1008,
                data: ["Chassis Buy-off", "CBO", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1009,
                data: ["Under Hood", "U/H", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1010,
                data: ["Exterior", "EXT", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1011,
                data: ["Electerial", "ELE", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1012,
                data: ["GA Buy-off", "GBO", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1013,
                data: ["Roller Test", "ROL", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1014,
                data: ["Shower Test", "SHT", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1015,
                data: ["OK Line", "OKL", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1016,
                data: ["Road Test", "ROD", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            },
            {
                id: 1017,
                data: ["End of Line", "EOL", "-", "-", "-", RAND.range_float(75, 100), RAND.range_float(0, 50), RAND.range_float(30, 40), RAND.range_int(20, 300), RAND.range_int(20, 100), RAND.range_float(75, 100), RAND.range_int(20, 30), RAND.range_float(40, 100)]
            }
        ]
    };
}


SampleData.init_daily_ftq = function () {
    var data = {
        rows: [
            {
                id: 1001,
                data: ["Vehicle Total"]
            },
            {
                id: 1002,
                data: ["NOK Vehicle"]
            },
            {
                id: 1003,
                data: ["OK Vehicle"]
            },
            {
                id: 1004,
                data: ["FTQ"]
            }
        ]
    };

    for (var i = 1; i <= 17; i++) {
        var nok = RAND.range_int(0, 15);
        var ok = RAND.range_int(0, 10);
        var total = nok + ok;
        var ftq = total == 0 ? "0%" : ((nok / total) * 100).toFixed(0) + "%";
        data["rows"][0]["data"][i] = total;
        data["rows"][1]["data"][i] = nok;
        data["rows"][2]["data"][i] = ok;
        data["rows"][3]["data"][i] = ftq;
    }

    return data;
}