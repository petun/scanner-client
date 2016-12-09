var PhaseThreeModule = (function(){

    var selectorModule, socketModule;

    var $scan, $process;

    function onPageChange(num) {
        if (num == 3) {
            $process.hide();
            $scan.show();

            socketModule.send({
                command: "scan"
            });
        }
    }

    function onSocketMessage(data) {
        if (data.command == "scan_result") {
            if (data.code == 200) {
                $scan.hide();
                $process.show();
            }
        }

        if (data.command == "process_result") {
            if (data.code == 200) {
                selectorModule.setActive(4);
            }
        }
    }

    function _init(pageSelectorModule, sockets)
    {
        selectorModule = pageSelectorModule;
        selectorModule.addPageChangeHandler(onPageChange);

        socketModule = sockets;
        socketModule.addSubscriber(onSocketMessage)

        $scan = $('.phase-three__step.-scan');
        $process = $('.phase-three__step.-processing');
    }

    return {
        init: _init
    }

})();