<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>beidou-log</title>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <link rel="stylesheet" href="./lib/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="./lib/ol/ol.css" type="text/css">

    <link rel="stylesheet" href="./css/ol3-sidebar.css"/>
    <link rel="stylesheet" href="./lib/bootstrap-3.3.7-dist/css/bootstrap.css"/>

    <link rel="stylesheet" href="./css/beidou-report.css"/>
    <link rel="stylesheet" href="./css/overviewmap-custom.css"/>
    <link rel="stylesheet" href="./css/ol-feature-select-popup.css">

    <link rel="stylesheet" href="./lib/bootstrap-treeview-1.2.0/src/css/bootstrap-treeview.css">
</head>
<body>
<div id="sidebar" class="sidebar collapsed"> <!-- collapsed -->
    <!-- Nav tabs -->
    <div class="sidebar-tabs">
        <ul role="tablist">
            <li><a href="#map-view" role="tab"><i class="fa fa-map-o fa-fw" aria-hidden="true"></i></a></li>
            <li><a href="#data-list" role="tab"><i class="fa fa-list-ol fa-fw" aria-hidden="true"></i></a></li>
            <li><a href="#geo-animation" role="tab"><i class="fa fa-play-circle-o fa-fw" aria-hidden="true"></i></a>
            </li>
        </ul>
        <ul role="tablist">
            <li><a href="#disaster-log-info" role="tab"><i class="fa fa-file-text-o fa-fw" aria-hidden="true"></i></a>
            <li><a href="#disaster-plan-info" role="tab"><i class="fa fa-book fa-fw" aria-hidden="true"></i></a>
            <li><a href="#early-waring-info" role="tab"><i class="fa fa-shield fa-fw" aria-hidden="true"></i></a>
            </li>
            <li><a href="#whole-history-log-info" role="tab"><i class="fa fa-calculator fa-fw"
                                                                aria-hidden="true"></i></a></li>
        </ul>
    </div>

    <!-- Tab panes -->
    <div class="sidebar-content">
        <div class="sidebar-pane" id="map-view">
            <h1 class="sidebar-header"><label>地图显示参数</label><span class="sidebar-close"><i class="fa fa-caret-left"></i></span>
            </h1>
            <div class="panel-group">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i id="icon-loading" class="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true"></i>地图与北斗数据加载与绘图：
                    </div>
                    <div class="panel-body">
                        <label id="map-load">等待初始化......</label>
                        <ul class="list-group">
                            <li class="list-group-item list-group-item-info">
                                <div>
                                    <label class="checkbox-inline"><input type="checkbox" value="" id="check-auto-load">实时自动更新</label>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <form class="form-inline">
                                    <div class="form-group">
                                        <label>N秒(默认60):</label>
                                        <input id="auto-load-n-second-txt" type="text" size="3" value="60" disabled/>
                                    </div>
                                    <div class="form-group">
                                        <input id="auto-load-n-second-input" type="range" min="10" max="6000" step="10"
                                               value="60"/>
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-sort-amount-desc fa-2x fa-fw" aria-hidden="true"></i>灾害等级图标：
                    </div>
                    <div class="panel-body">
                        <table id="ship-icon-table" class="table table-condensed">
                            <tr style="background-color: #d6e9c6; font-weight:bold;">
                                <td>特别重大I级</td>
                                <td>重大Ⅱ级</td>
                                <td>较大Ⅲ级</td>
                                <td>一般Ⅳ级</td>
                            </tr>
                            <tr>
                                <td><img class="img-responsive" src="./img/rank_1.png" alt="特别重大 I 级" id="img-red"></td>
                                <td><img class="img-responsive" src="./img/rank_2.png" alt="重大 Ⅱ 级" id="img-orange">
                                </td>
                                <td><img class="img-responsive" src="./img/rank_3.png" alt="较大 Ⅲ 级" id="img-yellow">
                                </td>
                                <td><img class="img-responsive" src="./img/rank_4.png" alt="一般 Ⅳ 级" id="img-blue"></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-sort-amount-desc fa-2x fa-fw" aria-hidden="true"></i>预警等级图标：
                    </div>
                    <div class="panel-body">
                        <table id="ship-icon-table" class="table table-condensed">
                            <tr style="background-color: #d6e9c6; font-weight:bold;">
                                <td>I 级预警</td>
                                <td>Ⅱ 级预警</td>
                                <td>Ⅲ 级预警</td>
                                <td>Ⅳ 级预警</td>
                            </tr>
                            <tr>
                                <td><img class="img-responsive" src="./img/1.png" alt="特别重大 I 级" id="img-red"></td>
                                <td><img class="img-responsive" src="./img/2.png" alt="重大 Ⅱ 级" id="img-orange"></td>
                                <td><img class="img-responsive" src="./img/3.png" alt="较大 Ⅲ 级" id="img-yellow"></td>
                                <td><img class="img-responsive" src="./img/4.png" alt="一般 Ⅳ 级" id="img-blue"></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-mouse-pointer fa-2x fa-fw" aria-hidden="true"></i>鼠标操作参数：
                    </div>
                    <div class="panel-body">
                        <table class="table table-condensed"> <!--  table-condensed table-striped -->
                            <tr class="success">
                                <td>地图缩放参数（滚轮控制）</td>
                                <td id="zoom-level">xx</td>
                            </tr>
                            <tr class="info">
                                <td>图元自动选取（鼠标左键单击切换）</td>
                                <td id="select-enable-or-not">禁止</td>
                            </tr>
                            <tr class="warning">
                                <td>鼠标经纬度（鼠标移动）</td>
                                <td id="mouse-position"></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="sidebar-pane" id="data-list">
            <h1 class="sidebar-header"><label>事件列表</label><span class="sidebar-close"><i
                            class="fa fa-caret-left"></i></span></h1>
            <div class="panel-group">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-sort-amount-desc fa-2x fa-fw" aria-hidden="true"></i>按照时间排序：
                    </div>
                    <div class="panel-body">
                        <div>
                            <button type="button" class="btn btn-success" id="btn-expand-all">全部展开</button>
                            <button type="button" class="btn btn-danger" id="btn-collapse-all">全部收缩</button>
                            <button type="button" class="btn btn-success" id="btn-check-all">全部选择</button>
                            <button type="button" class="btn btn-danger" id="btn-uncheck-all">全部不选</button>
                        </div>
                        <div class="form-group">
                            <label for="input-search-log" class="sr-only">查找</label>
                            <input type="input" class="form-control" id="input-search-log" placeholder="试着查找......"
                                   value="">
                        </div>
                        <div id="treeview-checkable-disaster-list"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="sidebar-pane" id="geo-animation">
            <h1 class="sidebar-header"><label>数据动画播放</label><span class="sidebar-close"><i class="fa fa-caret-left"></i></span>
            </h1>
            <div class="panel-group">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-wrench fa-2x fa-fw" aria-hidden="true"></i>参数设置：
                    </div>
                    <div class="panel-body">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <form class="form-inline">
                                    <div class="form-group">
                                        <label>每帧N秒(默认3):</label>
                                        <input id="display-n-frame-txt" type="text" size="3" value="3" disabled/>
                                    </div>
                                    <div class="form-group">
                                        <input id="display-n-frame-input" type="range" min="1" max="5" step="1"
                                               value="3"/>
                                    </div>
                                </form>
                            </li>
                            <li class="list-group-item">
                                <label>暂停位置</label>
                                <input id="pause-location-txt" type="text" size="3" value=""
                                       onkeyup="this.value=this.value.replace(/\D/g,'');if((this.value>31)||(this.value<1)){this.value=''};"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')"/>
                                <label>重复播放</label>
                            </li>
                            <li class="list-group-item">
                                <label>动画绘图模式：</label>
                                <label class="radio-inline"><input type="radio" class="btn btn-primary btn-md"
                                                                   name="animation-mode" checked>重绘</label>
                                <label class="radio-inline"><input type="radio" class="btn btn-primary btn-md"
                                                                   name="animation-mode"
                                                                   id="radio-animation-add-mode">叠加</label>
                            </li>
                            <li class="list-group-item">
                                <label>动画播放数据单位：</label>
                                <label class="radio-inline"><input type="radio" name="animation-unit"
                                                                   id="radio-animation-disaster" checked>灾害</label>
                                <label class="radio-inline"><input type="radio" name="animation-unit"
                                                                   id="radio-animation-day">天</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-info fa-2x fa-fw" aria-hidden="true"></i>播放位置：
                    </div>
                    <div class="panel-body">
                        <ul class="list-group">
                            <li class="list-group-item list-group-item-success">
                                <label>帧序号:（1-</label>
                                <label for="display-location-range" id="label-max-frame">1</label>
                                <label>）&nbsp;</label>
                                <input id="display-location-txt" type="text" size="3" value="0" disabled/>
                            </li>
                            <li class="list-group-item list-group-item-info">
                                <input id="display-location-range" type="range" min="0" max="31" step="1" value="0">
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-play fa-lg fa-fw" aria-hidden="true"></i>
                        <i class="fa fa-stop fa-lg fa-fw" aria-hidden="true"></i>
                        <i class="fa fa-pause fa-lg fa-fw" aria-hidden="true"></i>
                    </div>
                    <div class="panel-body">
                        <div>
                            <button type="button" class="btn btn-primary btn-md" id="display-start-animation">播放
                            </button>
                            <button type="button" class="btn btn-primary btn-md" id="display-stop-animation">停止</button>
                            <label>或者</label>
                            <button type="button" class="btn btn-primary btn-md" id="pause-current-location">暂停</button>
                        </div>
                        <div>
                            <p></p>
                            <h4><span class="label label-success">提示：点击“播放”将会关闭“实时自动更新”；</span>
                                <span class="label label-success">如需自动更新，请重新点击“实时自动更新”；</span></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="sidebar-pane" id="disaster-log-info">
            <h1 class="sidebar-header"><label id="label-disaster-rank">某等级</label><label>单次灾害日志</label>
                <span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>
            <div class="panel-group">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="fixed-table-log" class="table table-condensed">
                            <tr style="background-color: #9acfea">
                                <th>时间</th>
                                <th>北斗号</th>
                                <th>经度</th>
                                <th>纬度</th>
                            </tr>
                            <tr>
                                <td>xx</td>
                                <td>xx</td>
                                <td>xx</td>
                                <td>xx</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="fixed-table-disaster" class="table table-condensed">
                            <tr style="background-color: #d6e9c6; font-weight:bold;">
                                <th>死亡人数</th>
                                <th>受伤人数</th>
                                <th>建筑崩塌</th>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr style="background-color: #d6e9c6; font-weight:bold;">
                                <th>影响面积<p>平方公里</p></th>
                                <th>转移安置人数</th>
                                <th>经济损失<p>万元</p></th>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr style="background-color: #d6e9c6; font-weight:bold;">
                                <th>洪涝等级</th>
                                <th>冻害等级</th>
                                <th>泥石流等级</th>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr style="background-color: #d6e9c6; font-weight:bold;">
                                <th>决堤数量</th>
                                <th>决堤长度（米）</th>
                                <th>滑坡数量</th>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr style="background-color: #d6e9c6; font-weight:bold;">
                                <th>滑坡体积<p>立方米</p></th>
                                <th>台风级别</th>
                                <th>雨量</th>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr style="background-color: #d6e9c6; font-weight:bold;">
                                <th>潮位</th>
                                <th>浪高</th>
                                <th>最低温度(℃)</th>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="sidebar-pane" id="disaster-plan-info">
            <h1 class="sidebar-header"><label>决策信息</label><span class="sidebar-close"><i
                            class="fa fa-caret-left"></i></span></h1>
            <div class="panel-group">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2 id="plan-title">灾害处理预案</h2>
                    </div>
                    <div class="panel-body">
                        <p id="plan-content">
                            暂无相关信息,请选择受灾区
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="sidebar-pane" id="early-waring-info">
            <h1 class="sidebar-header"><label>预警信息</label><span class="sidebar-close"><i
                            class="fa fa-caret-left"></i></span></h1>
            <div class="panel-group">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h2 id="early-warning-title">自然灾害预警信息</h2>
                    </div>
                    <div class="panel-body">
                        <p id="early-warning-content">
                            暂无相关信息,请选择预警区
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="sidebar-pane" id="whole-history-log-info">
            <h1 class="sidebar-header"><label id="label-history-range">历史</label><label>灾害总量统计</label>
                <span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>
            <div class="panel-group">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="header-table-history" class="table table-condensed">
                            <tr style="background-color: #9acfea">
                                <th>灾害时间分段次数</th>
                                <th>受灾天数</th>
                                <th>北斗记录次数</th>
                            </tr>
                            <tr>
                                <td>xx</td>
                                <td>xx</td>
                                <td>xx</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table id="info-table-history" class="table table-condensed">
                            <tr style="background-color: #d6e9c6; font-weight:bold;">
                                <th>死亡人数</th>
                                <th>受伤人数</th>
                                <th>建筑崩塌</th>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr style="background-color: #d6e9c6; font-weight:bold;">
                                <th>影响面积<p>平方公里</p></th>
                                <th>转移安置人数</th>
                                <th>经济损失<p>万元</p></th>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr style="background-color: #d6e9c6; font-weight:bold;">
                                <th>决堤数量</th>
                                <th>决堤长度（米）</th>
                                <th>滑坡数量</th>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr style="background-color: #d6e9c6; font-weight:bold;">
                                <th>滑坡体积<p>立方米</p></th>
                                <th>最大雨量</th>
                                <th>最低温度(℃)</th>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr style="background-color: #d6e9c6; font-weight:bold;">
                                <th>最高潮位</th>
                                <th>最高浪高</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>0</td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="map" class="sidebar-map"></div>

<div id="popup-feature-select" class="ol-feature-select-popup">
    <a href="#" id="popup-feature-select-closer" class="ol-feature-select-popup-closer"></a>
    <div id="popup-feature-select-content"></div>
</div>

<script src="./lib/jquery-3.1.1/jquery-3.1.1.min.js"></script>
<script src="./lib/ol/ol.js"></script>
<script src="./js/jquery-sidebar-modify.js"></script>

<script src="./js/common.min.js"></script>

<script src="./lib/bootstrap-treeview-1.2.0/src/js/bootstrap-treeview.js"></script>
<script src="./js/moment-with-locales.min.js"></script>

<script src="./js/global-variate.js"></script>
<script src="./js/panel-object.js"></script>
<script src="./js/initial-map-before-geodate-load.js"></script>
<script src="./js/initial-panel-before-geodate-load.js"></script>
<script src="./js/geo-history-statistics-show.js"></script>
<script src="./js/ol-geo-feature-style.js"></script>
<script src="./js/geodata-load.js"></script>
<script src="./js/map-geodata-loading-progress.js"></script>

<script async src="./js/ol-geo-select-feature.js"></script>
<script async src="./js/ol-geo-layer-operation.js"></script>
<script async src="./js/geodata-list-button.js"></script>
<script async src="./js/ol-geo-animation.js"></script>
<script async src="./js/auto-load-all-layers.js"></script>
<script async>
    var earlyWarningData = [];
    $.ajax({
        url: "/api/warning",
        type: "get",
        data: null,
        success: function (data) {
            earlyWarningData = data;
            for (var i in earlyWarningData) {
                var anchor = new ol.Feature({
                    geometry: new ol.geom.Point(earlyWarningData[i].coordinate)
                });
                anchor.setStyle(new ol.style.Style({
                    image: new ol.style.Icon({
                        src: './img/' + earlyWarningData[i].level + '.png',
                        scale: map.getView().getZoom() / 12
                    })
                }));

                anchor.content = earlyWarningData[i].content;
                anchor.title = earlyWarningData[i].title;

                anchor.on('click', function (e) {
                    open_sidebar_id(sidebar, "early-waring-info");
                    $('#early-warning-title').html(this.title);
                    $('#early-warning-content').html(this.content);
                });

                alarm_layer.getSource().addFeature(anchor);
            }
        }
    });
    map.on('click', function (event) {
        map.forEachFeatureAtPixel(event.pixel, function (feature) {
            feature.dispatchEvent({type: 'click', event: event});
        });
    });
</script>
</body>
</html>
