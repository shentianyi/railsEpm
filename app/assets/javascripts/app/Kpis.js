define(["jquery","../manage/manage_left_menu","../manage/manage_three_column"],function($,Leftmenu){
    var option_add={
         name:I18n.t('manage.kpi.category'),
         href:"/kpis/",
         postHref:'/kpi_categories'
    }
    return {
        init:function( ){
            Leftmenu.init(option_add,"kpis");
        }
    }
})