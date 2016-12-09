var PhasePageSelectorModule = (function(){

    var $phasesLinks;
    var $phasesBlocks;
    var handlers = [];

    this._init = function()
    {
        $phasesLinks = $('.phase-list .phase');
        $phasesBlocks = $('.phase-content>div');
        $phasesBlocks.hide();
    };


    this._setActive = function (num) {
        $phasesLinks
            .removeClass('-done')
            .removeClass('-active');

        var index = num - 1;
        $phasesLinks.eq(index).addClass('-active');
        $phasesLinks.filter('.phase:lt(' + index + ')').addClass('-done');

        $phasesBlocks.hide().eq(index).show();

        console.log('notify ' + handlers.length + ' handlers');
        handlers.forEach(function(handler) {
            handler(num);
        });
    };


    this._addPageChangeHandler = function(handler) {
        console.log('add new handler');
        handlers.push(handler);
    };

    return {
        setActive: function (num) {
            _setActive(num);
        },
        init: _init,
        addPageChangeHandler: _addPageChangeHandler
    }
})();

