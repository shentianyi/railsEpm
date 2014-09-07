(function(){
    $(document).ready(function(){
        $("#current-date").text(format_time.current_time());
        $("#current-clock").text(format_time.current_time_clock());
        window.setInterval(function(){
            $("#current-clock").text(format_time.current_time_clock());
        },1000);
        //current_status.init("data_container",vdata);
        //grid.init();
        var current_type = 'current-status'
        var option = {};
        switch(current_type){
            case 'current-status':
                option.type = 'current-status';
                option.container = 'data_container';
                break;
            case 'daily-dpv':
                option.type = 'daily-dpv';
                break;
            default :
                option.type = 'current-status';
                option.container = 'data-container';
                break;

        }
        Report.init(option);

        $("#my-reports li").on('click',function(){
            $("#my-reports li a").removeClass("active");
            $(this).find("a").addClass("active");
            var now_href=window.location.href.split("/");
            var length=now_href.length;
            
        });
    })
})()