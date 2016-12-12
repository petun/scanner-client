var CountdownModule = (function () {

    var settings;

    var $element, currentNum, intervalId;

    function _init(options) {

        settings = $.extend({
            selector: '.countdown',
            startFrom: 10,
            interval: 5000,
            onComplete: function () {
            }
        }, options);

        $element = $(settings.selector);
    }

    function _prepare() {
        currentNum = settings.startFrom;
        $element.text(settings.startFrom);
    }

    function _startTimer() {
        intervalId = setInterval(decreaseNum, settings.interval);
    }

    function decreaseNum() {
        currentNum--;
        if (currentNum > 0) {
            $element.text(currentNum);
        } else {
            clearInterval(intervalId);
            settings.onComplete();
        }
    }

    return {
        init: _init,
        startTimer: _startTimer,
        prepareTimer: _prepare
    }
})();

CountdownModule.init();