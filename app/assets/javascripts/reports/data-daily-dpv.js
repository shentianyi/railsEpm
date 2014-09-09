var d_daily_dpv = {
    rows:[
        { id:1001,
            data:[
                "Volumne",
                "Defect",
                "DPV",
                "SPDV"
            ] }
    ]
}

for(var i = 1;i<100;i++){
        d_daily_dpv["rows"][i]={
            id:i+1,
            data:[
                RAND.range_int(0,40),
                RAND.range_int(0,200),
                RAND.range_float(0,50),
                RAND.range_float(0,200)
            ]
        }
}
