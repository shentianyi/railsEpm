define(["jquery","base","jquery.fileupload"],function($,Base){
    function kpi_entry_upload() {
        var vali = true;
        var lock = false;
        var id;
        var reg = /(\.|\/)(xls|xlsx)$/i;
        $(".kpi-entry-upload").fileupload({
            singleFileUploads: false,
            acceptFileTypes: reg,
            dataType: 'json',
            change: function (e, data) {
                vali = true;
                id = $(this).attr('id');
                $("#" + id + '-preview').show();
                var prev = $("#" + id + '-preview');
                $.each(data.files, function (index, file) {
                    if (file.size < 20000000) {
                        if (!reg.test(file.name)) {
                            vali = false;
                            Base.MessageBox(I18n.t('fix.upload_format_error') , "top", "warning");
                            return;
                        }
                        prev.append($("<p/>").addClass("upload-file-name template").text(I18n.t('fix.handing_file')));
                    } else {
                        vali = false;
                        Base.MessageBox(I18n.t('fix.upload_size_error') , "top", "warning");
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
                    prev.find(".template").remove();
                    $("#upload-kpi-close").click();
                    location.reload();
                    Base.MessageBox("SUCCESS", "top", "success");

                } else {
                    prev.find(".template").remove();
                    $("#false-alert").css("left", "0px").css("right", "0px");
                    $("#error-report").attr("href", data.content);
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
        remove_attach(data, function (data) {
            if (data.result) {
                $(".attachment-item[path-name='" + $(obj).attr("path-name") + "']").remove();
                if ($("#task-attach-uploader-preview").children().length == 0) {
                    $("#task-attach-uploader-preview").css("display", "none");
                }
            } else {
                Base.MessageBox_content(data.content);
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
    function remove_attach(data, callback) {
        $.ajax({
            url: '/files/remove_attach',
            data: data,
            type: 'POST',
            success: function (data) {
                if (callback)
                    callback(data);
            }
        });
    }
    function remove_all_attachment(target) {
        var length = target.find(".attachment-item").length;
        for (var i = 0; i < length; i++) {
            var data = {
                file: target.find(".attachment-item").eq(i).attr("path-name")
            }
            remove_attach(data, function (data) {
                if (data.result) {
                    $(".attachment-item[path-name='" + data.object + "']").remove();
                    if (target.children().length == 0) {
                        target.css("display", "none");
                    }
                }
            });
        }
    }

    $("body")
        .on("click","#upload-kpi-btn",function(){
            $("#upload-kpi").css("left","0px").css("right","0px");
        })
        .on("click", "#false-close", function () {
            $("#false-alert").css("left", "-999em").css("right", "auto");
        })
        .on("click", "#false-close-btn", function () {
            $("#false-alert").css("left", "-999em").css("right", "auto");
        })
    ;
    kpi_entry_upload();
})