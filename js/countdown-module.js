var CountdownModule = (function () {

    var settings = {
        selector: '.countdown',
        startFrom: 10,
        interval: 1000,
        onComplete: function () {
        }
    };

    var $element, currentNum, intervalId;

    function _init(params) { //@todo
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