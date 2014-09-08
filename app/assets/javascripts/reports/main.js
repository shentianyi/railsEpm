(function(){
    $(document).ready(function(){
        $("#current-date").text(format_time.current_time());
        $("#current-clock").text(format_time.current_time_clock());
        window.setInterval(function(){
            $("#current-clock").text(format_time.current_time_clock());
        },1000);

        loader = new SVGLoader( document.getElementById( 'preloader' ), { speedIn : 100 } );
        $('body').on("click","#my-reports a",function(event) {
            if(event.preventDefault){
                event.preventDefault()
            }
            else{
                window.event.returnValue=false;
            }
            $("#my-reports li a").removeClass("active");
            $(this).addClass("active");
            //=============
            //load partial view
			var part = $(this).attr("menu");
			$.ajax({
				url:"/reports/"+part+"/ajax",
				type:"GET",
				success:function(data){
					data
				}
			});
            //=============
            var left = document.getElementById("report-menu").getBoundingClientRect().right,
                top = document.getElementById("report-menu").getBoundingClientRect().top >= 0 ? document.getElementById("report-menu").getBoundingClientRect().top : 0;
            $(".pageload-overlay svg").css('left', left);
            $(".pageload-overlay svg").css('top', top);
            loader.show();
            setTimeout(function () {
                loader.hide()
            }, 2000);
        });

        var current_type = 'current_status'
        var option = {};
        switch(current_type) {
            case 'current_status':
                option.type = 'current_status';
                option.container = 'data_container';
                break;
            case 'daily-dpv':
                option.type = 'daily-dpv';
                break;
            default :
                option.type = 'current_status';
                option.container = 'data_container';
                break;
        }

        Report.init(option);
    })
})();
