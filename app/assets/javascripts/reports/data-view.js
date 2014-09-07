var DV = {} || DV
DV.o = {}
DV.init = function (option) {
    this.o = new dhtmlXDataView({
        container: option.container,
        type: {
            template: "<span class='dhx_strong'>#INQA#</span> #FTQ# <span class='dhx_light'>#Defects#</span>-<span class='dhx_light'>#Pass#</span>",
            height: 35
        }
    });
}

DV.parse = function(jsondata){
    this.o.parse(jsondata,"json");
}

DV.clear = function(){
    this.o.clearAll();
}