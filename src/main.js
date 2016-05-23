/* globals define */
define(function(require, exports, module) { // FIXME main.js:2 Uncaught ReferenceError: define is not defined 
    'use strict';
    //require('../lib/famous-polyfills/index');
    //require('../lib/famous/src/core/famous.css');
    //require('../lib/famous/dist/famous.css');
    //require('./index.html');

    // Fast-click
    var FastClick = require('fastclick');
    FastClick.attach(document.body);

    // underscore
    var _ = require('underscore');

    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');
    // var ViewSequence = require('famous/core/ViewSequence');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var InputSurface = require('famous/surfaces/InputSurface');
    var LayoutController = require('famous-flex/LayoutController');
    var FlexScrollView = require('famous-flex/FlexScrollView');
    var LayoutUtility = require('famous-flex/LayoutUtility');
    // var LayoutDockHelper = require('famous-flex/helpers/LayoutDockHelper');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    // https://github.com/IjzerenHein/famous-bkimagesurface
    var BkImageSurface = require('famous-bkimagesurface/BkImageSurface');
    // layouts
    var GridLayout = require('famous-flex/layouts/GridLayout');
    // var ProportionalLayout = require('famous-flex/layouts/ProportionalLayout');
    var NavBarLayout = require('famous-flex/layouts/NavBarLayout');
    var ListLayout = require('famous-flex/layouts/ListLayout');
    var CollectionLayout = require('famous-flex/layouts/CollectionLayout');
    //var CoverLayout = require('famous-flex/layouts/CoverLayout');
    // var WheelLayout = require('famous-flex/layouts/WheelLayout');
    //var CubeLayout = require('famous-flex/layouts/CubeLayout');
    // lagometer
    //var Lagometer = require('famous-lagometer/Lagometer');
    var collectionItemId = 0;

    var Timer = require('famous/utilities/Timer');

    // yaml loader
    var yaml = require('js-yaml');
    // var data = yaml.load(document.getElementById('contents-data').innerHTML);
    var data = {
        title: 'studio4096',
        images: [
            'http://res.cloudinary.com/studio4096/image/upload/v1463917865/bluedress_zeqi98.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1463917860/girl3_vsjctg.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1463918039/girl_20110402_hvkofa.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1464017888/red_dress_grh5ei.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1463918084/dessin0001mini_oyqnei.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1464017680/2013_new_years_card_pvzhxe.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1464017697/eyecatch_rk4btd.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1464017894/new_year_2014_wzz1kk.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1464017808/kiss_72dpi_A3_just_gdosor.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1464018008/valentinefull_szqy2o.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1463918146/xmas_2013_a3_400dpi_uia3tf.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1463918126/compo01_jptwnv.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1464017897/fukei00_c7h8jn.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1464018011/summer_2013-01_qo1kti.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1463918173/P1000105mini_jbvlrp.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1463918179/flower_head_nuc617.jpg',
            'http://res.cloudinary.com/studio4096/image/upload/v1463918171/flowerhead_trimed_mt8mtg.jpg'
        ]
    };

    var container = new ContainerSurface();

    var tmplNavLink = _.template('<a href="<%= href %>"><%= title %></a>');
    var tmplBtn = _.template('<button type="button" class="btn btn-default"><i class="glyphicon glyphicon-<%= content %>"></i></button>');

    //var currentLayout = 'GridLayout';
    var currentLayout = 'CollectionLayout';
    var fullSizeLayout = 'FullScreen';
    var selectedItem;
    var isFullSize = false;

    function _surf(content, classes, otherOptions) { // var _surf = function(content, classes, otherOptions) {
        var options;
        if (_.isObject(content)) {
            options = content;
        } else {
            options = (otherOptions === undefined) ? {} : otherOptions;
            options.classes = _.isArray(classes) ? classes : [classes];
            options.content = content;
        }
        return new Surface(options);
    }

    function _createButton(iconName) {
        // return _surf(tmplBtn({content:content}), null, {size: [40, undefined]});
        return new ImageSurface({
            size: [20, 20],
            content: '/content/images/icon-' + iconName + '.svg' //,
                // classes: ['backfaceVisibility']
        });
    }

    var navLinks = [];

    function _addLayoutNav(iconName, layoutName) { // var _addLayoutNav =  function(iconName, layoutName) {
        // var btn = _surf(iconName,'navitem', { size: [40, undefined] });
        var btn = _createButton(iconName);
        btn.on('click', function() {
            // console.log(isFullSize);
            isFullSize = false;
            _.each(collection, function(image) {
                image.setSizeMode(isFullSize ? BkImageSurface.SizeMode.ASPECTFIT : BkImageSurface.SizeMode.ASPECTFILL);
            });
            // Gridlayout のときはスクロールさせない。
            if (selectedItem) {
                if (currentLayout === 'GridLayout') {
                    scrollView.goToFirstPage(selectedItem);
                } else {
                    // scrollView.goToPage(index);
                    scrollView.goToRenderNode(selectedItem);
                }
            }
            _selectLayout(layoutName);
        });
        // transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 10, 101, 1);
        var modifier = new Modifier({
            transform: Transform.translate(100, 200)
        });
        // btn.add(modifier);

        return btn;
        // navLinks.push(btn);
    }

    // TODO icon
    //var directionButton = _createButton('repeat');
    var directionButton = _createButton('rotate');
    directionButton.on('click', _rotateLayout);
    navLinks.push(directionButton);

    /*
    //var alignmentButton = _createButton('sort-by-attributes');
    var alignmentButton = _surf('sort-by-attributes','navitem', { size: [50, undefined] });
    alignmentButton.on('click', _toggleLayoutAlignment);
    navLinks.push(alignmentButton);
    */

    navLinks.push(_addLayoutNav('grid', 'GridLayout'));
    navLinks.push(_addLayoutNav('collection', 'CollectionLayout'));
    navLinks.push(_addLayoutNav('list', 'ListLayout'));

    // create the main context
    var mainContext = Engine.createContext();
    //mainContext.setPerspective(1000);
    // mainContext.setPerspective(2000);

    // Create the shell
    var layoutListRenderables = [];
    var collection = [];
    var layouts = [];
    var layoutDetailsView;
    var navbar = _createNavbar();
    // var sidebar = _createSidebar();
    // var container = new ContainerSurface();
    var back = _surf(undefined, 'back');
    container.context.setPerspective(500);
    var scrollView = _createScrollView();
    container.add(scrollView);
    container.pipe(scrollView);
    var shell = _createShell({
        back: back,
        navbar: navbar,
        //sidebar: sidebar,
        content: container
    });
    /*
    var logo = new ImageSurface({
        //size: [200, 200],
        //size: undefined,
        content: '/content/images/famous_logo.png',
        classes: ['backfaceVisibility']
    });
    */
    //mainContext
    //.add(centerSpinModifier)
    //.add(logo)
    //.add(shell) // add layout-controller to the render-tree
    mainContext.add(shell); // add layout-controller to the render-tree

    /*
    var initialTime = Date.now();
    var centerSpinModifier = new Modifier({
        align: [0.5, 0.5],
        origin: [0.5, 0.5],
        transform: function() {
            return Transform.rotateY(.002 * (Date.now() - initialTime));
        }
    });
    */

    /**
     * Shell
     */
    function ShellLayout(context, options) {
        var size = context.size;
        context.set('back', {
            size: context.size,
            translate: [0, 0, -10000]
        });
        context.set('navbar', {
            size: [size[0], options.navBarHeight],
            translate: [0, 0, 100]
        });
        context.set('content', {
            size: [size[0], size[1] - options.navBarHeight],
            translate: [0, options.navBarHeight, 0],
            origin: [1, 0],
            align: [1, 0],
            rotate: options.showSideBar ? [0, (Math.PI / 180) * -20, 0] : [0, 0, 0]
        });
        /*
        context.set('sidebar', {
            size: [options.sideBarWidth, size[1] - options.navBarHeight],
            translate: [0, options.navBarHeight, 100],
            origin: [0, 0],
            align: [0, 0],
            rotate: options.showSideBar ? [0, (Math.PI/180) * 10, 0] : [0, (Math.PI/180) * 90, 0]
        });
        */
    }

    function _createShell(renderables) {
        return new LayoutController({
            layout: ShellLayout,
            layoutOptions: {
                navBarHeight: 40,
                sideBarWidth: 180
            },
            flow: true,
            reflowOnResize: false,
            dataSource: renderables
        });
    }

    /*
    function _createSidebar() {
        layoutDetailsView = _createLayoutDetailsView();
        return new LayoutController({
            layout: function(context) {
                var size = context.size;
                var dock = new LayoutDockHelper(context);
                context.set('back', {size: size});
                if (size[0] < 300) {
                    dock.bottom('details', 200, 1);
                }
                else {
                    dock.right('details', 200, 1);
                }
                dock.fill('list', 1);
            },
            dataSource: {
                'list': _createLayoutListView(),
                'details': layoutDetailsView,
                'back': new Surface({
                    classes: ['panel']
                })
            }
        });
    }
    function _toggleSidebar() {
        shell.setLayoutOptions({
            showSideBar: !shell.getLayoutOptions().showSideBar
        });
    }
    */

    // actions
    function _rotateLayout() {
        var direction = scrollView.getDirection(true);
        scrollView.setDirection((direction + 1) % 2);
    }

    function _toggleLayoutAlignment() {
        scrollView.setOptions({
            alignment: scrollView.options.alignment ? 0 : 1
        });
    }

    function _createNavbar() {
        var title = _surf(data.title, 'title', {
            size: [100, undefined]
        });
        title.on('click', function() {
            location.href = 'mailto:' + 'contact' + '@' + 'studio4096.com';
            // alert('TODO show about ');
        });
        var layoutController = new LayoutController({
            layout: NavBarLayout,
            layoutOptions: {
                margins: [10],
                itemSpacer: 10
            },
            dataSource: {
                background: _surf({
                    classes: ['navbar', 'navbar-default']
                }),
                // title: title,
                rightItems: [title],
                leftItems: navLinks
            }
            /*
            layout: CollectionLayout,
            layoutOptions: {
                itemSize: [100, 100],
                gutter: [20, 20],
                justify: true
            },
            flow: true,    // smoothly animates renderables when changing the layout
            direction: 1,  // 0 = X, 1 = Y, undefined = use default from selected layout-function
            dataSource: navLinks
            */
        });
        return layoutController;
    }

    /**
     * Collection
     */
    function _createCollectionItem(path) {
        collectionItemId++;
        var sur = new BkImageSurface({
            classes: ['image-frame'],
            // content: '/content/images/' + path,
            content: path, // TODO use jQuery.cloudinary 
            sizeMode: 'cover' //,
                /*
                properties: {
                    backgroundColor: 'dimgray'
                }
                */
        });
        sur.on('click', function() {
            // console.log('ghohgeo');
            if (isFullSize) return;
            isFullSize = true;
            selectedItem = sur;
            _.each(collection, function(image) {
                image.setSizeMode(isFullSize ? BkImageSurface.SizeMode.ASPECTFIT : BkImageSurface.SizeMode.ASPECTFILL);
            });
            if (selectedItem) scrollView.goToRenderNode(selectedItem);
            _selectLayout(fullSizeLayout);
        });
        return sur;
    }

    function _addCollectionItem(path) {
        /*
            // TODO remove
        */
        //        if (scrollView) {
        //            var rightItems = navbar.getSpec('rightItems');
        //            var insertSpec = LayoutUtility.cloneSpec(navbar.getSpec(rightItems[1]));
        //            var pos = Math.floor(Math.random() * (Math.min(collection.length, 5) + 1));
        //            //pos = Math.max(pos, 1);
        //            /*pos = 0;
        //            insertSpec = {
        //                opacity: 0
        //            };*/
        //            var item = _createCollectionItem(path);
        //            scrollView.insert(pos, item, insertSpec);
        //            //scrollView.ensureVisible(item);
        //            scrollView.goToRenderNode(item);
        //        }
        //        else {
        collection.push(_createCollectionItem(path));
        if (scrollView) {
            scrollView.reflowLayout();
        }
        //        }

    }

    function _removeCollectionItem() {
        if (scrollView) {
            var rightItems = navbar.getSpec('rightItems');
            var removeSpec = LayoutUtility.cloneSpec(navbar.getSpec(rightItems[0]));
            removeSpec.opacity = 0;
            var pos = Math.floor(Math.random() * Math.min(collection.length, 5));
            //pos = 0;
            scrollView.remove(pos, removeSpec);
        } else if (collection.length) {
            collection.splice(0, 1);
            if (scrollView) {
                scrollView.reflowLayout();
            }
        }
    }

    function _createScrollView() {
        _.each(data.images, function(path, index, list) {
            _addCollectionItem(path);
        });
        var scr = new FlexScrollView({
            dataSource: collection,
            flow: true,
            debug: true,
            mouseMove: true,
            touchMoveDirectionThresshold: 0.5,
            //paginated: false,
            paginated: true,
            // paginationMode: FlexScrollView.PaginationMode.SCROLL,
            //paginationMode: FlexScrollView.PaginationMode.PAGE,
            paginationEnergyThresshold: 0.01,
            nodeSpring: {
                dampingRatio: 0.6,
                period: 20
            }
            /*
                 ,
    useContainer: true,
    container: { // options passed to the ContainerSurface
        properties: {
            overflow: 'hidden',
            // backgroundColor: 'blue'
            margin: '0 auto'
        }
    }
*/

        });
        scr.on('pagechange', function(event) {
            // console.log('pagechange: ' + (event.renderNode ? event.renderNode.text : 'none'));
        });
        scr.on('scrollend', function(event) {
            // var item = scr.getFirstVisibleItem();
            // console.log('scrollend: ' + (item ? item.renderNode.text : 'none'));
            var index = scrollView.getCurrentIndex();
            selectedItem = collection[index];
        });
        return scr;
    }

    /**
     * Layouts
     */
    function _createLayoutListView() {
        return new LayoutController({
            layout: ListLayout,
            layoutOptions: {
                itemSize: 50
            },
            dataSource: layoutListRenderables
        });
    }

    function _createLayoutDetailsView() {
        return new FlexScrollView({
            autoPipeEvents: true,
            alignment: 1,
            layoutOptions: {
                itemSize: 40
            }
        });
    }

    function _incrementLayoutOption(option, value, input) {
        if (Array.isArray(option.value)) {
            var newValue = [];
            for (var i = 0; i < option.value.length; i++) {
                newValue.push(Math.max(Math.min(option.value[i] + value, option.max[i]), option.min[i]));
            }
            option.value = newValue;
        } else {
            option.value = Math.max(Math.min(option.value + value, option.max), option.min);
        }
        input.setValue(JSON.stringify(option.value));
        var layoutOptions = {};
        layoutOptions[option.name] = option.value;
        scrollView.setLayoutOptions(layoutOptions);
    }

    function _changeLayoutOption(option, event) {
        if (Array.isArray(option.value)) {
            var val = JSON.parse(event.currentTarget.value);
            if (!Array.isArray(val) || (val.length !== option.value.length)) {
                event.currentTarget.value = JSON.stringify(option.value);
                return;
            }
        }
        option.value = JSON.parse(event.currentTarget.value);
        var layoutOptions = {};
        layoutOptions[option.name] = option.value;
        scrollView.setLayoutOptions(layoutOptions);
    }

    function _createLayoutDetailItem(option) {
        var valueInput = new InputSurface({
            classes: ['layout-detail-item-input'],
            value: JSON.stringify(option.value)
        });
        valueInput.on('change', function(event) {
            _changeLayoutOption(option, event);
        });
        var addButton = _surf(tmplBtn({
            content: 'plus'
        })); // TODO ignore class btn-sm
        addButton.on('click', function() {
            _incrementLayoutOption(option, 1, valueInput);
        });
        var subButton = _surf(tmplBtn({
            content: 'minus'
        })); // TODO ignore class btn-sm
        subButton.on('click', function() {
            _incrementLayoutOption(option, -1, valueInput);
        });
        return new LayoutController({
            layout: {
                dock: [
                    ['left', 'subButton', 40],
                    ['right', 'addButton', 40],
                    ['top', 'title', 17],
                    ['fill', 'valueInput']
                ]
            },
            dataSource: {
                title: _surf(option.name, 'layout-detail-item-title'),
                subButton: subButton,
                addButton: addButton,
                valueInput: valueInput
            }
        });
    }
    /*
    function _updateLayoutDetails(name) {
        var viewSequence = new ViewSequence();
        var layout = _findLayout(name);
        for (var i = 0; i < layout.options.length; i++) {
            if ((layout.options[i].editable === undefined) || layout.options[i].editable) {
                viewSequence.push(_createLayoutDetailItem(layout.options[i]));
                viewSequence = viewSequence.getNext() || viewSequence;
            }
        }
        layoutDetailsView.setDataSource(viewSequence);
    }
    */
    function _findLayout(name) {
        for (var i = 0; i < layouts.length; i++) {
            if (layouts[i].name === name) {
                return layouts[i];
            }
        }
        return undefined;
    }

    function _selectLayout(name) {
        if (name !== fullSizeLayout) {
            currentLayout = name;
        }
        // Select the layout and options
        var layout = _findLayout(name);
        var layoutOptions = {};
        var i;
        for (i = 0; i < layout.options.length; i++) {
            layoutOptions[layout.options[i].name] = layout.options[i].value;
        }
        scrollView.setLayout(layout.layout, layoutOptions);

        // Highlight the selected layout
        for (i = 0; i < layouts.length; i++) {
            layout = layouts[i];
            if (layout.name === name) {
                layout.surface.addClass('selected');
            } else {
                layout.surface.removeClass('selected');
            }
        }

        // Update detail-view
        // _updateLayoutDetails(name);
    }

    function _addLayout(name, layoutFn, sizeMode, options) {
        var layout = {
            name: name,
            layout: layoutFn,
            sizeMode: sizeMode,
            options: options
        };
        layouts.push(layout);
        var listRenderable = _surf(name, 'layout-list-item');
        layout.surface = listRenderable;
        listRenderable.on('click', _selectLayout.bind(this, name));
        layoutListRenderables.push(listRenderable);
    }

    function _addLayouts() {
        _addLayout('GridLayout', GridLayout, BkImageSurface.SizeMode.ASPECTFILL, [{
            name: 'cells',
            value: [5, 3],
            min: [1, 1],
            max: [50, 50]
        }, {
            name: 'margins',
            value: [20, 20, 20, 20],
            min: [0, 0, 0, 0],
            max: [100, 100, 100, 100]
        }, {
            name: 'spacing',
            value: [20, 20],
            min: [0, 0],
            max: [100, 100]
        }]);
        _addLayout('ListLayout', ListLayout, BkImageSurface.SizeMode.ASPECTFILL, [{
            name: 'itemSize',
            value: 300,
            min: 0,
            max: 1000
        }, {
            name: 'margins',
            value: [5, 5, 5, 5],
            min: [-100, -100, -100, -100],
            max: [100, 100, 100, 100]
        }, {
            name: 'spacing',
            value: 5,
            min: -100,
            max: 1000
        }]);
        _addLayout('CollectionLayout', CollectionLayout, BkImageSurface.SizeMode.ASPECTFILL, [{
            name: 'itemSize',
            value: [160, 160],
            min: [0, 0],
            max: [1000, 1000]
        }, {
            name: 'justify',
            value: [0, 0],
            min: [0, 0],
            max: [1, 1]
        }, {
            name: 'margins',
            value: [10, 10, 10, 10],
            min: [-100, -100, -100, -100],
            max: [100, 100, 100, 100]
        }, {
            name: 'spacing',
            value: [10, 10],
            min: [-100, -100],
            max: [100, 100]
        }]);
        _addLayout('FullScreen', ListLayout, BkImageSurface.SizeMode.ASPECTFIT, [{
            name: 'itemSize',
            value: undefined,
            editable: false
        }, {
            name: 'margins',
            value: [0, 0, 0, 0],
            min: [-100, -100, -100, -100],
            max: [100, 100, 100, 100]
        }, {
            name: 'spacing',
            value: 20,
            min: -100,
            max: 1000
        }]);
        /*
        _addLayout('ProportionalLayout', ProportionalLayout, [
            {name: 'ratios', value: [1, 2, 3, 1], min: [0, 0, 0, 0], max: [10000, 10000, 10000, 10000]}
        ]);
        _addLayout('WheelLayout', WheelLayout, [
            {name: 'itemSize', value: 70, min: 0, max: 1000},
            {name: 'diameter', value: 500, min: 10, max: 100000},
            {name: 'edgeOpacity', value: 0, min: -2, max: 1}
        ]);
        */
        /*_addLayout('CoverLayout', CoverLayout, [
            {name: 'itemSize',   value: [260, 200], min: [0, 0], max: [1000, 1000]}
        ]);*/
        /*_addLayout('CubeLayout', CubeLayout, [
            {name: 'itemSize',   value: [100, 100], min: [0, 0], max: [1000, 1000]}
        ]);*/
    }
    _addLayouts();
    _selectLayout(currentLayout);
});
