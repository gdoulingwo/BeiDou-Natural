
function myBaseMapLoadingFunction() {
        count_load++;
        document.getElementById("map-load").innerHTML = "地图底图正在加载与绘图......" + count_load;

        //var now = new Date();
        //var date_dif = now.getTime()- timestamp.getTime();
        //var sec = date_dif.getSeconds();
        if(timedMsg!=null)
        {
            clearTimeout(timedMsg)
        }
        timedMsg = setTimeout(myBaseMapLoadEndFunction, 2000);
}

function myBaseMapLoadEndFunction() {
    document.getElementById("map-load").innerHTML = "地图底图绘图结束,等待北斗灾害数据加载";
    clearTimeout(timedMsg);
    timedMsg = null;
    count_load++;
    read_list_json();
}

function myBeidouDataLoadingFunction() {
    count_load++;
    document.getElementById("map-load").innerHTML = "北斗灾害数据正在加载与绘图......" + count_load;

    if(timedMsg!=null)
    {
        clearTimeout(timedMsg)
    }
    timedMsg = setTimeout(myBeidouDataLoadEndFunction, 2000);
}

function myBeidouDataLoadEndFunction()
{
    document.getElementById("map-load").innerHTML = "北斗灾害数据绘图完成";
    clearTimeout(timedMsg);
    timedMsg = null;
    count_load = 0;

    document.getElementById("icon-loading").className = 'fa fa-spinner fa-2x fa-fw';
}

map.on('postrender', function(){
    //alert('Loaded!');
    document.getElementById("icon-loading").className = 'fa fa-spinner fa-spin fa-2x fa-fw';
    if(vectorPoints_layer_disasters.length == 0)
    {
        myBaseMapLoadingFunction();
    }
    else
    {
        myBeidouDataLoadingFunction();
    }
});


