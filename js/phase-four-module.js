var PhaseFourModule = (function () {

    var selectorModule, socketModule;

    var $complete, $discard, $preview;

    function onPageChange(num) {
        if (num == 4) {
            $preview.addClass('-loading');
            $complete.hide();
            $discard.hide();
        }
    }

    function onSocketMessage(data) {
        if (data.command == SocketCommands.scanningSucceeded) {
            $preview.removeClass('-loading');
            $complete.show();
            $discard.show();
        }
    }

    function _init(pageSelectorModule, sockets) {
        selectorModule = pageSelectorModule;
        selectorModule.addPageChangeHandler(onPageChange);

        socketModule = sockets;
        socketModule.addSubscriber(onSocketMessage);

        $complete = $('#complete');
        $discard = $('#discard');
        $preview = $('.phase-four__preview');

        $complete.on('click', function (e) {
            e.preventDefault();
            selectorModule.setActive(5);
        });

        $discard.on('click', function (e) {
            e.preventDefault();
            selectorModule.setActive(1);
        });
    }

    return {
        init: _init
    }

})();