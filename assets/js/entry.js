(function(window, undefined) {
    'use strict';

    require('../css/entry.styl');
    require('../../../bower_components/optiscroll/dist/optiscroll.css');

    require('../_tag/panel-nav.tag');
    require('../_tag/panel-list.tag');
    require('../_tag/img-panel.tag');
    require('../_tag/app-scrollable.tag');

    var imageList = require('./image-list');

    var data = {
        "cloudinary_config": {
            "cloud_name": "studio4096"
        },
        "images": [
            "bluedress_zeqi98.jpg",
            "girl3_vsjctg.jpg",
            "girl_20110402_hvkofa.jpg",
            "red_dress_grh5ei.jpg",
            "dessin0001mini_oyqnei.jpg",
            "2013_new_years_card_pvzhxe.jpg",
            "eyecatch_rk4btd.jpg",
            "new_year_2014_wzz1kk.jpg",
            "kiss_72dpi_A3_just_gdosor.jpg",
            "valentinefull_szqy2o.jpg",
            "xmas_2013_a3_400dpi_uia3tf.jpg",
            "compo01_jptwnv.jpg",
            "fukei00_c7h8jn.jpg",
            "summer_2013-01_qo1kti.jpg",
            "P1000105mini_jbvlrp.jpg",
            "flower_head_nuc617.jpg",
            "flowerhead_trimed_mt8mtg.jpg"
        ]
    };

    var layouts = riot.observable();
    imageList.init(data);
    layouts.items = imageList.getLayouts();
    layouts.changeLayout = function(e) {
        var layoutName = e.item.name;
        if (layoutName) {
            imageList.setLayout(layoutName);

        }
    };

    window.addEventListener('load', function() {
        riot.mount('panel-nav', layouts);
        riot.mount('panel-list', imageList);
    }, false);

}(window));
