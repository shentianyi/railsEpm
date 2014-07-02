var MANAGE = MANAGE || {};
MANAGE.story = {};

MANAGE.story.create = function(story){
    $.post('/stories', {story: story}, function (data) {
        if(data.result){

        }
    });
}