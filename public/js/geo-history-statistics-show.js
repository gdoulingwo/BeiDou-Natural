
function initial_history_statistics()
{
    history_all_disaster_count = 0;
    history_all_log_count = 0;

    //history_all_max_flood_rank = '';
    history_all_building_collapse = 0;
    history_all_bankburst_num = 0;
    history_all_bankburst_meter = 0;
    history_all_landslide_num = 0;
    history_all_landslide_cubic_meter = 0;
    //history_all_max_freeze_injury_rank = '';
    //history_all_max_debrisflow = '';
    history_all_injured_population = 0;
    history_all_dead_population = 0;
    history_all_disaster_area = 0;
    history_all_affected_population = 0;
    history_all_economic_losses = 0;

    //history_all_max_tropical_cyclone = '';
    history_all_max_rainfall = 0;
    history_all_max_tidemark = 0;
    history_all_max_wave = 0;
    history_all_min_lowest_temperature = 0;
}

function feature_history_statistics(fea)
{
    var info_json = fea.getProperties();

    var disaster = info_json['disaster'];
    //var FloodRank = disaster['FloodRank'];
    var BuildingCollapse = parseInt(disaster['BuildingCollapse']);
    var BankBurst_Num = parseInt(disaster['BankBurst_Num']);
    var BankBurst_Meter = parseFloat(disaster['BankBurst_Meter']);
    var Landslide_Num = parseInt(disaster['Landslide_Num']);
    var Landslide_Cubic_Meter = parseFloat(disaster['Landslide_Cubic_Meter']);
    //var FreezeInjuryRank = disaster['FreezeInjuryRank'];
    //var DebrisFlow = disaster['DebrisFlow'];
    var InjuredPopulation = parseInt(disaster['InjuredPopulation']);
    var DeadPopulation = parseInt(disaster['DeadPopulation']);
    var DisasterArea = parseFloat(disaster['DisasterArea']);
    var AffectedPopulation = parseInt(disaster['AffectedPopulation']);
    var EconomicLosses = parseFloat(disaster['EconomicLosses']);

    var meteorology = info_json['meteorology'];
    //var TropicalCyclone = meteorology['TropicalCyclone'];
    var RainFall = parseFloat(meteorology['RainFall']);
    var TideMark = parseFloat(meteorology['TideMark']);
    var Wave = parseFloat(meteorology['Wave']);
    var LowestTemperature = parseFloat(meteorology['LowestTemperature']);

    history_all_building_collapse += BuildingCollapse;
    history_all_bankburst_num += BankBurst_Num;
    history_all_bankburst_meter += BankBurst_Meter;
    history_all_landslide_num += Landslide_Num;
    history_all_landslide_cubic_meter += Landslide_Cubic_Meter;
    history_all_injured_population += InjuredPopulation;
    history_all_dead_population += DeadPopulation;
    history_all_disaster_area += DisasterArea;
    history_all_affected_population += AffectedPopulation;
    history_all_economic_losses += EconomicLosses;

    history_all_max_rainfall = Math.max( history_all_max_rainfall, RainFall );
    history_all_max_tidemark = Math.max( history_all_max_tidemark, TideMark );
    history_all_max_wave = Math.max( history_all_max_wave, Wave);
    history_all_min_lowest_temperature = Math.min(history_all_min_lowest_temperature, LowestTemperature);
}

function run_history_statistics()
{
    var count_layers = geoSource_layer_disasters.length;

    for(var i=0; i<count_layers; i++)
    {
        if (!geo_layer_checked[i]) {     continue;       }

        history_all_disaster_count++;

        var feature_list = geoSource_layer_disasters[i].getFeatures();
        var count_feature = feature_list.length;
        for (var j = 0; j < count_feature; j++)
        {
            history_all_log_count++;
            feature_history_statistics(feature_list[j]);
        }
    }
}

function output_to_panel_history_statistics()
{
    var tab1 = document.getElementById('header-table-history');
    var row1_tab1 = tab1.rows[1];
    row1_tab1.cells[0].innerHTML = history_all_disaster_count;
    row1_tab1.cells[1].innerHTML = days_cluster_datetime.length;
    row1_tab1.cells[2].innerHTML = history_all_log_count;

    var tab2 = document.getElementById('info-table-history');

    var row1_tab2 = tab2.rows[1];
    row1_tab2.cells[0].innerHTML = history_all_dead_population;
    row1_tab2.cells[1].innerHTML = history_all_injured_population;
    row1_tab2.cells[2].innerHTML = history_all_building_collapse;

    var row3_tab2 = tab2.rows[3];
    row3_tab2.cells[0].innerHTML = history_all_disaster_area;
    row3_tab2.cells[1].innerHTML = history_all_affected_population;
    row3_tab2.cells[2].innerHTML = history_all_economic_losses;

    var row5_tab2 = tab2.rows[5];
    row5_tab2.cells[0].innerHTML = history_all_bankburst_num;
    row5_tab2.cells[1].innerHTML = history_all_bankburst_meter;
    row5_tab2.cells[2].innerHTML = history_all_landslide_num;

    var row7_tab2 = tab2.rows[7];
    row7_tab2.cells[0].innerHTML = history_all_landslide_cubic_meter;
    row7_tab2.cells[1].innerHTML = history_all_max_rainfall;
    row7_tab2.cells[2].innerHTML = history_all_min_lowest_temperature;

    var row9_tab2 = tab2.rows[9];
    row9_tab2.cells[0].innerHTML = history_all_max_tidemark;
    row9_tab2.cells[1].innerHTML = history_all_max_wave;
}

function show_history_statistics()
{
    initial_history_statistics();

    run_history_statistics();

    output_to_panel_history_statistics()
}