var GlobalLoader = (function () {

    var $self ;

    var $loader, $loaderText;

    function _init() {
        $self = this;
        $loader = $('.loader');
        $loaderText = $loader.find('.loader__text');
    }

    function _setText(text) {
        $loaderText.text(text);
        return $self;
    }

    function _show() {
        $loader.show();
        return $self;
    }

    function _hide() {
        $loader.hide();
        return $self;
    }

    return {
        init: _init,
        setText: _setText,
        show: _show,
        hide: _hide
    }

})();

