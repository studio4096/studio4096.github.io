/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../lib/famous/src',
        requirejs: '../lib/requirejs/require',
        requirepolyfills: '../lib/famous-polyfills/index',
        almond: '../lib/almond/almond',
        'famous-flex': '../lib/famous-flex/src',
        'js-yaml': '../lib/js-yaml/dist/js-yaml',
        fastclick: '../lib/fastclick/lib/fastclick',
        'famous-bkimagesurface': '../lib/famous-bkimagesurface',
        underscore: '../lib/underscore/underscore',
        jquery: '../lib/jquery/dist/jquery.min',
        'cloudinary': '../lib/cloudinary/js/jquery.cloudinary'
    },
    packages: [

    ]
});
require(['main']);
