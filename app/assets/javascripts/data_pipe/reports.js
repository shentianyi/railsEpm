define(["app/Reports/rand"],function(RAND){
    var data_current_color={
        "red":"#eb4848",
        "green":"#19cf22"
    };
    return{
        current_status:function(){
            return [10,20,30,40,50,0,100,27,0,18,46,2,1,5,1,26,57,29,19,20,100,40,50,0,100,27,0,18,46,2,1,5,1,26,57,29,19,20,100]
//                CF11: [
//                    {
//                        "id": "1",
//                        "INQA": "iQ1 Body",
//                        "Defects": "20",
//                        "Pass": "25",
//                        "FTQ":"85",
//                        "STYLE_COLOR":data_current_color["red"]
//                    }],
//                CF14: [
//                    {
//                        "id": "1",
//                        "INQA": "iQ1 Body",
//                        "Defects": "20",
//                        "Pass": "25",
//                        "FTQ":"55",
//                        "STYLE_COLOR":data_current_color["red"]
//                    }
//                ]

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
                    container: "chart_dpv_one",
                    categories: ["iQ1", "iQ2", "iQ IP", "iQ DR", "iQ3", "iQ4", "iQ5", "iQ6", "iQ7", "iQ8", "iQ9", "iQ10", "iQ11", "iQ12", "iQ13", "iQ14", "iQ15"],
                    data: [
                        {
                            name: 'DPV',
                            data:  [RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50)]
                        }
                    ],
                    title: "DPV",
                    colors:"blue",
                    dataLabels:true
                },
                sdpv_chart:{
                    container: "chart_dpv_two",
                    categories: ["iQ1", "iQ2", "iQ IP", "iQ DR", "iQ3", "iQ4", "iQ5", "iQ6", "iQ7", "iQ8", "iQ9", "iQ10", "iQ11", "iQ12", "iQ13", "iQ14", "iQ15"],
                    data: [
                        {
                            name: 'SDPV',
                            data: [RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50)]
                        }
                    ],
                    colors: "purple",
                    title: "SDPV",
                    dataLabels:true
                }
            }
        },
        daily_ftq:function(){
             return{
                 chart:{
                     container: "chart_container",
                     categories: ["iQ1", "iQ2", "iQ IP", "iQ DR", "iQ3", "iQ4", "iQ5", "iQ6", "iQ7", "iQ8", "iQ9", "iQ10", "iQ11", "iQ12", "iQ13", "iQ14", "iQ15"],
                     title: "Daily_FTQ",
                     stacking:true,
                     dataLabels:true,
                     twoYAxis:{
                         enabled:false
                     },
                     line_dataLabels:{
                         formatter:function(){
                             if(this.y>0){
                                 return this.y+"%" ;
                             }
                             else{
                                 return "" ;
                             }
                         },
                         color:"rgba(60,111,204,0.8)"
                     },
                     column_dataLabels:{
                         formatter:function(){
                             if(this.series.index===0){
                                 if(!this.total){
                                     if(this.y>0){
                                         return this.y ;
                                     }
                                     else{
                                         return "" ;
                                     }
                                 }
                                 else{
                                     if(this.total>0){
                                         return this.total ;
                                     }
                                     else{
                                         return "" ;
                                     }
                                 }
                             }
                         }
                     },
                     special_option:{
                         plotOptions:{
                             line:{
                                 marker:{
                                     radius:3,
                                     lineWidth:1
                                 }
                            }
                         }
                     }
                 },
                 data_nok:{
                     name: 'not_ok',
                     data:  [RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50)]
                 },
                 data_ok:{
                     name: 'ok',
                     data:  [RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50)]
                 },
                 data_ftq:{
                     name: 'ftq',
                     data:  [RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50),RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50), RAND.range_int(0, 50)]
                 }
             }
        }
    }
})