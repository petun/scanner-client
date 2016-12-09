var PhaseOneModule = (function(){

    var $link;
    var selectorModule;

    function _init(pageSelectorModule)
    {
        selectorModule = pageSelectorModule;

        $link = $('.phase-one__start');
        $link.on('click', function(e) {
            e.preventDefault();
            selectorModule.setActive(2);
        })
    }


    return {
        init: _init
    }
})();