////////////////////////////////////////////////////////////////////////////////init select
var config = {
    '.chosen-select'           : {},
    '.chosen-select-deselect'  : {allow_single_deselect:true},
    '.chosen-select-no-single' : {disable_search_threshold:10},
    '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
    '.chosen-select-width'     : {width:"95%"}
}

function init_analytics(){
    $(".chosen-select").chosen(
        {
            disable_search_threshold:7
        }
    );
    $("#analy-begin-time,#analy-end-time").on("click",function(){
        form_date_picker($("#chart-kpi :selected").attr("interval"));
    })
}