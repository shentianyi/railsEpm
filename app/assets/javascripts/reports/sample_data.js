var SampleData = {};

SampleData.init_daily_dpv = function(){
    var new_data = {
        rows:[
            { id:1,
                data:[
                    "Volumne",
                    RAND.range_int(0,50),
                    RAND.range_int(0,50),
                    RAND.range_int(0,50),
                    RAND.range_int(0,50),
                    RAND.range_int(0,50),
                    RAND.range_int(0,50),
                    RAND.range_int(0,50),
                    RAND.range_int(0,50),
                    RAND.range_int(0,50),
                    RAND.range_int(0,50),
                    RAND.range_int(0,50),
                    RAND.range_int(0,50),
                    RAND.range_int(0,50),
                    RAND.range_int(0,50),
                    RAND.range_int(0,50)
                ] },
            {
                id:2,
                data:[
                    "Defect",
                    RAND.range_int(0,250),
                    RAND.range_int(0,250),
                    RAND.range_int(0,250),
                    RAND.range_int(0,250),
                    RAND.range_int(0,250),
                    RAND.range_int(0,250),
                    RAND.range_int(0,250),
                    RAND.range_int(0,250),
                    RAND.range_int(0,250),
                    RAND.range_int(0,250),
                    RAND.range_int(0,250),
                    RAND.range_int(0,250),
                    RAND.range_int(0,250),
                    RAND.range_int(0,250),
                    RAND.range_int(0,250)
                ]
            },
            {
                id:3,
                data:[
                    "DPV",
                    RAND.range_float(0,30),
                    RAND.range_float(0,30),
                    RAND.range_float(0,30),
                    RAND.range_float(0,30),
                    RAND.range_float(0,30),
                    RAND.range_float(0,30),
                    RAND.range_float(0,30),
                    RAND.range_float(0,30),
                    RAND.range_float(0,30),
                    RAND.range_float(0,30),
                    RAND.range_float(0,30),
                    RAND.range_float(0,30),
                    RAND.range_float(0,30),
                    RAND.range_float(0,30),
                    RAND.range_float(0,30)
                ]
            },
            {
                id:4,
                data:[
                    "SDPV",
                    RAND.range_float(0,100),
                    RAND.range_float(0,100),
                    RAND.range_float(0,100),
                    RAND.range_float(0,100),
                    RAND.range_float(0,100),
                    RAND.range_float(0,100),
                    RAND.range_float(0,100),
                    RAND.range_float(0,100),
                    RAND.range_float(0,100),
                    RAND.range_float(0,100),
                    RAND.range_float(0,100),
                    RAND.range_float(0,100),
                    RAND.range_float(0,100),
                    RAND.range_float(0,100),
                    RAND.range_float(0,100),
                ]
            }
        ]
    };
    return  new_data;
}

SampleData.test = function(){
    var a = {
        "a":RAND.range_int(0,50)
    };
    a["b"] = RAND.range_int(0,50);
    return a;
}
