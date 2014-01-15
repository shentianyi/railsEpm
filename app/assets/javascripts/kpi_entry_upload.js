//init file upload page
(function(){
    $("body")
        .on("click","#false-close",function(){
            $("#false-alert").css("left","-999em").css("right","auto");
        })
        .on("click","#false-close-btn",function(){
            $("#false-alert").css("left","-999em").css("right","auto");
        })
})()
function kpi_entry_upload() {
     var vali = true;
     var lock = false;
     var id;
     $(".kpi-entry-upload").fileupload({
          singleFileUploads : false,
          dataType : 'json',
          change : function(e, data) {
               vali = true;
               id = $(this).attr('id');
               $("#" + id + '-preview').show();
               var prev = $("#" + id + '-preview');
               $.each(data.files, function(index, file) {
                    if(file.size < 20000000) {
                         prev.append($("<p/>").addClass("upload-file-name template").text("正在解析文件..."));
                    } else {
                         vali = false;
                         prev.append($("<p/>").addClass("upload-file-name").text(file.name + "&nbsp;&nbsp;" + (file.size / 1000000).toFixed(2) + "MB,超出最大值").append($("<i />").addClass('icon remove').click(function() {
                              $(this).parents("p").eq(0).remove()
                         })));
                    }
               });
          },
          add : function(e, data) {
               if(vali)
                    if(data.submit != null)
                         data.submit();
          },
          success : function(data) {
               var prev = $("#" + id + '-preview');
               if(data.result) {
                    //remove the previous attachments

                    // remove_all_attachment(prev)
                   prev.find(".template").remove();
                   $("#upload-kpi-close").click();
                   MessageBox("上传成功","top","success");
                   location.reload();

               } else {
                   prev.find(".template").remove();
                   $("#false-alert").css("left","0px").css("right","0px");
                   $("#error-report").attr("href",data.content);
                    // window.location="/files/download?f="+data.object.url+"&n="+data.object.file;
               }
          }
     });
}

function attachment_remove(event) {
     var e = event ? event : (window.event ? window.event : null);
     var obj = e.srcElement || e.target;
     e.stopPropagation();
     var data = {
          file : $(obj).attr("path-name")
     }
     remove_attach(data, function(data) {
          if(data.result) {
               $(".attachment-item[path-name='" + $(obj).attr("path-name") + "']").remove();
               if($("#task-attach-uploader-preview").children().length == 0) {
                    $("#task-attach-uploader-preview").css("display", "none");
               }
          } else {
               MessageBox_content(data.content);
          }
     });
}

function get_attach() {
     var attachs = [];
     var length = $("#task-attach-uploader-preview").children().length;
     for(var i = 0; i < length; i++) {
          attachs[i] = {};
          attachs[i].oriName = $("#task-attach-uploader-preview>p").eq(i).attr("title");
          attachs[i].pathName = $("#task-attach-uploader-preview>p").eq(i).attr("path-name")
     }
     return attachs;
}

function remove_attach(data, callback) {
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

function remove_all_attachment(target) {
     var length = target.find(".attachment-item").length;
     for(var i = 0; i < length; i++) {
          var data = {
               file : target.find(".attachment-item").eq(i).attr("path-name")
          }
          remove_attach(data, function(data) {
               if(data.result) {
                    $(".attachment-item[path-name='" + data.object + "']").remove();
                    if(target.children().length == 0) {
                         target.css("display", "none");
                    }
               }
          });
     }
}