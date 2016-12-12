var PhaseFiveModule = (function(){

    var selectorModule, socketModule;

    var $form, $submit, $error;

    function onPageChange(num) {


    }

    function onSocketMessage(data) {

        if (data.command == SocketCommands.uploadFailed) {
            $submit.button('reset');
            $error.show();
        }

        if (data.command == SocketCommands.uploadSucceeded) {
            $submit.button('reset');
            selectorModule.setActive(6);
        }
    }

    function _init(pageSelectorModule, sockets)
    {
        selectorModule = pageSelectorModule;
        selectorModule.addPageChangeHandler(onPageChange);

        socketModule = sockets;
        socketModule.addSubscriber(onSocketMessage);

        $form = $('.phase-five__form');
        $submit = $form.find('[type=submit]');
        $error = $('.phase-five__error');
        $error.hide();

        $submit.on('click', function(e) {
            e.preventDefault();
            $error.hide();
            socketModule.send({
                command: SocketCommands.upload,
                user: {
                    "id": 170,
                    "telephone": "+7 (123) 123-12-12"
                }
            });

            $submit.button('loading');
        });
    }

    return {
        init: _init
    }

})();