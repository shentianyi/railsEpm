define(function(require){
    var origin_url_parameters=window.location.pathname.split("/"),
        url_parameters=[];
    for(var i=1;i<origin_url_parameters.length;i++){
        url_parameters.push(origin_url_parameters[i]);
    }
    if(url_parameters[0]==="user_sessions"){
        if(url_parameters[1]==="new"){
            require(["./app/Login"],function(app){
                app.init()
            })
            return
        }
    }
    else if(url_parameters[0]==="welcome" || url_parameters[0].length===0){
        require(["./app/Welcome"],function(app){
            app.init()
        })
    }
    else if(url_parameters[0]==="kpis"){
        if(url_parameters[1]==="access"){
            require(["./app/Kpis/access"],function(app){
                app.init()
            })
            return
        }
        require(["./app/Kpis/index"],function(app){
            app.init()
        })
    }
    else if(url_parameters[0]==="entity_groups"){
        require(["./app/Entity_groups/index"],function(app){
            app.init()
        })
    }
    else if(url_parameters[0]==="users"){
        if(url_parameters[1]!==undefined && isNaN(url_parameters[1])==false){
            require(["./app/Users/show"],function(app){
                app.init()
            })
            return ;
        }
        require(["./app/Users/index"],function(app){
            app.init()
        })
    }
    else if(url_parameters[0]==="entities"){
        require(["./app/Entities/index"],function(app){
            app.init()
        })
    }
    else if(url_parameters[0].indexOf("departments")!==-1){
        require(["./app/Departments/index"],function(app){
            app.init()
        })
    }
    else if(url_parameters[0]==="kpi_subscribes"){
        if(url_parameters[1]==="new"){
            require(["./app/Kpi_subscribes/new"],function(app){
                app.init()
            })
            return
        }
        else if(url_parameters[1]==="mine"){
            require(["./app/Kpi_subscribes/mine"],function(app){
                app.init()
            })
            return
        }
    }
    else if(url_parameters[0]==="kpi_entries"){
        require(["./app/Kpi_entries/index"],function(app){
            app.init()
        })
        return
    }
    else if(url_parameters[0]==="story_sets"){
        if(url_parameters[1]==="new"){
            require(["./app/Story_sets/new"],function(app){
                app.init()
            })
            return
        }
        if(url_parameters[2]==="story"){
            require(["./app/Story_sets/story"],function(app){
                app.init()
            })
            return
        }
        require(["./app/Story_sets/index"],function(app){
            app.init()
        })
        return
    }
    else if(url_parameters[0].indexOf("reports")!==-1){
        require(["./app/Reports/index"],function(app){
            app.init()
        })
        return
    }
})
