
var sidebar_page_id;

var vectorPoints_layer_disasters = new Array();
var geoSource_layer_disasters = new Array();
var geoFile_layer_disasters = new Array();

var count_geoSource_disasters_layers_exist = 0;
var count_geoSource_disasters_layers_ready = 0;
var count_feature_log_exist = 0;
var count_feature_log_ready = 0;

var geojson_file_name_list = [];
var geo_layer_checked = [];
var geo_feature_checked = [];
var geo_layer_checked_count = 0;
var geo_datetime_from_to = [];

var animation_playing = false;

var dataroot="./data/list.json";
var $checkableTree;

var count_load = 0;
var timedMsg = null;

var history_all_disaster_count = 0;
var history_all_log_count = 0;

//var history_all_max_flood_rank = '';
var history_all_building_collapse = 0;
var history_all_bankburst_num = 0;
var history_all_bankburst_meter = 0;
var history_all_landslide_num = 0;
var history_all_landslide_cubic_meter = 0;
//var history_all_max_freeze_injury_rank = '';
//var history_all_max_debrisflow = '';
var history_all_injured_population = 0;
var history_all_dead_population = 0;
var history_all_disaster_area = 0;
var history_all_affected_population = 0;
var history_all_economic_losses = 0;

//var history_all_max_tropical_cyclone = '';
var history_all_max_rainfall = 0;
var history_all_max_tidemark = 0;
var history_all_max_wave = 0;
var history_all_min_lowest_temperature = 0;

var days_cluster_features = new Array();
var days_cluster_datetime = new Array();

var myAnimationTimer = null;
var index_playing_Animation = 0;
var pause_recycle = false;
var animation_add_mode = true;

var date_popup_coordinate = null;

var styleCache = {};

var max_km_select_feature = [ 400, 200, 100, 40,  20,  10, 10,  4, 2, 1, 0.6, 0.3, 0.15 ];

var select_mouse_disable = true;
var select_time_disable = true;

var mySelectEnableTimer = null;// = setInterval(myTimerSelect, 500);

var mouse_select_stroke = new ol.style.Stroke({
    color: 'rgba(0,0,255,0.9)',
    width: 3
});
var mouse_select_style = new ol.style.Style({
    stroke: mouse_select_stroke,
    image: new ol.style.Circle({
        radius: 30,
        stroke: mouse_select_stroke
    })
});

var timerDelayLayerCheck = null;

var timerAutoLoading = null;