/**
 * Created with JetBrains WebStorm.
 * User: tianyi
 * Date: 13-7-23
 * Time: 上午9:51
 * To change this template use File | Settings | File Templates.
 */



function ActiveSelect(class_for_selected){

    this.select_class = class_for_selected;

    this.get_first_in_container =function(container,filter){

       return this.get_nodes_in_a_container(container,filter).first()
    };

    this.get_nodes_in_a_container=function(container,filter){

        return $(container).children().filter(filter)
    };

    this.execute_callback = function(callback,args){
        if($.isFunction(callback)){
            return callback.apply(this,args);
        }
    };


    this.unselect_all = function(container,filter){
       var select_class = this.select_class

        this.get_nodes_in_a_container(container,filter).each((function(){$(this).removeClass(select_class)})) ;
    };


    this.select_single_node =function(container,unselect_filter,select_filter,callback,args){
        this.unselect_all(container,unselect_filter);
        this.get_first_in_container(container,select_filter).addClass(this.select_class);
        this.execute_callback(callback,args);
    };

    this.select_first_node = function(container,filter,single,callback,args){
        if (single==true) {
            this.unselect_all(container,filter);
        }
        var first_node = this.get_first_in_container(container,filter);
        if (first_node){
            first_node.addClass(this.select_class);
        }

        this.execute_callback(callback,args);

        return first_node;
    };
}

