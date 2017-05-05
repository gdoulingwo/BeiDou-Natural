var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(3),
    projection: 'EPSG:4326',
    // comment the following two lines to have the mouse position
    // be placed within the map.
    className: 'custom-mouse-position',
    //target: document.getElementById('mouse-position'),
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;'
});

var osmTile_layer = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var alarm_layer = new ol.layer.Vector({
    source: new ol.source.Vector()
});


/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay_popup = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
    element: container_popup,
    positioning: 'bottom-left',
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
}));

var point_popup = null;
var line_popup = null;

var sidebar = $('#sidebar').sidebar();
open_sidebar_id(sidebar, "map-view");

var overlay_close = function () {
    overlay_popup.setPosition(undefined);
    closer_popup.blur();
    point_popup = null;
    line_popup = null;
    open_sidebar_id(sidebar, "map-view");
    map.render();
    return false;
};
/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer_popup.onclick = overlay_close;

var map = new ol.Map({
    controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
        })
    }).extend([mousePositionControl]),
    layers: [osmTile_layer, alarm_layer], //,
    renderer: common.getRendererFromQueryString(),
    overlays: [overlay_popup],
    target: 'map',
    view: new ol.View({
        projection: 'EPSG:4326',    //center: ol.proj.transform([114, 15], 'EPSG:4326', 'EPSG:3857'), OSM原本是EPSG:3857
        center: [112, 23], // [105.6, 5.5],// [104.6, 6.5], //[110, 15],
        zoom: 7,
        minZoom: 6,
        maxZoom: 18
    })
});

//添加比例尺控件
map.addControl(new ol.control.ScaleLine());

//添加缩放控件
map.addControl(new ol.control.Zoom());

function display_into_input_toFixed(id, value, n_fixed) {
    document.getElementById(id).innerHTML = value.toFixed(n_fixed);
}

function onMoveEnd(evt) {
    var map = evt.map;
    var zoom_num = map.getView().getZoom();
    display_into_input_toFixed('zoom-level', zoom_num, 0);

    /*
     var resolution_num = map.getView().getResolution();
     display_into_input_toFixed('resolution-level', resolution_num, 3);
     */
}
map.on('moveend', onMoveEnd);
