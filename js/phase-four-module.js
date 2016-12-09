var PhaseFourModule = (function(){

    var selectorModule, socketModule;

    var $complete, $discard;

    function onPageChange(num) {

    }

    function onSocketMessage(data) {

    }

    function _init(pageSelectorModule, sockets)
    {
        selectorModule = pageSelectorModule;
        selectorModule.addPageChangeHandler(onPageChange);

        socketModule = sockets;
        socketModule.addSubscriber(onSocketMessage);

        $complete = $('#complete');
        $discard = $('#discard');

        $complete.on('click', function(e) {
            e.preventDefault();
            selectorModule.setActive(5);
        })

        $discard.on('click', function(e) {
            e.preventDefault();
            selectorModule.setActive(1);
        });
    }

    return {
        init: _init
    }

})();