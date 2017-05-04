
function set_all_beidou_layer_visable_or_not(be_visable)
{
    var count = vectorPoints_layer_disasters.length;
    if(count > 0)
    {
        for(var i=0;i<count; i++)
        {
            vectorPoints_layer_disasters[i].setVisible(be_visable);
        }
    }
}

function set_only_one_beidou_layer_visable(index_layer)
{
    var count = vectorPoints_layer_disasters.length;
    if(count > 0)
    {
        for(var i=0;i<count; i++)
        {
            vectorPoints_layer_disasters[i].setVisible(i==index_layer);
        }
    }
}

function add_one_beidou_layer_visable(index_layer)
{
    var count = vectorPoints_layer_disasters.length;
    if(count > 0)
    {
        for(var i=0;i<count; i++)
        {
            if(i==index_layer)
            {
                vectorPoints_layer_disasters[i].setVisible(true);
            }
        }
    }
}
