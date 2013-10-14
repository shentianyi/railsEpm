/**
 * Created with JetBrains WebStorm.
 * User: tianyi
 * Date: 13-7-19
 * Time: 下午4:26
 * To change this template use File | Settings | File Templates.
 */

var ifepm = ifepm || {};


ifepm.template = {};

//do not change the structure and the !*! part. Insert css class into element to change the theme
ifepm.template.view = '<li !attr!=!id!><div>' +
    '<div class="dashboard-eachDetail relative">' +
    //'<p class="text-center">!name!</p>' +
    '<div class="dashboard-moreDetail">' +
    '<p>!title!</p>' +
    '<i class="icon-remove"></i>' +
    '</div>' +
    //'<i class="icon-list db-infoMark"></i>' +

    '<table class="table table-bordered table-striped db-itemInfo">' +
    //'<tr>' +
    //'<td>视图名称</td>' +
    //'<td>!name!</td>' +
    //'</tr>' +
    //'<tr>'  +
    //'<td>KPI名称</td>' +
    //'<td>!kpi_name!</td>' +
    //'</tr>' +
    //'<tr>'+
    ///'<td>观察点</td>' +
    //'<td>!entity_group!</td>'+
    //'</tr>'+
    //'<tr>'+
    //'<td>开始时间</td>'+
    //'<td>!from!</td>' +
    //'</tr>' +
    //'<tr>' +
    //'<td>结束时间</td>' +
    //'<td>!to!</td>'+
    //'</tr>'+
    //'<tr>' +
    //'<td>计算方式</td>' +
    //'<td>!calculate_type!</td>' +
    //'</tr>' +
    '</table>'+
    '</div>' +
    '<div id=!item_container_id! class="db-placeHolder">' +
    '</div>' +
    '</div></li>' +
    '<script type="text/javascript">ifepm.dashboard.load_graph("!id!")</script>'

//placeholder when change the position of a dashboard view
ifepm.template.view_placeholder='<div class="db-placeHolder">' +
    //'<h2 onclick="showDash_new()">+ 点击新建视图</h2>' +
'</div>';


ifepm.template.move_placeholder = 'empty-placeHolder'





