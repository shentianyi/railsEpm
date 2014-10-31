(function(){
    $(document).ready(function(){
//        loader = new SVGLoader( document.getElementById( 'preloader' ), { speedIn : 100 } );
        //Refresh Page
//        var url = window.location.href.split('/');
//        var report_part = url[url.length-1].split('#');
//        if(report_part.length == 2){
//            var part = Report.type[report_part[1]];
//            ReportMenu.click(part,function(data){
//                //$("#my-reports li a").removeClass("active");
//                $("#my-reports a[menu="+report_part[1]+"]").addClass("active");
//                report_main.current_menu = part;
//                $("#report-content").html(data);
//                if(typeof href != 'undefined'){
//                    window.location.href = href;
//                }
//            });
//        }else{
//            var part = Report.type['current_status'];
//
//            ReportMenu.click(part,function(data){
//                //$("#my-reports li a").removeClass("active");
//                $("#my-reports a[menu='current_status']").addClass("active");
//                report_main.current_menu = part;
//                $("#report-content").html(data);
//                window.location.href +="#current_status";
//            });
//        }
        //

//        $('body')
//            .on("click","#my-reports a",function(event) {
//
//                var part = Report.type[$(this).attr("menu")];
//
//                if(part == report_main.current_menu){
//                    return;
//                }
//
//                if(event.preventDefault){
//                    event.preventDefault()
//                }
//                else{
//                    window.event.returnValue=false;
//                }
//                $("#my-reports li a").removeClass("active");
//                $(this).addClass("active");
//                //=============
//                //load partial view
//
//
//                var href = this.href;
//
//                var left = document.getElementById("report-menu").getBoundingClientRect().right,
//                    top = document.getElementById("report-menu").getBoundingClientRect().top >= 0 ? document.getElementById("report-menu").getBoundingClientRect().top : 0;
//                $(".pageload-overlay svg").css('left', left).css("top",top);
//                loader.show();
//                window.location.href = this.href;
//                ReportMenu.click(part,function(data){
//                    report_main.current_menu = part;
//                    //
//                    setTimeout(function(){
//                        $("#report-content").html(data);
//                        window.location.href = href;
//                        loader.hide();
//                    },924);
//                });
//
//		    })
//            // report subscription
//            .on("click","#reports_subscribe",function(){
//                var left = document.getElementById("report-menu").getBoundingClientRect().right,
//                    top = document.getElementById("report-menu").getBoundingClientRect().top >= 0 ? document.getElementById("report-menu").getBoundingClientRect().top : 0;
//                $(".pageload-overlay svg").css('left', left).css("top",top);
//                loader.show();
//                $("#my-reports li a").removeClass("active");
//                $.ajax({
//                    url:"/reports/subscription",
//                    type:"GET",
//                    success:function(data){
//                        setTimeout(function(){
//                            $("#report-content").html(data);
//                            report_subscription.init();
//                            loader.hide()
//                        },600);
//                    }
//                })
//            })
//            .on("click","#add-to-storyset",function(){
//                if($('#story-title').val()){
//                    $("#back-pop").addClass("show")
//                }else{
//                    MessageBox('Please add discussion title','top','warning');
//                }
//            })
//            .on("click","#remove-back-pop",function(){
//                $("#back-pop").removeClass("show")
//            })
//            .on("click","#add-to-storyset",function(){
//                var story = prepare_for_create_story();
//                if(story.story_set_id == null){
//                    MessageBox('No Story Set,Please use select one or Use create and add button','top','warning');
//                    return;
//                }
//                MANAGE.story.create(story,function(data){
//                    if(data.result){
//                        window.location.href = "/story_sets/"+data.content.story_set_id+"/story";
//                    }else
//                    {
//                        MessageBox(data.content,'top','warning');
//                    }
//
//                });
//            })
//            .on("click","#create-add-to-storyset",function(){
//                var story = prepare_for_create_story();
//                var story_set = {};
//                story_set.title = $("#storyset-title").val();
//                story_set.description = $("#storyset-desc").val();
//                story_set.users = $("#storyset-users option:selected").map(function(){return $(this).attr("user")}).get();
//                MANAGE.story_set.create(story_set,function(data){
//                    if(data.result){
//                        story.story_set_id = data.content.id;
//                        MANAGE.story.create(story,function(data){
//                            if(data.result){
//                                window.location.href = "/story_sets/"+data.content.story_set_id+"/story";
//                            }else
//                            {
//                                MessageBox(data.content,'top','warning');
//                            }
//                        })
//                    }
//                    else{
//
//                    }
//                })
//            })
//            .on("click","#direct-publish-fro-project",function(){
//                var story = prepare_for_create_story();
//                story.story_set_id = $(this).attr("value");
//                MANAGE.story.create(story,function(data){
//                    if(data.result){
//                        window.location.href = '/story_sets/'+data.content.id+'/story?story';
//                    }else{
//                        MessageBox(data.content,'top','warning');
//                    }
//                });
//            });
//        report_main.init_snap_btn("snap-shot-button");
//        init_snap();
    })
})();
//var report_main={};
//report_main.current_menu = Report.type["current_status"];

//report_main.init_snap_btn=function(id){
//    var target=id.indexOf("#")===-1?"#"+id:id;
//    $('body').on("click",target,function(event){
//        var e=adapt_event(event).event;
//        var left= e.clientX,
//            top= e.clientY;
//        $("#snap_block").css("left",left).css("top",top-170);
//        $("#snap-shot-desc").focus();
//    })
//        .on("keyup","#snap-shot-desc",function(event){
//            var e=adapt_event(event).event;
//            if(e.keyCode===13){
//                $("#snap-shot-btn").click();
//            }
//            else if(e.keyCode===27){
//                $("#snap-shot-remove").click();
//            }
//        })
//        .on("click","#snap-shot-remove",function(){
//            $("#snap-shot-desc").val("").blur();
//            $("#snap_block").css("left","-999em");
//        })
//        .on("click","#snap-shot-btn",function(){
//            var value=$.trim($('#snap-shot-desc').val());
//            if(value.length>0){
//                $.post(
//                    '/report_snaps',
//                    {
//                        report_snap: {
//                            desc: value ,
//                            type: Report.option.type,
//                            data: JSON.stringify(Report.serializeToDataJson())
//                        }
//                    },
//                    function (data) {
//                        if (data.result) {
//                            $("#snap-shot-remove").click();
//                            var type=data.content.type+"";
//                            var template='<div class="snap-li" snap="'+data.content.id+'" type="'+type+'">'+
//                                '<p>'+data.content.desc+'</p>'+
//                                    '<p>'+'right now'+'</p>'+
//                                '</div>'
//                            $("#snap-groups").prepend(template);
//                            report_snap.indicate();
//                        }
//                    }, 'json');
//            }
//            else{
//                MessageBox("Please fill the description", "top", "warning");
//            }
//        });
//}

