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
ifepm.template.view = '<li !attr!=!item_id!><div>' +
    '<div class="dashboard-eachDetail relative">' +
    //'<p class="text-center">!name!</p>' +
    '<div class="dashboard-moreDetail">' +
    '<p>!title!</p>' +
    '<i class="icon-remove" effect_on=!id!></i><span class="update-time">' + '!last_update!</span>' +
    '</div>' +
    '</div>' +
    '<div id=!item_container_id!' + '_outer' + ' class="put-db-chart">' +
    '<table class="dashboard-item-extra-info"></table>' +
    '<div class="db-chart-container" id=!item_container_id!></div>' +
    '</div>' +
    '</div></li>' +
    '<script type="text/javascript">ifepm.dashboard.load_graph("!id!")</script>'

//placeholder when change the position of a dashboard view
ifepm.template.view_placeholder = '<div class="db-placeHolder">' +
    //'<h2 onclick="showDash_new()">+ 点击新建视图</h2>' +
    '</div>';


ifepm.template.move_placeholder = 'empty-placeHolder';

ifepm.template.titleid = "dashboard-fullsize-title";
ifepm.template.title = "<li class='grister-logo' id=full_" + ifepm.template.titleid + ">" +
    "<p class='full-size-label'>!title!</p>" +
    "<a class='btn full-size-btn' id='full-size-btn'>退出全屏</a>" +
    "</li>";





