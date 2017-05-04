
var search_log = function() {
    var pattern = $('#input-search-log').val();
    if(pattern.length < 1) return null;
    var options = {
        ignoreCase: false,
        exactMatch: false,
        revealResults: true
    };
    var results = $checkableTree.treeview('search', [ pattern, options ]);

    /*
    var output = '<p>' + results.length + ' matches found</p>';
    $.each(results, function (index, result) {
        output += '<p>- ' + result.text + '</p>';
    });
    $('#checkable-output').html(output);*/

    return results;
};

var checkableNodes = search_log();

$('#input-search-log').on('keyup', function (e) {
    checkableNodes = search_log();
    $('.check-node').prop('disabled', !(checkableNodes.length >= 1));
});

// Check/uncheck all
$('#btn-check-all').on('click', function (e) {
    $checkableTree.treeview('checkAll', { silent: false });
    map.renderer();
});

$('#btn-uncheck-all').on('click', function (e) {
    $checkableTree.treeview('uncheckAll', { silent: false });
});

// Expand/collapse all
$('#btn-expand-all').on('click', function (e) {
    var levels = $('#select-expand-all-levels').val();
    $checkableTree.treeview('expandAll', { levels: 2, silent: false });
});

$('#btn-collapse-all').on('click', function (e) {
    $checkableTree.treeview('collapseAll', { silent: false });
});
