(function(){
    $(document).ready(function(){
        $("#current-date").text(format_time.current_time());
        $("#current-clock").text(format_time.current_time_clock());
        window.setInterval(function(){
            $("#current-clock").text(format_time.current_time_clock());
        },1000);
        current_status.init("data_container",vdata);
        grid.init();
        //DV.init("data_container");
        //DV.parse(vdata);

        $("#my-reports li").on('click',function(){

        });
    })
})()