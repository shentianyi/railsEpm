function dashboard_upload(){
	$("#dashboards-upload").fileupload({
		datType: 'json',
		done: function(e,data){
			if(data.result.result){
				$("#item-data-uploader-preview > p").text("Success Upload|" + data.files[0].name);
			}
			else{
				$("#item-data-uploader-preview > p").text("Failed Upload ! " + data.files[0].name + " Please click error files to download");
				$("#item-data-uploader-preview > a").text(data.result.content.file_name).attr("href","/admin/dashboards/error_file?file_path="+data.result.content.file_path).appendTo($("#item-data-uploader-preview"));
			}
		},
		add : function(e,data){
			data.content = $("#item-data-uploader-preview > p").text("Uploading..."+ data.files[0].name).appendTo($("#item-data-uploader-preview"));
			data.submit();
		},
		change : function(e,data){
			
		}
	});
}