define(["jquery","./share","base","./snap"],function($,Share,Base,Snap){
    function click(type,callback){
        $.ajax({
            url:"/reports/"+type+"/ajax",
            type:"GET",
            success:function(data){
                if(callback){
                    callback(data);
                }
            }
        })
    }

    var url = window.location.href.split('/');
    var report_part = url[url.length-1].split('#');
    if(report_part.length == 2){
        var part = Share.type[report_part[1]];
        click(part,function(data){
            $("#my-reports a[menu="+report_part[1]+"]").addClass("active");
            Share.current_menu = part;
            $("#report-content").html(data);
        });
    }
    else{
        var part = Share.type['current_status'];
        click(part,function(data){
            $("#my-reports a[menu='current_status']").addClass("active");
            Share.current_menu = part;
            $("#report-content").html(data);
            window.location.href +="#current_status";
        });
    }
    $('body')
        .on("click","#my-reports a",function(event) {
            var part = Share.type[$(this).attr("menu")];
            if(part == Share.current_menu){
                return;
            }
            if(event.preventDefault){
                event.preventDefault()
            }
            else{
                window.event.returnValue=false;
            }
            $("#my-reports li a").removeClass("active");
            $(this).addClass("active");
            var href = $(this).attr("href");
            var left = document.getElementById("report-menu").getBoundingClientRect().right,
                top = document.getElementById("report-menu").getBoundingClientRect().top >= 0 ? document.getElementById("report-menu").getBoundingClientRect().top : 0;
            $(".pageload-overlay svg").css('left', left).css("top",top);
            Share.loader.show();
            window.location.href =  $(this).attr("href");
            click(part,function(data){
                Share.current_menu = part;
                setTimeout(function(){
                    $("#report-content").html(data);
                    window.location.href = href;
                    setTimeout(function(){
                        var target_js=href.substring(1),
                            file_href="app/Reports/"+target_js;
                        require([file_href],function(app){
                            app.init();
                        });
                        Share.loader.hide();
                    },200)

                },924);
            });
        })
        .on("click","#reports_subscribe",function(){
            var left = document.getElementById("report-menu").getBoundingClientRect().right,
                top = document.getElementById("report-menu").getBoundingClientRect().top >= 0 ? document.getElementById("report-menu").getBoundingClientRect().top : 0;
            $(".pageload-overlay svg").css('left', left).css("top",top);
            Share.loader.show();
            $("#my-reports li a").removeClass("active");
            $.ajax({
                url:"/reports/subscription",
                type:"GET",
                success:function(data){
                    setTimeout(function(){
                        $("#report-content").html(data);
                        require(["app/Reports/subscription"],function(app){
                            app.init();
                        })
                        Share.loader.hide()
                    },600);
                }
            })
        })
//        .on("click","#add-to-storyset",function(){
//            if($('#story-title').val()){
//                $("#back-pop").addClass("show")
//            }else{
//                Base.MessageBox('Please add discussion title','top','warning');
//            }
//        })
//        .on("click","#remove-back-pop",function(){
//            $("#back-pop").removeClass("show")
//        })
//        .on("click","#add-to-storyset",function(){
//            var story = prepare_for_create_story();
//            if(story.story_set_id == null){
//                Base.MessageBox('No Story Set,Please use select one or Use create and add button','top','warning');
//                return;
//            }
//            MANAGE.story.create(story,function(data){
//                if(data.result){
//                    window.location.href = "/story_sets/"+data.content.story_set_id+"/story";
//                }else
//                {
//                    MessageBox(data.content,'top','warning');
//                }
//
//            });
//        })
//        .on("click","#create-add-to-storyset",function(){
//            var story = prepare_for_create_story();
//            var story_set = {};
//            story_set.title = $("#storyset-title").val();
//            story_set.description = $("#storyset-desc").val();
//            story_set.users = $("#storyset-users option:selected").map(function(){return $(this).attr("user")}).get();
//            MANAGE.story_set.create(story_set,function(data){
//                if(data.result){
//                    story.story_set_id = data.content.id;
//                    MANAGE.story.create(story,function(data){
//                        if(data.result){
//                            window.location.href = "/story_sets/"+data.content.story_set_id+"/story";
//                        }else
//                        {
//                            MessageBox(data.content,'top','warning');
//                        }
//                    })
//                }
//                else{
//
//                }
//            })
//        })
//        .on("click","#direct-publish-fro-project",function(){
//            var story = prepare_for_create_story();
//            story.story_set_id = $(this).attr("value");
//            MANAGE.story.create(story,function(data){
//                if(data.result){
//                    window.location.href = '/story_sets/'+data.content.id+'/story?story';
//                }else{
//                    MessageBox(data.content,'top','warning');
//                }
//            });
//        });
//snap
    $('body')
        .on("click","#snap-shot-button",function(event){
            var e=Base.adapt_event(event).event;
            var left= e.clientX,
                top= e.clientY;
            $("#snap_block").css("left",left).css("top",top-170);
            $("#snap-shot-desc").focus();
        })
        .on("keyup","#snap-shot-desc",function(event){
            var e=Base.adapt_event(event).event;
            if(e.keyCode===13){
                $("#snap-shot-btn").click();
            }
            else if(e.keyCode===27){
                $("#snap-shot-remove").click();
            }
        })
        .on("click","#snap-shot-remove",function(){
            $("#snap-shot-desc").val("").blur();
            $("#snap_block").css("left","-999em");
        })
        .on("click","#snap-shot-btn",function(){
            var value=$.trim($('#snap-shot-desc').val());
            if(value.length>0){
                $.post(
                    '/report_snaps',
                    {
                        report_snap: {
                            desc: value ,
                            type: Report.option.type,
                            data: JSON.stringify( Share.serializeToDataJson() )
                        }
                    },
                    function (data) {
                        if (data.result) {
                            $("#snap-shot-remove").click();
                            var type=data.content.type+"";
                            var template='<div class="snap-li" snap="'+data.content.id+'" type="'+type+'">'+
                                '<p>'+data.content.desc+'</p>'+
                                '<p>'+'right now'+'</p>'+
                                '</div>'
                            $("#snap-groups").prepend(template);
                            Snap.init();
                        }
                    }, 'json');
            }
            else{
                Base.MessageBox("Please fill the description", "top", "warning");
            }
        });

})