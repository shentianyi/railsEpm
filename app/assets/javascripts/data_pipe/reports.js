define(["app/Reports/rand"],function(RAND){
    var data_current_color={
        "red":"#eb4848",
        "green":"#19cf22"
    };
    return{
        current_status:function(){
            return {
                CF11: [
                    {
                        "id": "1",
                        "INQA": "iQ1 Body",
                        "Defects": "20",
                        "Pass": "25",
                        "FTQ":"85",
                        "STYLE_COLOR":data_current_color["red"]
                    }],
                CF14: [
                    {
                        "id": "1",
                        "INQA": "iQ1 Body",
                        "Defects": "20",
                        "Pass": "25",
                        "FTQ":"55",
                        "STYLE_COLOR":data_current_color["red"]
                    }
                ]
            }
        },
        current_status_target:function(){
            return{
                rows:[
                    { id:1, data: ["A Time to Kill", "John Grisham", "100"]},
                    { id:2, data: ["Blood and Smoke", "Stephen King", "1000"]},
                    { id:3, data: ["The Rainmaker", "John Grisham", "-200"]}
                ]
            }
        },
        current_status_all_defects:function(){

        },
        current_status_key_defects:function(){

        },
        daily_dpv:function(){
            var random_date_array1=[
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
                ],
                random_date_array2=[
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
                ],
                random_date_array3=[
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
                ],
                random_date_array4=[
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
                ]

            return {
                grid:{
                    rows: [
                        { id: 1,
                            data: ["Volumne"].concat(random_date_array1)
                        },
                        {
                            id: 2,
                            data: ["Defect"].concat(random_date_array2)
                        },
                        {
                            id: 3,
                            data: ["DPV"].concat(random_date_array3)
                        },
                        {
                            id: 4,
                            data: ["SDPV"].concat(random_date_array4)
                        }
                    ]
                },
                dpv_chart:{

                },
                sdpv_chart:{

                }

            }
        }
    }
})