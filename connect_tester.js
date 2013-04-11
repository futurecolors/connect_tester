(function(){
    /**
     * From underscore.js
     */
    var _isFunction = function(obj){
        return toString.call(obj) == '[object Function]';
    };


    /**
     * ConnectTester constructor
     * @constructor
     */
    var ConnectTester = function(){};

    /**
     * Set testing url
     * @param url
     * @returns {*}
     */
    ConnectTester.prototype.test = function(url){
        this.url = url;

        return this;
    };

    /**
     * Set interval for periodic tests
     * @param interval
     * @returns {*}
     */
    ConnectTester.prototype.every = function(interval){
        this.interval = interval;

        return this;
    };

    /**
     * Run test
     * @returns {*}
     */
    ConnectTester.prototype.run = function(){
        var that = this,
            runTest,
            setResult;

        setResult = function(value){
            that.result = value;
            if (_isFunction(that.debugCallback)) {
                that.debugCallback();
            }
            if (_isFunction(that.callback)) {
                that.callback(that.result);
            }
        };

        runTest = function(){
            var timestamp = new Date,
                image = new Image();

            timestamp = new Date;
            image.onload = function () {
                setResult(new Date - timestamp);
            };
            image.src = that.url + '?_=' + Math.random();
        };

        runTest();
        if (this.interval) {
            setInterval(runTest, this.interval)
        }

        return this;
    };

    /**
     * Enable debug mode
     * @returns {*}
     */
    ConnectTester.prototype.debug = function(){
        if (!console || !console.debug) {
            return this;
        }

        this.debugCallback = function(){
            console.debug('ConnectTester:', this.result);
        };

        return this;
    };

    /**
     * Set on-result-change callback
     * @param callback
     */
    ConnectTester.prototype.onChange = function(callback){
        var that = this;

        this.callback = function(){
            callback.apply(that, arguments);
        };
    };


    /**
     * Export ConnectTester
     */
    if (_isFunction(window['define'])) {
        define(['ConnectTester', function(){
            return ConnectTester;
        }]);
    } else {
        window['ConnectTester'] = ConnectTester;
    }
})();
