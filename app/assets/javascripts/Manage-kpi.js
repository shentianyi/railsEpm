function post_kpi(option){$.post("/kpis",{kpi:{kpi_category_id:option.entity,name:option.name,description:option.desc,frequency:option.frequency,direction:option.direction,target_max:option.target_max,target_min:option.target_min,unit:option.unit,is_calculated:option.is_calculated,formula:option.formula,formula_string:option.formula_string}},function(data){if(data.result){var object=data.object,id=object.id,formula_string=object.is_calculated?object.formula_string:I18n.t("view.manage.kpi.not_calculate_type");option.entity==$("#manage-left-menu .active").attr("number")?($("#manage-sort-list").prepend($("<li />").attr("id",id).append($("<p />").addClass("sort-handle").text(":")).append($("<input type='checkbox'/>").attr("is_calculated",object.is_calculated)).append($("<table />").addClass("category").append($("<tr />").append($("<td />").text(object.name).attr("title",object.name)).append($("<td />").text(object.interval)).append($("<td />").text(object.trend)).append($("<td />").addClass("manage-kpi-target").append($("<div />").append($("<span />").addClass("can-change").text(object.target_max).attr("title",object.target_max)).append($("<span />").text(object.section)).append($("<input type='text'/>").attr("effect_on",id)))).append($("<td />").addClass("manage-kpi-target").append($("<div />").append($("<span />").addClass("can-change").text(object.target_min).attr("title",object.target_min)).append($("<span />").text(object.section)).append($("<input type='text'/>").attr("effect_on",id)))).append($("<td />").text(option.is_calculated?"Yes":"No").attr("title",formula_string))).append($("<tr />").append($("<td />").text(object.desc).attr("title",object.desc)).append($("<td />").text(I18n.t("manage.kpi.frequency"))).append($("<td />").text(I18n.t("manage.kpi.trend"))).append($("<td />").text(I18n.t("manage.kpi.target"))).append($("<td />").text(I18n.t("manage.kpi.target_min"))).append($("<td />").text(I18n.t("manage.kpi.is_calculate_type")))))),$("#manage-sort-list li").each(function(){$(this).find("table tr:first-of-type td:last-of-type").tipsy({gravity:"se"})}),MANAGE.judge_kpi_count(),$("#manage-sort-list input[type='checkbox']").iCheck({checkboxClass:"icheckbox_minimal-aero"}),$("#manage-sort-list input[type='checkbox']").on("ifChanged",function(){$(this).parent().hasClass("checked")?(MANAGE.totalChecked-=1,total_check_listener()):(MANAGE.totalChecked+=1,total_check_listener())}),MANAGE.sort_init(),MANAGE.resize_sort_table(),$("#manage-kpi-add").css("right","999em"),$("#manage-right-content").css("padding-right","0px"),$("#left-content-title").css("margin-right","0px"),MANAGE.kpi.kpi_add_clear(),$("#manage-sort-list li").on("resize",function(){MANAGE.resize_sort_table()})):($("#manage-kpi-add").css("right","999em"),$("#manage-right-content").css("padding-right","0px"),$("#left-content-title").css("margin-right","0px"),MANAGE.kpi.kpi_add_clear(),MessageBox("Add success","top","success")),object.is_calculated||($("#is-calcu-relate").append($("<option />").attr("value",id).text(object.name)),$("#is-calcu-relate").val("").trigger("chosen:updated"))}else MessageBox(data.content,"top","warning")})}var MANAGE=MANAGE||{};MANAGE.kpi={},MANAGE.kpi.library={},MANAGE.kpi.init=function(){MANAGE.kpi.kpi_add_box_bind(),MANAGE.kpi.kpi_add_clear(),$("#new-kpi-category").append($("<option />").text("")),$("#manage-left-menu>li").each(function(){void 0!=$(this).attr("number")&&$("#new-kpi-category").append($("<option />").attr("value",$(this).attr("number")).text($(this).attr("title")))}),$("#manage-left-menu").on("click","li",function(){var li=$(this),id=li.attr("number");id&&($("#manage-left-menu>li").removeClass("active"),li.addClass("active"),$.get("/kpis/list/"+id,function(data){$("#manage-edit-target").text(li.attr("title")),$("#kpi-item-container").html(data),window.history.pushState(id,null,"/kpis/c/"+id),MANAGE.widget_init()}))}),$("#new-kpi-category").val("").trigger("chosen:updated"),$("body").on("click","#kpi-add-show",function(){var show_button=$("#kpi-add-show");show_button.attr("showed")||$.get("/kpis/condition",function(data){$.each(data,function(key,data){var select=$("select[name='"+key+"']");select.empty().trigger("chosen:updated");for(var i=0;i<data.length;i++)select.append($("<option />").attr("value",null==data[i].value?data[i].id:data[i].value).text(null==data[i].desc?data[i].name:data[i].desc));select.prepend($("<option />").attr("value","")),select.val("").trigger("chosen:updated")}),show_button.attr("showed",!0)},"json"),$("#manage-kpi-add").css("right","261px"),$("#manage-right-content").css("padding-right","200px"),$("#left-content-title").css("margin-right","201px")}),$("#kpi-library-btn").on("click",function(){$("#kpi-library").css("display","block"),$("#kpi-library>div").slideDown("3000"),$.ajax({url:"/kpi_categories/template",dataType:"json",success:function(data){for(var i=0;i<data.length;i++){var category=data[i];$("#kpi-library-inner-left").append($("<div />").addClass("accordion-header").attr("title",category.name).attr("id",category.id).text(category.name)).append($("<ul />").addClass("accordion-body"))}}})}),MANAGE.kpi.library.init(),$("body").on("keydown","#manage-sort-list>li>table input[type='text']",function(){var $this=$(this),number=$this.getCursorPosition();$this.data("cursor-position",number)}).on("keyup","#manage-sort-list>li>table input[type='text']",function(event){var keyCode=adapt_event(event).event.keyCode>=39?40==adapt_event(event).event.keyCode?40:39:adapt_event(event).event.keyCode;if(8==keyCode)var number=parseInt($(this).data("cursor-position"))-1;else var number=keyCode-38==0?0:keyCode-40==0?$(adapt_event(event).target).val().length:parseInt($(this).data("cursor-position"))+(keyCode-38);setCaretToPos($(this).get(0),number)}),$("#manage-kpi-add").height($(document).height()),$(window).resize(function(){$("#manage-kpi-add").height($(document).height())})},MANAGE.kpi.kpi_for_calculate=[],MANAGE.kpi.kpi_add_box_bind=function(){$("body").on("click","#close-add-kpi",function(){$("#manage-kpi-add").css("right","999em"),$("#manage-right-content").css("padding-right","0px"),$("#left-content-title").css("margin-right","0px"),MANAGE.kpi.kpi_add_clear()}).on("keyup","#new-kpi-target,#new-kpi-target-low",function(event){var e=adapt_event(event).event;clearNoNumZero(e.target)}),$("#add-unit").prepend($("<option />").attr("value","")),$("#add-unit").val("").trigger("chosen:updated"),$("#add-interval").prepend($("<option />").attr("value","")),$("#add-interval").val("").trigger("chosen:updated"),$("#add-trend").prepend($("<option />").attr("value","")),$("#add-trend").val("").trigger("chosen:updated"),$("#is-calcu-check").on("ifChecked",function(){$("#calculate-type-box").slideDown("2000"),$("#is_calcu_relate_chosen").css("width","131px"),$("#is-calcu-relate").prepend($("<option />").attr("value","")),$("#is-calcu-relate").val("").trigger("chosen:updated")}).on("ifUnchecked",function(){$("#calculate-type-box").slideUp("2000"),$("#calcuType-input").val(""),$("#is-calcu-relate").find("option:first-of-type").remove(),$("#is-calcu-relate").val("").trigger("chosen:updated")}),$("body").on("click","#calculate-type-box>label",function(event){var obj=adapt_event(event).target,sign=$(obj).attr("sign"),oldVal=$("#calcuType-input").val(),oldValId=$("#takeCal").attr("cal"),newVal=oldVal+sign,newValId=oldValId+sign;$("#calcuType-input").val(newVal),$("#takeCal").attr("cal",newValId),$("#calcuType-input")[0].selectionStart=$("#calcuType-input").val().length,$("#calcuType-input").focus()}),$("#is_calcu_relate_chosen .chosen-results").on("click","li",function(){var order=parseInt($(this).attr("data-option-array-index")),val="["+$(this).text()+"]",valId="["+$("#is-calcu-relate option")[order].getAttribute("value")+"]",oldVal=$("#calcuType-input").val(),oldValId=$("#takeCal").attr("cal"),newVal=oldVal+val,newValId=oldValId+valId;$("#calcuType-input").val(newVal),$("#takeCal").attr("cal",newValId),$("#calcuType-input")[0].selectionStart=$("#calcuType-input").val().length,$("#calcuType-input").focus()}),$("body").on("keyup","#calcuType-input",function(event){var object=adapt_event(event).target;MANAGE.kpi.calculate_input(object)}),$("#calcuType-input").focus(function(){var item;MANAGE.kpi.kpi_for_calculate=[],$("#is-calcu-relate").find("option:not([value=''])").each(function(){item={},item.value=$(this).text(),item.id=$(this).attr("value"),MANAGE.kpi.kpi_for_calculate.push(item)})}),$("#manage-kpi-add-new").on("click",function(){MANAGE.kpi.add_new_kpi()})},MANAGE.kpi.kpi_add_clear=function(){$("#manage-kpi-add input").val(""),$("#manage-kpi-add select").val("").trigger("chosen:updated"),$("#manage-kpi-add textarea").val(""),$("#manage-kpi-add textarea").val(""),$("#is-calcu-check").prop("checked")&&$("#is-calcu-check").iCheck("uncheck")},MANAGE.kpi.calculate_input=function(object){for(var post_value=$(object).val(),reg,i=0;i<MANAGE.kpi.kpi_for_calculate.length;i++)reg="/\\["+MANAGE.kpi.kpi_for_calculate[i].value+"]/g",post_value=post_value.replace(eval(reg),"["+MANAGE.kpi.kpi_for_calculate[i].id+"]");$("#takeCal").attr("cal",post_value)},MANAGE.kpi.add_new_kpi=function(){var option={entity:$("#new-kpi-category :selected").attr("value"),name:$("#new-kpi-name").val(),desc:$("#new-kpi-desc").val().length>0?$("#new-kpi-desc").val():$("#new-kpi-name").val(),frequency:$("#add-interval :selected").attr("value"),interval:$("#add-interval :selected").text(),direction:0==$("#add-trend :selected").text()?$("#add-trend :eq(1)").attr("value"):$("#add-trend :selected").attr("value"),trend:0==$("#add-trend :selected").text()?$("#add-trend :eq(1)").text():$("#add-trend :selected").text(),target_max:$("#new-kpi-target").val(),target_min:$("#new-kpi-target-low").val(),unit:$("#add-unit :selected").attr("value"),section:$("#add-unit :selected").attr("sym"),is_calculated:$("#is-calcu-check").prop("checked"),formula:$("#takeCal").attr("cal"),formula_string:$("#calcuType-input").val()};option.is_calculated?$.trim(option.name).length>0&&0!=option.interval&&option.target_max.length>0&&option.target_min.length>0&&0!=option.unit&&option.formula_string.length>0?post_kpi(option):MessageBox("Please fill all the blanket taking *","top","warning"):$.trim(option.name).length>0&&0!=option.interval&&option.target_max.length>0&&option.target_min.length>0&&0!=option.unit?post_kpi(option):MessageBox("Please fill all the blanket taking *","top","warning")},MANAGE.kpi.library.init=function(){$("body").on("click","#kpi-library-inner-left>.accordion-header",function(){if($(this).hasClass("accordion-in"))$(this).next().slideUp("1000"),$(this).removeClass("accordion-in");else{$("#kpi-library-inner-left>.accordion-header.accordion-in + .accordion-body").slideUp("2000"),$("#kpi-library-inner-left>.accordion-header.accordion-in").removeClass("accordion-in"),$(this).next().slideDown("1000"),$(this).addClass("accordion-in");var category_id=$(this).attr("id"),header=$(this);$.ajax({url:"/kpis/template/"+category_id,dataType:"json",success:function(data){for(var i=0;i<data.length;i++)header.next(".accordion-body").append($("<li />").append($("<input type='checkbox'/>").attr("id",data[i].id).attr("belong",data[i].admin_kpi_category_template_id)).append($("<h3 />").attr("title",data[i].name).text(data[i].name)).append($("<p />").attr("title",data[i].description).text(data[i].description))),data[i].is_calculated&&header.next(".accordion-body").find("#"+data[i].id).parent().append($("<i />").addClass("icon-lightbulb").attr("title",data[i].formula_string));$("input[type='checkbox']").iCheck({checkboxClass:"icheckbox_minimal-aero"})}})}}),$("body").on("ifChecked","#kpi-library-inner-left .accordion-body input[type='checkbox']",function(){var h=$(this).parent().nextAll("h3").text(),id=$(this).attr("id"),belong=$(this).attr("belong"),p=$(this).parent().nextAll("p").text();$("#library-chosen-kpi").append($("<li />").attr("id",id).attr("belong",belong).append($("<h3 />").text(h).attr("title",h)).append($("<p />").text(p).attr("title",p)))}).on("ifUnchecked","#kpi-library-inner-left .accordion-body input[type='checkbox']",function(){var id=$(this).attr("id");$("#library-chosen-kpi").find("#"+id).remove()}),$("body").on("click","#library-chosen-kpi li",function(){var id=$(this).attr("id");$("#kpi-library-inner-left .accordion-body").find("#"+id).iCheck("uncheck")}),$("body").on("click","#library-cancel",function(){MANAGE.kpi.library.cancel()}),$("body").on("click","#library-add",function(){var length=$("#library-chosen-kpi").children().length,belong_init=$("#library-chosen-kpi li").eq(0).attr("belong"),kpi_group=[$("#library-chosen-kpi li").eq(0).attr("id")];if(void 0!=belong_init){for(var i=1;length>=i;i++)$("#library-chosen-kpi li").eq(i).attr("belong")==belong_init?kpi_group.push($("#library-chosen-kpi li").eq(i).attr("id")):void 0==$("#library-chosen-kpi li").eq(i).attr("belong")?MANAGE.kpi.library.add_post(belong_init,kpi_group):(MANAGE.kpi.library.add_post(belong_init,kpi_group),belong_init=$("#library-chosen-kpi li").eq(i).attr("belong"),kpi_group=[],kpi_group.push($("#library-chosen-kpi li").eq(i).attr("id")));MessageBox("KPI Library Add Success","top","success"),MANAGE.kpi.library.cancel()}else MessageBox("Nothing have been chosen","top","warning")})},MANAGE.kpi.library.add_post=function(category,kpis){$.ajax({url:"/kpis/import",type:"POST",dataType:"json",data:{category:category,kpis:kpis},async:!1,success:function(data){data.result?$("#manage-left-menu").append($("<li />").attr("title",data.content).attr("number",data.object).append($("<i />").addClass("icon-trash icon-item")).append($("<a href='/kpis/c/"+data.object+"'/>").text(data.content))):MessageBox(data.content,"top","warning")}})},MANAGE.kpi.library.cancel=function(){$("#kpi-library>div").slideUp("3000"),$("#kpi-library").css("display","none"),$("#kpi-library-inner-left").empty(),$("#library-chosen-kpi").empty()};