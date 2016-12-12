var PhaseTwoModule = (function(){

    var selectorModule, countDownModule, socketModule;

    function onPageChange(num) {
        if (num == 2) {
            console.log('start countdown timer');
            countDownModule.prepareTimer();
            countDownModule.startTimer();
        }
    }

    function _init(pageSelectorModule, sockets, count)
    {
        selectorModule = pageSelectorModule;
        selectorModule.addPageChangeHandler(onPageChange);

        socketModule = sockets;
        countDownModule = count;

        countDownModule.init({
            selector: '.phase-two__counter',
            startFrom: 1,
            interval: 5000,
            onComplete: function () {
                selectorModule.setActive(3);
            }
        });
    }

    return {
        init: _init
    }

})();