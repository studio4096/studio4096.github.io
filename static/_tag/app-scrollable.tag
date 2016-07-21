<app-scrollable>
    <div>
        <yield/>
    </div>
    <script>

        var that = this;
        var scrollableElement = this.root;
        var scrollInstance;
        this.on('mount', function() {
            scrollableElement.classList.add('optiscroll');
            scrollInstance = new Optiscroll(scrollableElement);

            var eventHandler = opts.eventHandler;
            console.log(eventHandler);
            Object.keys(eventHandler).forEach(function (type) {
                    console.log(type);
                scrollableElement.addEventListener(type, eventHandler[type]);
            });
        });

        this.on('unmount', function() {
            scrollableElement.classList.remove('optiscroll');
            scrollInstance.destroy();
        });
        this.scrollTo = function(x, y, duration) {
            scrollInstance.scrollTo(x, y, duration);
        }
        // @TODO Implement scrollToElement method

    </script>
    <style scoped>
    :scope {
        display: block;
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: relative;
    }
    :scope .optiscroll-vtrack {
        width: 15px;
    }

    </style>
</app-scrollable>
