var PhaseFiveModule = (function(){

    var selectorModule, socketModule;

    var $loginError, $newUserError;

    var $newUserForm, $loginUserForm, $codeControls;

    function hideErrors() {
        $loginError.hide();
        $newUserError.hide();
    }

    function onPageChange(num) {
        if (num == 5) {
            $('.phase-five__form .nav.nav-tabs a').click(function (e) {
                e.preventDefault()
                $(this).tab('show')
            });
            hideErrors();
        }
    }

    function onSocketMessage(data) {
        if (data.command == SocketCommands.userLoginError) {
            $('input[type=submit]') .button('reset'); //@todo
            $loginError.text('Ошибка при входе в систему. Проверь правильность логина и пароля.').show();
        }

        if (data.command == SocketCommands.userRegError) {
            $('input[type=submit]') .button('reset'); //@todo
            $loginError.text('Ошибка при регистрации пользователя. Попробуйте еще раз.').show();
        }

        if (data.command == SocketCommands.userLoginSuccess || data.command == SocketCommands.userRegConfirmSuccess) {
            $('input[type=submit]') .button('reset');
            hideErrors();
            selectorModule.setActive(6);
        }
    }

    function _init(pageSelectorModule, sockets)
    {
        selectorModule = pageSelectorModule;
        selectorModule.addPageChangeHandler(onPageChange);

        socketModule = sockets;
        socketModule.addSubscriber(onSocketMessage);

        $newUserForm = $('.new-user');
        $loginUserForm = $('.login-user');
        $codeControls = $('#code-controls');
        $codeControls.hide();

        $loginError = $('.phase-five__error.-login .alert');
        $newUserError = $('.phase-five__error.-new .alert');
        hideErrors();

        $newUserForm.on('submit', function(e) {
            e.preventDefault();
            $loginError.hide();

            var $button = $newUserForm.find('[type=submit]');
            $button.button('loading');

            socketModule.send({
                command: SocketCommands.userReg,
                data: $newUserForm.serializeArray()
            });
        });

        $loginUserForm.on('submit', function(e) {
            e.preventDefault();
            $loginError.hide();

            var $button = $loginUserForm.find('[type=submit]');
            $button.button('loading');

            socketModule.send({
                command: SocketCommands.userLogin,
                data: $newUserForm.serializeArray()
            });
        });

    }

    return {
        init: _init
    }

})();