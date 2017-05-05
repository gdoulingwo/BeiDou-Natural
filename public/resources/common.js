/**
 * Created by Administrator on 2016/9/2 0002.
 */
(function() {
    var copyButton = document.getElementById('copy-button');
    if (copyButton) {
        var data = document.getElementById('example-source').textContent;
        new ZeroClipboard(copyButton).on('copy', function(event) {
            event.clipboardData.setData({
                'text/plain': data,
                'text/html': data
            });
        });
    }

    var fiddleButton = document.getElementById('jsfiddle-button');
    if (fiddleButton) {
        fiddleButton.onclick = function(event) {
            event.preventDefault();
            document.getElementById('jsfiddle-form').submit();
        };
    }

    if (window.location.host === 'localhost:3000') {
        return;
    }

    var container = document.getElementById('navbar-logo-container');
    if (!container) {
        return;
    }

})();

var common = {};

common.getRendererFromQueryString = function(opt_default) {
    var obj = {};
    var queryString = location.search.slice(1);
    var re = /([^&=]+)=([^&]*)/g;

    var m = re.exec(queryString);
    while (m) {
        obj[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        m = re.exec(queryString);
    }
    if ('renderers' in obj) {
        return obj['renderers'].split(',');
    } else if ('renderer' in obj) {
        return [obj['renderer']];
    } else {
        return opt_default;
    }
};
