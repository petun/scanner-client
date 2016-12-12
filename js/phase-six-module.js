var PhaseSixModule = (function(){

    var selectorModule, timeout;

    function onPageChange(num) {
        if (num == 6) {
            setTimeout(function() {
                selectorModule.setActive(1);
            }, timeout);
        }
    }

    function _init(pageSelectorModule, time)
    {
        timeout = time;
        selectorModule = pageSelectorModule;
        selectorModule.addPageChangeHandler(onPageChange);
    }

    return {
        init: _init
    }

})();