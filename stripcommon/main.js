// file my_extension/main.js

define([
    'base/js/namespace',
    'jquery',
    'require',
    'base/js/events',
    'base/js/utils',
], function(Jupyter, $, requirejs, events, configmod, utils) {
    "use strict";

    function load_extension(){
        console.info('this is my first extension');
    }

    return {
        load_ipython_extension: load_extension,
        load_jupyter_extension: load_extension
    };
});
