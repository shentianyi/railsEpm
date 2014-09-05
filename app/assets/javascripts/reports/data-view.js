var DV = {} || DataView
DV.dv = {}
DV.init = function (container) {
    this.dv = new dhtmlXDataView({
        container: container,
        type: {
            template: "<span class='dhx_strong'>#INQA#</span> #FTQ# <span class='dhx_light'>#Defects#</span>-<span class='dhx_light'>#Pass#</span>",
            height: 35
        }
    });
}

DV.parse = function(jsondata){
    this.dv.parse(jsondata,"json");
}

DV.clear = function(){
    this.dv.clearAll();
}