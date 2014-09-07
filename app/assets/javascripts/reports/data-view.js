var DV = {} || DataView
DV.dv = {}
DV.init = function (container) {
    this.dv = new dhtmlXDataView({
        container: container,
        type: {
            template:
                "<div class='dv-header'>" +
                    "<p>#INQA#</p>" +
                "</div>"+
                "<div class='dv-body'>" +
                    "<div class='left'>" +
                        "<p>#FTQ#</p>" +
                    "</div>" +
                    "<div class='right'>" +
                        "<p>#Defects#</p>" +
                        "<p>OPEN DEFECTS</p>" +
                        "<p>#Pass#</p>" +
                        "<p>VEHICLE PASS</p>" +
                    "</div>" +
                 "</div>",
            css:"dv-item",
            height: 150,
            width:230,
            margin:5,
            padding:8

        }
    });
}

DV.parse = function(jsondata){
    this.dv.parse(jsondata,"json");
}

DV.clear = function(){
    this.dv.clearAll();
}