

function get_geo_layer_checked_num()
{
    var count = geo_layer_checked.length;
    var sum = 0;
    for(var i=0; i<count; i++)
    {
        sum = (geo_layer_checked[i]) ? (sum+1) : sum;
    }
    geo_layer_checked_count = sum;
}

function get_disaster_tree(lst) {
    // Some logic to retrieve, or generate tree structure
    var data = [];
    var count_year = lst.length;
    var count_disaster, count_log;
    var year_node, disaster_node, log_node;
    var i, j, k;
    var file_name;
    var dt_from, dt_to;

    geojson_file_name_list.splice(0, geojson_file_name_list.length);
    geojson_file_name_list = [];
    geo_layer_checked.splice(0, geo_layer_checked.length);
    geo_layer_checked = [];
    geo_datetime_from_to.splice(0, geo_datetime_from_to.length);
    geo_layer_checked = [];
    count_geoSource_disasters_layers_exist = 0;
    geo_feature_checked.splice(0, geo_feature_checked.length);
    geo_layer_checked = [];

    for(i=0;i<count_year;i++)
    {
        year_node = lst[count_year - 1- i];
        data[i] = {text:'', nodes : null, state : null};
        data[i].text = year_node.year;
        data[i].nodes = [];
        data[i].tags = [];
        count_disaster = year_node.lst_log_disaster.length;
        data[i].tags.push('count_disaster');
        data[i].tags.push(count_disaster.toString());
        data[i].state = { checked : false, expanded: false, selected: false };

        for(j=0;j<count_disaster;j++)
        {
            disaster_node = year_node.lst_log_disaster[count_disaster - 1 - j];
            file_name = disaster_node.file_name;
            geojson_file_name_list.push(file_name);

            data[i].nodes[j] = {text:'', nodes : null, state : null, tags : null};
            data[i].nodes[j].text = disaster_node.index_disaster + 1;
            data[i].nodes[j].nodes = [];
            data[i].nodes[j].state = { checked : false, expanded: false, selected: false };
            data[i].nodes[j].tags = [];
            data[i].nodes[j].tags.push('disasters_layers_index');
            data[i].nodes[j].tags.push(count_geoSource_disasters_layers_exist.toString());

            geo_layer_checked.push(false);

            count_log = disaster_node.lst_dt_s.length;
            dt_from = disaster_node.lst_dt_s[0].slice(0,10);
            dt_to = disaster_node.lst_dt_s[count_log-1].slice(0,10);
            var dt_from_to = new Array();
            dt_from_to.push(dt_from);
            dt_from_to.push(dt_to);
            geo_datetime_from_to.push(dt_from_to);

            count_geoSource_disasters_layers_exist++;

            for(k=0;k<count_log;k++)
            {
                log_node = disaster_node.lst_dt_s[count_log - 1 - k];
                data[i].nodes[j].nodes[k] = { text:'', nodes : null, state : null, tags : null};
                data[i].nodes[j].nodes[k].text = log_node;
                data[i].nodes[j].nodes[k].state = { checked : false, expanded: false, selected: false, disabled: true };
                data[i].nodes[j].nodes[k].tags = [];
                data[i].nodes[j].nodes[k].tags.push('feature_log_index');
                data[i].nodes[j].nodes[k].tags.push(count_feature_log_exist.toString());

                geo_feature_checked.push(false);
                count_feature_log_exist++;
            }
        }
    }

    i=0;
    j=0;
    data[i].state.expanded = true;
    year_node = lst[count_year - 1 - i];
    disaster_node = year_node.lst_log_disaster[count_disaster - 1 - j];
    data[i].nodes[j].state.checked = true;
    data[i].nodes[j].state.expanded = true;
    data[i].nodes[j].state.selected = true;

    geo_layer_checked[0] = true;

    count_log = disaster_node.lst_dt_s.length;
    for(k=0;k<count_log;k++)
    {
        data[i].nodes[j].nodes[k].state.checked = true;
    }

    get_geo_layer_checked_num();

    return data;
}

function RunAfterGeodateChange()
{
    if(timerDelayLayerCheck!=null)
    {
        clearTimeout(timerDelayLayerCheck);
        timerDelayLayerCheck = null;
    }

    get_geo_layer_checked_num();
    GetDaysMultiPoint();
    set_animation_range();
    show_history_statistics();

}

function  load_vectorPoints_layer_index(index)
{
    var count = geojson_file_name_list.length;
    if( index >= count) return;

    var file_path = './data/' + geojson_file_name_list[index];
    $.getJSON(file_path, function (data)
    {
        geoFile_layer_disasters[index] = data;

        var geoSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(data)
        });

        geoSource_layer_disasters[index] = geoSource;

        var vectorPoints_layer = new ol.layer.Vector({ source: geoSource, style: various_styleFunction });

        vectorPoints_layer_disasters[index] = vectorPoints_layer;

        if(geo_layer_checked[index])
        {
            map.addLayer(vectorPoints_layer);
            map.render();
        }

        count_geoSource_disasters_layers_ready++;
        if(count_geoSource_disasters_layers_ready < count_geoSource_disasters_layers_exist)
        {
            load_vectorPoints_layer_index(index + 1);
        }
        else
        {
            RunAfterGeodateChange();
        }
    });
}

function reset_all_beidou_layer()
{
    var count = vectorPoints_layer_disasters.length;
    if(count > 0)
    {
        for(var i=0;i<count; i++)
        {
            map.removeLayer(vectorPoints_layer_disasters[i]);
        }
        vectorPoints_layer_disasters.splice(0,vectorPoints_layer_disasters.length);
        vectorPoints_layer_disasters = [];
        geoSource_layer_disasters.splice(0,geoSource_layer_disasters.length);
        geoSource_layer_disasters = [];
        geoFile_layer_disasters.splice(0, geoFile_layer_disasters.length);
        geoFile_layer_disasters = [];
        //vectorPoints_layer_disasters = new Array();
        //geoSource_layer_disasters = new Array();
    }
}

function remove_beidou_layer_index(index)
{
    var count = vectorPoints_layer_disasters.length;
    if(count > 0)
    {
        if( index >= count ) return;
        map.removeLayer(vectorPoints_layer_disasters[index]);
    }
}

var read_list_json = function()
{
    $.getJSON(dataroot, function (data) {

        var items = data.lst_log_year.map(function (year_item) {
            return year_item.year;
        });

        if (items.length) {

            count_geoSource_disasters_layers_exist = 0;

            $checkableTree = $('#treeview-checkable-disaster-list').treeview({
                data: get_disaster_tree(data.lst_log_year),
                //checkedIcon: "glyphicon glyphicon-checked",
                //uncheckedIcon: "glyphicon glyphicon-unchecked",
                showIcon: false,
                showCheckbox: true,
                onNodeChecked: function(event, node) {
                    if(node.tags[0] == 'disasters_layers_index')
                    {
                        var index_layer = parseInt(node.tags[1]);
                        if(index_layer < vectorPoints_layer_disasters.length)
                        {
                            map.addLayer(vectorPoints_layer_disasters[index_layer]);
                            geo_layer_checked[index_layer] = true;
                            if(timerDelayLayerCheck!=null)
                            {
                                clearTimeout(timerDelayLayerCheck);
                            }
                            timerDelayLayerCheck = setTimeout(RunAfterGeodateChange, 2000);
                        }
                    }
                    if(node.nodes != null)
                    {
                        var count = node.nodes.length;
                        for(var i=0;i<count;i++)
                        {
                            $checkableTree.treeview('checkNode', [ node.nodes[i].nodeId, { silent: false } ]);
                        }
                    }
                    $('#checkable-output').prepend('<p>' + node.text + ' was checked</p>');
                },
                onNodeUnchecked: function (event, node) {
                    if(node.nodes != null)
                    {
                        if(node.tags[0] == 'disasters_layers_index')
                        {
                            var index_layer = parseInt(node.tags[1]);
                            if(index_layer < vectorPoints_layer_disasters.length)
                            {
                                map.removeLayer(vectorPoints_layer_disasters[index_layer]);
                                geo_layer_checked[index_layer] = false;
                                if(timerDelayLayerCheck!=null)
                                {
                                    clearTimeout(timerDelayLayerCheck);
                                }
                                timerDelayLayerCheck = setTimeout(RunAfterGeodateChange, 1000);
                            }
                        }
                        var count = node.nodes.length;
                        for(var i=0;i<count;i++)
                        {
                            $checkableTree.treeview('uncheckNode', [ node.nodes[i].nodeId, { silent: false } ]);
                        }
                    }
                    $('#checkable-output').prepend('<p>' + node.text + ' was unchecked</p>');
                },
                onNodeCollapsed: function(event, node) {
                    $('#checkable-output').empty();
                    $('#checkable-output').prepend('<p>' + node.text + ' was collapsed</p>');
                },
                onNodeExpanded: function (event, node) {
                    $('#checkable-output').empty();
                    $('#checkable-output').prepend('<p>' + node.text + ' was expanded</p>');
                }
            });

            if(count_geoSource_disasters_layers_exist != count_geoSource_disasters_layers_ready)
            {
                reset_all_beidou_layer();
                count_geoSource_disasters_layers_ready = 0;
                count_feature_log_ready = 0;
                load_vectorPoints_layer_index(0);
            }
            else
            {
                if(count_feature_log_ready != count_feature_log_exist)
                {
                    count_geoSource_disasters_layers_ready--;
                    count_feature_log_ready = count_feature_log_ready - geoSource_layer_disasters[0].features.length;
                    remove_beidou_layer_index(0);
                    load_vectorPoints_layer_index(0);
                }
            }
        }
    });
};
