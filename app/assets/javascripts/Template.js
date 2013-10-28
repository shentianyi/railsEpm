var config = {
    '.chosen-select': {},
    '.chosen-select-deselect': {allow_single_deselect: true},
    '.chosen-select-no-single': {disable_search_threshold: 10},
    '.chosen-select-no-results': {no_results_text: 'Oops, nothing found!'},
    '.chosen-select-width': {width: "95%"}
}
$(document).ready(function(){
    $("#user-portrait-background").on("click",show_left_user_setting);
    $(".chosen-select").chosen({
        disable_search_threshold: 7
    });
    $(".chosen-select:first-of-type").val('').trigger('chosen:updated');
})
//左边的用户设置
function show_left_user_setting(){
    var validate=$("#user-portrait-background").attr("state");
    if(validate=="close"){
        $("#left-user-setting").css("left","0");
        $("#wrap-main").css("left","200px");
        $("#user-portrait-background").attr("state","open");
    }
    else{
        $("#left-user-setting").css("left","-200px");
        $("#wrap-main").css("left","0");
        $("#user-portrait-background").attr("state","close");
    }
}
(function($) {
    $.fn.getCursorPosition = function() {
        var input = this.get(0);
        if (!input) return; // No (input) element found
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            return input.selectionStart;
        } else if (document.selection) {
            // IE
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    }
})(jQuery);
function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

function setCaretToPos (input, pos) {
    setSelectionRange(input, pos, pos);
}
