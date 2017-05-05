
function auto_load_all_layer()
{
    if(timerAutoLoading != null)
    {
        clearInterval(timerAutoLoading);
        timerAutoLoading = null;
    }

    if(auto_load_checkbox.checked)
    {
        var duration = Number(auto_load_n_second_input.value)*1000;
        timerAutoLoading = setInterval(read_list_json, duration);
    }
}

auto_load_checkbox.addEventListener('click', auto_load_all_layer, false);

auto_load_n_second_input.addEventListener('input', function() {
    auto_load_n_second_txt.value = auto_load_n_second_input.value;
    auto_load_all_layer();
});