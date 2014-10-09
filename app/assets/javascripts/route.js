define(function(require){
    var origin_url_parameters=window.location.pathname.split("/"),
        url_parameters=[];
    for(var i=1;i<origin_url_parameters.length;i++){
        url_parameters.push(origin_url_parameters[i]);
    }
    <!--------- login -->
    if(url_parameters[0]==="user_sessions"){
        if(url_parameters[1]==="new"){
            require(["./app/Login"],function(app){
                app.init()
            })
        }
    }
    <!---------- welcome -->
    else if(url_parameters[0]==="welcome" || url_parameters[0].length===0){
        require(["./app/Welcome"],function(app){
            app.init()
        })
    }
})
