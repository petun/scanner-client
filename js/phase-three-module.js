var PhaseThreeModule = (function () {

    var selectorModule, socketModule;

    var $scan, $process, $error, $prepare, $restart;

    function onPageChange(num) {
        if (num == 3) {
            $prepare.show();

            $process.hide();
            $scan.hide();
            $error.hide();

            socketModule.send({
                command: SocketCommands.scanStart
            });
        }
    }

    function onSocketMessage(data) {
        if (data.command == SocketCommands.scannerHasEnoughData) {
            $scan.hide();
            $process.show();
        }

        if (data.command == SocketCommands.scanningSucceeded) {
            selectorModule.setActive(4);
        }

        if (data.command == SocketCommands.scanningStarted) {
            $prepare.hide();
            $scan.show();
        }

        if (data.command == SocketCommands.scanningFailed) {
            showErrorMessage('Ошибка при сканировании');
        }
        if (data.command == SocketCommands.scanningFailedToStart) {
            showErrorMessage('Ошибка при старте сканирования');
        }
    }

    function showErrorMessage(message) {
        $error.find('.alert').html('<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + message);
        $error.show();

        $scan.hide();
        $process.hide();
        $prepare.hide();
    }

    function _init(pageSelectorModule, sockets) {
        selectorModule = pageSelectorModule;
        selectorModule.addPageChangeHandler(onPageChange);

        socketModule = sockets;
        socketModule.addSubscriber(onSocketMessage)

        $scan = $('.phase-three__step.-scan');
        $process = $('.phase-three__step.-processing');
        $prepare = $('.phase-three__step.-prepare');
        $error = $('.phase-three__error');
        $restart = $('.phase-three__restart');
        $restart.on('click', function(e) {
            e.preventDefault();
            selectorModule.setActive(1);
        });
    }

    return {
        init: _init
    }

})();