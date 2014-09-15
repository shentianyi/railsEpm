var SampleData = {};

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