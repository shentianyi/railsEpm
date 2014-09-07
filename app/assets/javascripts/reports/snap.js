function init_snap(data_source) {
    $("#snap-shot-button").bind('click', function () {
        console.log(data_source.serializeToJson());
    });
}