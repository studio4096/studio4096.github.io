<img-panel>
  <div each={ layoutName, i in activeLayouts } style="background-image: url({ srcConfig[layoutName] }); display: { layoutName === parent.opts.layout ? 'block' : 'none'}">
  </div>
  <script>
    var that = this;

    this.srcConfig = opts.srcConfig;
    this.activeLayouts = [ opts.layout ];

    this.on('update', function() {
        // if ( !that.activeLayouts.find( el => el === opts.layout) ) { // can not use es6?
        if ( !that.activeLayouts.find(function(el) { return el === opts.layout }) ) {
            that.activeLayouts.push(opts.layout);
        }
    });

  </script>
  <style scoped>
  :scope {
      margin: 5px;
      display: inline-block;
  }
  :scope div {
      width: 100%;
      height: 100%;

      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
  }
  </style>
</img-panel>
