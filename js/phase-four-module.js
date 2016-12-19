var PhaseFourModule = (function () {

    var selectorModule, socketModule;

    var $complete, $discard, $preview, $previewImg, $howTo;

    function onPageChange(num) {
        if (num == 4) {
            $preview.addClass('-loading');
            $previewImg.attr('src', 'img/no-image.jpg');
            $complete.hide();
            $discard.hide();
            $howTo.hide();
        }
    }

    function onSocketMessage(data) {
        if (data.command == SocketCommands.scanningSucceeded) {
            $preview.removeClass('-loading');
            $previewImg.attr('src', data.link);
            $complete.show();
            $discard.show();
            $howTo.show();
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
        $previewImg = $preview.find('img');

        $howTo = $('.phase-four__howto');


        $previewImg.on('touchstart', function(e) {
            console.log('touch started');
            socketModule.send({
                command: SocketCommands.startRotate
            });
        });

        $previewImg.on('touchend', function() {
            console.log('touch ended');
            socketModule.send({
                command: SocketCommands.stopRotate
            });
        });

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