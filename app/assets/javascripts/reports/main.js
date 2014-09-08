(function(){
    $(document).ready(function(){
        loader = new SVGLoader( document.getElementById( 'preloader' ), { speedIn : 100 } );

        $('body')
            .on("click","#my-reports a",function(event) {
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
			    })
		    })
            .on("click","#add-to-storyset",function(){
                if($('#story-title').val()){
                    $("#back-pop").addClass("show")
                }else{
                    MessageBox('Please add discussion title','top','warning');
                }
            })
            .on("click","#remove-back-pop",function(){
                $("#back-pop").removeClass("show")
            })
            .on("click","#add-to-storyset",function(){
                var story = prepare_for_create_story();
                if(story.story_set_id == null){
                    MessageBox('No Story Set,Please use select one or Use create and add button','top','warning');
                    return;
                }
                MANAGE.story.create(story,function(data){
                    if(data.result){
                        window.location.href = "/story_sets/"+data.content.story_set_id+"/story";
                    }else
                    {
                        MessageBox(data.content,'top','warning');
                    }

                });
            })
            .on("click","#create-add-to-storyset",function(){
                var story = prepare_for_create_story();
                var story_set = {};
                story_set.title = $("#storyset-title").val();
                story_set.description = $("#storyset-desc").val();
                story_set.users = $("#storyset-users option:selected").map(function(){return $(this).attr("user")}).get();
                MANAGE.story_set.create(story_set,function(data){
                    if(data.result){
                        story.story_set_id = data.content.id;
                        MANAGE.story.create(story,function(data){
                            if(data.result){
                                window.location.href = "/story_sets/"+data.content.story_set_id+"/story";
                            }else
                            {
                                MessageBox(data.content,'top','warning');
                            }
                        })
                    }
                    else{

                    }
                })
            })
            .on("click","#direct-publish-fro-project",function(){
                var story = prepare_for_create_story();
                story.story_set_id = $(this).attr("value");
                MANAGE.story.create(story,function(data){
                    if(data.result){
                        window.location.href = '/story_sets/'+data.content.id+'/story?story';
                    }else{
                        MessageBox(data.content,'top','warning');
                    }
                });
            });
        
		var current = $("#my-reports li a.active").attr("menu");
        Report.init(current);
        init_snap();
    })
})();