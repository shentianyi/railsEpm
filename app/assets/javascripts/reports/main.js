(function(){
    $(document).ready(function(){
        $("#current-date").text(format_time.current_time());
        $("#current-clock").text(format_time.current_time_clock());
        window.setInterval(function(){
            $("#current-clock").text(format_time.current_time_clock());
        },1000);
        current_status.init("data_container",vdata);
        $("#vechile-select").change(function () {
            DV.clear();
            var a = $("#vechile-select option:selected").text();
            DV.parse(vdata[a]);
        });
    })
})()