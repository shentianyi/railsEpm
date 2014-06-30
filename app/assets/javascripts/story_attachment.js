function attach_upload(id) {
    var vali = true;
    var lock = false;
    $("#" + id).fileupload({
        singleFileUploads: false,
        dataType: 'json',
        change: function (e, data) {
            vali = true;
            $("#" + id + '-preview').show();
            var prev = $("#" + id + '-preview');
            $.each(data.files, function (index, file) {
                if (file.size < 20000000) {
                    prev.append($("<p/>").addClass("lil-sign").addClass("vali-file").html(file.name).append($("<span/>").html(I18n.t('fix.handing_file'))));
                } else {
                    vali = false;
                    $("#" + id + '-preview > .vali-file').remove();
                    prev.append($("<p/>").addClass("lil-sign").html(file.name + "&nbsp;&nbsp;" + (file.size / 1000000).toFixed(2) + I18n.t('fix.upload_size_error')).append($("<i />").addClass('icon-remove').click(remove_block)));
                }
            });
        },
        add: function (e, data) {
            if (vali)
                if (data.submit != null)
                    data.submit();
        },
        success: function (data) {
            $("#" + id + '-preview > p').remove();
            var prev = $("#" + id + '-preview');
            if (data.result) {
                for (var i = 0; i < data.content.length; i++) {
                    prev.append($("<div />").addClass("attachment-item inline-block")
                        .attr("title", data.content[i].oriName).attr("path-name", data.content[i].pathName)
                        .append($("<div />").addClass('attachment-sign').addClass("atta-" + data.content[i].type)
                            .append($("<div />").addClass("attachment-operate").attr("path-name", data.content[i].pathName)
                                .click(attachment_remove).append($("<i />").addClass("icon-remove attach-icon-remove icon-white pointer pull-left")
                                    .attr("path-name", data.content[i].pathName)))).append($("<p />").addClass("attachment-p")
                            .html(data.content[i].oriName)));
                }
            } else {
                alert(data.content);
            }
        }
    });
}

function attachment_remove(event) {
    if (confirm('Sure to delelte?')) {
        var e = event ? event : (window.event ? window.event : null);
        var obj = e.srcElement || e.target;
        e.stopPropagation();
        $(".attachment-item[path-name='" + $(obj).attr("path-name") + "']").remove();
    }
}

function remove_block(event) {
    var e = event ? event : (window.event ? window.event : null);
    var obj = e.srcElement || e.target;
    e.stopPropagation();
    if ($(obj).attr('parent') == 'attachment') {

    }
    $(obj).parent().remove();
}

function close_block(event) {
    var e = event ? event : (window.event ? window.event : null);
    var obj = e.srcElement || e.target;
    e.stopPropagation();
    $(obj).parent().addClass('hide');
    $(obj).nextAll('input').val("");
}

function create_story() {
    var story = {title: $('#story-title').val()};
    var attachments = get_attachments('item-data-uploader-preview');
    if (attachments) {
        story.attachments = attachments;
    }
    $.post('/stories', {story: story}, function (data) {

    });
}

function get_attachments(id) {
    var attachments = null;
    if ($('#' + id).children().length > 0) {
        attachments = [];
        $('#item-data-uploader-preview').children().each(function () {
            attachments.push({oriName: $(this).text(), pathName: $(this).attr('path-name')});
        });
    }
    return attachments;
}
