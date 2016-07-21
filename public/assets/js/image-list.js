(function(window, undefined) {
    'use strict';

    var cloudinary = require('cloudinary-core').Cloudinary.new(); // .CloudinaryJQuery;


    var initialLayout = 'grid';
    var layouts = [{
        "name": "list",
        "label": "",
        "iconClass": "fa-align-justify", // fa-bars
        "layoutClass": "layout-list",
        /*
        }, {
            "name": "collection",
            "label": "",
            "iconClass": "fa-th",
            "layoutClass": "layout-collection",
        */
    }, {
        "name": "grid",
        "label": "",
        "iconClass": "fa-th-large",
        "layoutClass": "layout-grid",
    }, {
        "name": "full",
        "label": "",
        "iconClass": "",
        "layoutClass": "layout-full",
        /*
        }, {
            "name": "rotate",
            "label": "",
            "iconClass": "fa-rotate-left",
        */
    }, ];
    var map = {};
    layouts.forEach(function(el) {
        map[el.name] = el;
    });

    var thumbOptions = {
        secure: false,
        angle: "exif",
        width: 320,
        height: 320,
        // gravity: "face",
        // crop: 'thumb'
        crop: 'fit'
    };

    var imageList = riot.observable();
    imageList.init = function(data) {

        cloudinary.config(data.cloudinary_config);

        var list = [];
        data.images.forEach(function(filename) {
            var path = cloudinary.url(filename, thumbOptions);
            // list.push(path);
            list.push({
                'grid': path,
                'list': cloudinary.url(filename),
                'full': cloudinary.url(filename),
            });
        });
        imageList.layout = initialLayout;
        imageList.list = list;

        imageList.listClass = map[initialLayout].layoutClass;
    };

    imageList.setLayout = function(layoutName) {
        var oneLayout = map[layoutName];
        imageList.prevLayout = imageList.layout;
        imageList.layout = layoutName;
        imageList.prevListClass = imageList.listClass;
        imageList.listClass = oneLayout.layoutClass;
        imageList.trigger('switch');
    }
    imageList.getLayouts = function() {
        return layouts;
    }
    module.exports = imageList;

}(window));
