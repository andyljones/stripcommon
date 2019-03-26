// The outline for this code is largely lifted from [this extension](https://github.com/ipython-contrib/jupyter_contrib_nbextensions/blob/6af8e5e84e4746476c5b476b7e38f63d7abb2064/src/jupyter_contrib_nbextensions/nbextensions/runtools/main.js)
// while the paste-replacement stuff is from [this post](https://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser).

define([
    'jquery',
    'base/js/namespace',
    'base/js/utils',
    'base/js/events',
    'notebook/js/codecell'
], function($, Jupyter, utils, events, codecell) {
    "use strict";

    function paste(cm, e) {
        if (Jupyter.notebook.mode !== 'edit') {
            return
        }

        var clipboardData = e.clipboardData || window.clipboardData;
        var text = clipboardData.getData('text/plain');

        var lines = text.split('\n')
        var prefixes = lines.filter(s => !/^\s*$/.test(s)).map(s => /^\s*/.exec(s)[0]);
        var common = Math.min(...prefixes.map(arr => arr.length))
        var stripped = lines.map(s => s.slice(common)).join('\n') 

        e.preventDefault();
        document.execCommand('insertText', false, stripped);
    }

    function init() {
        var cells = Jupyter.notebook.get_cells();
        for (let cell of cells) {
            if (cell instanceof codecell.CodeCell) {
                cell.code_mirror.on('paste', paste)
            }
        }
        events.on('create.Cell', function (event, nbcell) {
            var cell = nbcell.cell
            if (cell instanceof codecell.CodeCell) {
                cell.code_mirror.on('paste', paste)
            }
        })
    }

    function load_extension() {
        if (Jupyter.notebook._fully_loaded) {
            init();
        } else {
            events.one('notebook_loaded.Notebook', init);
        }
    }

    return {
        load_ipython_extension: load_extension,
        load_jupyter_extension: load_extension
    };
});
