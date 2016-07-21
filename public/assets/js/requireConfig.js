/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../../vendor/famous/src',
        requirejs: '../../vendor/requirejs/require',
        requirepolyfills: '../../vendor/famous-polyfills/index',
        almond: '../../vendor/almond/almond',
        'famous-flex': '../../vendor/famous-flex/src',
        'js-yaml': '../../vendor/js-yaml/dist/js-yaml',
        fastclick: '../../vendor/fastclick/lib/fastclick',
        'famous-bkimagesurface': '../../vendor/famous-bkimagesurface',
        underscore: '../../vendor/underscore/underscore',
        jquery: '../../vendor/jquery/dist/jquery.min',
        'cloudinary': '../../vendor/cloudinary/js/jquery.cloudinary'
    },
    packages: [

    ]
});
require(['main']);
