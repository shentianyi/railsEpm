define(["jquery","jquery.baresize"],function($){
    function resize_sort_table(){
        var table_size=$("#entry-sort-list li").width()*0.97;
        $("#entry-sort-list .table-outer-div>table").width(table_size);
    }
    resize_sort_table();
    $("#entry-sort-list li").on("resize",function(){
        resize_sort_table();
    });
    return{
        refresh:function(){
            resize_sort_table();
            $("#entry-sort-list li").on("resize",function(){
                resize_sort_table();
            });
        }
    }
})