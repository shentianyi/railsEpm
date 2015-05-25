define(["./share","dhtmlx.origin.dataview"],function(Share){
    dhtmlXDataView.prototype.serializeToDataJson = function () {
        return this.serialize();
    };
    dhtmlXDataView.prototype.serializeToExcelXml = function () {
        //console.log(url);
        var data = this.serialize();
        var xml = "<rows  profile='color'>";
        // generate head
        xml += '<head><columns>';
        for (var h in data[0]) {
            if (h != 'id' && h != 'value' && h.indexOf("STYLE_") == -1) {
                xml += "<column  color=''><![CDATA[" + $.trim(h) + ']]></column>';
            }
        }
        xml += '</columns></head>';
        // generate rows
        for (var i = 0; i < data.length; i++) {
            xml += '<row>';
            for (var d in data[i]) {
                if (d != 'id' && d != 'value' && d.indexOf("STYLE_") == -1) {
                    xml += '<cell><![CDATA[' + $.trim(data[i][d]) + ']]></cell>';
                }
            }
            xml += '</row>';
        }
        xml += '</rows>';
        return xml;
    };
    dhtmlXDataView.prototype.serializeToJson = function () {
        return this.serialize();
    };
    dhtmlXDataView.prototype.toExcel = function (url) {
        Share.processReportExcelRequest(url, dhtmlXDataView.prototype.serializeToExcelXml());
    };
    function init(config){
        config.container=config.container!=undefined?config.container:"data_container";
        var dataView=new dhtmlXDataView(config.container),
            default_template="<div class='dv-header'>" +
                "<p>#INQA#</p>" +
                "</div>" +
                "<div class='dv-body'>" +
                "<div class='left'>" +
                "<p id='ftq' style='color:" + "#STYLE_COLOR#" + "'>#FTQ#%</p>" +
                "</div>" +
                "<div class='right'>" +
                "<p>#Defects#</p>" +
                "<p>OPEN DEFECTS</p>" +
                "<p>#Pass#</p>" +
                "<p>VEHICLE PASS</p>" +
                "</div>" +
                "</div>"
            ;
        dataView.define("type", {
            template: config.template?config.template:default_template,
            css: config.css?config.css:"dv-item",
            height: config.height?config.height:150,
            width: config.width?config.width:230,
            margin: config.margin?config.margin:5,
            padding: config.padding?config.padding:8
        });
        this.object=dataView;
        return dataView;
    }

    return  {
        object:"",
        init:function(config){
            init(config);
        },
        render:function(data,config){
            var dataView=init(config);
            if(typeof data==="string"){
                data=JSON.parse(data);
            }
            dataView.parse(data,'json');
            this.object=dataView;
            return dataView;
        },
        add:function(params){
            if(this.object!==""){
                this.object.add(params);
            }
        },
        itemClick:function(callback){
            this.object.attachEvent("onItemDblClick",callback);
        },
        clear:function(){
            this.object.clearAll();
        }
    }
})