var get_style_by_disaster_rank = function (index_rank) {
    var radius = 0;
    //var magnitude = 1;
    var zoom_num = map.getView().getZoom();
    var img_opacity = 0.5;
    if (zoom_num < 8) {
        img_opacity = 1; //0.6;
        switch (index_rank) {
            case 1:
                radius = 48;
                break;
            case 2:
                radius = 32;
                break;
            case 3:
                radius = 24;
                break;
            case 4:
                radius = 16;
                break;
            default:
                radius = 100;
                break;
        }
    }
    else if (zoom_num < 10) {
        img_opacity = 1;//0.8;

        switch (index_rank) {
            case 1:
                radius = 64;
                break;
            case 2:
                radius = 48;
                break;
            case 3:
                radius = 32;
                break;
            case 4:
                radius = 16;
                break;
            default:
                radius = 100;
                break;
        }
    }
    else {
        img_opacity = 1;
        switch (index_rank) {
            case 1:
                radius = 64;
                break;
            case 2:
                radius = 64;
                break;
            case 3:
                radius = 64;
                break;
            case 4:
                radius = 64;
                break;
            default:
                radius = 100;
                break;
        }
    }
    var index_opacity = Math.round(img_opacity * 10);
    var style_index = index_rank.toString() + radius.toString() + index_opacity.toString();
    var style = styleCache[style_index];
    if (!style) {
        var img_path = './img/rank_' + index_rank.toString() + '.png';
        var img_scale = radius / 64.0;
        var rank_img = new ol.style.Icon({
            scale: img_scale,
            src: img_path
        });
        rank_img.setOpacity(img_opacity);

        style = new ol.style.Style({
            image: rank_img
        });
        styleCache[style_index] = style;
    }
    return style;
};

var various_styleFunction = function (feature) {
    var info_json = feature.getProperties();
    var rank_index = info_json['disaster_rank_of_log'];

    var style = get_style_by_disaster_rank(rank_index);

    return style;
};

function set_days_animation_feature_style(feature) {
    var info_json = feature.getProperties();
    var index_rank = info_json['disaster_rank_of_log'];

    var radius = 0;
    var zoom_num = map.getView().getZoom();
    var img_opacity = 0.5;
    var radius = 0;
    //var magnitude = 1;
    var zoom_num = map.getView().getZoom();
    var img_opacity = 0.5;
    if (zoom_num < 8) {
        img_opacity = 1; //0.6;
        switch (index_rank) {
            case 1:
                radius = 48;
                break;
            case 2:
                radius = 32;
                break;
            case 3:
                radius = 24;
                break;
            case 4:
                radius = 16;
                break;
            default:
                radius = 100;
                break;
        }
    }
    else if (zoom_num < 10) {
        img_opacity = 1;//0.8;

        switch (index_rank) {
            case 1:
                radius = 64;
                break;
            case 2:
                radius = 48;
                break;
            case 3:
                radius = 32;
                break;
            case 4:
                radius = 16;
                break;
            default:
                radius = 100;
                break;
        }
    }
    else {
        img_opacity = 1;

        switch (index_rank) {
            case 1:
                radius = 64;
                break;
            case 2:
                radius = 64;
                break;
            case 3:
                radius = 64;
                break;
            case 4:
                radius = 64;
                break;
            default:
                radius = 100;
                break;
        }
    }
    var index_opacity = Math.round(img_opacity * 10);
    var style_index = index_rank.toString() + radius.toString() + index_opacity.toString();
    var style = styleCache[style_index];
    if (!style) {
        var img_path = './img/rank_' + index_rank.toString() + '.png';
        var img_scale = radius / 64.0;
        var rank_img = new ol.style.Icon({
            scale: img_scale,
            src: img_path
        });
        rank_img.setOpacity(img_opacity);

        style = new ol.style.Style({
            image: rank_img
        });
        styleCache[style_index] = style;
    }

    feature.setStyle(style);
}


