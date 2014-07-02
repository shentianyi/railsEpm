var MANAGE = MANAGE || {};
MANAGE.story = {};

MANAGE.story.create = function (story, callback) {
    if (story.title) {
        $.post('/stories', {story: story}, function (data) {
            callback(data)
        });
    } else {
        MessageBox('Please add discussion title', 'top', 'warning');
    }
};

MANAGE.story.get_attachments = function (id) {
    var attachments = null;
    if ($('#' + id).children().length > 0) {
        attachments = [];
        $('#' + id).children().each(function () {
            attachments.push({oriName: $(this).text(), pathName: $(this).attr('path-name')});
        });
    }
    return attachments;
}