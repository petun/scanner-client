var PhaseTwoModule = (function(){

    var $continueButton, $gallery, $counter;
    var selectorModule, countDownModule, socketModule;

    function onPageChange(num) {
        if (num == 2) {
            $gallery.show();
            $counter.hide();
        }
    }

    function _init(pageSelectorModule, sockets, count)
    {
        selectorModule = pageSelectorModule;
        selectorModule.addPageChangeHandler(onPageChange);

        socketModule = sockets;
        countDownModule = count;



        $gallery = $('.phase-two__gallery');
        $counter = $('.phase-two__counter');
        $continueButton = $('.phase-two__gallery .btn');

        $continueButton.on('click', function(e) {
            e.preventDefault();
            $gallery.hide();
            $counter.show();
            countDownModule.prepareTimer();
            countDownModule.startTimer();
        });

        countDownModule.init({
            selector: '.phase-two__counter',
            startFrom: 1,
            interval: 1000,
            onComplete: function () {
                selectorModule.setActive(3);
            }
        });
    }

    return {
        init: _init
    }

})();