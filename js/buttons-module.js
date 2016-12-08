var ButtonsModule = (function(){

    var $phases;

    this._init = function()
    {
        $phases = $('.phase-list .phase');
    };


    this._setActive = function (num) {
        $phases
            .removeClass('-done')
            .removeClass('-active');

        var index = num - 1;
        $phases.eq(index).addClass('-active');

        $phases.filter('.phase:lt(' + index + ')').addClass('-done');
    };

    return {
        setActive: function (num) {
            _setActive(num);
        },
        init: _init
    }
})();

