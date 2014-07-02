var MANAGE = MANAGE || {};
MANAGE.story = {};

MANAGE.story.create = function(story,callback){
        $.post('/stories', {story: story}, function (data) {
        callback(data)
    });
}

MANAGE.story.get_attachments = function(id){
    var attachments = null;
    if ($('#' + id).children().length > 0) {
        attachments = [];
        $('#' + id).children().each(function () {
            attachments.push({oriName: $(this).text(), pathName: $(this).attr('path-name')});
        });
    }
    return attachments;
}