(function(){
    $(document).ready(function(){
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
            var left = document.getElementById("report-menu").getBoundingClientRect().right,
                top = document.getElementById("report-menu").getBoundingClientRect().top >= 0 ? document.getElementById("report-menu").getBoundingClientRect().top : 0;
            $(".pageload-overlay svg").css('left', left);
            $(".pageload-overlay svg").css('top', top);
            loader.show();
			
			$.ajax({
				url:"/reports/"+part+"/ajax",
				type:"GET",
				success:function(data){
					$("#report-content").html(data);
					//
					Report.init(part);
					loader.hide()
				}
			});
            //=============
		});
        
		var current = $("#my-reports li a.active").attr("menu");
        Report.init(current);
        init_snap();
    })
})();
