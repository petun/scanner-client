var PhaseThreeModule = (function () {

    var selectorModule, socketModule, globalLoaderModule;

    var $scan, $error, $prepare, $restart;

    function onPageChange(num) {
        if (num == 3) {
            // $prepare.show();
            // $scan.hide();

            globalLoaderModule.show().setText('Подготовка к сканированию...');

            $error.hide();

            socketModule.send({
                command: SocketCommands.scanStart
            });
        }
    }

    function onSocketMessage(data) {
        if (data.command == SocketCommands.scannerHasEnoughData) {
            globalLoaderModule.hide();
            selectorModule.setActive(4);
        }

        if (data.command == SocketCommands.scanningStarted) {
            globalLoaderModule.setText('Идет сканирование...').show();
            // $prepare.hide();
            // $scan.show();
        }

        if (data.command == SocketCommands.scanningFailed) {
            globalLoaderModule.hide();
            showErrorMessage('Ошибка при сканировании');
        }
        if (data.command == SocketCommands.scanningFailedToStart) {
            globalLoaderModule.hide();
            showErrorMessage('Ошибка при старте сканирования');
        }
    }

    function showErrorMessage(message) {
        $error.find('.alert').html('<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + message);
        $error.show();

        // $scan.hide();
        // $prepare.hide();
    }

    function _init(pageSelectorModule, sockets, globalLoader) {
        selectorModule = pageSelectorModule;
        selectorModule.addPageChangeHandler(onPageChange);

        socketModule = sockets;
        socketModule.addSubscriber(onSocketMessage);

        globalLoaderModule = globalLoader;

        // $scan = $('.phase-three__step.-scan');
        // $prepare = $('.phase-three__step.-prepare');
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