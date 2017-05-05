
var source_Animation = new ol.source.Vector({
    wrapX: false
});
var vector_Animation_layer = new ol.layer.Vector({
    source: source_Animation
});

map.addLayer(vector_Animation_layer);

function stopAnimation()
{
    if(myAnimationTimer == null)
    {
        return;
    }

    overlay_popup.setPosition(undefined);

    clearInterval(myAnimationTimer);
    myAnimationTimer = null;

    if(radio_animation_day.checked)
    {
        source_Animation.clear();
    }

    set_all_beidou_layer_visable_or_not(true);

    display_location_txt.value = '0';
    display_location_range.value = 0;
    index_playing_Animation = 0;

    pause_location_txt.value = "";
    pause_recycle = false;

    animation_playing = false;
}

function set_fixed_date_popup_coordinate()
{
    var map_extent = (map.getView()).calculateExtent(map.getSize());

    var min_x = map_extent[0];
    var min_y = map_extent[1];
    var max_x = map_extent[2];
    var max_y = map_extent[3];

    var x = (max_x + min_x) / 2.0 + (max_x - min_x) * 0.2;
    var y = (max_y + min_y) / 2.0 + (max_y - min_y) * 0.2;
    x = (Math.abs(x-116) < 3) ? 116 : x;
    y = (Math.abs(y-18) < 3) ? 17 : y;
    date_popup_coordinate = [x,y];
}

function set_date_popup_coordinate_for_layer(index_layer)
{
    var bbox = geoFile_layer_disasters[index_layer]["metadata"]["bbox"];
    var fea_min_x = bbox[0];
    var fea_min_y = bbox[1];
    var fea_max_x = bbox[2];
    var fea_max_y = bbox[3];

    var map_extent = (map.getView()).calculateExtent(map.getSize());
    var map_min_x = map_extent[0] + (map_extent[2] - map_extent[0]) * 0.3;
    var map_min_y = map_extent[1];
    var map_max_x = map_extent[2];
    var map_max_y = map_extent[3];

    var low_distance = Math.max((fea_min_y - map_min_y), 0.05);
    var top_distance = Math.max((map_max_y - fea_max_y), 0.05);
    var left_distance = Math.max((fea_min_x - map_min_x), 0.05);
    var right_distance = Math.max((map_max_x - fea_max_x), 0.05);

    var offset_top_y = (( top_distance / low_distance ) < 2 ) ? (top_distance / 5) : (top_distance / 7);
    var top_y = fea_max_y + offset_top_y;
    var offset_low_y = (( low_distance / top_distance  ) < 2 ) ? (low_distance / 4) : (low_distance / 6);
    var low_y = fea_min_y - offset_low_y;

    var fea_y, fea_x;
    var offset_left_x, offset_right_x;
    var left_x,right_x;
    if (top_distance*1.5 > low_distance)
    {
        fea_y = top_y;
        offset_left_x = (( left_distance / right_distance ) < 2 ) ? (left_distance / 5) : (left_distance / 6);
        offset_right_x = (( right_distance / left_distance ) < 2 ) ? (left_distance / 6) : (left_distance / 7);
    }
    else
    {
        fea_y = low_y;
        offset_left_x = (( left_distance / right_distance ) < 2 ) ? (left_distance / 3) : (left_distance / 4);
        offset_right_x = (( right_distance / left_distance ) < 2 ) ? (left_distance / 4) : (left_distance / 5);
    }

    left_x = fea_min_x - offset_left_x;
    right_x = fea_max_x + offset_right_x;
    fea_x = (left_distance > right_distance) ? left_x : right_x;

    date_popup_coordinate = [fea_x,fea_y];
}

function set_date_popup_coordinate_for_feature_list(feature_list)
{
    var map_extent = (map.getView()).calculateExtent(map.getSize());

    var map_min_x = map_extent[0] + (map_extent[2] - map_extent[0]) * 0.3;
    var map_min_y = map_extent[1];
    var map_max_x = map_extent[2];
    var map_max_y = map_extent[3];

    var fea_min_x = map_extent[2];
    var fea_min_y = map_extent[3];
    var fea_max_x = map_extent[0];
    var fea_max_y = map_extent[1];

    for(var i=0; i<feature_list.length; i++)
    {
        var geometry = feature_list[i].getGeometry();
        var coordinates = geometry.getFirstCoordinate();
        var x = coordinates[0];
        var y = coordinates[1];
        fea_min_x = Math.min(fea_min_x, x);
        fea_min_y = Math.min(fea_min_y, y);
        fea_max_x = Math.max(fea_max_x, x);
        fea_max_y = Math.max(fea_max_y, y);
    }
    var low_distance = Math.max((fea_min_y - map_min_y), 0.05);
    var top_distance = Math.max((map_max_y - fea_max_y), 0.05);
    var left_distance = Math.max((fea_min_x - map_min_x), 0.05);
    var right_distance = Math.max((map_max_x - fea_max_x), 0.05);

    var offset_top_y = (( top_distance / low_distance ) < 2 ) ? (top_distance / 5) : (top_distance / 7);
    var top_y = fea_max_y + offset_top_y;
    var offset_low_y = (( low_distance / top_distance  ) < 2 ) ? (low_distance / 4) : (low_distance / 6);
    var low_y = fea_min_y - offset_low_y;

    var fea_y, fea_x;
    var offset_left_x, offset_right_x;
    var left_x,right_x;
    if (top_distance*1.5 > low_distance)
    {
        fea_y = top_y;
        offset_left_x = (( left_distance / right_distance ) < 2 ) ? (left_distance / 5) : (left_distance / 6);
        offset_right_x = (( right_distance / left_distance ) < 2 ) ? (left_distance / 6) : (left_distance / 7);
    }
    else
    {
        fea_y = low_y;
        offset_left_x = (( left_distance / right_distance ) < 2 ) ? (left_distance / 3) : (left_distance / 4);
        offset_right_x = (( right_distance / left_distance ) < 2 ) ? (left_distance / 4) : (left_distance / 5);
    }

    left_x = fea_min_x - offset_left_x;
    right_x = fea_max_x + offset_right_x;
    fea_x = (left_distance > right_distance) ? left_x : right_x;

    date_popup_coordinate = [fea_x,fea_y];
}

function addDaysFeature()
{
    if(index_playing_Animation >= days_cluster_datetime.length)
    {
        index_playing_Animation = 0;
        stopAnimation();
        return;
    }

    if(!animation_add_mode)
    {
        source_Animation.clear();
    }

    var index_day = days_cluster_datetime[index_playing_Animation];
    var feature_list = days_cluster_features[index_day];
    if(feature_list.length > 0)
    {
        set_date_popup_coordinate_for_feature_list(feature_list);

        content_popup.innerHTML = '<h3><code>' + index_day + '</code></h3>';
        //'<p>日期:<code>' + index_day + '</code></p>';
        overlay_popup.setPosition(date_popup_coordinate);

        if(animation_add_mode && pause_recycle)
        {
            for(var i=0; i<feature_list.length; i++)
            {
                source_Animation.removeFeature(feature_list[i]);
            }
        }
        source_Animation.addFeatures(feature_list);
    }

    index_playing_Animation++;

    display_location_txt.value = index_playing_Animation;
    display_location_range.value = index_playing_Animation;

    var pause_loc = Number(pause_location_txt.value);
    if(pause_loc == index_playing_Animation)
    {
        index_playing_Animation-- ;
        pause_recycle = true;
    }
}

function get_geo_layer_checked_index(checked_index)
{
    var count = geo_layer_checked.length;
    var sum = 0;
    for(var i=0; i<count; i++)
    {
        if(geo_layer_checked[i])
        {
            if(checked_index == sum)
            {
                return i;
            }
            sum++;
        }
    }
    return -1;
}

function changeDisasterLayerShow()
{
    if(index_playing_Animation == geo_layer_checked_count)
    {
        index_playing_Animation = 0;
        stopAnimation();
        return;
    }

    var index_layer = get_geo_layer_checked_index(index_playing_Animation);
    if(animation_add_mode)
    {
        add_one_beidou_layer_visable(index_layer);
    }
    else
    {
        set_only_one_beidou_layer_visable(index_layer);
    }

    set_date_popup_coordinate_for_layer(index_layer);

    var datetime_from_to = geo_datetime_from_to[index_layer];
    content_popup.innerHTML = '<h3><p>从<code>' + datetime_from_to[0] + '</code></p>' +  '<p>到<code>' + datetime_from_to[1] + '</code></p></h3>';

    overlay_popup.setPosition(date_popup_coordinate);

    index_playing_Animation++;

    display_location_txt.value = index_playing_Animation;
    display_location_range.value = index_playing_Animation;

    var pause_loc = Number(pause_location_txt.value);
    if(pause_loc == index_playing_Animation)
    {
        index_playing_Animation-- ;
        pause_recycle = true;
    }
}

function pauseAnimation()
{
    if(myAnimationTimer == null)
    {
        return;
    }

    pause_location_txt.value = index_playing_Animation;
    pause_recycle = true;
    index_playing_Animation--;
}

function startAnimation()
{
    if(auto_load_checkbox.checked)
    {
        auto_load_checkbox.checked = false;
    }

    if(animation_playing)
    {
        stopAnimation();
    }

    animation_playing = true;
    animation_add_mode  = animation_add_mode_radio.checked;

    if(myAnimationTimer != null)
    {
        if(pause_recycle)
        {
            pause_location_txt.value = "";
            pause_recycle = false;
            index_playing_Animation++ ;
        }
        return;
    }

    var speed = Number(display_speed_txt.value);
    if ((speed < 1) || (speed > 5))
    {
        alert('请先正确设置播放参数');
        return;
    }

    set_all_beidou_layer_visable_or_not(false);

    var duration = Number(display_speed_input.value)*1000;

    if(radio_animation_day.checked)
    {
        myAnimationTimer = setInterval(addDaysFeature, duration);
    }
    else
    {
        myAnimationTimer = setInterval(changeDisasterLayerShow, duration);
    }

    set_fixed_date_popup_coordinate();
}

display_speed_input.addEventListener('input', function() {
    display_speed_txt.value = display_speed_input.value;
    stopAnimation();
});

start_animation_button.addEventListener('click', startAnimation, false);
stop_animation_button.addEventListener('click', stopAnimation, false);
pause_animation_button.addEventListener('click', pauseAnimation, false);

function flash(feature)
{
    set_days_animation_feature_style(feature);

    var start = new Date().getTime();
    var listenerKey;

    var duration = Number(display_speed_input.value)*1000;

    function animate(event) {
        var vectorContext = event.vectorContext;
        var frameState = event.frameState;
        var flashGeom = feature.getGeometry().clone();
        var elapsed = frameState.time - start;
        var elapsedRatio = elapsed / duration;
        // radius will be 5 at start and 30 at end.
        var radius = ol.easing.easeOut(elapsedRatio) * 25 + 5;
        var opacity = ol.easing.easeOut(1 - elapsedRatio);

        var style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: radius,
                snapToPixel: false,
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 0, 0, ' + opacity + ')',
                    width: 0.25 + opacity
                })
            })
        });

        vectorContext.setStyle(style);
        vectorContext.drawGeometry(flashGeom);
        if (elapsed > duration) {
            ol.Observable.unByKey(listenerKey);
            return;
        }
        // tell OL3 to continue postcompose animation
        map.render();
    }
    listenerKey = map.on('postcompose', animate);
}

source_Animation.on('addfeature', function(e) {
    flash(e.feature);
});

