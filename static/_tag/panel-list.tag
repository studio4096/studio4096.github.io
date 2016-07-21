<panel-list>
  <app-scrollable event-handler={ scrollEventHandler } >
    <img-panel each={ src, i in parent.list } layout={ parent.parent.opts.layout } src-config={ src } class={ parent.parent.opts.itemClass }></img-panel>
  </app-scrollable>
  <script>
    var that = this;

    this.list = opts.list;

    var panelClasses = that.root.classList;
    panelClasses.add(opts.listClass);
    this.scrollEventHandler = {
        scrollstop : function(ev) {
             // @TODO 近い位置のパネルにスライド
        }
    }

    var height = 0;
    var scrollableTag;
    var panels;
    this.on('mount', function() {
        scrollableTag = this.tags.appScrollable;
        scrollableTag = this.tags['app-scrollable'];
        console.log('scrollableTag', scrollableTag);
        panels = that.root.querySelectorAll('IMG-PANEL');
        that.list.forEach(function(src, i) {
            var panel = panels.item(i);
            var hammertime = new Hammer(panel, {});
            // hammertime.get('pinch').set({ enable: true });
            // hammertime.get('rotate').set({ enable: true });
            hammertime.on('tap', function(ev) {
                toggleFull(ev, i);
            });
            // @TODO zoom on dabolue tap.
        });
        height = parseFloat(window.getComputedStyle(that.root).height); // @TODO 回転時に更新されない。
    });

    var toggleFull = (function() {
        var fullLayout = 'full';
        var fullFlag = false;

        return function(ev, currentIndex) {
            fullFlag = !fullFlag;
            if (fullFlag) {
                opts.setLayout('full');
                scrollableTag.scrollTo(0, height * currentIndex, 'auto'); // @TODO マージン等考慮していない
            } else {
                opts.setLayout(opts.prevLayout); // @FIXME たまにprevLayoutが取れない
                
                scrollableTag.scrollTo(0, 0, 'auto'); // @TODO scroll to a taped panel.
            }

        };
    }());

    opts.on('switch', function() {
        panelClasses.remove(opts.prevListClass);
        panelClasses.add(opts.listClass);

        that.update();
        scrollableTag.scrollTo(0, 0, 'auto');
    });
  </script>
  <style scoped>
  :scope {
      display: block;
      overflow: hidden;
      height: 100%;
      width: 100%;
  }
  </style>
</panel-list>
