
function GetDaysMultiPoint()
{
    days_cluster_features.splice(0, days_cluster_features.length);
    days_cluster_features = [];
    days_cluster_datetime.splice(0, days_cluster_datetime.length);
    days_cluster_datetime = [];

    for (var i = 0; i< vectorPoints_layer_disasters.length; i++)
    {
        if(!geo_layer_checked[i]) { continue; }

        var geoSource = geoSource_layer_disasters[i];
        var originalFeatures = geoSource.getFeatures();
        var size = originalFeatures.length;

        for (var j = 0; j < size; j++)
        {
            var info_json = originalFeatures[size - 1 - j].getProperties();
            var year_s = info_json['year'];
            var month_s = info_json['month'];
            var day_s = info_json['day'];
            /*var hour = parseInt(info_json['hour']);
             var hour_s = (hour < 10) ? ('0' + hour.toString()) : hour.toString();
             var minute = parseInt(info_json['minute']);
             var minute_s = (minute < 10) ? ('0' + minute.toString()) : minute.toString();
             var date_time = year_s + '-' + month_s + '-' + day_s + ' ' + hour_s + ':' + minute_s;*/
            var date_time = year_s + '-' + month_s + '-' + day_s;

            if(days_cluster_features[date_time] == null)
            {
                days_cluster_datetime.push(date_time);
                days_cluster_features[date_time] = new Array();
            }

            days_cluster_features[date_time].push(originalFeatures[j]);
        }
    }
}

function set_animation_days()
{
    var days = days_cluster_datetime.length;
    document.getElementById("label-max-frame").innerHTML = days.toString();
    document.getElementById("display-location-range").max = days;
}

function set_animation_disaster()
{
    document.getElementById("label-max-frame").innerHTML = geo_layer_checked_count.toString();
    document.getElementById("display-location-range").max = geo_layer_checked_count;
}

radio_animation_day.addEventListener('click', set_animation_days, false);
radio_animation_disaster.addEventListener('click', set_animation_disaster, false);

function set_animation_range()
{
    if(radio_animation_day.checked)
    {
        set_animation_days();
    }
    else
    {
        set_animation_disaster();
    }
}
