
var displayFeatureBeidouLog = function(feature, coordinate)
{
    open_sidebar_id(sidebar, "disaster-log-info");

    var info_json = feature.getProperties();
    var disaster_rank_of_log = info_json['disaster_rank_of_log'];
    var disaster_rank_str;
    switch(disaster_rank_of_log)
    {
        case 1: disaster_rank_str = '特别重大I级'; break;
        case 2: disaster_rank_str = '重大Ⅱ级';break;
        case 3: disaster_rank_str = '较大Ⅲ级';break;
        case 4: disaster_rank_str = '一般Ⅳ级';break;
        default: disaster_rank_str = '未知';break;
    }
    document.getElementById('label-disaster-rank').innerHTML = disaster_rank_str;

    var year_s = info_json['year'];
    var month_s = info_json['month'];
    var day_s = info_json['day'];
    var hour = parseInt(info_json['hour']);
    var hour_s = (hour < 10) ? ('0' + hour.toString()) : hour.toString();
    var minute = parseInt(info_json['minute']);
    var minute_s = (minute < 10) ? ('0' + minute.toString()) : minute.toString();
    var date_time = year_s + '-' + month_s + '-' + day_s + ' ' + hour_s + ':' + minute_s;
    var beidou_id = info_json['beidou_id'];
    var x = coordinate[0].toFixed(2);
    var y = coordinate[1].toFixed(2);

    var tab1 = document.getElementById('fixed-table-log');
    var row1_tab1 = tab1.rows[1];
    row1_tab1.cells[0].innerHTML = date_time;
    row1_tab1.cells[1].innerHTML = beidou_id;
    row1_tab1.cells[2].innerHTML = x;
    row1_tab1.cells[3].innerHTML = y;

    // content_popup.innerHTML = '<p>距离<code>' + distance_km.toFixed(0) +  '</code>千米，选取图元经纬度:</p><code>' + hdms +  '</code>';
    content_popup.innerHTML = '<p>'+ disaster_rank_str + '</p><p><code>' + date_time +  '</code></p>';
    overlay_popup.setPosition(coordinate);

    var disaster = info_json['disaster'];
    var FloodRank = disaster['FloodRank'];
    var BuildingCollapse = disaster['BuildingCollapse'];
    var BankBurst_Num = disaster['BankBurst_Num'];
    var BankBurst_Meter = disaster['BankBurst_Meter'];
    var Landslide_Num = disaster['Landslide_Num'];
    var Landslide_Cubic_Meter = disaster['Landslide_Cubic_Meter'];
    var FreezeInjuryRank = disaster['FreezeInjuryRank'];
    var DebrisFlow = disaster['DebrisFlow'];
    var InjuredPopulation = disaster['InjuredPopulation'];
    var DeadPopulation = disaster['DeadPopulation'];
    var DisasterArea = disaster['DisasterArea'];
    var AffectedPopulation = disaster['AffectedPopulation'];
    var EconomicLosses = disaster['EconomicLosses'];

    var meteorology = info_json['meteorology'];
    var TropicalCyclone = meteorology['TropicalCyclone'];
    var RainFall = meteorology['RainFall'];
    var TideMark = meteorology['TideMark'];
    var Wave = meteorology['Wave'];
    var LowestTemperature = meteorology['LowestTemperature'];

    var tab2 = document.getElementById('fixed-table-disaster');

    var row1_tab2 = tab2.rows[1];
    row1_tab2.cells[0].innerHTML = DeadPopulation;
    row1_tab2.cells[1].innerHTML = InjuredPopulation;
    row1_tab2.cells[2].innerHTML = BuildingCollapse;

    var row3_tab2 = tab2.rows[3];
    row3_tab2.cells[0].innerHTML = DeadPopulation;
    row3_tab2.cells[1].innerHTML = AffectedPopulation;
    row3_tab2.cells[2].innerHTML = EconomicLosses;

    var row5_tab2 = tab2.rows[5];
    row5_tab2.cells[0].innerHTML = FloodRank;
    row5_tab2.cells[1].innerHTML = FreezeInjuryRank;
    row5_tab2.cells[2].innerHTML = DebrisFlow;

    var row7_tab2 = tab2.rows[7];
    row7_tab2.cells[0].innerHTML = BankBurst_Num;
    row7_tab2.cells[1].innerHTML = BankBurst_Meter;
    row7_tab2.cells[2].innerHTML = Landslide_Num;

    var row9_tab2 = tab2.rows[9];
    row9_tab2.cells[0].innerHTML = Landslide_Cubic_Meter;
    row9_tab2.cells[1].innerHTML = TropicalCyclone;
    row9_tab2.cells[2].innerHTML = RainFall;

    var row11_tab2 = tab2.rows[11];
    row11_tab2.cells[0].innerHTML = TideMark;
    row11_tab2.cells[1].innerHTML = Wave;
    row11_tab2.cells[2].innerHTML = LowestTemperature;
}

var displaySnap = function(coordinate)
{
    var closestFeature = null;
    var list_closestFeature = new Array();
    var count_layers = geoSource_layer_disasters.length;
    var min_distance = 123456789;
    for(var i=0; i<count_layers; i++)
    {
        if(!geo_layer_checked[i])    { continue ; }

        var closestFeature_temp = geoSource_layer_disasters[i].getClosestFeatureToCoordinate(coordinate);
        if (closestFeature_temp != null)
        {
            var geometry = closestFeature_temp.getGeometry();
            var closestPoint = geometry.getClosestPoint(coordinate);
            var wgs84Sphere = new ol.Sphere(6378137);
            var distance = wgs84Sphere.haversineDistance(coordinate,closestPoint);
            if(distance < min_distance)
            {
                min_distance = distance;
                closestFeature = closestFeature_temp;
            }
        }
    }

    if (closestFeature === null) {        overlay_close();     }
    else
    {
        var geometry = closestFeature.getGeometry();
        var closestPoint = geometry.getClosestPoint(coordinate);
        var wgs84Sphere = new ol.Sphere(6378137);
        var distance_km = wgs84Sphere.haversineDistance(coordinate,closestPoint);
        distance_km = distance_km/1000.0;
        //display_into_input_toFixed('distance-km', distance_km, 0);
        var zoom_num = map.getView().getZoom();
        var index_distance = Math.round(zoom_num - 5);
        index_distance  = (index_distance < 14) ? index_distance : 13;
        var max_distance_select =max_km_select_feature[index_distance];
        if (distance_km > max_distance_select)
        {
            overlay_close();
            //document.getElementById('feature-info').innerHTML = '';
        }
        else
        {
            if (point_popup === null) {
                point_popup = new ol.geom.Point(closestPoint);
            }
            else
            {
                point_popup.setCoordinates(closestPoint);
            }
            if (line_popup === null) {
                line_popup = new ol.geom.LineString([coordinate, closestPoint]);
            } else {
                line_popup.setCoordinates([coordinate, closestPoint]);
            }

            displayFeatureBeidouLog(closestFeature, coordinate);
        }
    }
    map.render();
};

function myTimerSelect() {
    select_time_disable = !select_time_disable;
}

map.on('pointermove', function(evt) {
    if (evt.dragging) {        return;    }
    if(select_mouse_disable) {        return;    }
    if(select_time_disable) {        return;    }
    var select_page_enable = (sidebar_page_id == 'map-view') || (sidebar_page_id == 'disaster-log-info') || (sidebar_page_id == 'data-list');
    if(!select_page_enable)
    {
        select_mouse_disable = false;
        return;
    }

    var coordinate = map.getEventCoordinate(evt.originalEvent);
    displaySnap(coordinate);
});

map.on('click', function(evt)
{
    var select_page_enable = (sidebar_page_id == 'map-view') || (sidebar_page_id == 'disaster-log-info')|| (sidebar_page_id == 'data-list');
    if(select_page_enable)
    {
        select_mouse_disable = !select_mouse_disable;
    }
    else
    {
        select_mouse_disable = false;
    }


    if(select_mouse_disable)
    {
        clearInterval(mySelectEnableTimer);
        feature_auto_select_status.innerHTML='禁止';
    }
    else
    {
        mySelectEnableTimer = setInterval(myTimerSelect, 500);
        feature_auto_select_status.innerHTML='允许';
    }
});

map.on('postcompose', function(evt) {
    var vectorContext = evt.vectorContext;
    vectorContext.setStyle(mouse_select_style);
    if (point_popup !== null) {
        vectorContext.drawGeometry(point_popup);
    }
    if (line_popup !== null) {
        vectorContext.drawGeometry(line_popup);
    }
});