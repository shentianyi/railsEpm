(function(){
    $(document).ready(function(){
        $("#current-date").text(format_time.current_time());
        $("#current-clock").text(format_time.current_time_clock());
        window.setInterval(function(){
            $("#current-clock").text(format_time.current_time_clock());
        },1000);
        current_status.init("data_container",vdata);
//        grid.init();
        loader = new SVGLoader( document.getElementById( 'preloader' ), { speedIn : 100 } );
        $('body').on("click","#reports-center-list a",function(){
            var left=document.getElementById("report-menu").getBoundingClientRect().right,
                top=document.getElementById("report-menu").getBoundingClientRect().top>=0?document.getElementById("report-menu").getBoundingClientRect().top:0;
            $(".pageload-overlay svg").css('left',left);
            $(".pageload-overlay svg").css('top',top);
            loader.show();
            setTimeout( function() {
                loader.hide();

            }, 2000 );
        });
    })
})()