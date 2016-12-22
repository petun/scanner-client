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
            $codeControls.hide();

            $newUserForm.find('input[type=text]').val('');
            $loginUserForm.find('input[type=text]').val('');
        }
    }

    function onSocketMessage(data) {
        if (data.command == SocketCommands.userLoginError) {
            $('input[type=submit]') .button('reset'); //@todo
            $loginError.text('Ошибка при входе в систему. Проверь правильность логина и пароля.').show();
        }

        if (data.command == SocketCommands.userRegError) {
            $('input[type=submit]') .button('reset'); //@todo
            $newUserError.text('Ошибка при проверке номера. Возможно такой номер уже есть в системе. Попробуйте еще раз.').show();
        }

        if (data.command == SocketCommands.userRegConfirmError) {
            $('input[type=submit]') .button('reset'); //@todo
            $newUserError.text('Неверный код активации. Попробуйте еще раз.').show();
        }

        if (data.command == SocketCommands.userLoginSuccess || data.command == SocketCommands.userRegConfirmSuccess) {
            $('input[type=submit]') .button('reset');
            hideErrors();
            selectorModule.setActive(6);
        }

        if (data.command == SocketCommands.userRegSuccess) {
            $('input[type=submit]') .button('reset');
            $codeControls.show();
            hideErrors();
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
            $newUserError.hide();

            var $button = $newUserForm.find('[type=submit]');
            var $telephone = $newUserForm.find('[name=telephone]');
            var $code = $codeControls.find('input');
            $button.button('loading');

            var isCodeSend = $codeControls.css('display') == 'block';

            var command;

            if (isCodeSend) {
                command = {
                    command: SocketCommands.userRegConfirm,
                    telephone: $telephone.val(),
                    code: $code.val()
                };
            } else {
                command = {
                    command: SocketCommands.userReg,
                    telephone: $telephone.val()
                }
            }

            socketModule.send(command);
        });

        $loginUserForm.on('submit', function(e) {
            e.preventDefault();
            $loginError.hide();

            var $button = $loginUserForm.find('[type=submit]');
            var $login = $loginUserForm.find('[name=name]');
            var $password = $loginUserForm.find('[name=password]');

            $button.button('loading');

            socketModule.send({
                command: SocketCommands.userLogin,
                name: $login.val(),
                password: $password.val()
            });
        });

    }

    return {
        init: _init
    }

})();