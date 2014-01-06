//init file upload page
function attach_upload() {
    var vali = true;
    var lock = false;
    var id;
    $(".task-attach-upload").fileupload({
        singleFileUploads: false,
        dataType: 'json',
        change: function (e, data) {
            vali = true;
            id = $(this).attr('id');
            $("#" + id + '-preview').show();
            var prev = $("#" + id + '-preview');
            $.each(data.files, function (index, file) {
                if (file.size < 20000000) {
                    prev.append(
                        $("<p/>").addClass("upload-file-name template").text("上传中....")
                    );
                } else {
                    vali = false;
                    prev.append($("<p/>").addClass("upload-file-name").text(file.name + "&nbsp;&nbsp;" + (file.size / 1000000).toFixed(2) + "MB,超出最大值")
                        .append($("<i />").addClass('icon remove icon-remove').click(function () {
                            $(this).parents("p").eq(0).remove()
                        })));
                }
            });
        },
        add: function (e, data) {
            if (vali)
                if (data.submit != null)
                    data.submit();
        },
        success: function (data) {
            var prev = $("#" + id + '-preview');
            if (data.result) {
                //remove the previous attachments

                remove_all_attachment(prev);

                prev.find(".template").remove();

                for (var i = 0; i < data.object.length; i++) {
                    prev.append($("<p />").addClass("attachment-item upload-file-name")
                        .attr("title", data.object[i].oriName)
                        .attr("path-name", data.object[i].pathName)
                        .text(data.object[i].oriName)
                        .append($("<i />").addClass("icon remove icon-remove").attr("path-name", data.object[i].pathName).click(attachment_remove))
                    )
                }
            } else {
                alert(data.content);
            }
        }
    });
}

function attachment_remove(event) {
    var e = event ? event : (window.event ? window.event : null);
    var obj = e.srcElement || e.target;
    e.stopPropagation();
    var data = {
        file: $(obj).attr("path-name")
    }
    remove_attach(data,function(data){
        if(data.result){
            $(".attachment-item[path-name='" + $(obj).attr("path-name") + "']").remove();
            if ($("#task-attach-uploader-preview").children().length == 0) {
                $("#task-attach-uploader-preview").css("display", "none");
            }
        }
        else{
            MessageBox_content(data.content);
        }
    });
}

function get_attach() {
    var attachs = [];
    var length = $("#task-attach-uploader-preview").children().length;
    for (var i = 0; i < length; i++) {
        attachs[i] = {};
        attachs[i].oriName = $("#task-attach-uploader-preview>p").eq(i).attr("title");
        attachs[i].pathName = $("#task-attach-uploader-preview>p").eq(i).attr("path-name")
    }
    return attachs;
}


function remove_attach(data,callback){
    $.ajax({
        url : '/files/remove_attach',
        data : data,
        type : 'POST',
        success : function(data) {
            if(callback)
                callback(data);
        }
    });
}

function remove_all_attachment(target){
    var length = target.find(".attachment-item").length;
    for(var i = 0;i < length;i++){
        var data = {
            file:target.find(".attachment-item").eq(i).attr("path-name")
        }
        remove_attach(data,function(data){
            if(data.result){
                $(".attachment-item[path-name='" + data.object + "']").remove();
                if (target.children().length == 0) {
                    target.css("display", "none");
                }
            }
        });
    }
}