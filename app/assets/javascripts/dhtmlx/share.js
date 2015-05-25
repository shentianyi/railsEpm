define(["jquery"],function($){
    function processReportExcelRequest(url, xml) {
        $('<form>', {
            action: url,
            method: 'post',
            target: '_blank'
        }).append($('<input>', {
                type: 'hidden',
                name: 'grid_xml',
                value: xml
            })).appendTo('body').submit();
    }

    return {
        processReportExcelRequest:processReportExcelRequest
    };
})