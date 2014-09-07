(function(){
    $(document).ready(function(){
        $("#current-date").text(format_time.current_time());
        $("#current-clock").text(format_time.current_time_clock());
        window.setInterval(function(){
            $("#current-clock").text(format_time.current_time_clock());
        },1000);
        //current_status.init("data_container",vdata);

        loader = new SVGLoader( document.getElementById( 'preloader' ), { speedIn : 100 } );
        $('body').on("click","#my-reports a",function() {
            $("#my-reports li a").removeClass("active");
            $(this).find("a").addClass("active");
            var now_href = window.location.href.split("/");
            var length = now_href.length;
            var left = document.getElementById("report-menu").getBoundingClientRect().right,
                top = document.getElementById("report-menu").getBoundingClientRect().top >= 0 ? document.getElementById("report-menu").getBoundingClientRect().top : 0;
            $(".pageload-overlay svg").css('left', left);
            $(".pageload-overlay svg").css('top', top);
            loader.show();
            setTimeout(function () {
                loader.hide();

            }, 2000);
        });

        var current_type = 'current-status'
        var option = {};
        switch(current_type) {
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
    })
})();