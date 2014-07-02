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
            if(data.files.length>0){
                if (vali)
                    if (data.submit != null)
                        data.submit();
            }

        },
        success: function (data) {
            $("#" + id + '-preview > p').remove();
            var prev = $("#" + id + '-preview');
            if (data.result) {
                for (var i = 0; i < data.content.length; i++) {
                    var html = '<div class="attachment-item" title="' + data.content[i].oriName + '" path-name="' + data.content[i].pathName + '">' +
                        '<div class="content">' +
                        '<p>' + data.content[i].oriName + '</p>' +
                        '</div>' +
                        '<div class="remove">' +
                        '<i class="icon icon-remove attachment-item-remove" path-name="' + data.content[i].pathName + '"></i>' +
                        '</div>' +
                        '</div>'
                    prev.append(html);

//                    prev.append($("<div />").addClass("attachment-item inline-block")
//                        .attr("title", data.content[i].oriName).attr("path-name", data.content[i].pathName)
//                        .append($("<div />").addClass('attachment-sign').addClass("atta-" + data.content[i].type)
//                            .append($("<div />").addClass("attachment-operate").attr("path-name", data.content[i].pathName)
//                                .click(attachment_remove).append($("<i />").addClass("icon-remove attach-icon-remove icon-white pointer pull-left")
//                                    .attr("path-name", data.content[i].pathName)))).append($("<p />").addClass("attachment-p")
//                            .html(data.content[i].oriName)));


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


function get_attachments(id) {
    var attachments = null;
    if ($('#' + id).children().length > 0) {
        attachments = [];
        $('#' + id).children().each(function () {
            attachments.push({oriName: $(this).text(), pathName: $(this).attr('path-name')});
        });
    }
    return attachments;
}

function init_story_page() {
    $('body').on('click', '.show-story-detail-item', function () {
        $('.show-story-detail-item').removeClass('active');
        $(this).addClass("active");
        load_story_detail($(this).attr('story'));
    });

    // load default story
    $(function () {
        var id = $('#default_story_id').val();
        if (id) {
            $(".show-story-detail-item[story='" + id + "']").addClass('active');
            load_story_detail(id);
        }
    });
}

function load_story_detail(id) {
    $.get('/stories/' + id + '/detail', function (data) {
        $('#story-content-div').html(data);
    }, 'html');
}

function create_comment() {
    var comment = {content: $.trim($("#comment-content").val()) };
    var attachments = get_attachments('comment-item-data-uploader-preview');
    if (attachments) {
        comment.attachments = attachments;
    }
    if(comment.content.length>0){
        $.post('/stories/' + $('#current-story').val() + '/comment', {comment: comment}, function (data) {
            MessageBox("Comment Success","top","success");
            var html="<li>"+
                "<p>"+
                "<a>Jim Guo:</a>"+
                comment.content+
                "</p>"+
                "<span>just now</span>"+
                "</li>"
            $("#comment-content-list").prepend(html);
            $("#comment-area textarea").val("");
            var count=parseInt($("#comments-btn span").text());
            $("#comments-btn span").text(++count);
        });
    }
    else{
        MessageBox("no content","top","warning");
    }

}

function prepare_for_create_story() {
    var story = {title: $("#story-title").val(), description: $("#story-desc").val(), story_set_id: $("#story-sets option:selected").attr("value")};
    var attachments = MANAGE.story.get_attachments('item-data-uploader-preview');
    var chart_conditions = [];

    for (var i = 0; i < ANALYTICS.chartSeries.series.length; i++) {
        var condition = {};
        condition.kpi_property= ANALYTICS.chartSeries.series[i].kpi_property;
        condition.entity_group_id = ANALYTICS.chartSeries.series[i].view;
        condition.kpi_id = ANALYTICS.chartSeries.series[i].kpi_id;
        condition.calculate_type = CHARTUTIL.calculate_type(ANALYTICS.chartSeries.series[i].method);
        condition.time_string = CHARTUTIL.time.time_string(ANALYTICS.chartSeries.series[i].begin_time, ANALYTICS.chartSeries.series[i].end_time);
        condition.interval = $("#chart-interval-alternate .active").attr("interval");
        condition.chart_type = $("#chart-type-alternate .image").attr("type");

        chart_conditions.push(condition);
    }

    if (chart_conditions.length > 0) {
        story.chart_conditions = chart_conditions;
    }

    if (attachments) {
        story.attachments = attachments;
    }
    return story;
}